import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
    return (
        <Card className="border-border shadow-xl w-full max-w-3xl mx-auto">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="font-serif text-2xl font-bold text-primary">Welcome back</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email or Username</Label>
                    <Input id="email" type="text" placeholder="m@example.com" />
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
                    <Input id="password" type="password" />
                </div>
                <Button className="w-full shadow-lg shadow-primary/20 h-10 rounded-lg">
                    Sign In <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </CardContent>
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
