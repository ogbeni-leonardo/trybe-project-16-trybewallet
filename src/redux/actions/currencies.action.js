import fetchCurrenciesAPI from '../../services/fetchCurrenciesAPI';

export const SET_CURRENCIES = 'SET_CURRENCIES';
export const setCurrencies = (payload) => ({ type: SET_CURRENCIES, payload });

export const getCurrencies = () => async (dispatch) => {
  const data = await fetchCurrenciesAPI();

  const currencies = Object.keys(data)
    .filter((currencyName) => currencyName !== 'USDT');

  dispatch(setCurrencies(currencies));
};
