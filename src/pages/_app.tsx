// pages/_app.tsx
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

const isDev = process.env.NODE_ENV === 'development';

interface CustomPageProps {
  title?: string;
}

export default function App({
  Component,
  pageProps,
}: AppProps<CustomPageProps>) {
  const defaultTitle = `${isDev ? '[DEV] ' : ''}Poetic Source`;
  const pageTitle = pageProps.title
    ? `${pageProps.title} | ${defaultTitle}`
    : defaultTitle;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Where algorithms meet artistic expression"
        />
      </Head>
      <Component {...pageProps} />
      <SpeedInsights />
      <GoogleAnalytics gaId="G-4M4EDCKC5F" />
    </>
  );
}
