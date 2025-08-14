import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/modules/auth/slices/authSlice';

export const rootReducer = combineReducers({
    auth: authReducer,
});
