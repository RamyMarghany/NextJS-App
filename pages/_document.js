import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <div className='overlay' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}