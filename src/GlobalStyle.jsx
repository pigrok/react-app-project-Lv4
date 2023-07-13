import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    unicode-range : U+0041-005A,U+0061-007A;
}

@font-face {
    font-family: 'OTWelcomeRA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/OTWelcomeRA.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    unicode-range : U+AC00-D7A3;
}
body {
    font-family: 'SpoqaHanSansNeo-Regular';
    font-family: 'OTWelcomeRA';
    max-width: 1500px;
    margin: 0 auto;

    background-color: black;
    color: white
}
`;
export default GlobalStyle;
