import * as todosAPI from "../api/todos";

export const createStateUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  request: () => ({
    loading: true,
    error: null,
  }),
  success: (data) => ({
    loading: false,
    data: data,
    error: false,
  }),
  error: (error) => ({
    loading: false,
    data: error,
    error: true,
  }),
};
export const createReducer = (type) => {
  const [REQUEST, SUCCESS, ERROR] = [type, `${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case REQUEST:
        return {
          ...state,
          ...createStateUtils.request(),
        };
      case SUCCESS:
        return {
          ...state,
          ...createStateUtils.success(action.data),
        };
      case ERROR:
        return {
          ...state,
          ...createStateUtils.error(action.data),
        };
      default:
        return state;
    }
  };
};

export const createPromiseThunk = (type, promiseCreator = null) => {
  const [REQUEST, SUCCESS, ERROR] = [type, `${type}_SUCCESS`, `${type}_ERROR`];

  return (param) => async (dispatch) => {
    dispatch({ type: REQUEST, data: param });
    try {
      if (promiseCreator) await promiseCreator(param);
      const response = await todosAPI.getTodos();
      setTimeout(() => dispatch({ type: SUCCESS, data: response }), 200);
    } catch (e) {
      dispatch({ type: ERROR, data: e, error: true });
    }
  };
};
