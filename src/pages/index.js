import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./Index.module.scss";
import PeopleTable from "../components/people-table.styles";
import ServerStatus from "../components/server-status";

export const IndexPage = ({ WS_URL }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("/api/people")
      .then((res) => res.json())
      .then(({ body }) => {
        setPeople(body.people);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Padaster Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Rehash Code Challenge</h1>
          <h2>mikias abera</h2>
        </div>

        <div className={styles.section}>
          <h3>Server Status</h3>
          <ServerStatus url={WS_URL} />
        </div>

        <div className={styles.section}>
          <h3>Database Entries</h3>
          <PeopleTable people={people} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      WS_URL: process.env.WS_URL,
    },
  };
}

export default IndexPage;
