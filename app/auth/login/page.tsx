"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Identifiants invalides");
                setIsLoading(false);
                return;
            }

            // Login successful - store token and user
            login(data.token, data.user);
        } catch {
            setError("Erreur de connexion au serveur");
            setIsLoading(false);
        }
    };

    return (
        <Card className="border-border shadow-xl w-full max-w-3xl mx-auto">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="font-serif text-2xl font-bold text-primary">Welcome back</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-4">
                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                            {error}
                        </div>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="emailOrUsername">Email or Username</Label>
                        <Input
                            id="emailOrUsername"
                            type="text"
                            placeholder="m@example.com"
                            value={formData.emailOrUsername}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-xs font-medium text-primary hover:underline hover:text-primary/80"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full shadow-lg shadow-primary/20 h-10 rounded-lg"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                Sign In <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </CardContent>
            </form>
            <CardFooter className="flex flex-col gap-4 text-center">
                <div className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/auth/register" className="font-medium text-primary hover:underline hover:text-primary/80">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
