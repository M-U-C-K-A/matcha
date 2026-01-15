import { Search, Zap, Calendar } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Discover",
        description: "Browse curated profiles that match your professional lifestyle and preferences."
    },
    {
        number: "02",
        icon: Zap,
        title: "Vibe",
        description: "Connect with people who share your energy. Our algorithm prioritizes chemistry."
    },
    {
        number: "03",
        icon: Calendar,
        title: "Meet",
        description: "Skip the endless chatting. Schedule real dates with our integrated calendar."
    }
];

export function Steps() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-pink-50 text-primary text-xs font-bold tracking-wider mb-4 uppercase">
                        How it works
                    </span>
                    <h2 className="font-outfit text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Three steps to your person.
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        We've stripped away the noise so you can focus on what matters: real connection.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 bg-white group">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                <step.icon className="w-6 h-6 text-gray-900 group-hover:text-primary transition-colors" />
                            </div>

                            <h3 className="font-outfit text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-12">
                                {step.description}
                            </p>

                            <div className="absolute bottom-8 right-8 text-6xl font-outfit font-bold text-gray-50 opacity-50 group-hover:text-primary/5 transition-colors select-none">
                                {step.number}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
