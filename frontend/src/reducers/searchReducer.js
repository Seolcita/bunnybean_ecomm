/** @format */

export const searchReducer = (state = { text: '' }, action) => {
  switch (action.type) {
    case 'SEARCH_QUERY':
      return { ...state, ...action.payload }; // We might have more than one state/query

    default:
      return state;
  }
};

// return value will be update in 'state'.
