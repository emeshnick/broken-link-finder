const puppeteer = require("puppeteer");

/*
 * Webscraper function
 */
async function scrape(url) {
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
    console.log(links);

    await page.screenshot({ path: "example.png" });

    await browser.close();
  } catch (err) {
    throw (err, "Puppeteer error");
  }
}

module.exports = { scrape };
