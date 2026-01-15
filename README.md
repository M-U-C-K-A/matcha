# 🍵 Matcha

> Because love can be industrialized too.

![Matcha Banner](https://images.unsplash.com/photo-1515541312075-8b5e98583484?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
*Note: This is a 42 School Project.*

Matcha is a comprehensive dating web application built to facilitate connections between potential partners. It covers the entire user journey from registration to the final encounter, featuring intelligent matching algorithms, real-time interactions, and a polished user interface.

## ✨ Features

### 👤 User Management
- **Secure Authentication**: Complete sign-up and login flows with email verification and password reset capabilities.
- **Rich Profiles**: Users can personalize their profiles with:
  - Biography and interests (tags).
  - Gender and sexual preferences.
  - Geolocated position (GPS or manual).
  - Gallery with up to 5 photos.
- **Privacy & Security**: Block and report functionalities, visibility controls.

### 💘 Matching & Discovery
- **Smart Suggestions**: intelligently suggests profiles based on:
  - 📍 Geographic proximity.
  - 🏷️ Common interests (tags).
  - ⭐ Popularity score.
- **Advanced Search**: Filter and sort community members by age, location, fame rating, and tags.
- **Real-time Map**: Visualize potential matches on an interactive map.

### 💬 Interaction
- **Instant Messaging**: Real-time chat for matched users.
- **Live Notifications**: Get instant alerts for likes, profile views, messages, and matches.
- **Engagement**: "Like" and "Unlike" profiles to show interest. Mutual likes trigger a "Match" permitting chat.

---

## 🛠️ Tech Stack

This project is built with a modern, performance-oriented stack, adhering to strict validtion and security standards.

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Maps**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Driver**: `pg` (node-postgres) - *Manual SQL queries* implementation.
- **Validation**: [Zod](https://zod.dev/)
- **Hashing**: Bcrypt

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm, pnpm, yarn, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/M-U-C-K-A/matcha.git
   cd matcha
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your environment variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/matcha"
   # Add other necessary env vars here
   ```

4. **Initialize Database**
   Since this project uses manual SQL queries and migrations, ensure your PostgreSQL server is running and the database is created.
   *(You might need to run the `script/seed.ts` or `init-db.sql` if available)*

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security

Security is a core focus of this project:
- **No ORM**: All database interactions are performed via parameterized raw SQL queries to prevent Injection attacks.
- **Input Validation**: Strict validation on all forms and API endpoints using Zod.
- **Password Safety**: Passwords are never stored in plain text.
- **XSS Protection**: React/Next.js and proper sanitization ensure protection against XSS.

---

## 👥 Authors

- [**hdelacou**](https://github.com/hdelacou)
- [**rbardet**](https://github.com/rbardet)

---

<p align="center">
  Made with ❤️ for 42
</p>
