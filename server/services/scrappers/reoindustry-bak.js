const puppeteer = require('puppeteer');
const axios = require('axios');
const async = require('async');
const sessionSocketService = require('../sessionSocketService');
const baseUrl = 'https://www.reoindustrydirectory.com';
var fs = require('fs');

module.exports = {
    scrapeSite: scrapeSite
}

const startPage = 1;
const allowPage = 'all';
const data = [];
function scrapeSite(params, sessionUser) {
    return new Promise((resolve,  reject) => {
        const findText = params.findText.replace(/[\s]/g, '-'); // 'new york'
        recursePages(findText, startPage, sessionUser).then((done) => {
            writeFile(data);
            resolve(done);
        });
    });
}

function writeFile(data) {
    fs.writeFile(`./json/reo.json`, JSON.stringify(data), 'utf8', () => {
        // console.log('Done!');
    });
}

function injectEmail(value) {
    return new Promise((resolve,  reject) => {
        axios.get(baseUrl + value.email)
            .then(function (resp) {
                value.email = resp.data;
                resolve(value);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function recursePages(findText, page, sessionUser) {
    return new Promise((resolve,  reject) => {
        const url = baseUrl + '/find-reo-agents/' + findText + "?page=" + page;
        findLinks(url, findText, page).then(links => {
            traverseLinks(links, sessionUser).then((promotionFound) => {
                if (promotionFound) {
                    console.log('Pormotion found.')
                    resolve(true);
                } else {
                    if (links && links.length && (page < allowPage || allowPage === 'all')) {
                        sessionSocketService.relayProgress({user: sessionUser, event: 'scraping-update', message: 'Finding Links for page: ' + page, links: links});
                        resolve(recursePages(findText, ++page, links, sessionUser));
                    } else {
                        resolve(true);
                    }
                }
            });
            
        });
    });
}

function traverseLinks(links, sessionUser) {
    return new Promise((resolve,  reject) => {
        let promotionFound = false;
        let counter = 1;
        async.eachSeries(links, (link, done) => {
            scrapeData(link).then((value) => {
                if (value.title === 'Website Promotion') {
                    promotionFound = true;
                    sessionSocketService.relayProgress({user: sessionUser, event: 'scraping-update', message: 'Scraped data for link ' + counter + ' among ' + links.length, value: value, complete: true});
                    done();
                } else {
                    value.profileUrl = baseUrl + link;
                    injectEmail(value).then(value => {
                        data.push(value);
                        console.log(counter, value);
                        sessionSocketService.relayProgress({user: sessionUser, event: 'scraping-update', message: 'Scraped data for link ' + counter + ' among ' + links.length, value: value, complete: counter === links.length});

                        counter++;
                        done();
                    }).catch(err => console.log(err));
                }
            });
        }, () => {
            // writeFile(data, counter);
            resolve(promotionFound);
        });
    });
}

async function findLinks(url, findText, pageNum) {
    try{
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        console.log(url);

        await page.goto(url, {timeout: 120000});
        const result = await page.evaluate(() => {
            let _links = [];
            let elements = document.querySelectorAll('.view');
            for (const el of elements) {
                let link = el.childNodes[1].getAttribute('href');
                _links.push(link);
            }
            return _links;
        });

        browser.close();
        return result;

    } catch(err) {
        console.log('thrown exception for', page, err);
        return findLinks(findText, pageNum);
    }
}

async function scrapeData(link) {
    try{
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        // console.log(link);

        await page.goto(baseUrl + link, {timeout: 120000});

        const result = await page.evaluate(() => {
            let name = getData([document.querySelector('#agent-name')]);
            let company = getData([document.querySelector('#agent-company #company')]);
            let title = getData([document.querySelector('#agent-company #title')]);
            let address = getData([
                document.querySelector('#address .info:first-child'),
                document.querySelector('#address .info:last-child')
            ]);
            let phones = getData([
                document.querySelector('#phones .info:nth-child(1)'),
                document.querySelector('#phones .info:nth-child(2)'),
                document.querySelector('#phones .info:nth-child(3)')
            ]);

            let email = getEmail(document.querySelector('#phones #email'));

            let info = getData([
                document.querySelector('#agent-company .info:nth-child(1)'),
                document.querySelector('#agent-company .info:nth-child(5)')
            ]);

            return {name, company, title, address, phones, info, email};


            function getData(elements) {
                const data = [];
                elements.forEach(element => {
                    if (element && element.innerText && element.innerText.indexOf('Click') === -1) {
                        data.push(element.innerText);
                    }
                });
                return data.join(', ');
            }

            function getEmail(element) {
                return element.getAttribute('href');
            }

        });

        browser.close();
        return result;
    } catch(err) {
        console.log('thrown exception for', link, err);
        return scrapeData(link);
    }
};


scrapeSite({
    findText: 'new york'
}).then((data) => {
    console.log('Done!');
}).catch(err=> console.log(err));