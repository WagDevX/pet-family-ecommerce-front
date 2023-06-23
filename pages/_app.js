import { createGlobalStyle } from "styled-components";
import "@/styles/global.css";
import { CartContexrProvider } from "@/components/CartContext";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
      <CartContexrProvider>
        <Component {...pageProps} />
      </CartContexrProvider>
    </>
  );
}
