import Head from "next/Head";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";
import Meta from "./components/Meta";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
