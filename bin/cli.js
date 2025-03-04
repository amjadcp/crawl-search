#!/usr/bin/env node
const { program } = require("commander");
const { crawl } = require("../src/crawler.js");
const fs = require("fs");

program
  .command("init")
  .description("Generate default crawling configuration file in the lib folder")
  .action(() => {
    try {
      // Define default configuration
      const defaultConfig = {
        rootUrl: "https://example.com",
        paths: ["/page1", "/page2"],
      };

      fs.writeFileSync(
        "crawler.config.json",
        JSON.stringify(defaultConfig, null, 2),
      );
      console.log(`Default config generated`);
    } catch (error) {
      console.error("Error generating default config:", error.message);
      process.exit(1);
    }
  });

program
  .command("generate")
  .description("Generate site index from config")
  .option(
    "-c, --config <path>",
    "Path to config file",
    "./crawler.config.json",
  )
  .action(async (options) => {
    try {
      const config = JSON.parse(fs.readFileSync(options.config, "utf-8"));
      const index = await crawl(config);
      fs.writeFileSync("siteindex.json", JSON.stringify(index, null, 2));
      console.log("Index generated at siteindex.json");
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
