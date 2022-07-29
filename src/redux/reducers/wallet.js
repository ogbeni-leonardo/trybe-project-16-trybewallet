import { SET_CURRENCIES } from '../actions/currencies.action';
import { UPDATE_EXPENSES, DELETE_EXPENSE } from '../actions/expenses.action';
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
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.length, ...action.payload },
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload.id),
      totalField: (Number(state.totalField) - action.payload.total).toFixed(2),
    };
  case UPDATE_TOTAL_FIELD:
    return {
      ...state,
      totalField: (Number(state.totalField) + action.payload).toFixed(2),
    };
  default:
    return state;
  }
}
