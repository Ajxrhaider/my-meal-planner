import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MealGen AI | Hizaki Labs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    hizaki: '#6366F1',
                    dark: '#0f172a'
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body className="bg-[#0f172a] text-slate-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}