import pool from "@/lib/db";
import { existingUser } from "@/lib/utils/existing";

export async function getUserNotifcation(
	userId: string) {

	if (!(await existingUser(userId))) {
		throw new Error('User not found');
	}

	const result = await pool.query(
		`
		SELECT
			n.id,
			n.type,
			n.is_read,
			n.sent_at,
			p.id AS other_user_id,
			p.username AS other_username,
			ph.url AS other_avatar
		FROM notifications n
		JOIN profiles p ON p.id = n.other_id
		LEFT JOIN photos ph
			ON ph.user_id = p.id
		AND ph.profile_picture = true
		WHERE n.user_id = $1
		ORDER BY n.sent_at DESC
		`,
		[userId]
	);

	return result.rows;
}

export async function seenUserNotification(
	userId: string,
	notifId: string ) {
	
	if (!(await existingUser(userId))) {
		throw new Error('User not found');
	}

	await pool.query(`
		UPDATE notifications
		SET is_read = true
		WHERE user_id = $1 AND id = $2`,
		[userId, notifId]
	)

	return ;
}

export async function hasUserNotification(
	userId: string ) : Promise<boolean> {

	if (!(await existingUser(userId))) {
		throw new Error('User not found');
	}

	const result = await pool.query(
		`
		SELECT 1 FROM notifications WHERE
		user_id = $1`,
		[userId]
	)

	if (result.rowCount && result.rowCount > 0) {
		return true;
	}

	return false;
}