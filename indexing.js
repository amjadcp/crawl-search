const fs = require("fs");
const config = require("./crawling.config.json");
const {paths, rootUrl} = config
const results = [];

paths.forEach(async (path, i) => {
  const content = await fetch(`${rootUrl}${path}`)
    .then((data) => data.text())
    .then(
      (data) =>
        data
          .replace(/<script[\s\S]*?<\/script>/gi, "") // Remove script tags & content
          .replace(/<[^>]*>/g, "\n") // Remove remaining HTML tags
          .replace(/\s+/g, " ") // Replace multiple spaces/newlines with a single space
          .trim() // Remove leading/trailing spaces
    );

  results.push({
    id: path,
    content: content,
    url: `/${path}`,
  });
  
  if (paths.length - 1 === i) {
    fs.writeFileSync("siteindex.json", JSON.stringify(results, null, 2));
  }
});

