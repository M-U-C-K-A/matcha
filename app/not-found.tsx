import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { HeartCrack } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#FD5D68]/20 blur-3xl rounded-full scale-150 animate-pulse" />
                <HeartCrack className="w-24 h-24 text-[#FD5D68] relative z-10" />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Heartbreak!
            </h2>

            <p className="text-gray-500 text-lg mb-8 max-w-md">
                We couldn't find the page you're looking for. It might have been ghosted or never existed in the first place.
            </p>

            <Link href="/">
                <Button className="bg-[#FD5D68] hover:bg-[#E94E5A] text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-[#FD5D68]/30">
                    Return Home
                </Button>
            </Link>
        </div>
    )
}
