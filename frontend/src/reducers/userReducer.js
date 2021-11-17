/** @format */

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER': // action type
      return action.payload; // user email, name etc

    case 'LOGOUT':
      return action.payload;

    default:
      return state;
  }
};

// return value will be update in 'state'.
