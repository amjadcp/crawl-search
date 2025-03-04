# Site Search Tool

Site Search Tool is an npm package that provides both a CLI tool for generating a searchable site index and a React component for integrating search functionality into your web application. The CLI leverages Puppeteer to crawl and index pages, while the React component allows users to search through the indexed content.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Generating the Site Index](#generating-the-site-index)
  - [Using the React Component](#using-the-react-component)
- [Developer Guide](#developer-guide)
  - [Project Structure](#project-structure)
  - [Building the Project](#building-the-project)
  - [Publishing the Package](#publishing-the-package)
- [License](#license)

## Features

- **CLI Tool:** Crawl your website using a custom configuration and generate an index (`siteindex.json`) of your site's pages.
- **React Component:** Easily integrate a search interface that highlights matched content.
- **Customizable Crawling:** Configure the root URL and specific paths to crawl.
- **Modern Development:** Uses Babel for transpilation, supports ES6+ and JSX.

## Installation

Install the package using npm:

```bash
npm install site-search-tool
```

> **Note:** This package has peer dependencies on React and ReactDOM. Make sure you install them in your project if you haven't already:

```bash
npm install react react-dom
```

## Usage

### Generating the Site Index

1. **Create a Crawling Configuration File**

   Create a file named `crawling.config.json` in your project directory with the following structure:

   ```json
   {
     "rootUrl": "https://example.com",
     "paths": ["/page1", "/page2"]
   }
   ```

   - **rootUrl:** The base URL of the website you want to index.
   - **paths:** An array of URL paths to crawl relative to the root.

2. **Run the CLI Command**

   Use the CLI tool to generate the index by running:

   ```bash
   npx site-search generate --config crawling.config.json
   ```

   This command will:
   - Crawl the specified pages using Puppeteer.
   - Generate a site index and save it as `siteindex.json` in your current directory.
   - Log the progress or any errors encountered during the crawling process.

### Using the React Component

Once you have generated the index, you can use the provided React component to implement a search interface:

1. **Import the Component and Index**

   In your React application, import the component and the generated index:

   ```javascript
   import React from 'react';
   import { SearchComponent } from 'site-search-tool';
   import siteIndex from './siteindex.json';
   ```

2. **Implement the Component in Your App**

   Use the component in your application by passing the index as a prop:

   ```jsx
   function App() {
     return (
       <div>
         <h1>Site Search</h1>
         <SearchComponent index={siteIndex} />
       </div>
     );
   }

   export default App;
   ```

   > **Security Note:** The component uses `dangerouslySetInnerHTML` to highlight search results. Ensure that the content you are indexing is trusted or properly sanitized.

## Developer Guide

### Project Structure

```
site-search-tool/
├── bin/
│   └── cli.js         # CLI entry point
├── src/
│   ├── crawler.js     # Crawling logic using Puppeteer
│   ├── SearchComponent.js # React component for search functionality
│   └── index.js       # Exports the React component
├── lib/               # Transpiled code (generated via Babel)
├── .babelrc           # Babel configuration file
└── package.json
```

### Building the Project

This project uses Babel to transpile ES6+ and JSX code. To build the project:

```bash
npm run build
```

This command will transpile the source files in the `src` directory and output the resulting JavaScript files to the `lib` folder.

### Publishing the Package

Before publishing, ensure that your build is up-to-date:

1. **Build the Package**

   ```bash
   npm run build
   ```

2. **Publish to npm**

   Make sure you are logged into your npm account, then run:

   ```bash
   npm publish
   ```

### Running the CLI Locally

For local development or testing, you can run the CLI tool directly using Node.js:

```bash
node ./bin/cli.js generate --config crawling.config.json
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.