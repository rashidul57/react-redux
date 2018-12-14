const puppeteer = require('puppeteer');
const axios = require('axios');
const async = require('async');
const sessionSocketService = require('../sessionSocketService');
const baseUrl = 'https://www.reoindustrydirectory.com';
var fs = require('fs');

module.exports = {
    scrapeSite: scrapeSite
}

let startPage = 1;
function scrapeSite(params, sessionUser) {
    return new Promise((resolve,  reject) => {
        const findText = params.findText.replace(/[\s]/g, '-'); // 'new york'
        let links = [];
        async.eachSeries(['page', 'bpage'], (pageType, done) => {
            recursePages(findText, startPage, pageType, links, sessionUser).then((_links) => {
                links = _links;
                done();
            });
        }, () => {
            const data = [];
            let counter = 1;
            console.log('Links finding complete. found', links.length);
            async.eachSeries(links, (link, done)=> {
                scrapeData(link).then((value) => {
                    value.profileUrl = baseUrl + link;
                    injectEmail(value).then(value => {
                        data.push(value);
                        console.log(counter, value);
                        sessionSocketService.relayProgress({user: sessionUser, event: 'scraping-update', message: 'Scraped data for link ' + counter + ' among ' + links.length, value: value, complete: counter === links.length});
                        
                        // if (counter % range === 0) {
                        //     const temp = data;
                        //     writeFile(temp, counter);
                        //     data = [];
                        //     console.log('written json in file: reo-', counter, '.json')
                        // }
                        counter++;
                        done();
                    }).catch(err => console.log(err));
                });
            }, () => {
                writeFile(data, findText);
                resolve(data);
            });
        });
    });
}

function writeFile(data, fileName) {
    fs.writeFile(`./json/${fileName}.json`, JSON.stringify(data), 'utf8', () => {
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

function recursePages(findText, page, pageType, links, sessionUser) {
    return new Promise((resolve,  reject) => {
        const url = baseUrl + '/find-reo-agents/' + findText + "?" + pageType + "=" + page;
        findLinks(url, findText, page, pageType).then(_links => {
            if (_links && (pageType === 'page' && _links.length < 3)) {
                scrapeData(_links[0]).then((value) => {
                    if (value.title === 'Website Promotion') {
                        resolve(links);
                    } else {
                        goForNext(findText, links, _links, page, pageType, sessionUser, resolve);
                    }
                });
            } else {
                if (_links && _links.length) {
                    goForNext(findText, links, _links, page, pageType, sessionUser, resolve);
                } else {
                    resolve(links);
                }
            }
        });
    });
}

function goForNext(findText, links, _links, page, pageType, sessionUser, resolve) {
    links = links.concat(_links);
    sessionSocketService.relayProgress({user: sessionUser, event: 'scraping-update', message: 'Finding Links for page: ' + page, links: _links});
    resolve(recursePages(findText, ++page, pageType, links, sessionUser));
}

async function findLinks(url, findText, pageNum, pageType) {
    try{
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        console.log(url);

        await page.goto(url, {timeout: 120000});
        const result = await page.evaluate((pageType) => {
            let _links = [];
            const selector = pageType === 'page' ? '.view' : '.more-list';
            let elements = document.querySelectorAll(selector);
            for (const el of elements) {
                const refEl = pageType === 'page' ? el.childNodes[1] : el;
                let link = refEl.getAttribute('href');
                _links.push(link);
            }
            return _links;
        }, pageType);

        browser.close();
        return result;

    } catch(err) {
        console.log('thrown exception for', pageNum, err);
        return findLinks(findText, pageNum, pageType);
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


const states = ['New Jersey', 'Pennsylvania', 'Connecticut', 'Maryland', 'Florida', 'Virginia'];

async.eachSeries(states, (state, done) => {
    startPage = 1;
    scrapeSite({
        findText: state
    }).then((data) => {
        console.log(state, 'Done!');
        done();
    }).catch(err=> console.log(err));
});
