import pool from "@/lib/db";
import { existingUser } from "@/lib/utils/existing";

export default async function sendMessage(
	userId: string,
	other_user_id: string,
	content: string) {
	
	if (!(await existingUser(userId)) || !(await existingUser(other_user_id))) {
		throw new Error('User not found');
	}

	await pool.query(`
		INSERT INTO chats (sender_id, recipient_id, content)
		VALUES ($1, $2, $3)`,
		[userId, other_user_id, content]
	);
}