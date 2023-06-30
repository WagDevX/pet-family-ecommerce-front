import "@/styles/global.css";
import { CartContexrProvider } from "@/components/CartContext";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from '@vercel/analytics/react';
import Footer from "@/components/Footer";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <CartContexrProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </CartContexrProvider>
      </SessionProvider>
      <Analytics />
      <Footer />
    </>
  );
}
