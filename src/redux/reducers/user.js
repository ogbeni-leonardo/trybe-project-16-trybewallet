import { SET_EMAIL } from '../actions/user.action';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EMAIL:
    return { email: action.payload };
  default:
    return state;
  }
}
