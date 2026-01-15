import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandMenu } from "@/components/command-menu";
import { AuthProvider } from "@/components/auth-provider";
import DevBadge from "@/components/dev-badge";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
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
        className={`${outfit.variable} ${playfair.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <CommandMenu />
          <DevBadge />
        </ThemeProvider>
      </body>
    </html>
  );
}
