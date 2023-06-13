import { createGlobalStyle } from "styled-components";
import "@/styles/global.css";
import { CartContexrProvider } from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background-color: #fff;
  }

`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContexrProvider>
        <Component {...pageProps} />
      </CartContexrProvider>
    </>
  );
}
