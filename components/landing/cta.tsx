import { Button } from "@/components/ui/button";
import { Download, Apple } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Ready to find your match?
                </h2>
                <p className="text-gray-500 mb-10 text-lg">
                    Join the exclusive community of professionals dating with intention.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button className="h-14 px-8 bg-primary hover:bg-primary-hover text-white rounded-xl text-lg w-full sm:w-auto shadow-xl shadow-primary/20 flex items-center gap-3">
                        <span>Create Account</span>
                    </Button>
                    <Button variant="outline" className="h-14 px-8 bg-white hover:bg-gray-50 text-gray-900 border-gray-200 rounded-xl text-lg w-full sm:w-auto font-medium">
                        View Stories
                    </Button>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-200/50 flex items-center justify-center gap-8 text-gray-400">
                    <span className="text-sm font-medium">Join us from any device</span>
                </div>
            </div>
        </section>
    );
}
