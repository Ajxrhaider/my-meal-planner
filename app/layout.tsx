import type { Metadata } from "next";
import "./globals.css"; // Check this path!
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "MealGen AI | Hizaki Labs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} font-sans bg-[#0f172a] text-slate-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}