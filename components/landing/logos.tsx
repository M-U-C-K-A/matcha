export function Logos() {
    return (
        <section className="py-16 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="font-serif text-2xl font-bold mb-8 text-gray-900">Love stories begin here</h2>
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Text-based logos using serif fonts to mimic brands */}
                    <span className="font-serif text-2xl md:text-3xl font-bold tracking-widest">VOGUE</span>
                    <span className="font-serif text-2xl md:text-3xl font-bold">GQ</span>
                    <span className="font-serif text-2xl md:text-3xl font-bold italic">Vanity Fair</span>
                    <span className="font-serif text-xl md:text-2xl font-black font-mono">The New York Times</span>
                </div>
            </div>
        </section>
    );
}
