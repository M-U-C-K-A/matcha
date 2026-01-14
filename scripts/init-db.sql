-- Activation de l'extension pour les UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Table des profils
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    username VARCHAR(16) NOT NULL UNIQUE,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    password TEXT NOT NULL,
    gender TEXT CHECK (gender IN ('male', 'female', 'non-binary')),
    sex_preference TEXT CHECK (sex_preference IN ('male', 'female', 'bisexual')),
    bio VARCHAR(255),
    birthdate DATE NOT NULL,
    popularity INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    status TEXT CHECK (status IN ('online', 'offline', 'away')) DEFAULT 'offline',
    last_seen TIMESTAMP DEFAULT NOW(),
    latitude DOUBLE PRECISION DEFAULT 0,
    longitude DOUBLE PRECISION DEFAULT 0,
    city TEXT
);

-- 2. Table des photos
CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    profile_picture BOOLEAN DEFAULT false
);

-- 3. Table des tags
CREATE TABLE tags (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE
);

-- 4. Table de liaison Profils <-> Tags
CREATE TABLE users_preferences (
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, tag_id)
);

-- 5. Table des Likes
CREATE TABLE likes (
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    liked_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(user_id, liked_id)
);

-- 6. Table des Signalements
CREATE TABLE reports (
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reported_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(user_id, reported_id)
);

-- 7. Table des Blocages
CREATE TABLE blocks (
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    blocked_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(user_id, blocked_id)
);

-- 8. Table des Messages
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP DEFAULT NOW()
);

-- 9. Table des Matchs / Événements
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    matched_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    event_date TIMESTAMP DEFAULT NOW(),
    theme TEXT NOT NULL
);

-- 10. Table des Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    other_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('like', 'profile_consulted', 'new_message', 'like_back', 'unlike')),
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP DEFAULT NOW()
);