const puppeteer = require("puppeteer");
const axios = require("axios");

/*
 * Webscraper function using headless browser
 * Scrapes website and then visits all of the links scraped
 * Returns the number of links visited and an array of the broken links
 */
async function scrape(url) {
  const brokenLinks = [];
  let numLinks = 0;

  try {
    //Open headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1800 });

    //Navigate to input url
    await page.goto(url);

    const links = await page.$$eval("a", (el) =>
      el.map((a) => {
        return { href: a.href, text: a.text };
      })
    );
    await browser.close();

    for (let i = 0; i < links.length && i < 50; i++) {
      numLinks++;
      try {
        if (links[i].href) {
          await axios.get(`${links[i].href}`);
          console.log("visited ", links[i].href);
        }
      } catch (e) {
        //If there is an error visiting the url push link to broken link array
        brokenLinks.push({ ...links[i], message: e.message });
      }
    }
  } catch (err) {
    throw (err, "Puppeteer error");
  }

  return { brokenLinks, numLinks };
}

module.exports = { scrape };
