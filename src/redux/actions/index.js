import fetchCurrenciesAPI from '../../services/fetchCurrenciesAPI';

export const SET_EMAIL = 'SET_EMAIL';
export const setEmail = (payload) => ({ type: SET_EMAIL, payload });

export const SET_CURRENCIES = 'SET_CURRENCIES';
export const setCurrencies = (payload) => ({ type: SET_CURRENCIES, payload });

export const getCurrencies = () => async (dispatch) => {
  const data = await fetchCurrenciesAPI();

  const currencies = Object.keys(data)
    .filter((currencyName) => currencyName !== 'USDT');

  dispatch(setCurrencies(currencies));
};

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
const updateExpenses = (payload) => ({ type: UPDATE_EXPENSES, payload });

export const UPDATE_TOTAL_FIELD = 'UPDATE_TOTAL_FIELD';
export const updateTotalField = (payload) => ({
  type: UPDATE_TOTAL_FIELD,
  payload,
});

export const setExpense = (expense) => async (dispatch) => {
  const currencies = await fetchCurrenciesAPI();
  dispatch(updateExpenses({ ...expense, exchangeRates: currencies }));

  const expenseValue = Number(expense.value);
  const currency = expense.currency !== '' ? expense.currency : 'USD';
  const { ask } = Object.values(currencies)
    .find(({ code }) => code === currency);

  dispatch(updateTotalField(expenseValue * Number(ask)));
};
