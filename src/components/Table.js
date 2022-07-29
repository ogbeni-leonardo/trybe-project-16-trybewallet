import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, number } from 'prop-types';

class Table extends Component {
  constructor() {
    super();

    this.processExpense = this.processExpense.bind(this);
  }

  processExpense(expense) {
    const { value, currency: expenseCurrency, exchangeRates } = expense;

    const [, expenseCurrencyData] = Object.entries(exchangeRates)
      .find(([currencyName]) => currencyName === expenseCurrency);

    const { name, ask } = expenseCurrencyData;

    return { ...expense, name, ask, total: (Number(value) * Number(ask)).toFixed(2) };
  }

  render() {
    const { expenses } = this.props;
    const processExpenses = expenses.map((expense) => this.processExpense(expense));

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          { processExpenses.map((expense) => (
            <tr key={ Math.random() }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>{ expense.name }</td>
              <td>{ Number(expense.ask).toFixed(2) }</td>
              <td>{ expense.total }</td>
              <td>Real</td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: arrayOf(shape({ id: number })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
