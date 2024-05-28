import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [downloading, setDownloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDownloading(true);
    try {
      const response = await fetch("http://localhost:3001/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = downloadUrl;
        a.download = "video.mp4";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        alert("Failed to download video");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to download video");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="App">
      <h1>YouTube Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube Video URL"
          required
        />
        <button type="submit" disabled={downloading}>
          {downloading ? "Downloading..." : "Download"}
        </button>
      </form>
    </div>
  );
}

export default App;
