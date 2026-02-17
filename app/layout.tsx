import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css"; // <--- This imports the file from Step 1

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "MealGen AI | Hizaki Labs",
  description: "AI-Powered Meal Planning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} font-sans antialiased bg-[#0f172a] text-slate-200`}>
        {children}
      </body>
    </html>
  );
}