const puppeteer = require("puppeteer");

/*
 * Webscraper function
 */
async function scrape(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: "example.png" });

    await browser.close();
  } catch (err) {
    throw (err, "Puppeteer error");
  }
}

module.exports = { scrape };
