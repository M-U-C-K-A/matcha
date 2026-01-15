"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getToken, getUser, setToken, setUser, removeToken, removeUser, User } from "@/lib/auth";

interface AuthContextType {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (token: string, user: User) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/db", "/profile", "/users", "/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password", "/auth/verify-email", "/legal"];

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUserState] = useState<User | null>(null);
	const [token, setTokenState] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const pathname = usePathname();

	// Check auth status on mount
	useEffect(() => {
		const storedToken = getToken();
		const storedUser = getUser();

		if (storedToken && storedUser) {
			setTokenState(storedToken);
			setUserState(storedUser);
		}
		setIsLoading(false);
	}, []);

	// Redirect logic
	useEffect(() => {
		if (isLoading) return;

		const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith("/auth/"));
		const isAuthenticated = !!token;

		if (!isAuthenticated && !isPublicRoute) {
			// Not authenticated and trying to access protected route
			router.push("/auth/login");
		} else if (isAuthenticated && pathname.startsWith("/auth/") && pathname !== "/auth/register") {
			// Authenticated but on auth pages (except register which has preferences modal), redirect to browse
			router.push("/browse");
		}
	}, [isLoading, token, pathname, router]);

	const login = (newToken: string, newUser: User) => {
		setToken(newToken);
		setUser(newUser);
		setTokenState(newToken);
		setUserState(newUser);
		router.push("/browse");
	};

	const logout = () => {
		removeToken();
		removeUser();
		setTokenState(null);
		setUserState(null);
		router.push("/auth/login");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isLoading,
				isAuthenticated: !!token,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
