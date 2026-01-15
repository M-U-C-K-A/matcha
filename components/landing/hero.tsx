import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, MessageCircle, Heart, Users, Sparkles, Shield } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-12 pb-24 overflow-hidden" id="features">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-green-100 to-transparent rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 text-center">
                <h1 className="font-outfit text-5xl md:text-7xl font-bold tracking-tight mb-6">
                    Rencontrez près de chez vous,<br />
                    <span className="text-primary italic">authentiquement.</span>
                </h1>

                <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                    Matcha connecte les personnes qui partagent les mêmes centres d'intérêt.
                    Découvrez des profils compatibles, échangez en temps réel, et faites des rencontres qui comptent vraiment.
                </p>

                <div className="flex items-center justify-center gap-4 mb-20">
                    <Link href="/auth/register">
                        <Button className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/30">
                            Créer mon profil <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="#how-it-works">
                        <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-gray-200">
                            Comment ça marche
                        </Button>
                    </Link>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-left hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                            <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Géolocalisation</h3>
                        <p className="text-gray-500 text-sm">
                            Trouvez des personnes près de chez vous grâce à notre système de localisation intelligent.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-left hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <Sparkles className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Matching intelligent</h3>
                        <p className="text-gray-500 text-sm">
                            Notre algorithme analyse vos intérêts communs pour vous suggérer les profils les plus compatibles.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-left hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <MessageCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Chat en temps réel</h3>
                        <p className="text-gray-500 text-sm">
                            Échangez instantanément avec vos matchs grâce à notre messagerie en temps réel.
                        </p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center justify-center gap-12 py-8 border-y border-gray-100">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Users className="w-5 h-5 text-primary" />
                            <span className="text-3xl font-bold">500+</span>
                        </div>
                        <p className="text-gray-500 text-sm">Profils actifs</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Heart className="w-5 h-5 text-red-500" />
                            <span className="text-3xl font-bold">10k+</span>
                        </div>
                        <p className="text-gray-500 text-sm">Matchs créés</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Shield className="w-5 h-5 text-green-500" />
                            <span className="text-3xl font-bold">100%</span>
                        </div>
                        <p className="text-gray-500 text-sm">Sécurisé</p>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`} />
                        ))}
                    </div>
                    <span>+500 célibataires vous attendent</span>
                </div>
            </div>
        </section>
    );
}
