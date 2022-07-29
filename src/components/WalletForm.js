import React, { Component } from 'react';
import { func, arrayOf, string, bool, shape, number } from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencies } from '../redux/actions/currencies.action';
import { addExpenseThunk, updateExpense } from '../redux/actions/expenses.action';
import { updateTotalField } from '../redux/actions/totalField.action';

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

    console.log('oioi');
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

        <button type="button" onClick={ this.handleClick }>
          { editorMode ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </div>
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
