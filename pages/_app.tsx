import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, RippleProvider } from 'zorotek-ui';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/Layout';
const lightThemes = createTheme({
  type: 'light',
  theme: {},
});

const darkThemes = createTheme({
  type: 'dark',
  theme: {},
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: lightThemes,
        dark: darkThemes,
      }}
    >
      <RippleProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RippleProvider>
    </ThemeProvider>
  );
}

export default MyApp;
