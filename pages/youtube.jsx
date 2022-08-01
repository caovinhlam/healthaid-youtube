import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

function youtube() {
  const [videos, setVideos] = useState([]);

  const options = {
    method: "GET",
    url: `https://${process.env.NEXT_PUBLIC_RAPID_URL}/search`,
    params: {
      q: "music",
      part: "snippet,id",
      regionCode: "US",
      maxResults: "50",
      order: "date",
    },
    headers: {
      // "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_URL,
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setVideos(response.data.items);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">HealthTube!</a>
        </h1>

        <form
          action="/api/youtube"
          method="post"
          className={styles.description}
        >
          <label htmlFor="search" placeholder="Search">
            Search
          </label>
          <input type="text" id="first" name="first" required />

          <button type="submit">Search</button>
        </form>

        <p className={styles.description}>
          Recommended Videos <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {videos.slice(0, 5).map((video, index) => (
            <a
              key={index}
              href={`https://youtube.com/watch?v=${video.id.videoId}`}
              className={styles.card}
            >
              <h3>{video.snippet.title}</h3>
              <img
                src={video.snippet.thumbnails.high.url}
                alt="Girl in a jacket"
              />
              {video.snippet.description ? (
                <p>{video.snippet.description}</p>
              ) : (
                  <p>No Description</p>
              )}
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export default youtube;
