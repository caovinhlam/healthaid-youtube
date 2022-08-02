import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import fetch from "node-fetch";
import axios from "axios";
import Link from "next/link";

const api = "http://localhost:3000/api/youtube";

export async function getServerSideProps(context) {
  // Uncomment to use the API
  // const res = await fetch(`${api}`);

  // Using dummy data for development to reduce api usage
  const res = await fetch(`${api}/dummy`)
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

function youtube({ data }) {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState(false);
  
  useEffect(() => {
    console.log(data)
    setVideos(data.items);
  }, []);

  async function handleSearch(event) {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const formData = {
      query: event.target.query.value,
    };
    console.log(formData.query);

    // Get searched videos based on search query
    axios
      .get(`${api}/search?query=${formData.query}`)
      .then(function (response) {
        setSearch(true);
        setVideos(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
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
          Welcome to <a href=".">HealthTube!</a>
        </h1>

        <form onSubmit={handleSearch} className={styles.description}>
          <label htmlFor="query"></label>
          <input
            type="text"
            id="query"
            name="query"
            required
            placeholder="Search"
          />

          <button type="submit">Search</button>
        </form>

        {search === false ? (
          <p className={styles.description}>
            Recommended Videos{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>
        ) : (
          <p className={styles.description}>
            Search Results <code className={styles.code}>pages/index.js</code>
          </p>
        )}

        <div className={styles.grid}>
          {videos.slice(0, 10).map((video, index) =>
            // Api can return unavailable videos therefore we need to catch this
            video.snippet ? (
              <Link
                key={index}
                href={{
                  pathname: `/watch`,
                  query: { id: video.id.videoId, title: video.snippet.title },
                  // state: { id: video.id.videoId, title: video.snippet.title },
                }}
              >
                <a className={styles.card}>
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
              </Link>
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
