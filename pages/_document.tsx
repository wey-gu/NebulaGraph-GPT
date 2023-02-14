import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Compose NebulaGraph Query in seconds."
          />
          <meta property="og:site_name" content="nGQL-GPT.siwei.io" />
          <meta
            property="og:description"
            content="Compose NebulaGraph Query in seconds."
          />
          <meta property="og:title" content="nGQL GPT Composer" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="nGQL GPT Composer" />
          <meta
            name="twitter:description"
            content="Compose NebulaGraph Query in seconds."
          />
          <meta
            property="og:image"
            content="https://nGQL-GPT.siwei.io/ngql_gpt_og_image-min.png"
          />
          <meta
            name="twitter:image"
            content="https://nGQL-GPT.siwei.io/ngql_gpt_og_image-min.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
