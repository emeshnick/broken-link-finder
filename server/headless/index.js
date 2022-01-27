const puppeteer = require("puppeteer");

/*
 * Webscraper function using headless browser
 */
async function scrape(url) {
  const brokenLinks = [];
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

    for (let i = 0; i < 3; i++) {
      try {
        if (links[i].href) {
          await page.goto(`${links[i].href}`, {
            waitUntil: "load",
            timeout: 0,
          });
          console.log("visited ", links[i].href);
        }
      } catch (e) {
        //If there is an error visiting the url push link to broken link array
        brokenLinks.push({ ...links[i], message: e.message });
      }
    }

    await browser.close();
  } catch (err) {
    throw (err, "Puppeteer error");
  }

  return brokenLinks;
}

module.exports = { scrape };
