import React, { useState } from "react";
import Error from "./Error";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import Contributors from "./Contributors";
import { SiBuymeacoffee } from "react-icons/si";
import { GrPowerReset } from "react-icons/gr";

function App() {
  const [url, setUrl] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [format, setFormat] = useState("mp3");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDownloading(true);
    setError("");

    try {
      const response = await fetch(
        `https://ytdwonload-server-nodejs.vercel.app/download/${format}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = downloadUrl;
        a.download = format === "mp3" ? "audio.mp3" : "video.mp4";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        setError(
          `Failed to download, please check the URL or the file might be more than 4.5MB [We are looking to grow our resources to fix this issue in the near future.]`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to download due to a network or server issue.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-slate-0 p-2 md:p-40">
        <div className="font-bold text-sm sm:text-2xl text-center text-green-500">
          No Ads, No Redirects, Quick Downloads.
        </div>
        <br />
        <div className="w-3/4 flex flex-col gap-8">
          <h1 className="md:text-6xl text-4xl font-extrabold text-center">
            YouTube <span className="text-red-600">Shorts & Music</span>{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Downloader
            </span>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 justify-center items-center p-2 md:p-8"
          >
            <input
              className="w-full sm:w-3/4 rounded-full border-2 border-red-500 px-4 py-2 text-sm outline-none transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-red-400 md:px-6 md:py-3"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter YouTube Video URL"
              required
            />
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="md:w-1/4 w-3/4 rounded-full border-2 
              border-red-500 px-4 py-2 text-sm outline-none transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-red-400 md:px-6 md:py-3"
            >
              <option value="mp3">MP3</option>
              <option value="mp4">MP4</option>
            </select>
            {error && <Error>{error}</Error>}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={downloading}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full border border-stone-200 px-4 py-2 text-sm outline-none transition-all duration-300 focus:ring focus:ring-red-400 md:px-6 md:py-3 bg-pink-600 hover:bg-red-700 font-semibold text-white"
              >
                {downloading ? "Downloading..." : "Download"}
              </button>
              <span
                className="bg-stone-300 w-12 h-12 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 hover:bg-stone-200 cursor-pointer"
                onClick={() => window.location.reload()}
              >
                <GrPowerReset size={"24"} color="#656464" />
              </span>
            </div>
          </form>
        </div>
        {/* contributors */}
        <a
          href="https://buymeacoffee.com/gobashmeofficial"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiBuymeacoffee size={"32"} />
        </a>
        <br />
        <h1 className="font-semibold text-stone-600">
          Be the first person to support us!
        </h1>
        <br />
        <div className="flex gap-5 items-center justify-center">
          <Contributors />
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-4 justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
        <h1 className="font-bold text-stone-200">Made by Yogesh Vishwakarma</h1>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/yogesh-vishwakarma-bb132721a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={"28"} color="white" />
          </a>
          <a
            href="https://x.com/TupleMutable"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter size={"28"} color="white" />
          </a>
        </div>
        <span className="font-semibold text-stone-200">
          Make sure to bookmark this page!
        </span>
      </div>
    </>
  );
}

export default App;
