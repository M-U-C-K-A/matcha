import pool from "@/lib/db";
import { isUserBlocked, UserBlockedMe } from "@/lib/utils/block";

export async function getProfileByUsername(
	userId: string,
	targetUsername: string
) {
	const otherResult = await pool.query(
		`SELECT id FROM profiles WHERE username = $1`,
		[targetUsername]
	);

	if (!otherResult.rowCount) {
		throw new Error("User not found");
	}

	const otherId = otherResult.rows[0].id;

	const [blockedByMe, blockedMe] = await Promise.all([
		isUserBlocked(userId, otherId),
		UserBlockedMe(userId, otherId),
	]);

	if (blockedByMe) {
		throw new Error("You have blocked this user");
	}

	if (blockedMe) {
		throw new Error("This user has blocked you");
	}

	const profileResult = await pool.query(`
		SELECT
		username,
		firstname,
		lastname,
		gender,
		sex_preference,
		bio,
		birthdate,
		popularity,
		status,
		last_seen,
		city
		FROM profiles
		WHERE username = $1`,
		[targetUsername]
	);

	if (!profileResult.rowCount) {
		return null;
	}

	const profile = profileResult.rows[0];

	const photosResult = await pool.query(
		`SELECT url, profile_picture FROM photos WHERE user_id = $1`,
		[otherId]
	);

	profile.profile_avatar = photosResult.rows.find(p => p.profile_picture)?.url || null;
	profile.photos = photosResult.rows.map(p => p.url);

	return profile;
}
