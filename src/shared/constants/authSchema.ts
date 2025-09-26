import z from 'zod';

export const phoneRegex = /^(?:(?:\+)?[0-9\s\-().]{7,})$/;

export const MAX = {
	full_name: 60,
	email: 254,
	location: 100,
	phone: 20,
	password: 72,
};

export const passwordSchema = z
	.string()
	.min(8, 'Password must be at least 8 characters')
	.refine((v) => /[A-Z]/.test(v), {
		message: 'Password must contain at least one uppercase letter',
	})
	.refine((v) => /[a-z]/.test(v), {
		message: 'Password must contain at least one lowercase letter',
	})
	.refine((v) => /\d/.test(v), {
		message: 'Password must contain at least one digit',
	})
	.refine((v) => /[^A-Za-z0-9]/.test(v), {
		message: 'Password must contain at least one special character',
	});

export const addUserSchema = z.object({
	full_name: z
		.string()
		.min(2, 'Full name must be at least 2 characters')
		.max(MAX.full_name, `Max ${MAX.full_name} characters`),
	email: z
		.string()
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'Please enter a valid email',
		)
		.max(MAX.email, `Max ${MAX.email} characters`),
	phone: z
		.string()
		.max(MAX.phone, `Max ${MAX.phone} characters`)
		.or(z.literal(''))
		.refine((v) => !v || phoneRegex.test(v), {
			message: 'Please enter a valid phone number',
		}),
	location: z
		.string()
		.min(2, 'Please enter your city, state, or ZIP code')
		.max(MAX.location, `Max ${MAX.location} characters`),
	password: passwordSchema,
});

export const registrationSchema = z
	.object({
		fullName: z
			.string()
			.min(2, 'Full name must be at least 2 characters')
			.max(MAX.full_name, `Max ${MAX.full_name} characters`),
		email: z
			.string()
			.regex(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				'Please enter a valid email',
			)
			.max(MAX.email, `Max ${MAX.email} characters`),
		phoneNumber: z
			.string()
			.max(MAX.phone, `Max ${MAX.phone} characters`)
			.or(z.literal(''))
			.refine((v) => !v || phoneRegex.test(v), {
				message: 'Please enter a valid phone number',
			}),
		location: z
			.string()
			.min(2, 'Please enter your city, state, or ZIP code')
			.max(MAX.location, `Max ${MAX.location} characters`),
		password: passwordSchema,
		confirmPassword: z.string().min(8, 'Confirm password is required'),
		termsAccepted: z.boolean().refine((v) => v, {
			message:
				'You must agree to the Terms of Service and Privacy Policy',
		}),
	})
	.refine((d) => d.password === d.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});
