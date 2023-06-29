import { createGlobalStyle } from "styled-components";
import "@/styles/global.css";
import { CartContexrProvider } from "@/components/CartContext";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/react';

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background-color: #fff;
  }
  hr {
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
  }
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContexrProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </CartContexrProvider>
        <Footer />
      </SessionProvider>
      <Analytics />
    </>
  );
}
