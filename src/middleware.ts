import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Role = 1 | 2 | 3;

type JWTPayload = {
	role: Role;
	exp?: number;
	[k: string]: unknown;
};

function decodeJwt(token: string): JWTPayload | null {
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

function isExpired(exp?: number): boolean {
	if (!exp) return false;
	return Math.floor(Date.now() / 1000) >= exp;
}

const ACCESS: Record<string, Role[]> = {
	'/admin': [3],
	'/contractors': [2, 3],
	'/clients': [1, 3],
};

export function middleware(request: NextRequest): NextResponse<unknown> {
	const { pathname } = request.nextUrl;

	const base = Object.keys(ACCESS).find((prefix) =>
		pathname.startsWith(prefix),
	);
	if (!base) return NextResponse.next();

	const token = request.cookies.get('token')?.value;
	if (!token) {
		const url = new URL('/login', request.url);
		url.searchParams.set('next', pathname);
		return NextResponse.redirect(url);
	}

	const payload = decodeJwt(token);
	if (!payload || isExpired(payload.exp)) {
		const url = new URL('/login', request.url);
		url.searchParams.set('next', pathname);
		return NextResponse.redirect(url);
	}

	const role = payload.role as Role;
	const allowed = ACCESS[base];

	if (role === 3 || allowed.includes(role)) {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
	matcher: ['/admin/:path*', '/contractors/:path*', '/clients/:path*'],
};
