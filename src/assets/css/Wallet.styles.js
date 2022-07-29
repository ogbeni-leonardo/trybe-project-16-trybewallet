import styled from 'styled-components';

const WalletPage = styled.main`
  display: flex;
  flex-direction: column;
  min-height: max(100vh, 500px);
  width: 100vw;
  row-gap: 40px;
  overflow-x: auto;
`;

export const WalletPageFormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const WalletPageTableContainer = styled.div`
  display: flex;
  overflow: auto;
  background-color: ${({ theme }) => theme.background};
  width: auto;
  align-self: center;
  flex-grow: 1;
  align-items: flex-start;
  max-width: 100vw;
  width: max(100vw, 300px);
  justify-content: flex-start;
  box-shadow: 0 0 15px rgba(0 0 0 / 10%);
`;

export default WalletPage;
