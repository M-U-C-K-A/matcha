import pool from "@/lib/db";
import { existingUser } from "@/lib/utils/existing";

export default async function likeUser(
	userId: string,
	other_user_id: string
) {
	if (!(await existingUser(userId)) || !(await existingUser(other_user_id))) {
		throw new Error('User not found');
	};

	await pool.query(`
		INSERT INTO likes (user_id, liked_id)
		VALUES ($1, $2)
		ON CONFLICT (user_id, liked_id) DO NOTHING`,
		[userId, other_user_id]
	);

	await pool.query(`
		UPDATE profiles
		SET popularity = popularity + 1,
		WHERE id = $1`,
		[other_user_id]
	);

	return ;
}
