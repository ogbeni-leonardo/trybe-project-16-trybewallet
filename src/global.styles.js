import { createGlobalStyle } from 'styled-components';
import Inter from './assets/fonts/Inter.ttf';

const GlobalStyles = createGlobalStyle`
  * {
    border: 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.fontColor};
    font-family: Inter;
    font-size: 14px;
    margin: 0;
    outline: none;
    padding: 0;
  }

  @font-face {
    font-family: Inter;
    src: local('Inter'), url('${Inter}') format('truetype');
  }

  body {
    background-color: ${({ theme }) => theme.bodyBackground};
    overflow: hidden;
  }

  button {
    cursor: pointer;
    opacity: 0.8;
  }

  button:hover {
    opacity: 1;
  }

  button:disabled {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.fontColor};
    cursor: not-allowed;
  }
`;

export default GlobalStyles;
