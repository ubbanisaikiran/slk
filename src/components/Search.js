import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState([]);
  const [webResults, setWebResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyBH5xD1XjYkYliwUp6Rs_gj1gNkARnBxRk";
  const CX = "a165fcf02796048ac";

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setError(null);
    setImages([]);
    setWebResults([]);

    try {
      // Fetch image results
      const imageResponse = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            key: API_KEY,
            cx: CX,
            q: keyword,
            searchType: "image",
            num: 10,
          },
        }
      );

      // Fetch web results (normal search)
      const webResponse = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            key: API_KEY,
            cx: CX,
            q: keyword,
            num: 5,
          },
        }
      );

      setImages(imageResponse.data.items || []);
      setWebResults(webResponse.data.items || []);
    } catch (err) {
      setError(
        "Failed to fetch results. Please check your API key, CX, and billing status."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 900, margin: "auto" }}>
      <h2>Google Search (Images + Top 5 Web Results)</h2>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter search keyword"
          style={{ flexGrow: 1, padding: 10, fontSize: 16 }}
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          style={{ marginLeft: 10, padding: "10px 20px", cursor: loading ? "not-allowed" : "pointer" }}
          disabled={loading}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading results...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Images grid */}
      {images.length > 0 && (
        <>
          <h3>Image Results</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 10,
              marginBottom: 40,
            }}
          >
            {images.map((img) => (
              <a
                key={img.cacheId || img.link}
                href={img.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={img.link}
                  alt={img.title}
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </>
      )}

      {/* Top 5 web results */}
      {webResults.length > 0 && (
        <>
          <h3>Top 5 Web Results</h3>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {webResults.map((item, idx) => (
              <li key={idx} style={{ marginBottom: 15 }}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 18, fontWeight: "bold", color: "#1a0dab", textDecoration: "none" }}
                >
                  {item.title}
                </a>
                <p style={{ margin: "5px 0", color: "#545454" }}>{item.snippet}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Search;
