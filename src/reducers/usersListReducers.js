const initialData = {
  rows: [],
  row: null,
  loading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === "USERS_LIST_FETCH_STARTED") {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === "USERS_LIST_FETCH_SUCCESS") {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
    };
  }

  if (type === "USER_LIST_FETCH_SUCCESS") {
    return {
      ...state,
      loading: false,
      row: payload,
    };
  }

  if (type === "USERS_LIST_FETCH_ERROR") {
    return {
      ...state,
      loading: false,
      rows: [],
    };
  }

  if (type === "USERS_LIST_DELETE_STARTED") {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === "USERS_LIST_DELETE_SUCCESS") {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  if (type === "USERS_LIST_DELETE_ERROR") {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  if (type === "USERS_LIST_OPEN_CONFIRM") {
    return {
      ...state,
      loading: false,
      modalOpen: true,
      idToDelete: payload.id,
    };
  }

  if (type === "USERS_LIST_CLOSE_CONFIRM") {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  if (type === "USERS_LIST_UPDATE_STARTED") {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === "USERS_LIST_UPDATE_SUCCESS") {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === "USERS_LIST_UPDATE_ERROR") {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
