import pool from "@/lib/db";
import { existingUser } from "@/lib/utils/existing";

export default async function getUserConversation(
	userId: string
) {
	if (!(await existingUser(userId))) {
		throw new Error('User not found');
	}

	const result = await pool.query(`
		SELECT 
			c.id AS message_id,
			c.sender_id,
			c.recipient_id,
			c.content,
			c.is_read,
			c.sent_at,
			other.id AS other_user_id,
			other.username AS other_username,
			ph.url AS other_avatar
		FROM chats c
		JOIN profiles other
			ON other.id = CASE
				WHEN c.sender_id = $1 THEN c.recipient_id
				ELSE c.sender_id
			END
		LEFT JOIN photos ph
			ON ph.user_id = other.id
		AND ph.profile_picture = true
		WHERE c.sender_id = $1 OR c.recipient_id = $1
		ORDER BY c.sent_at ASC;`,
		[userId]
	)

	return result.rows;
}