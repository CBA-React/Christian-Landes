export type AuthRole = '1' | '2' | '3';
export type ProfileRole = 'contractor' | 'client';


export const mapAuthRoleToProfileRole = (
	authRole: AuthRole | null,
): ProfileRole | null => {
	if (!authRole) return null;

	const roleStr = String(authRole);

	switch (roleStr) {
		case '1':
			return 'client';
		case '2':
			return 'contractor';
		case '3':
			return 'client'; 
		default:
			console.warn(`Unknown auth role: ${authRole}`);
			return 'client';
	}
};


export const isContractor = (authRole: AuthRole | null): boolean => {
	return String(authRole) === '2';
};


export const isClient = (authRole: AuthRole | null): boolean => {
	return String(authRole) === '1';
};
