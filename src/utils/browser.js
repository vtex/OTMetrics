/*
    Snippet of code needed to make the page controlled.
    Content extracted from: https://github.com/vtex/metrics-puppeteer-lib/
    
    Author: Caroliny Valença | github: carolvalenca
*/

import puppeteer from 'puppeteer'

async function getPageContentHTML(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const ret = await page.content();
  browser.close();

  return ret;
}

/*
    Adapted function that receives a list of arrays and accesses each one of them. No need to get the content.
    Lines of code from the previous function used in these are marked with "// this"
*/

export async function accessListOfPages(urls) {
    const browser = await puppeteer.launch(); // this
    const page = await browser.newPage(); // this

    for( let url of urls ) {
        await page.goto(url); // this
    }

    browser.close(); // this
}