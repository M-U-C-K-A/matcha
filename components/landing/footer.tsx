export function Footer() {
    return (
        <footer className="py-12 bg-white text-sm text-gray-500 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary rounded-tl-lg rounded-br-lg transform rotate-45" />
                    <span className="font-serif text-xl font-bold text-gray-900 tracking-tight">Matcha</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8">
                    <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
                    <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
                    <a href="#" className="hover:text-gray-900 transition-colors">Instagram</a>
                </div>

                <div>
                    © 2026 Matcha Dating Inc.
                </div>
            </div>
        </footer>
    );
}
