const puppeteer = require("puppeteer");
const fs = require("fs");
const { URL } = require("url");

const crawl = async (config) => {
  const { paths, rootUrl } = config;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const index = [];

  for (const [i, path] of paths.entries()) {
    const fullUrl = new URL(path, rootUrl).href;
    try {
      await page.goto(fullUrl, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      const content = await page.evaluate(() => {
        return document.body.innerText;
      });

      const processedContent = content.replace(/\s+/g, " ").trim();

      index.push({
        id: i,
        content: processedContent,
        url: fullUrl,
      });
    } catch (error) {
      console.error(`Error crawling ${fullUrl}: ${error.message}`);
    }
  }

  await browser.close();
  return index;
};

// CLI Execution
const configPath = process.argv[2];
let config = require("./crawling.config.json");
if (configPath) {
  config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

crawl(config)
  .then((index) => {
    fs.writeFileSync("siteindex.json", JSON.stringify(index, null, 2));
  })
  .catch((error) => {
    console.error("Crawling failed:", error);
    process.exit(1);
  });
