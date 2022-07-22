import React from 'react';
import Document, { Html, NextScript, Main, Head } from 'next/document';
import createEmotionServer from '@emotion/server/types/create-instance';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {/* <link rel="stylesheet" href="linktogooglefont.com" /> */}
        </Head>

        <Main>
          <NextScript />
        </Main>
      </html>
    );
  }
}
