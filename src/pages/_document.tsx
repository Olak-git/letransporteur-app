import { Html, Head, Main, NextScript } from 'next/document'

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="author" content="LeTransporteur" />
        <meta name="description" content="" />
        <meta name="keywords" content="livraison,delivery" />

        <link rel="apple-touch-icon" sizes="180x180" href="/logo/Logo_transporteur2.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/Logo_transporteur2.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/Logo_transporteur2.png" />
      </Head>
      <body className=''>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}