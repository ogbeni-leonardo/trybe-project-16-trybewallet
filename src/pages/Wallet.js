import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import WalletPage, {
  WalletPageFormContainer,
  WalletPageTableContainer,
} from '../assets/css/Wallet.styles';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;

    return (
      <WalletPage>
        <Header />

        <WalletPageFormContainer>
          { !editor && <WalletForm /> }
          { editor && <WalletForm /> }
        </WalletPageFormContainer>

        <WalletPageTableContainer>
          <Table />
        </WalletPageTableContainer>
      </WalletPage>
    );
  }
}

Wallet.propTypes = {
  editor: bool.isRequired,
};

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Wallet);
