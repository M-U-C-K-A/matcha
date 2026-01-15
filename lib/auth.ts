"use client";

const TOKEN_KEY = "matcha_token";
const USER_KEY = "matcha_user";

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
}

// Token management
export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
}

// User management
export function getUser(): User | null {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
}

export function setUser(user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeUser(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(USER_KEY);
}

// Auth helpers
export function isAuthenticated(): boolean {
    return !!getToken();
}

export function logout(): void {
    removeToken();
    removeUser();
}

// API fetch wrapper with auth header
export async function authFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = getToken();
    const headers = new Headers(options.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(url, {
        ...options,
        headers,
    });
}
