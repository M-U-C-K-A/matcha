import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
    return (
        <Card className="border-gray-100 shadow-xl">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="font-serif text-2xl font-bold">Welcome back</CardTitle>
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
                            className="text-xs font-medium text-[#FD5D68] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Input id="password" type="password" />
                </div>
                <Button className="w-full bg-[#FD5D68] hover:bg-[#E94E5A] text-white shadow-lg shadow-[#FD5D68]/20 h-10 rounded-lg">
                    Sign In <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center">
                <div className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link href="/auth/register" className="font-medium text-[#FD5D68] hover:underline">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
