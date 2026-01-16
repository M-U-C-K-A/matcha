import pool from "@/lib/db";

export async function getProfileByUsername(
	username: string) {

	const result = await pool.query(`
		SELECT * FROM profiles
		WHERE username = $1`,
		[username]
	);
	
	if (result.rowCount && result.rowCount < 0) {
		return null;
	}

	return result.rows[0];
}
