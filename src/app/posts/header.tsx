import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, FileText, Info, Search, Sparkles,Film } from "lucide-react"
import LoginButton from "./login-button"

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
                <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-bold text-purple-700 hover:text-purple-800 transition-colors"
                >
                <Sparkles className="h-5 w-5" />
                <span>Viblog</span>
                </Link>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
                <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                >
                <Link href="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                </Link>
                </Button>
                <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                >
                <Link href="/posts" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>posts</span>
                </Link>
                </Button>
                <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                >
                <Link href="/short" className="flex items-center gap-2">
                    <Film className="h-4 w-4" />
                    <span>Short</span>
                </Link>
                </Button>
                <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                >
                <Link href="/posts/search" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                </Link>
                </Button>
                <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                >
                <Link href="/about" className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span>About</span>
                </Link>
                </Button>
                <LoginButton />
            </div>
            </nav>
        </div>
    </header>
  )
}
