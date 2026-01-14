-- Matcha Database Schema
-- Run this script to create the initial tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender VARCHAR(20),
    sexual_preference VARCHAR(20) DEFAULT 'bisexual',
    bio TEXT,
    birth_date DATE,
    profile_picture VARCHAR(255),
    popularity_score INTEGER DEFAULT 0,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    city VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    is_online BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User photos (up to 5)
CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    is_profile BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Interest tags
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- User-Tag relationship
CREATE TABLE IF NOT EXISTS user_tags (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, tag_id)
);

-- Likes
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    liker_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    liked_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (liker_id, liked_id)
);

-- Matches (when two users like each other)
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    user1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    user2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user1_id, user2_id)
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profile views
CREATE TABLE IF NOT EXISTS profile_views (
    id SERIAL PRIMARY KEY,
    viewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    viewed_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    from_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blocked users
CREATE TABLE IF NOT EXISTS blocked_users (
    id SERIAL PRIMARY KEY,
    blocker_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    blocked_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (blocker_id, blocked_id)
);

-- Reports (fake accounts)
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    reporter_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reported_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample tags
INSERT INTO tags (name) VALUES 
    ('vegan'), ('geek'), ('piercing'), ('sport'), ('music'),
    ('travel'), ('photography'), ('gaming'), ('cooking'), ('reading'),
    ('movies'), ('nature'), ('yoga'), ('coffee'), ('wine'),
    ('art'), ('dance'), ('hiking'), ('beach'), ('party')
ON CONFLICT (name) DO NOTHING;

-- Insert some sample users
INSERT INTO users (username, email, password_hash, first_name, last_name, gender, sexual_preference, bio, popularity_score, city, is_verified)
VALUES 
    ('alice42', 'alice@example.com', '$2b$10$placeholder', 'Alice', 'Martin', 'female', 'heterosexual', 'Passionnée de voyage et de photographie 📸', 85, 'Paris', true),
    ('bob_dev', 'bob@example.com', '$2b$10$placeholder', 'Bob', 'Dupont', 'male', 'heterosexual', 'Développeur le jour, gamer la nuit 🎮', 72, 'Lyon', true),
    ('charlie_music', 'charlie@example.com', '$2b$10$placeholder', 'Charlie', 'Bernard', 'male', 'bisexual', 'La musique est ma vie 🎵', 90, 'Paris', true),
    ('diana_yoga', 'diana@example.com', '$2b$10$placeholder', 'Diana', 'Leroy', 'female', 'bisexual', 'Yoga, méditation et bonne bouffe 🧘‍♀️', 88, 'Bordeaux', true),
    ('emma_art', 'emma@example.com', '$2b$10$placeholder', 'Emma', 'Moreau', 'female', 'heterosexual', 'Artiste dans l''âme, toujours en quête d''inspiration 🎨', 76, 'Paris', true)
ON CONFLICT (username) DO NOTHING;

-- Link users to tags
INSERT INTO user_tags (user_id, tag_id)
SELECT u.id, t.id 
FROM users u, tags t 
WHERE (u.username = 'alice42' AND t.name IN ('travel', 'photography', 'coffee'))
   OR (u.username = 'bob_dev' AND t.name IN ('geek', 'gaming', 'movies'))
   OR (u.username = 'charlie_music' AND t.name IN ('music', 'party', 'dance'))
   OR (u.username = 'diana_yoga' AND t.name IN ('yoga', 'vegan', 'nature'))
   OR (u.username = 'emma_art' AND t.name IN ('art', 'coffee', 'wine'))
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_location ON users (city);
CREATE INDEX IF NOT EXISTS idx_users_gender ON users (gender);
CREATE INDEX IF NOT EXISTS idx_users_preference ON users (sexual_preference);
CREATE INDEX IF NOT EXISTS idx_likes_liker ON likes (liker_id);
CREATE INDEX IF NOT EXISTS idx_likes_liked ON likes (liked_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages (sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages (receiver_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications (user_id);
