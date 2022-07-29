import { SET_CURRENCIES, UPDATE_EXPENSES, UPDATE_TOTAL_FIELD } from '../actions';

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
  case UPDATE_TOTAL_FIELD:
    return {
      ...state,
      totalField: (Number(state.totalField) + action.payload).toFixed(2),
    };
  default:
    return state;
  }
}
