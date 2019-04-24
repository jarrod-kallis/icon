import { SET_ENVIRONMENTS } from "../constants";

const initialState = {
  environments: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENVIRONMENTS:
      return {
        ...state,
        environments: action.environments
      };
    default:
      return state;
  }
}
