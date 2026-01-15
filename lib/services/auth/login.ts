import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function loginUser (
	email: string,
	password: string
) {
	const result = await pool.query(`
		SELECT password, id FROM profiles WHERE email = $1`,
		[email]
	)
	
	if (!result.rowCount || result.rowCount < 1) {
		throw ({
			message: 'This account does not exist'
		});
	}

	const isValid = await bcrypt.compare(password, result.rows[0].password);
	if (!isValid) {
		throw ({
			message: 'Wrong Password'
		})
	}

	return result.rows[0].id;
}