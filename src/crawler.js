const puppeteer = require('puppeteer');
const { URL } = require('url');

const crawl = async (config) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const index = [];

  for (const [i, path] of config.paths.entries()) {
    const fullUrl = new URL(path, config.rootUrl).href;
    try {
      await page.goto(fullUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      const content = await page.evaluate(() => document.body.innerText);
      index.push({
        id: i,
        content: content.replace(/\s+/g, ' ').trim(),
        url: fullUrl,
      });
    } catch (error) {
      console.error(`Error crawling ${fullUrl}: ${error.message}`);
    }
  }

  await browser.close();
  return index;
};

module.exports = { crawl };