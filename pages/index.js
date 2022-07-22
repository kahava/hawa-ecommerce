import { Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        div
        <title>HAWA MABATIKI</title>
        <meta name="description" content="wauzaji wa batiki na nguo makini" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography component="h1" variant="h1">
        HAWA mabatiki store
      </Typography>
    </div>
  );
}
