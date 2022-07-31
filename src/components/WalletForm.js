import React, { Component } from 'react';
import { func, arrayOf, string, bool, shape, number } from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencies } from '../redux/actions/currencies.action';
import { addExpenseThunk, updateExpense } from '../redux/actions/expenses.action';
import { updateTotalField } from '../redux/actions/totalField.action';

import WalletFormContainer, {
  WalletFormLabel,
  WalletFormInput,
  WalletFormSelect,
  WalletFormButton,
} from './WalletForm.styles';

class WalletForm extends Component {
  constructor(props) {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    const toEdit = props.editor
      ? props.expenses.filter((expense) => expense.id === props.idToEdit)[0] || {}
      : {};

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      ...toEdit,
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
    const { value, description, currency, method, tag } = this.state;
    const { addExpense, updateExpensesList, updateTotal } = this.props;
    const { expenses, editor, idToEdit } = this.props;

    // const inputValue = Number.isNaN(value) || 1;

    if (editor) {
      const updatedExpanses = expenses.map((expense) => (expense.id === idToEdit
        ? ({ ...expense, value, description, currency, method, tag })
        : expense));

      updateExpensesList(updatedExpanses);
      updateTotal();
    } else addExpense({ value, description, currency, method, tag });

    this.setState({ value: '', description: '' });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;

    return (
      <WalletFormContainer data-testid="wallet-form">
        <WalletFormLabel htmlFor="expense">
          Valor
          <WalletFormInput
            data-testid="value-input"
            id="expense"
            name="value"
            onChange={ this.handleChange }
            placeholder="Ex: 1.99"
            value={ value }
          />
        </WalletFormLabel>

        <WalletFormLabel htmlFor="description">
          Descrição
          <WalletFormInput
            data-testid="description-input"
            id="description"
            name="description"
            onChange={ this.handleChange }
            placeholder="Ex: Hambúrguer"
            value={ description }
            width="200px"
          />
        </WalletFormLabel>

        <WalletFormLabel htmlFor="currency">
          Moeda
          <WalletFormSelect
            data-testid="currency-input"
            id="currency"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            { currencies.map((currencyName) => (
              <option key={ Math.random() } value={ currencyName }>
                {currencyName}
              </option>
            )) }
          </WalletFormSelect>
        </WalletFormLabel>

        <WalletFormLabel htmlFor="method">
          Pagamento
          <WalletFormSelect
            data-testid="method-input"
            id="method"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </WalletFormSelect>
        </WalletFormLabel>

        <WalletFormLabel htmlFor="tag">
          Categoria
          <WalletFormSelect
            data-testid="tag-input"
            id="tag"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </WalletFormSelect>
        </WalletFormLabel>

        <WalletFormButton type="button" onClick={ this.handleClick }>
          { editor ? 'Editar despesa' : 'Adicionar despesa' }
        </WalletFormButton>
      </WalletFormContainer>
    );
  }
}

WalletForm.propTypes = {
  addExpense: func.isRequired,
  currencies: arrayOf(string).isRequired,
  editor: bool.isRequired,
  expenses: arrayOf(shape({ currency: string })).isRequired,
  idToEdit: number.isRequired,
  updateCurrencies: func.isRequired,
  updateExpensesList: func.isRequired,
  updateTotal: func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseThunk(expense)),
  updateCurrencies: () => dispatch(getCurrencies()),
  updateExpensesList: (expenses) => dispatch(updateExpense(expenses)),
  updateTotal: () => dispatch(updateTotalField()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
