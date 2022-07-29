import { SET_CURRENCIES } from '../actions/currencies.action';
import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
} from '../actions/expenses.action';
import { UPDATE_TOTAL_FIELD } from '../actions/totalField.action';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalField: '0',
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.length, ...action.payload },
      ],
    };
  case EDIT_EXPENSE:
    return { ...state, editor: true, idToEdit: action.payload };
  case UPDATE_EXPENSE:
    return { ...state, editor: false, expenses: action.payload };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload.id),
      totalField: (Number(state.totalField) - action.payload.total).toFixed(2),
    };
  case UPDATE_TOTAL_FIELD:
    return {
      ...state,
      totalField: (state.expenses.reduce((acc, cur) => {
        const [, currencyData] = Object.entries(cur.exchangeRates)
          .find(([currencyName]) => currencyName === cur.currency);

        const expenseTotal = Number(cur.value) * Number(currencyData.ask);
        console.log(expenseTotal);

        return acc + expenseTotal;
      }, 0)).toFixed(2),
    };
  default:
    return state;
  }
}
