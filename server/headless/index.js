const puppeteer = require("puppeteer");

async function main() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.gmail.com");
    await page.screenshot({ path: "example.png" });

    await browser.close();
  } catch (err) {
    throw (err, "Puppeteer error");
  }
}

main();
