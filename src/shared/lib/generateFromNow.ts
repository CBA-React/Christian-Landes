export function generatePasswordFromNow(): string {
	const now = new Date();
	const base =
		now.getTime().toString(36) + now.toISOString().replace(/[^0-9]/g, '');
	const specials = '!@#$%^&*';
	const upper = base.replace(/[a-z]/g, (c) => c.toUpperCase())[0] || 'A';
	const special = specials[now.getMilliseconds() % specials.length];
	const extra = Math.abs(now.getTimezoneOffset()).toString().padStart(3, '0');
	const raw = upper + base + special + extra;
	return raw.slice(0, 16);
}

export function generatePhoneFromNow(): string {
	const now = new Date();
	const ts = now.getTime().toString();
	const last9 = ts.slice(-9).padStart(9, '0');
	return '999' + last9;
}
