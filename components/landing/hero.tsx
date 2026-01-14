import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-12 pb-24 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#FD5D68]/10 to-transparent rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 text-center">
                <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6">
                    Modern dating, <br />
                    <span className="text-[#FD5D68] italic">classically defined.</span>
                </h1>

                <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
                    Join a curated community of professionals who value authentic connections and meaningful conversations.
                </p>

                <div className="flex items-center justify-center gap-4 mb-16">
                    <Button className="bg-[#FD5D68] hover:bg-[#E94E5A] text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-[#FD5D68]/30">
                        Get Started <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-gray-200">
                        How it works
                    </Button>
                </div>

                {/* Hero Card Mockup */}
                <div className="relative max-w-sm mx-auto">
                    {/* Card Container */}
                    <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 relative z-10">
                        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                            {/* Fallback image if no asset available, using a placeholder color/text */}
                            <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-400">
                                <span className="text-4xl">👩🏻</span>
                            </div>
                            {/* Status Badge */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                Online
                            </div>

                            {/* Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white text-left">
                                <h3 className="font-serif text-2xl font-bold">Sarah, 26</h3>
                                <p className="text-sm opacity-90">Product Designer</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between px-2">
                            <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                                <span className="sr-only">Pass</span>
                                ✕
                            </button>
                            <div className="flex flex-col items-center">
                                <span className="text-xs font-bold text-[#FD5D68] mb-1">98% MATCH</span>
                                <div className="h-1 w-12 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full w-[98%] bg-[#FD5D68]" />
                                </div>
                            </div>
                            <button className="w-12 h-12 rounded-full bg-[#FD5D68] flex items-center justify-center text-white shadow-lg shadow-[#FD5D68]/30 hover:bg-[#E94E5A] transition-colors">
                                <span className="sr-only">Like</span>
                                <Heart className="w-6 h-6 fill-current" />
                            </button>
                        </div>
                    </div>

                    {/* Decorative Elements behind card */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#ffe4e6] to-[#fff1f2] rounded-full blur-3xl -z-10 opacity-60" />
                </div>

                {/* Social Proof */}
                <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`} />
                        ))}
                    </div>
                    <span>Trusted by thousands of professionals</span>
                </div>

            </div>
        </section>
    );
}
