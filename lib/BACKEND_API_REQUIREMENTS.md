# 📋 Spécifications API pour le Backend - Matcha

Ce document décrit tous les endpoints API nécessaires pour le frontend de l'application Matcha.
Pour chaque endpoint, vous trouverez : la méthode HTTP, le chemin, les données envoyées (Request) et attendues en retour (Response).

---

## 🔐 1. Authentification

### POST `/api/auth/register`
Inscription d'un nouvel utilisateur.

**Request Body:**
```json
{
  "firstName": "string (2-50 chars, lettres uniquement)",
  "lastName": "string (2-50 chars, lettres uniquement)",
  "email": "string (email valide)",
  "birthdate": "string (format: YYYY-MM-DD)",
  "password": "string (min 8 chars, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Un email de vérification a été envoyé"
}
```

**Response Error (400/409):**
```json
{
  "error": "Email déjà utilisé" | "Validation error message"
}
```

---

### POST `/api/auth/login`
Connexion d'un utilisateur existant.

**Request Body:**
```json
{
  "emailOrUsername": "string",
  "password": "string"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "user": {
    "id": "number",
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "avatar": "string | null"
  },
  "token": "string (JWT)"
}
```

**Response Error (401):**
```json
{
  "error": "Identifiants invalides"
}
```

---

### POST `/api/auth/logout`
Déconnexion de l'utilisateur.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true
}
```

---

### POST `/api/auth/forgot-password`
Demande de réinitialisation du mot de passe.

**Request Body:**
```json
{
  "email": "string"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Un email de réinitialisation a été envoyé"
}
```

---

### POST `/api/auth/reset-password`
Réinitialisation du mot de passe avec token.

**Request Body:**
```json
{
  "token": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

**Response Success (200):**
```json
{
  "success": true
}
```

---

### GET `/api/auth/verify-email?token=xxx`
Vérification de l'email après inscription.

**Response Success (200):**
```json
{
  "success": true,
  "message": "Email vérifié avec succès"
}
```

---

### GET `/api/auth/me`
Récupérer l'utilisateur connecté.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "birthdate": "string (YYYY-MM-DD)",
  "gender": "male | female | other | null",
  "sexualPreference": "male | female | both | null",
  "bio": "string | null",
  "interests": ["string"],
  "avatar": "string | null",
  "photos": ["string"],
  "fameRating": "number (0-100)",
  "latitude": "number | null",
  "longitude": "number | null",
  "city": "string | null",
  "isOnline": "boolean",
  "lastSeen": "string (ISO datetime)",
  "isProfileComplete": "boolean",
  "unreadNotificationsCount": "number"
}
```

---

## 👤 2. Profil Utilisateur

### GET `/api/users/:id`
Récupérer le profil d'un utilisateur (déclenche une notification de visite).

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "id": "number",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "age": "number",
  "gender": "male | female | other",
  "sexualPreference": "male | female | both",
  "bio": "string",
  "interests": ["string"],
  "avatar": "string",
  "photos": ["string"],
  "fameRating": "number (0-100)",
  "city": "string",
  "latitude": "number",
  "longitude": "number",
  "isOnline": "boolean",
  "lastSeen": "string (ISO datetime)",
  "hasLikedMe": "boolean",
  "iLikedThem": "boolean",
  "isConnected": "boolean (match mutuel)",
  "isBlocked": "boolean"
}
```

---

### PUT `/api/users/me`
Mettre à jour son propre profil.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "string (optionnel)",
  "lastName": "string (optionnel)",
  "email": "string (optionnel)",
  "bio": "string (optionnel)",
  "gender": "male | female | other (optionnel)",
  "sexualPreference": "male | female | both (optionnel)",
  "interests": ["string"] (optionnel),
  "latitude": "number (optionnel)",
  "longitude": "number (optionnel)",
  "city": "string (optionnel)"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "user": { /* user object mis à jour */ }
}
```

---

### POST `/api/users/me/photos`
Ajouter une photo au profil (max 5).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```
photo: File (image)
isAvatar: boolean (optionnel, définir comme photo de profil)
```

**Response Success (201):**
```json
{
  "success": true,
  "photoUrl": "string",
  "photos": ["string"] (liste mise à jour)
}
```

---

### DELETE `/api/users/me/photos/:photoId`
Supprimer une photo.

**Response Success (200):**
```json
{
  "success": true
}
```

---

### PUT `/api/users/me/avatar`
Définir une photo existante comme avatar.

**Request Body:**
```json
{
  "photoUrl": "string"
}
```

**Response Success (200):**
```json
{
  "success": true
}
```

---

## 💘 3. Browse & Suggestions

### GET `/api/browse`
Récupérer la liste des profils suggérés (matching intelligent).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
sortBy: "distance" | "fameRating" | "age" | "commonTags" (défaut: par pertinence)
order: "asc" | "desc" (défaut: "desc")
minAge: number (optionnel)
maxAge: number (optionnel)
minFame: number (optionnel)
maxFame: number (optionnel)
maxDistance: number (en km, optionnel)
tags: string (tags séparés par virgule, optionnel)
page: number (défaut: 1)
limit: number (défaut: 20, max: 50)
```

