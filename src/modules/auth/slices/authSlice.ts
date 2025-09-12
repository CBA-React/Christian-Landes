import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
	token: string | null;
	email: string | null;
	role: 1 | 2 | 3 | null;
	hydrated: boolean;
}

interface JWTPayload {
	role: 1 | 2 | 3;
	email: string;
	sub: string;
	exp: number;
}

const getRoleFromToken = (token: string): 1 | 2 | 3 | null => {
	try {
		const decoded = jwtDecode<JWTPayload>(token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) return null;
		if (![1, 2, 3].includes(decoded.role)) return null;
		return decoded.role;
	} catch {
		return null;
	}
};

const initialState: AuthState = {
	token: null,
	email: null,
	role: null,
	hydrated: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<{ token: string; email: string }>,
		) => {
			const { token, email } = action.payload;
			const role = getRoleFromToken(token);
			if (!role) return;
			state.token = token;
			state.email = email;
			state.role = role;
		},
		logout: (state) => {
			state.token = null;
			state.email = null;
			state.role = null;
			if (typeof window !== 'undefined') {
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				localStorage.removeItem('email');
				document.cookie = 'token=; Max-Age=0; path=/';
			}
		},
		setHydrated: (state, action: PayloadAction<boolean>) => {
			state.hydrated = action.payload;
		},
	},
});

export const { login, logout, setHydrated } = authSlice.actions;
export default authSlice.reducer;
