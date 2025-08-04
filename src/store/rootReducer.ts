import { combineReducers } from '@reduxjs/toolkit';

const dummyReducer = (state = {}) => state;

const rootReducer = combineReducers({ dummyReducer });

export default rootReducer;
