import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayBeat Digital — Premium Digital Marketplace",
  description: "Your premier destination for digital products, streaming subscriptions, software licenses, and AI services worldwide. Instant delivery. Global access. Enterprise security.",
  keywords: ["digital marketplace", "streaming", "software", "gaming", "IPTV", "AI services", "gift cards"],
  openGraph: {
    title: "PlayBeat Digital — Premium Digital Marketplace",
    description: "Your premier destination for digital products worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-navy-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
