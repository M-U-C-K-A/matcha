import pool from "@/lib/db";
import { emailUsed } from "@/lib/utils/existing";
import bcrypt from "bcryptjs";

export default async function createProfile(
	firstname: string,
	lastname: string,
	birthday: string,
	email: string,
	password: string
) {

	if (await emailUsed(email)) {
		throw ({
			message: 'Email already used'
		});
	}

	const randomSuffix = Date.now().toString().slice(-6);
	const initial = lastname.charAt(0).toUpperCase();
	const formattedFirstname = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
	const username = `${formattedFirstname}_${initial}_${randomSuffix}`;
	
	const hashedPass = await bcrypt.hash(password, 10);

	const formatedBirthday = new Date(birthday);

	const result = await pool.query(
		`INSERT INTO profiles
		(firstname, lastname, username, birthdate, email, password)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id`,
		[firstname, lastname, username, formatedBirthday, email, hashedPass]
	);

	return result.rows[0].id;
}