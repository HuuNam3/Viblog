import type React from "react"
import Footer from "@/components/common/Footer"
import Header from "@/components/common/Header"


export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-purple-50/50">
      <Header/>
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  )
}
