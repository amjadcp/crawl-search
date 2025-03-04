# CrawlSearch

CrawlSearch is an npm package that provides both a CLI tool for generating a searchable site index and a React component for integrating search functionality into your web application. The CLI tool uses Puppeteer to crawl your website and generate a JSON index of your site's pages, while the React component provides a search interface to display and highlight matched content.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Generating the Site Index](#generating-the-site-index)
  - [Using the React Component](#using-the-react-component)
    - [Customization](#customization)
    - [Local Usage](#local-usage)
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
npm install crawl-search
```

> **Note:** This package has peer dependencies on React and ReactDOM. Make sure you install them in your project if you haven't already:

```bash
npm install react react-dom
```

## Usage

### Generating the Site Index

1. **Initialize the Default Configuration**

   If you don't already have a crawling configuration file, you can generate a sample file by running:

   ```bash
   npx site-search init
   ```

   This command creates a sample `crawler.config.json` file in the library folder. You can then copy or move this file to your project directory for editing.

2. **Edit the Crawling Configuration File**

   Open the generated `crawler.config.json` file and update its contents as needed. A typical configuration looks like this:

   ```json
   {
     "rootUrl": "https://example.com",
     "paths": ["/page1", "/page2"]
   }
   ```

   - **rootUrl:** The base URL of the website you want to index.
   - **paths:** An array of URL paths to crawl relative to the root URL.

3. **Generate the Site Index**

   Once your configuration file is ready, run the following command to generate the site index:

   ```bash
   npx site-search generate --config crawler.config.json
   ```

   This command will:
   - Crawl the specified pages using Puppeteer.
   - Generate a site index and save it as `siteindex.json` in your current directory.
   - Log progress updates and any errors encountered during the process.

### Using the React Component

Once you have generated the index, you can use the provided React component to implement a search interface:

1. **Import the Component and Index**

   In your React application, import the component and the generated index:

   ```javascript
   import React from "react";
   import { SearchComponent } from "crawl-search";
   import siteIndex from "./siteindex.json";
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

### Customization

The `SearchComponent` provides several props for customization:

- **Class Names:**

  - `containerClassName`: Class name for the container.
  - `inputClassName`: Class name for the input element.
  - `resultsContainerClassName`: Class name for the results container.
  - `resultItemClassName`: Class name for individual result items.

- **Styles:**

  - `containerStyle`: Inline style for the container.
  - `inputStyle`: Inline style for the input element.
  - `resultsContainerStyle`: Inline style for the results container.
  - `resultItemStyle`: Inline style for individual result items.

- **Custom Render Function:**
  - `renderResult`: Function to customize the rendering of individual results.

Example of using customization props:

```jsx
function App() {
  const customRenderResult = (item) => (
    <div key={item.id} style={{ padding: "10px", border: "1px solid #ccc" }}>
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </a>
    </div>
  );

  return (
    <div>
      <h1>Site Search</h1>
      <SearchComponent
        index={siteIndex}
        containerClassName="search-container"
        inputClassName="search-input"
        resultsContainerClassName="search-results-container"
        resultItemClassName="search-result-item"
        containerStyle={{ backgroundColor: "#f9f9f9" }}
        inputStyle={{ borderColor: "#333" }}
        resultsContainerStyle={{ marginTop: "20px" }}
        resultItemStyle={{ backgroundColor: "#fff" }}
        renderResult={customRenderResult}
        placeholder="Search for content..."
      />
    </div>
  );
}

export default App;
```

## Local Usage

For local development or testing of the React component, follow these steps:

1. **Set Up a Local React App**

   Use `npm create vite@latest` to create a symlink to your package:

   ```bash
   cd path/to/react-app
   npm install
   ```

2. **Install the Package via a Relative Path**

   In your React app directory, run:

   ```bash
   npm install ../path-to/crawl-search
   ```

3. **Use the Component**

   Now you can use the `SearchComponent` in your React project as described in the previous section.

For local development or testing, you can run the CLI tool directly using Node.js:

```bash
node ./bin/cli.js generate --config crawler.config.json
```

## Project Structure

```
crawl-search/
├── bin/
│   └── cli.js         # CLI entry point
├── src/
│   ├── crawler.js     # Crawling logic using Puppeteer
│   ├── SearchComponent.js # React component for search functionality
│   └── index.js       # Exports the React component
├── .babelrc           # Babel configuration file
└── package.json
```

## Publishing the Package

1. **Publish to npm**

   Make sure you are logged into your npm account, then run:

   ```bash
   npm publish
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
