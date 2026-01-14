#!/usr/bin/env python3
"""
Matcha Database Seeder
Generates realistic fake users with interactions using Faker.
All users have the password: FuckRobin12$ (hashed with bcrypt)
"""

import os
import random
import uuid
from datetime import datetime, timedelta
from typing import List

import bcrypt
import psycopg2
from faker import Faker

# Configuration
NUM_USERS = 500
NUM_TAGS = 30
LIKES_PER_USER_RANGE = (5, 30)
MESSAGES_PER_MATCH_RANGE = (1, 20)
PASSWORD = "FuckRobin12$"

# Database connection from environment variables
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "matcha")
DB_USER = os.getenv("DB_USER", "hdelacou")
DB_PASSWORD = os.getenv("DB_PASSWORD", "root")

# Initialize Faker with French locale for realistic French names
fake = Faker(['fr_FR', 'en_US'])

# Hash the password once
PASSWORD_HASH = bcrypt.hashpw(PASSWORD.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Sample tags
SAMPLE_TAGS = [
    "vegan", "geek", "music", "sport", "travel", "nature", "photography",
    "gaming", "cooking", "reading", "movies", "yoga", "coffee", "wine",
    "art", "dance", "hiking", "beach", "party", "fitness", "tech",
    "fashion", "food", "pets", "cars", "books", "series", "anime",
    "climbing", "running"
]

# French cities with coordinates
FRENCH_CITIES = [
    ("Paris", 48.8566, 2.3522),
    ("Lyon", 45.7640, 4.8357),
    ("Marseille", 43.2965, 5.3698),
    ("Toulouse", 43.6047, 1.4442),
    ("Nice", 43.7102, 7.2620),
    ("Nantes", 47.2184, -1.5536),
    ("Bordeaux", 44.8378, -0.5792),
    ("Lille", 50.6292, 3.0573),
    ("Strasbourg", 48.5734, 7.7521),
    ("Montpellier", 43.6108, 3.8767),
    ("Rennes", 48.1173, -1.6778),
    ("Grenoble", 45.1885, 5.7245),
]


def get_random_city():
    city = random.choice(FRENCH_CITIES)
    # Add some randomness to coordinates (within ~5km)
    lat = city[1] + random.uniform(-0.05, 0.05)
    lng = city[2] + random.uniform(-0.05, 0.05)
    return city[0], lat, lng


def generate_username(first_name: str, last_name: str) -> str:
    """Generate a unique-ish username."""
    base = f"{first_name.lower()[:3]}{last_name.lower()[:3]}"
    suffix = random.randint(1, 9999)
    return f"{base}{suffix}"[:16]  # Max 16 chars


def generate_bio() -> str:
    """Generate a realistic bio."""
    bios = [
        f"Passionné(e) de {fake.word()} et de {fake.word()}. 🌟",
        f"J'adore voyager et découvrir de nouvelles cultures. ✈️",
        f"Amateur de bonne bouffe et de {fake.word()}. 🍷",
        f"{fake.catch_phrase()}",
        f"La vie est belle quand on la partage. 💕",
        f"Développeur le jour, gamer la nuit. 🎮",
        f"Yoga, méditation et {fake.word()}. 🧘",
        f"En quête d'aventures et de belles rencontres.",
        f"Fan de {fake.word()}, {fake.word()} et {fake.word()}.",
        f"Ici pour faire de belles rencontres! 😊",
    ]
    return random.choice(bios)[:255]


def create_users(cursor) -> List[str]:
    """Create fake users and return their UUIDs."""
    user_ids = []
    
    print(f"Creating {NUM_USERS} users...")
    
    for i in range(NUM_USERS):
        user_id = str(uuid.uuid4())
        gender = random.choice(["male", "female", "non-binary"])
        
        if gender == "male":
            first_name = fake.first_name_male()
        elif gender == "female":
            first_name = fake.first_name_female()
        else:
            first_name = fake.first_name()
        
        last_name = fake.last_name()
        username = generate_username(first_name, last_name)
        email = f"{username}@{fake.free_email_domain()}"
        
        city, lat, lng = get_random_city()
        
        # Random birthdate (18-60 years old)
        age = random.randint(18, 60)
        birthdate = datetime.now() - timedelta(days=age * 365 + random.randint(0, 365))
        
        sex_preference = random.choice(["male", "female", "bisexual"])
        popularity = random.randint(0, 100)
        is_verified = random.random() > 0.2  # 80% verified
        status = random.choice(["online", "offline", "away"])
        last_seen = datetime.now() - timedelta(hours=random.randint(0, 72))
        
        cursor.execute("""
            INSERT INTO profiles (id, email, username, firstname, lastname, password, gender, sex_preference, bio, birthdate, popularity, is_verified, status, last_seen, latitude, longitude, city)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            user_id, email, username, first_name, last_name, PASSWORD_HASH,
            gender, sex_preference, generate_bio(), birthdate.date(),
            popularity, is_verified, status, last_seen, lat, lng, city
        ))
        
        user_ids.append(user_id)
        
        if (i + 1) % 100 == 0:
            print(f"  Created {i + 1}/{NUM_USERS} users...")
    
    return user_ids


def create_tags(cursor) -> List[int]:
    """Create tags and return their IDs."""
    print(f"Creating {len(SAMPLE_TAGS)} tags...")
    tag_ids = []
    
    for tag in SAMPLE_TAGS:
        cursor.execute("INSERT INTO tags (slug) VALUES (%s) RETURNING id", (tag,))
        tag_ids.append(cursor.fetchone()[0])
    
    return tag_ids


def create_user_preferences(cursor, user_ids: List[str], tag_ids: List[int]):
    """Assign random tags to users."""
    print("Assigning tags to users...")
    
    for user_id in user_ids:
        num_tags = random.randint(2, 7)
        selected_tags = random.sample(tag_ids, num_tags)
        
        for tag_id in selected_tags:
            cursor.execute("""
                INSERT INTO users_preferences (user_id, tag_id) VALUES (%s, %s)
                ON CONFLICT DO NOTHING
            """, (user_id, tag_id))


def create_photos(cursor, user_ids: List[str]):
    """Create fake photos for users."""
    print("Creating user photos...")
    
    for user_id in user_ids:
        num_photos = random.randint(1, 5)
        
        for i in range(num_photos):
            # Use placeholder image URLs
            photo_url = f"https://picsum.photos/seed/{user_id[:8]}{i}/400/500"
            is_profile = (i == 0)
            
            cursor.execute("""
                INSERT INTO photos (user_id, url, profile_picture) VALUES (%s, %s, %s)
            """, (user_id, photo_url, is_profile))


def create_likes_and_matches(cursor, user_ids: List[str]) -> List[tuple]:
    """Create likes between users and return mutual matches."""
    print("Creating likes...")
    
    likes = set()
    
    for user_id in user_ids:
        num_likes = random.randint(*LIKES_PER_USER_RANGE)
        potential_targets = [uid for uid in user_ids if uid != user_id]
        targets = random.sample(potential_targets, min(num_likes, len(potential_targets)))
        
        for target_id in targets:
            if (user_id, target_id) not in likes:
                cursor.execute("""
                    INSERT INTO likes (user_id, liked_id, created_at) VALUES (%s, %s, %s)
                    ON CONFLICT DO NOTHING
                """, (user_id, target_id, datetime.now() - timedelta(days=random.randint(0, 30))))
                likes.add((user_id, target_id))
    
    # Find mutual likes (matches)
    matches = []
    for (a, b) in likes:
        if (b, a) in likes and a < b:  # Avoid duplicates
            matches.append((a, b))
    
    print(f"  Created {len(likes)} likes, found {len(matches)} mutual matches")
    return matches


def create_messages(cursor, matches: List[tuple]):
    """Create chat messages between matched users."""
    print("Creating messages between matches...")
    
    message_templates = [
        "Salut! Comment ça va? 😊",
        "Ton profil m'a beaucoup plu!",
        "On a les mêmes centres d'intérêt apparemment!",
        "Tu fais quoi dans la vie?",
        "Je suis dispo ce weekend si tu veux qu'on se voit!",
        "Haha, c'est marrant ça!",
        "Tu habites où exactement?",
        "J'adore ta photo de profil!",
        "On pourrait aller boire un verre?",
        "Tu connais un bon resto par ici?",
        fake.sentence(),
        fake.sentence(),
        fake.sentence(),
    ]
    
    total_messages = 0
    
    for user1, user2 in matches:
        num_messages = random.randint(*MESSAGES_PER_MATCH_RANGE)
        
        for i in range(num_messages):
            sender = random.choice([user1, user2])
            recipient = user2 if sender == user1 else user1
            content = random.choice(message_templates)
            sent_at = datetime.now() - timedelta(
                days=random.randint(0, 14),
                hours=random.randint(0, 23),
                minutes=random.randint(0, 59)
            )
            is_read = random.random() > 0.3  # 70% read
            
            cursor.execute("""
                INSERT INTO chats (sender_id, recipient_id, content, is_read, sent_at)
                VALUES (%s, %s, %s, %s, %s)
            """, (sender, recipient, content, is_read, sent_at))
            total_messages += 1
    
    print(f"  Created {total_messages} messages")


def create_notifications(cursor, user_ids: List[str]):
    """Create notifications for users."""
    print("Creating notifications...")
    
    notification_types = ['like', 'profile_consulted', 'new_message', 'like_back']
    
    for user_id in user_ids:
        num_notifs = random.randint(0, 10)
        other_users = [uid for uid in user_ids if uid != user_id]
        
        for _ in range(num_notifs):
            other_id = random.choice(other_users)
            notif_type = random.choice(notification_types)
            is_read = random.random() > 0.4  # 60% read
            sent_at = datetime.now() - timedelta(hours=random.randint(0, 168))
            
            cursor.execute("""
                INSERT INTO notifications (user_id, other_id, type, is_read, sent_at)
                VALUES (%s, %s, %s, %s, %s)
            """, (user_id, other_id, notif_type, is_read, sent_at))


def create_blocks_and_reports(cursor, user_ids: List[str]):
    """Create some blocks and reports for realism."""
    print("Creating blocks and reports...")
    
    # Small percentage of users block/report others
    num_blocks = int(len(user_ids) * 0.05)
    num_reports = int(len(user_ids) * 0.02)
    
    for _ in range(num_blocks):
        user_id = random.choice(user_ids)
        blocked_id = random.choice([uid for uid in user_ids if uid != user_id])
        cursor.execute("""
            INSERT INTO blocks (user_id, blocked_id) VALUES (%s, %s)
            ON CONFLICT DO NOTHING
        """, (user_id, blocked_id))
    
    for _ in range(num_reports):
        user_id = random.choice(user_ids)
        reported_id = random.choice([uid for uid in user_ids if uid != user_id])
        cursor.execute("""
            INSERT INTO reports (user_id, reported_id) VALUES (%s, %s)
            ON CONFLICT DO NOTHING
        """, (user_id, reported_id))
    
    print(f"  Created ~{num_blocks} blocks and ~{num_reports} reports")


def main():
    print("=" * 60)
    print("Matcha Database Seeder")
    print(f"Password for all users: {PASSWORD}")
    print("=" * 60)
    
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = conn.cursor()
        
        print("\nConnected to database. Starting seed...\n")
        
        # Clear existing data (optional, comment out if you want to append)
        print("Clearing existing data...")
        cursor.execute("TRUNCATE profiles CASCADE")
        cursor.execute("TRUNCATE tags CASCADE")
        conn.commit()
        
        # Seed data
        tag_ids = create_tags(cursor)
        conn.commit()
        
        user_ids = create_users(cursor)
        conn.commit()
        
        create_user_preferences(cursor, user_ids, tag_ids)
        conn.commit()
        
        create_photos(cursor, user_ids)
        conn.commit()
        
        matches = create_likes_and_matches(cursor, user_ids)
        conn.commit()
        
        create_messages(cursor, matches)
        conn.commit()
        
        create_notifications(cursor, user_ids)
        conn.commit()
        
        create_blocks_and_reports(cursor, user_ids)
        conn.commit()
        
        print("\n" + "=" * 60)
        print("✅ Database seeded successfully!")
        print(f"   - {NUM_USERS} users created")
        print(f"   - {len(SAMPLE_TAGS)} tags created")
        print(f"   - {len(matches)} matches found")
        print("=" * 60)
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        raise


if __name__ == "__main__":
    main()
