import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Logos } from "@/components/landing/logos";
import { Steps } from "@/components/landing/steps";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Page() {
    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-[#FD5D68]/20">
            <Navbar />
            <main>
                <Hero />
                <Logos />
                <Steps />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}