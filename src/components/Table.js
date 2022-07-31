import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, number, func } from 'prop-types';

import { deleteExpense, editExpense } from '../redux/actions/expenses.action';
import { updateTotalField } from '../redux/actions/totalField.action';

import StyledTable, {
  StyledButtonsContainer,
  StyledTableButton,
} from './Table.styles';

class Table extends Component {
  constructor() {
    super();
    this.processExpense = this.processExpense.bind(this);
  }

  processExpense(expense) {
    const { value, currency, exchangeRates } = expense;
    const currencyData = exchangeRates[currency];
    const { name, ask } = currencyData;

    return { ...expense, name, ask, total: (+value * +ask).toFixed(2) };
  }

  render() {
    const { expenses, removeExpense, updateTotal, editorMode } = this.props;
    const processedExpenses = expenses.map((expense) => this.processExpense(expense));

    return (
      <StyledTable data-testid="table">
        <thead>
          <tr>
            <th id="th1">Descrição</th>
            <th id="th2">Tag</th>
            <th id="th3">Método de pagamento</th>
            <th id="th4">Valor</th>
            <th id="th5">Moeda</th>
            <th id="th6">Câmbio utilizado</th>
            <th id="th7">Valor convertido</th>
            <th id="th8">Moeda de conversão</th>
            <th id="th9">Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          { processedExpenses.map((expense) => (
            <tr key={ Math.random() }>
              <td headers="th1">{ expense.description }</td>
              <td headers="th2">{ expense.tag }</td>
              <td headers="th3">{ expense.method }</td>
              <td headers="th4">{ Number(expense.value).toFixed(2) }</td>
              <td headers="th5">{ expense.name }</td>
              <td headers="th6">{ Number(expense.ask).toFixed(2) }</td>
              <td headers="th7">{ expense.total }</td>
              <td headers="th8">Real</td>
              <td headers="th9">
                <StyledButtonsContainer>
                  <StyledTableButton
                    backgroundColor="#27ae60"
                    data-testid="edit-btn"
                    onClick={ () => editorMode(expense.id) }
                    type="button"
                  >
                    Editar
                  </StyledTableButton>

                  <StyledTableButton
                    backgroundColor="#e74c3c"
                    data-testid="delete-btn"
                    onClick={ () => { removeExpense(expense); updateTotal(); } }
                    type="button"
                  >
                    Excluir
                  </StyledTableButton>
                </StyledButtonsContainer>
              </td>
            </tr>
          )) }
        </tbody>
      </StyledTable>
    );
  }
}

Table.propTypes = {
  expenses: arrayOf(shape({ id: number })).isRequired,
  removeExpense: func.isRequired,
  updateTotal: func.isRequired,
  editorMode: func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(deleteExpense(expense)),
  updateTotal: () => dispatch(updateTotalField()),
  editorMode: (id) => dispatch(editExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
