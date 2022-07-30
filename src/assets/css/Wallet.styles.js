import styled from 'styled-components';

const WalletPage = styled.main`
  display: flex;
  flex-direction: column;
  min-height: max(100vh, 500px);
  width: 100vw;
  row-gap: 40px;
`;

export const WalletPageFormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const WalletPageTableContainer = styled.div`
  align-items: flex-start;
  align-self: center;
  box-shadow: 0 0 15px rgba(0 0 0 / 10%);
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  max-width: 100vw;
  overflow: auto;
  width: max(100vw, 300px);
`;

export default WalletPage;
