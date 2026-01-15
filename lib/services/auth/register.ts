import pool from "@/lib/db";
import bcrypt from "bcryptjs";

async function emailUsed(
	email: string
): Promise<Boolean> {
	const result = await pool.query(
		'SELECT * FROM profiles WHERE email = $1',
		[email]
	);

	if (!result) {
		return true;
	}

	return false;
}

export default async function createProfile(
	firstname: string,
	lastname: string,
	birthday: string,
	email: string,
	password: string
) {

	if (await emailUsed(email)) {
		throw ({
			error: 'Email already used'
		});
	}

	const hashedPass = await bcrypt.hash(password, 10);

	const formatedBirthday = new Date(birthday);

	const result = await pool.query(
		`INSERT INTO profiles
		(firstname, lastname, username, birthdate, email, password)
		VALUES ($1, $2, $3, $4, $5, $6)`,
		[firstname, lastname, '@john_doe', formatedBirthday, email, hashedPass]
	);

	
	return result.rows[0].id;
}