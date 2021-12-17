/** @format */

import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

export default rootReducer;
