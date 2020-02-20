const fetchDataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: ''
      };
    case 'FETCH_FAILED':
      return {
        ...state,
        loading: false,
        data: [],
        error: `Fetch failed - ${action.payload}`
      };
    default:
      return state;
  };
};

export default fetchDataReducer;