import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

import HeaderContainer, {
  AppName,
  UserInfos,
  UserEmail,
  TotalField,
} from './Header.styles';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <HeaderContainer data-testid="header">
        <AppName>
          Trybe
          <span>Wallet</span>
        </AppName>

        <UserInfos>
          <UserEmail>
            <span data-testid="email-field">{email}</span>
          </UserEmail>

          <TotalField>
            <p data-testid="total-field">{(total).toFixed(2)}</p>
            <p data-testid="header-currency-field">BRL</p>
          </TotalField>
        </UserInfos>
      </HeaderContainer>
    );
  }
}

Header.propTypes = {
  email: string.isRequired,
  total: number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.totalField,
});

export default connect(mapStateToProps)(Header);
