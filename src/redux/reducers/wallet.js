const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  default:
    return state;
  }
}
