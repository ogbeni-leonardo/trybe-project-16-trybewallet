export const SET_EMAIL = 'SET_EMAIL';
export const setEmail = (payload) => ({ type: SET_EMAIL, payload });

export const SET_CURRENCIES = 'SET_CURRENCIES';
export const setCurrencies = (payload) => ({ type: SET_CURRENCIES, payload });

export const getCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();

  const currencies = [];

  Object.keys(data).forEach((currencyName) => {
    console.log(currencyName);
    if (currencyName !== 'USDT') currencies.push(currencyName);
  });

  dispatch(setCurrencies(currencies));
};
