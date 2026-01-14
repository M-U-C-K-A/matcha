import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Matcha",
  description: "Modern dating, classically defined.",
  keywords: ["matcha", "dating", "social", "network", "community", "profile", "browse", "search", "chat", "notifications", "history", "database", "viewer", "map", "search", "multi-select", "tags", "seed", "script", "faker", "users", "likes", "messages", "profiles", "chats", "events", "shadcn", "components", "avatar", "slider", "tabs", "scroll-area"],
  openGraph: {
    title: "Matcha",
    description: "Modern dating, classically defined.",
    type: "website",
    locale: "en_US",
    siteName: "Matcha",
  },
  twitter: {
    title: "Matcha",
    description: "Modern dating, classically defined.",
    card: "summary_large_image",
    site: "@matcha",
    creator: "@matcha",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
