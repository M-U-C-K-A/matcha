import { email, z } from "zod";

export const schema = z.object({
	firstname: z.string()
		.min(2, { message: 'Firstname too short' })
		.max(30, { message: 'Firstname too long' })
		.regex(/^[A-Za-zÀ-ÖØ-öø-ÿ'-]+$/, {
		  message: 'Firstname contains invalid characters',
		}),
	lastname: z.string()
		.min(2, { message: 'Lastname too short' })
		.max(30, { message: 'Lastname too long' })
		.regex(/^[A-Za-zÀ-ÖØ-öø-ÿ'-]+$/, {
		  message: 'Lastname contains invalid characters',
		}),
	birthday: z.date(),
	email: z.email({ message: 'Invalid email' })
		.min(5, { message: 'Email too short' })
		.max(100, { message: 'Email too long' }),
	password: z.string()
		.min(6, { message: 'Password too short' })
		.max(30, { message: 'Password too long' })
		.regex(/[a-z]/, { message: 'The password need to have at least 1 lowercase character' })
		.regex(/[A-Z]/, { message: 'The password need to have at least 1 uppercase character' })
		.regex(/\d/, { message: 'The password need to have at least 1 digit' })
		.regex(/[^A-Za-z0-9]/, { message: 'The password need to have at least 1 special character' }),
});