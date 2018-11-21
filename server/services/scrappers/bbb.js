const puppeteer = require('puppeteer');
const axios = require('axios');
const async = require('async');
const sessionSocketService = require('../sessionSocketService');

module.exports = {
    scrapeSite: scrapeSite
}

function scrapeSite(params, sessionUser) {
    return new Promise((resolve, reject) => {
        const findText = params.findText; // 'General'
        const location = params.location; // 'Hartford CT'
        findLinks(findText, location, 1, []).then((links) => {
            links = links.splice(0, 5);
            const data = [];
            let counter = 1;
            async.eachSeries(links, (link, done) => {
                scrapeData(link).then((value) => {
                    value.link = link;
                    data.push(value);
                    console.log(value);
                    sessionSocketService.relayProgress({
                        user: sessionUser,
                        counter: counter,
                        event: 'scraping-update'
                    });
                    counter++;
                    done();
                });
            }, () => {
                resolve(data);
            });
        });
    });
}

function findLinks(findText, location, page, links = []) {
    return new Promise((resolve, reject) => {
        const url = 'https://www.bbb.org/api/search?find_loc=' + location + '&find_text=' + findText + '&page=' + page;
        axios.get(url)
            .then(function (response) {
                if (response.data.results && response.data.results.length && page < 3) {
                    response.data.results.map(item => {
                        links.push(item.reportUrl);
                    });
                    resolve(findLinks(findText, location, ++page, links));
                } else {
                    resolve(links)
                }
            })
            .catch(function (error) {
                resolve(findLinks(findText, location, page, links));
            });
    });

}


let scrapeData = async (link) => {
    try {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        console.log(link);

        await page.goto(link, {
            timeout: 120000
        });

        const result = await page.evaluate(() => {
            let leftData = [];
            let leftElements = document.querySelectorAll('.gaxnaF .jss0333');

            for (const element of leftElements) {
                leftData.push(element.innerText);
            }

            let rightData = [];
            let rightElements = document.querySelectorAll('.iFdwIH .jss0333');
            for (const element of rightElements) {
                rightData.push(element.innerText);
            }
            return {
                leftData: leftData,
                rightData: rightData
            };
        });

        browser.close();
        return result;
    } catch (err) {
        console.log('thrown exception for', link);
        return scrapeData(link);
    }
};