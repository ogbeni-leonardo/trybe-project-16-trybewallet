import React, { Component } from 'react';
import { func, arrayOf, string } from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { updateCurrencies } = this.props;
    updateCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <input placeholder="despesa" data-testid="value-input" />
        <input placeholder="descrição" data-testid="description-input" />
        <select aria-label="label" data-testid="currency-input">
          { currencies.map((currency) => (
            <option
              value={ currency }
              key={ Math.random() }
            >
              {currency}
            </option>
          )) }
        </select>

        <select aria-label="metodo" data-testid="method-input">
          <option value="">Dinheiro</option>
          <option value="">Cartão de crédito</option>
          <option value="">Cartão de débito</option>
        </select>

        <select aria-label="categoria" data-testid="tag-input">
          <option value="">Alimentação</option>
          <option value="">Lazer</option>
          <option value="">Trabalho</option>
          <option value="">Transporte</option>
          <option value="">Saúde</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  updateCurrencies: func.isRequired,
  currencies: arrayOf(string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: () => dispatch(getCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
