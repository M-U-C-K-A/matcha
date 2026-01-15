import pool from "../db";

export async function emailUsed(
	email: string
): Promise<Boolean> {
	const result = await pool.query(
		'SELECT * FROM profiles WHERE email = $1',
		[email]
	);

	if (result.rowCount && result.rowCount > 0) {
		return true;
	}

	return false;
}

export async function existingUser(
	id: string
): Promise<Boolean> {
	const result = await pool.query(
		'SELECT * FROM profiles WHERE id = $1',
		[id]
	);

	if (result.rowCount && result.rowCount > 0) {
		return true;
	}

	return false;
}