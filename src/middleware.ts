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

// Общие маршруты с контролем доступа
const ACCESS: Record<string, Role[]> = {
	'/admin': [3],
	'/contractors': [2, 3],
	'/clients': [1, 3],
};

// Профильные маршруты с контролем по ролям
const PROFILE_ACCESS: Record<string, Role[]> = {
	'/profile/overview': [1, 2, 3], // Доступно всем
	'/profile/reviews': [1, 2, 3], // Доступно всем
	'/profile/edit': [1, 2, 3], // Доступно всем
	'/profile/available-projects': [2, 3], // Только contractor
	'/profile/my-bids': [2, 3], // Только contractor
	'/profile/pricing-plan': [2, 3], // Только contractor
	'/profile/my-requests': [1, 3], // Только client
	'/profile/contractors': [1, 3], // Только client
};

export function middleware(request: NextRequest): NextResponse<unknown> {
	const { pathname } = request.nextUrl;

	// Проверка общих маршрутов
	const base = Object.keys(ACCESS).find((prefix) =>
		pathname.startsWith(prefix),
	);

	if (base) {
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

	// Проверка профильных маршрутов
	const profileRoute = Object.keys(PROFILE_ACCESS).find(
		(route) => pathname === route,
	);

	if (profileRoute) {
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
		const allowedRoles = PROFILE_ACCESS[profileRoute];

		if (!allowedRoles.includes(role)) {
			// Редиректим на overview, если нет доступа к конкретной странице
			return NextResponse.redirect(
				new URL('/profile/overview', request.url),
			);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/admin/:path*',
		'/contractors/:path*',
		'/clients/:path*',
		'/profile/:path*', // Добавляем профильные маршруты
	],
};
