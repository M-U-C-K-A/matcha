import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex bg-white">
            {/* Left Side - Hero/Gradient section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-neutral-900 overflow-hidden items-center justify-center px-12">
                {/* Dynamic Background */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FD5D68] rounded-full blur-[128px] opacity-20" />

                <div className="relative z-10 text-white max-w-lg">
                    <div className="w-12 h-12 bg-[#FD5D68] rounded-tl-xl rounded-br-xl transform rotate-45 mb-12" />
                    <h1 className="font-serif text-5xl font-bold leading-tight mb-6">
                        Find your person, <br />
                        <span className="text-[#FD5D68] italic">authentically.</span>
                    </h1>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                        Join the most exclusive community of professionals looking for meaningful connections.
                    </p>
                </div>
            </div>

            {/* Right Side - Form section */}
            <div className="flex-1 flex flex-col relative bg-white">
                {/* Back to Home */}
                <div className="absolute top-8 left-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
                    <div className="w-full max-w-md space-y-8">
                        {/* Mobile Logo shows here */}
                        <div className="lg:hidden flex justify-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#FD5D68] rounded-tl-xl rounded-br-xl transform rotate-45" />
                                <span className="font-serif text-3xl font-bold tracking-tight">Matcha</span>
                            </div>
                        </div>

                        {children}

                        <div className="text-center text-sm text-gray-400 mt-8">
                            © 2026 Matcha. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
