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
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.editorMode = this.editorMode.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      editorMode: false,
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
    const {
      addExpense,
      updateExpensesList,
      updateTotal,
      expenses,
      editor,
      idToEdit,
    } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    if (editor) {
      const updatedExpanses = expenses.map((expense) => {
        if (expense.id === idToEdit) {
          return { ...expense, value, description, currency, method, tag };
        }
        return expense;
      });
      updateExpensesList(updatedExpanses);
      updateTotal();
    } else {
      addExpense({ value, description, currency, method, tag });
    }

    this.setState({ value: '', description: '', editorMode: false });
  }

  editorMode() {
    const { editor, idToEdit, expenses } = this.props;

    if (editor) {
      const {
        value,
        description,
        currency,
        method,
        tag,
      } = expenses.find(({ id }) => id === idToEdit);

      this.setState({ editorMode: true, value, description, currency, method, tag });
    }
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      editorMode,
    } = this.state;

    const { currencies, editor } = this.props;

    if (editor && !editorMode) this.editorMode();

    return (
      <WalletFormContainer data-testid="wallet-form">
        <WalletFormLabel htmlFor="expense">
          Valor
          <WalletFormInput
            placeholder="Ex: 1.99"
            data-testid="value-input"
            id="expense"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </WalletFormLabel>

        <WalletFormLabel htmlFor="description">
          Descrição
          <WalletFormInput
            placeholder="Ex: Hambúrguer"
            data-testid="description-input"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            width="200px"
          />
        </WalletFormLabel>
        <WalletFormLabel htmlFor="currency">
          Moeda
          <WalletFormSelect
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
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
            value={ method }
            onChange={ this.handleChange }
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
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </WalletFormSelect>
        </WalletFormLabel>

        <WalletFormButton type="button" onClick={ this.handleClick }>
          { editorMode ? 'Editar despesa' : 'Adicionar despesa' }
        </WalletFormButton>
      </WalletFormContainer>
    );
  }
}

WalletForm.propTypes = {
  updateCurrencies: func.isRequired,
  addExpense: func.isRequired,
  updateExpensesList: func.isRequired,
  updateTotal: func.isRequired,
  currencies: arrayOf(string).isRequired,
  expenses: arrayOf(shape({ currency: string })).isRequired,
  editor: bool.isRequired,
  idToEdit: number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: () => dispatch(getCurrencies()),
  addExpense: (expense) => dispatch(addExpenseThunk(expense)),
  updateTotal: () => dispatch(updateTotalField()),
  updateExpensesList: (expenses) => dispatch(updateExpense(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
