import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	token: string | null;
	email: string | null;
}

const getStoredAuth = (): AuthState => {
	if (typeof window === 'undefined') return { token: null, email: null };
	return {
		token: localStorage.getItem('access_token'),
		email: localStorage.getItem('email'),
	};
};

const initialState: AuthState = getStoredAuth();

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<{ token: string; email: string }>,
		) => {
			state.token = action.payload.token;
			state.email = action.payload.email;
			if (typeof window !== 'undefined') {
				localStorage.setItem('access_token', action.payload.token);
				localStorage.setItem('email', action.payload.email);
				document.cookie = `token=${action.payload.token}; path=/; SameSite=Lax`;
			}
		},
		logout: (state) => {
			state.token = null;
			state.email = null;
			if (typeof window !== 'undefined') {
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				localStorage.removeItem('email');
				document.cookie = 'token=; Max-Age=0; path=/';
			}
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
