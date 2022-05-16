import '../styles/global.css';
import type { AppProps } from 'next/app';
// import Layout from '../components/layout';
import { AuthProvider } from '../src/auth/authProvider.js';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Layout>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

