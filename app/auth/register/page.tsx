import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
    return (
        <Card className="border-gray-100 shadow-xl">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="font-serif text-2xl font-bold">Create an account</CardTitle>
                <CardDescription>
                    Join thousands of professionals today
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Doe" />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="johndoe" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                </div>
                <Button className="w-full bg-[#FD5D68] hover:bg-[#E94E5A] text-white shadow-lg shadow-[#FD5D68]/20 h-10 rounded-lg">
                    Create Account <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center">
                <div className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="font-medium text-[#FD5D68] hover:underline">
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
