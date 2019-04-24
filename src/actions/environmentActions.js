import { SET_ENVIRONMENTS } from "../constants";
import api from "../api";

const setEnvironments = (environments) => ({
  type: SET_ENVIRONMENTS,
  environments
});

export function get() {
  return async (dispatch) => {
    const environments = await api.environments.get();
    dispatch(setEnvironments(environments));
  };
}
