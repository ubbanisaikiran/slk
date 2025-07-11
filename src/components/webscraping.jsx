import React, { useState } from 'react';
import axios from 'axios';
import './Webscraping.css';

const WebScraping = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/scrape/twitter', { keyword });
      setResult(res.data);
    } catch (err) {
      setError('Failed to fetch data.');
    }
    setLoading(false);
  };

  return (
    <div className="scrape-container">
        <h1> X automated and scraping</h1>
      <div className="top-search-bar">
        <input
          type="text"
          placeholder="Enter keyword or hashtag"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <div className="loader">Scraping tweets...</div>}
      {error && <div className="error">{error}</div>}

      {result && (
        <div className="main-panel">
          <div className="sidebar">
            <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
            <button onClick={() => setActiveTab('likes')}>Likes</button>
            <button onClick={() => setActiveTab('retweets')}>Retweets</button>
            <button onClick={() => setActiveTab('comments')}>Comments</button>
          </div>

          <div className="content">
            {activeTab === 'dashboard' && (
              <>
                <h3>No. of Tweets in 24 Hours: {result.count}</h3>
                <h4>list of usernames- 5</h4>
                <ul>{result.usernames.slice(0, 5).map((u, i) => <li key={i}>@{u}</li>)}</ul>
                <h4>Sample Tweets</h4>
                <ul>
                  {(result.tweets || []).slice(0, 5).map((tweet, i) => (
                    <li key={i}>{tweet.text} — <strong>@{tweet.username}</strong></li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === 'likes' && (
              <>
                <h4>Top Tweets by Likes</h4>
                <ul>
                  {(result.tweets || [])
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, 3)
                    .map((tweet, i) => (
                      <li key={i}>{tweet.text} — 👍 {tweet.likes}</li>
                    ))}
                </ul>
              </>
            )}

            {activeTab === 'retweets' && (
              <>
                <h4>Top Retweeted Tweets</h4>
                <ul>
                  {(result.tweets || [])
                    .sort((a, b) => b.retweets - a.retweets)
                    .slice(0, 3)
                    .map((tweet, i) => (
                      <li key={i}>{tweet.text} — 🔁 {tweet.retweets}</li>
                    ))}
                </ul>
              </>
            )}

            {activeTab === 'comments' && (
              <>
                <h4>Most & Least Commented Tweets</h4>
                <p>
                  Highest: {
                    [...(result.tweets || [])].sort((a, b) => b.comments - a.comments)[0]?.comments
                  } comments
                </p>
                <p>
                  Lowest: {
                    [...(result.tweets || [])].sort((a, b) => a.comments - b.comments)[0]?.comments
                  } comments
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebScraping;