**Response Success (200):**
```json
{
  "profiles": [
    {
      "id": "number",
      "username": "string",
      "firstName": "string",
      "age": "number",
      "avatar": "string",
      "city": "string",
      "distance": "number (en km)",
      "fameRating": "number",
      "commonTags": ["string"],
      "commonTagsCount": "number",
      "isOnline": "boolean"
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number"
  }
}
```

> **Note:** Le backend doit filtrer selon les préférences sexuelles (genre + orientation) et exclure les profils bloqués.

---

### GET `/api/browse/map`
Récupérer les utilisateurs pour affichage sur la carte.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
minLat: number
maxLat: number
minLng: number
maxLng: number
```

**Response Success (200):**
```json
{
  "users": [
    {
      "id": "number",
      "username": "string",
      "avatar": "string",
      "latitude": "number",
      "longitude": "number"
    }
  ]
}
```

---

## 🔍 4. Recherche Avancée

### GET `/api/search`
Recherche avancée avec critères multiples.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
minAge: number (défaut: 18)
maxAge: number (défaut: 99)
minFame: number (défaut: 0)
maxFame: number (défaut: 100)
latitude: number (centre de recherche)
longitude: number (centre de recherche)
radius: number (rayon en km, défaut: 50)
tags: string (tags séparés par virgule)
sortBy: "distance" | "fameRating" | "age" | "commonTags"
order: "asc" | "desc"
page: number
limit: number
```

**Response Success (200):**
```json
{
  "profiles": [
    {
      "id": "number",
      "username": "string",
      "firstName": "string",
      "age": "number",
      "avatar": "string",
      "city": "string",
      "distance": "number",
      "fameRating": "number",
      "commonTags": ["string"],
      "isOnline": "boolean"
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number"
  }
}
```

---

## ❤️ 5. Likes & Connexions

### POST `/api/users/:id/like`
Liker un profil (l'utilisateur doit avoir une photo de profil).

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true,
  "isMatch": "boolean (true si like mutuel)"
}
```

**Response Error (400):**
```json
{
  "error": "Vous devez avoir une photo de profil pour liker"
}
```

---

### DELETE `/api/users/:id/like`
Retirer un like (unlike).

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true,
  "wasConnected": "boolean (true si on était connecté avant)"
}
```

---

## 🚫 6. Block & Report

### POST `/api/users/:id/block`
Bloquer un utilisateur.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true
}
```

---

### DELETE `/api/users/:id/block`
Débloquer un utilisateur.

**Response Success (200):**
```json
{
  "success": true
}
```

---

### POST `/api/users/:id/report`
Signaler un utilisateur comme faux profil.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "reason": "string (optionnel)"
}
```

**Response Success (200):**
```json
{
  "success": true
}
```

---

## 📜 7. Historique

### GET `/api/history/visitors`
Récupérer les utilisateurs qui ont visité mon profil.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "visitors": [
    {
      "id": "number",
      "username": "string",
      "avatar": "string",
      "visitedAt": "string (ISO datetime)"
    }
  ]
}
```

---

### GET `/api/history/likes`
Récupérer les utilisateurs qui m'ont liké.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "likes": [
    {
      "id": "number",
      "username": "string",
      "avatar": "string",
      "likedAt": "string (ISO datetime)"
    }
  ]
}
```

---

## 🔔 8. Notifications

### GET `/api/notifications`
Récupérer toutes les notifications.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
unreadOnly: boolean (défaut: false)
page: number
limit: number
```

**Response Success (200):**
```json
{
  "notifications": [
    {
      "id": "number",
      "type": "like | visit | match | message | unlike",
      "fromUser": {
        "id": "number",
        "username": "string",
        "avatar": "string"
      },
      "message": "string (texte formaté de la notification)",
      "read": "boolean",
      "createdAt": "string (ISO datetime)"
    }
  ],
  "unreadCount": "number"
}
```

---

### PUT `/api/notifications/:id/read`
Marquer une notification comme lue.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true
}
```

