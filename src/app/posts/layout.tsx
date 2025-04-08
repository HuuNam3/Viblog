import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, FileText, Info, Search } from "lucide-react"
import LoginButton from "./login-button"

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">My Blog</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/posts" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Posts</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/posts/search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
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

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
