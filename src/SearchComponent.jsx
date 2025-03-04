import React, { useState } from 'react';

const SearchComponent = ({
  index,
  // Customization props for styling
  containerClassName = '',
  containerStyle = {},
  inputClassName = '',
  inputStyle = {},
  resultsContainerClassName = '',
  resultsContainerStyle = {},
  resultItemClassName = '',
  resultItemStyle = {},
  // Optional custom render function for individual results
  renderResult,
  placeholder = 'Search...',
}) => {
  // Default style objects
  const defaultContainerStyle = {
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
  };

  const defaultInputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const defaultResultsContainerStyle = {
    margin: '20px 0',
  };

  const defaultResultItemStyle = {
    display: 'block',
    padding: '10px',
    margin: '10px 0',
    textDecoration: 'none',
    color: '#333',
    border: '1px solid #eee',
    borderRadius: '4px',
  };

  // Merge default styles with any provided styles
  const finalContainerStyle = { ...defaultContainerStyle, ...containerStyle };
  const finalInputStyle = { ...defaultInputStyle, ...inputStyle };
  const finalResultsContainerStyle = { ...defaultResultsContainerStyle, ...resultsContainerStyle };
  const finalResultItemStyle = { ...defaultResultItemStyle, ...resultItemStyle };

  const [searchTerm, setSearchTerm] = useState('');

  const escapeRegExp = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const getHighlightedContent = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  // Filter and transform index based on the search term
  const results = index
    .filter((item) =>
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm
    )
    .map((item) => ({
      ...item,
      content: getHighlightedContent(item.content, searchTerm),
    }));

  return (
    <div className={containerClassName} style={finalContainerStyle}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className={inputClassName}
        style={finalInputStyle}
      />
      <div className={resultsContainerClassName} style={finalResultsContainerStyle}>
        {results.map((item) =>
          renderResult ? (
            <React.Fragment key={item.id}>
              {renderResult(item)}
            </React.Fragment>
          ) : (
            // Default rendering: wrap the result in an anchor so clicking anywhere redirects.
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={resultItemClassName}
              style={finalResultItemStyle}
            >
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
