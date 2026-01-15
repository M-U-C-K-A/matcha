import pool from "@/lib/db";
import { existingUser } from "@/lib/utils/existing";

export default async function getOptimizedMatches(
	userId: string) {

	if (!(await existingUser(userId))) {
		throw new Error('User not found');
	}

	const result = await pool.query(`
		WITH user_info AS (
			SELECT
				id,
				latitude AS user_lat,
				longitude AS user_lon,
				sex_preference
			FROM profiles
			WHERE id = $1
		),
		user_tags AS (
			SELECT tag_id
			FROM users_preferences
			WHERE user_id = $1
		)
		SELECT
			p.id,
			p.username,
			p.gender,
			p.popularity,
			ph.url AS profile_avatar,
			COUNT(ut.tag_id) AS common_tags,
			6371 * acos(
				LEAST(1, GREATEST(-1,
					cos(radians(ui.user_lat)) * cos(radians(p.latitude)) *
					cos(radians(p.longitude) - radians(ui.user_lon)) +
					sin(radians(ui.user_lat)) * sin(radians(p.latitude))
				))
			) AS distance_km
		FROM profiles p
		CROSS JOIN user_info ui
		JOIN photos ph ON ph.user_id = p.id AND ph.profile_picture = TRUE
		LEFT JOIN users_preferences ut ON ut.user_id = p.id AND ut.tag_id IN (SELECT tag_id FROM user_tags)
		WHERE p.id <> $1
		AND p.gender = ui.sex_preference
		AND NOT EXISTS (SELECT 1 FROM blocks b WHERE b.user_id = $1 AND b.blocked_id = p.id)
		AND NOT EXISTS (SELECT 1 FROM blocks b WHERE b.user_id = p.id AND b.blocked_id = $1)
		AND NOT EXISTS (SELECT 1 FROM reports r WHERE (r.user_id = $1 AND r.reported_id = p.id)
												OR (r.user_id = p.id AND r.reported_id = $1))
		GROUP BY p.id, p.username, p.gender, p.popularity, ph.url, ui.user_lat, ui.user_lon
		ORDER BY distance_km ASC;`,
		[userId]
	)


	return result.rows;
}