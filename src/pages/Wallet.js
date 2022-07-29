import React from 'react';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import WalletPage, {
  WalletPageFormContainer,
  WalletPageTableContainer,
} from '../assets/css/Wallet.styles';

class Wallet extends React.Component {
  render() {
    return (
      <WalletPage>
        <Header />
        <WalletPageFormContainer>
          <WalletForm />
        </WalletPageFormContainer>

        <WalletPageTableContainer>
          <Table />
        </WalletPageTableContainer>
      </WalletPage>
    );
  }
}

export default Wallet;
