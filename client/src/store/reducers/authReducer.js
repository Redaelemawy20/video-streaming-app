import { SET_USER } from "../actions/actionTypes";

const INTIAL_STATE = {
  user: false,
};

export default function (state = INTIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
