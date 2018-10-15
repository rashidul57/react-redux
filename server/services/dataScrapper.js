const puppeteer = require('puppeteer');
const axios = require('axios');
const async = require('async');

const links = [];
findLinks('General', 'Hartford CT', 1, links).then((links) => {
    async.eachSeries(links, (link, done)=> {
        scrapeData(link).then((value) => {
            console.log(value);
            done();
        });
    });
});

function findLinks(findText, location, page, links) {
    return new Promise((resolve,  reject) => {
        const url = 'https://www.bbb.org/api/search?find_loc=' + location +'&find_text=' + findText +'&page=' + page;
        axios.get(url)
            .then(function (response) {
                if (response.data.results && response.data.results.length) {
                    // console.log(response.data.results.length)
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


let scrapeData = async(link) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto(link);

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
        return {leftData: leftData, rightData: rightData};
    });

    browser.close();
    return result;
};
