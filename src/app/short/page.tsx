import VideoFeed from "./video-feed"
import type React from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import Header from "../posts/header"

export default function Short() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-purple-50/50">
      <Header/>
      
      <main className="flex-1">
        <VideoFeed/>
      </main>

      <footer className="border-t py-8 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Viblog
              </h3>
              <p className="text-white/70">
                Exploring the colorful world of technology, design, and innovation through insightful articles and
                tutorials.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/posts" className="hover:text-white transition-colors">
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link href="/posts/search" className="hover:text-white transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-500/20 rounded-full text-sm">Web Development</span>
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">Programming</span>
                <span className="px-3 py-1 bg-amber-500/20 rounded-full text-sm">Design</span>
                <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm">Technology</span>
                <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">Tutorials</span>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-white/50 pt-8 border-t border-white/10">
            © {new Date().getFullYear()} Viblog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
