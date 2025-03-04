#!/usr/bin/env node
const { program } = require('commander');
const { crawl } = require('../lib/crawler.js');
const fs = require('fs');

program
  .command('generate')
  .description('Generate site index from config')
  .option('-c, --config <path>', 'Path to config file', './crawling.config.json')
  .action(async (options) => {
    try {
      const config = JSON.parse(fs.readFileSync(options.config, 'utf-8'));
      const index = await crawl(config);
      fs.writeFileSync('siteindex.json', JSON.stringify(index, null, 2));
      console.log('Index generated at siteindex.json');
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);