// pages/_app.tsx
import { GoogleAnalytics } from '@next/third-parties/google';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-4M4EDCKC5F" />
    </>
  );
}