---

### PUT `/api/notifications/read-all`
Marquer toutes les notifications comme lues.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true
}
```

---

## 💬 9. Chat (Messagerie)

### GET `/api/conversations`
Récupérer toutes les conversations (uniquement avec les utilisateurs connectés = match mutuel).

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "conversations": [
    {
      "id": "number",
      "user": {
        "id": "number",
        "username": "string",
        "avatar": "string",
        "isOnline": "boolean"
      },
      "lastMessage": {
        "content": "string",
        "sentAt": "string (ISO datetime)",
        "isFromMe": "boolean"
      },
      "unreadCount": "number"
    }
  ]
}
```

---

### GET `/api/conversations/:userId/messages`
Récupérer les messages d'une conversation.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
before: string (ISO datetime, pour pagination)
limit: number (défaut: 50)
```

**Response Success (200):**
```json
{
  "messages": [
    {
      "id": "number",
      "content": "string",
      "sentAt": "string (ISO datetime)",
      "isFromMe": "boolean",
      "read": "boolean"
    }
  ],
  "hasMore": "boolean"
}
```

---

### POST `/api/conversations/:userId/messages`
Envoyer un message.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "content": "string (max 1000 chars)"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": {
    "id": "number",
    "content": "string",
    "sentAt": "string (ISO datetime)"
  }
}
```

**Response Error (403):**
```json
{
  "error": "Vous ne pouvez pas envoyer de message à cet utilisateur"
}
```

> ⚠️ Seuls les utilisateurs "connectés" (match mutuel) peuvent s'envoyer des messages.

---

## 🔄 10. WebSocket / Real-time

Pour les notifications en temps réel et le chat, le backend doit implémenter des WebSocket.

### Connexion WebSocket
```
ws://[host]/ws?token=<jwt_token>
```

### Messages reçus (Server → Client):

**Nouvelle notification:**
```json
{
  "type": "notification",
  "payload": {
    "id": "number",
    "type": "like | visit | match | message | unlike",
    "fromUser": {
      "id": "number",
      "username": "string",
      "avatar": "string"
    },
    "createdAt": "string"
  }
}
```

**Nouveau message:**
```json
{
  "type": "message",
  "payload": {
    "conversationId": "number",
    "message": {
      "id": "number",
      "content": "string",
      "sentAt": "string",
      "fromUserId": "number"
    }
  }
}
```

**Statut en ligne:**
```json
{
  "type": "user_status",
  "payload": {
    "userId": "number",
    "isOnline": "boolean",
    "lastSeen": "string"
  }
}
```

---

## 🏷️ 11. Tags (Intérêts)

### GET `/api/tags`
Récupérer la liste de tous les tags disponibles (pour autocomplétion).

**Response Success (200):**
```json
{
  "tags": [
    {
      "id": "number",
      "name": "string",
      "usageCount": "number"
    }
  ]
}
```

---

## 📊 12. Statistiques (Bonus)

### GET `/api/users/me/stats`
Statistiques du profil de l'utilisateur.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "profileViews": "number (cette semaine)",
  "likesReceived": "number (cette semaine)",
  "matchesCount": "number (total)",
  "fameRatingHistory": [
    { "date": "string", "value": "number" }
  ]
}
```

---

## 📝 Notes Importantes pour le Backend

1. **Sécurité:**
   - Tous les endpoints (sauf `/api/auth/*` publics) nécessitent un token JWT valide
   - Validation Zod côté serveur pour toutes les entrées
   - Protection contre les injections SQL (requêtes paramétrées)
   - Hashage des mots de passe avec bcrypt
   - Sanitization des entrées pour éviter XSS

2. **Base de données:**
   - PostgreSQL avec driver `pg` (requêtes SQL manuelles, pas d'ORM)
   - Minimum 500 profils fictifs pour l'évaluation

3. **Calcul du Fame Rating:**
   - À définir (ex: basé sur likes reçus, visites, ratio likes/unlike, complétude du profil)

4. **Matching intelligent:**
   - Priorité: proximité géographique > tags communs > fame rating
   - Filtrer selon orientation sexuelle et préférences

5. **Notifications temps réel:**
   - Délai maximum: 10 secondes
   - Types: like, visite, message, match, unlike

---

*Document généré le 2026-01-15 par analyse du frontend Matcha*
