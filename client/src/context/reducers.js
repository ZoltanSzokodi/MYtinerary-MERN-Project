export const ajaxReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        error: ''
      }
    case 'FETCH_FAILED':
      return {
        loading: false,
        data: [],
        error: `Fetch failed - ${action.payload}`
      }
    default:
      return state
  };
};