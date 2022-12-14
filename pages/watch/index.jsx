import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
// Only loads the YouTube player
import ReactPlayer from "react-player/youtube";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios"


function watch() {
  const api = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000/api/youtube";

  const router = useRouter()
  const { id, title } = router.query
  const [hasWindow, setHasWindow] = useState(false);
  const [comments, setComments] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
    if (router.asPath !== router.route)
      axios
        .get(`${api}/comments?query=${id}`)
        // Uncomment for dummy data
        // .get(`${api}/dummy_comments`)
        .then(function (response) {
          console.log(response);
          if (response.data != "") {
            setComments(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
  }, [router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Watch <Link href="/">HealthTube!</Link>
        </h1>
        <p className={styles.description}>{title}</p>
        {hasWindow && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            width={"80vw"}
            height={"80vh"}
          />
        )}
          <p className={styles.description}>Comments</p>
        <div style={{ display: "grid" }}>
          {comments && (
          comments.slice(0, 10).map((comment, index) => (
            <a className={`${styles.card} ${styles.comments}`}>
              <h3>
                {comment.snippet.topLevelComment.snippet.authorDisplayName}
              </h3>
              <p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
            </a>
          )))}
        </div>
      </main>
    </div>
  );
}

export default watch;
