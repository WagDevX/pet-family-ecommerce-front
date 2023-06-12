import {createGlobalStyle} from "styled-components";

import '@/styles/global.css'

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
    <Component {...pageProps} />
  
    </>
  )
}
