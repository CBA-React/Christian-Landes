export type Role = 1 | 2 | 3;

export type JWTPayload = {
	role: Role;
	exp?: number;
	[k: string]: unknown;
};

export function decodeJwt(token: string): JWTPayload | null {
	try {
		const payload = token.split('.')[1];
		const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
		const json = decodeURIComponent(
			atob(base64)
				.split('')
				.map(
					(c) =>
						'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2),
				)
				.join(''),
		);
		return JSON.parse(json);
	} catch {
		return null;
	}
}
