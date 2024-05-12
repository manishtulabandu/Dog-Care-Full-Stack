import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './TopHeader/Header';
import './Wikipedia.css';

function WikipediaSearchEngine() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [content, setContent] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handlePopState = () => {
    const newHistoryIndex = history.indexOf(window.location.pathname);
    setHistoryIndex(newHistoryIndex);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          srsearch: searchTerm,
          format: 'json',
          origin: '*'
        }
      });
      setSearchResults(response.data.query.search);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleResultClick = async (title) => {
    setSelectedResult(title);
    setLoadingContent(true);
    try {
      const response = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'parse',
          page: title,
          format: 'json',
          origin: '*',
          prop: 'text'
        }
      });
      setContent(response.data.parse.text['*']);
      const newHistory = [...history.slice(0, historyIndex + 1), title];
      setHistory(newHistory);
      setHistoryIndex(historyIndex + 1);
      window.history.pushState({ page: 'wiki' }, '', ''); // Empty URL to prevent changing
    } catch (error) {
      console.error('Error fetching page content:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleLinkClick = (event) => {
    const href = event.target.getAttribute('href');
    if (href && href.startsWith('/wiki/')) {
      event.preventDefault();
      const pageTitle = decodeURIComponent(href.substring('/wiki/'.length));
      handleResultClick(pageTitle);
    } else if (href && !href.startsWith('#')) {
      try {
        window.open(href, '_blank');
        event.preventDefault();
      } catch (error) {
        console.error('Error opening link:', error);
      }
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const previousTitle = history[historyIndex - 1];
      handleResultClick(previousTitle);
      setHistoryIndex(historyIndex - 1);
      try {
        window.history.back();
      } catch (error) {
        console.error('Error going back:', error);
      }
    }
  };

  const handleReset = () => {
    setSelectedResult(null);
    setSearchResults([]);
    setSearchTerm('');
  };

  return (
    <div className='Wikipedia-img'>
    <React.StrictMode>
      <Header/>
      <h1>Have Doubts about Dogs ? Search here </h1>
      <span>&nbsp;&nbsp;</span>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term"
        className="search-input"
        style={{ width: '70%', padding: '12px', borderRadius: '8px', border: '2px solid #007bff', outline: 'none' }}
      />
      <span>&nbsp;&nbsp;</span>
      <button onClick={handleSearch} className="search-btn">Search</button>
      <button onClick={handleReset} className="reset-btn">Reset</button>
      <button onClick={handleBack} disabled={historyIndex <= 0} className="back-btn">Back</button>
      <div id="display-result" className="result-container">
        {selectedResult ? (
          <div>
            <h2>{selectedResult}</h2>
            {loadingContent ? (
              <p>Loading content...</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} onClick={handleLinkClick} />
            )}
          </div>
        ) : (
          <div>
            {searchResults.map((result, index) => (
              <p key={index}>
                <button onClick={() => handleResultClick(result.title)} className="result-btn">
                  {result.title}
                </button>
              </p>
            ))}
          </div>
        )}
      </div>
    </React.StrictMode>
    </div>
  );
}

export default WikipediaSearchEngine;
