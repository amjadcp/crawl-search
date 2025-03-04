import React, { useState } from 'react';

const SearchComponent = ({ index }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const getHighlightedContent = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const results = index.filter(item =>
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm
  ).map(item => ({
    ...item,
    content: getHighlightedContent(item.content, searchTerm),
  }));

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <div>
        {results.map((item) => (
          <div key={item.id} style={{ margin: '20px 0' }}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.url}
            </a>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;