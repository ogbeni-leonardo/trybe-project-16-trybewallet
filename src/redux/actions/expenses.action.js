import fetchCurrenciesAPI from '../../services/fetchCurrenciesAPI';
import { updateTotalField } from './totalField.action';

export const ADD_EXPENSE = 'ADD_EXPENSE';
const addExpense = (payload) => ({ type: ADD_EXPENSE, payload });

export const addExpenseThunk = (expense) => async (dispatch) => {
  const currencies = await fetchCurrenciesAPI();
  dispatch(addExpense({ ...expense, exchangeRates: currencies }));
  dispatch(updateTotalField());
};

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpense = (payload) => ({ type: EDIT_EXPENSE, payload });

export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const updateExpense = (payload) => ({ type: UPDATE_EXPENSE, payload });

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });
