import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { LanguageProvider } from "@/lib/context/LanguageContext";

export const metadata: Metadata = {
  title: "Scott Devines | Blockchain & Smart Contract Developer",
  description: "Experienced Full Stack Web3 Developer specializing in blockchain, smart contracts, and dApp development.",
  keywords: ["blockchain developer", "smart contracts", "dApp development", "Ethereum", "Solidity", "React", "NextJS"],
  authors: [{ name: "Scott Devines" }],
  openGraph: {
    title: "Scott Devines | Blockchain & Smart Contract Developer",
    description: "Experienced Full Stack Web3 Developer specializing in blockchain, smart contracts, and dApp development.",
    siteName: "Scott Devines Portfolio",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Scott Devines | Blockchain & Smart Contract Developer",
    description: "Experienced Full Stack Web3 Developer specializing in blockchain, smart contracts, and dApp development.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <ThemeProvider>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
