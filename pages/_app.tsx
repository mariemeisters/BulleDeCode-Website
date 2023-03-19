import '../styles/default.css';
import type { AppProps } from 'next/app';
import Layout from '../components/ui/Layout/Layout';

import { AuthProvider } from '../lib/AuthContext';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </AuthProvider>

    </>
  );
}
