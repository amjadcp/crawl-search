const siteindex = require("./siteindex.json");

const search = "YouTube";

const results = siteindex
  .filter((index) => index.content.toLowerCase().includes(search.toLocaleLowerCase()))
  .map((index) => {
    index.content = index.content.replace(
        new RegExp(`(${search})`, "gi"), // Case-insensitive match
        `<mark>$1</mark>` // Wrap matched text in <mark>
      )
    return index
  });

console.log(results);
