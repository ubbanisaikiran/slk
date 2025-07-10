import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyBH5xD1XjYkYliwUp6Rs_gj1gNkARnBxRk";
  const CX = "a165fcf02796048ac";

  const handleSearch = async () => {
    setError(null);
    if (!keyword.trim()) return;

    try {
      const response = await axios.get(
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

      setImages(response.data.items || []);
    } catch (err) {
      setError("Failed to fetch images. Check API key, CX, and billing.");
      setImages([]);
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 800, margin: "auto" }}>
      <h2>Image Search</h2>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter search keyword"
          style={{ flexGrow: 1, padding: 10, fontSize: 16 }}
        />
        <button onClick={handleSearch} style={{ marginLeft: 10, padding: "10px 20px" }}>
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 10,
        }}
      >
        {images.map((img) => (
          <a key={img.cacheId || img.link} href={img.link} target="_blank" rel="noopener noreferrer">
            <img
              src={img.link}
              alt={img.title}
              style={{ width: "100%", height: "auto", borderRadius: 8 }}
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Search;
