import React, { Component } from 'react';
import { func, arrayOf, string } from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencies } from '../redux/actions/currencies.action';
import { setExpense } from '../redux/actions/expenses.action';

class WalletForm extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { updateCurrencies } = this.props;
    updateCurrencies();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { updateExpenses } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    updateExpenses({
      value,
      description,
      currency,
      method,
      tag,
    });

    this.setState({ value: '', description: '' });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies } = this.props;

    return (
      <div>
        <input
          placeholder="despesa"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          placeholder="descrição"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          aria-label="label"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          { currencies.map((currencyName) => (
            <option
              key={ Math.random() }
            >
              {currencyName}
            </option>
          )) }
        </select>

        <select
          aria-label="metodo"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          aria-label="categoria"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  updateCurrencies: func.isRequired,
  updateExpenses: func.isRequired,
  currencies: arrayOf(string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: () => dispatch(getCurrencies()),
  updateExpenses: (expense) => dispatch(setExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
