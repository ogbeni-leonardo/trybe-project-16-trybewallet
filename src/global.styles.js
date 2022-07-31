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

  ::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.defaultBackground};
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.theme};
  }

  @font-face {
    font-family: Inter;
    src: local('Inter'), url('${Inter}') format('truetype');
  }

  body {
    background-color: ${({ theme }) => theme.bodyBackground};
    overflow-x: hidden;
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
