import fetchCurrenciesAPI from '../../services/fetchCurrenciesAPI';
import { updateTotalField } from './totalField.action';

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
const updateExpenses = (payload) => ({ type: UPDATE_EXPENSES, payload });

export const setExpense = (expense) => async (dispatch) => {
  const currencies = await fetchCurrenciesAPI();
  dispatch(updateExpenses({ ...expense, exchangeRates: currencies }));

  const { value, currency } = expense;

  const { ask } = Object.values(currencies)
    .find(({ code }) => code === currency);

  dispatch(updateTotalField(Number(value) * Number(ask)));
};

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });
