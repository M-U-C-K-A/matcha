import pool from "@/lib/db";

export async function UserBlockedMe(
	userId: string,
	otherUserId: string
): Promise<boolean> {
	const result = await pool.query(
		`SELECT EXISTS(
			SELECT 1 FROM blocks WHERE user_id = $2 AND blocked_id = $1
		) AS is_blocked_me`,
		[userId, otherUserId]
	);

	return result.rows[0].is_blocked_me;
}

export async function isUserBlocked(
	userId: string,
	otherUserId: string
): Promise<boolean> {
	const result = await pool.query(
		`SELECT EXISTS(
			SELECT 1 FROM blocks WHERE user_id = $1 AND blocked_id = $2
		) AS is_blocked`,
		[userId, otherUserId]
	);

	return result.rows[0].is_blocked;
}
