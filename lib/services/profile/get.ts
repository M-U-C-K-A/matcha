import pool from "@/lib/db";

export async function getProfileByUsername(username: string) {
    const result = await pool.query(`
        SELECT
            p.id,
            p.username,
            p.firstname,
            p.lastname,
            p.gender,
            p.biography,
            p.popularity,
            p.last_connection,
            EXTRACT(YEAR FROM AGE(p.birthdate))::int AS age,
            ph.url AS profile_picture,
            COALESCE(ARRAY_AGG(DISTINCT t.slug) FILTER (WHERE t.slug IS NOT NULL), '{}') AS tags
        FROM profiles p
        LEFT JOIN photos ph ON ph.user_id = p.id AND ph.profile_picture = TRUE
        LEFT JOIN users_preferences up ON up.user_id = p.id
        LEFT JOIN tags t ON t.id = up.tag_id
        WHERE p.username = $1
        GROUP BY p.id, p.username, p.firstname, p.lastname, p.gender, p.biography, p.popularity, p.last_connection, p.birthdate, ph.url
    `, [username]);

    return result.rows[0];
}
