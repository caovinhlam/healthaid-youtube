import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fetch from "node-fetch";

const api = "http://localhost:3000/api/youtube";

export async function getServerSideProps(context) {
  const res = await fetch(`${api}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

function youtube({ data }) {
  let [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(data.items);
  }, []);

  async function handleSearch(event) {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      query: event.target.query.value,
    };
    console.log(data);
  }

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

        <form onSubmit={handleSearch} className={styles.description}>
          <label htmlFor="query" placeholder="Search">
            Search
          </label>
          <input type="text" id="query" name="query" required />

          <button type="submit">Search</button>
        </form>

        <p className={styles.description}>
          Recommended Videos <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {videos.slice(0, 10).map((video, index) =>
            // Api can return unavailable videos therefore we need to catch this
            video.snippet ? (
              <a
                key={index}
                href={`https://youtube.com/watch?v=${video.id.videoId}`}
                className={styles.card}
              >
                <h3>{video.snippet.title}</h3>
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                />
                {video.snippet.description ? (
                  <p>{video.snippet.description}</p>
                ) : (
                  <p>No Description</p>
                )}
              </a>
            ) : (
              <></>
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default youtube;
