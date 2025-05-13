import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner'
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Viblog",
  description: "A modern blog platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster 
              theme="light"
              richColors
              position="bottom-right"
              expand
              duration={4000}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
