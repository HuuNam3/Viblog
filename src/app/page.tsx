import { Suspense, lazy } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, CheckCircle, Code, Globe, MessageSquare, Zap, Palette, Sparkles } from "lucide-react"
import Loading from '@/components/common/Loading'

// Lazy load non-critical sections
const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection'))
const FeaturesSection = lazy(() => import('@/components/home/FeaturesSection'))

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Critical, load immediately */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 text-white">
        <div className="container mx-auto max-w-5xl relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-10 mr-10 w-20 h-20 rounded-full bg-yellow-400 opacity-20 blur-xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 ml-10 w-32 h-32 rounded-full bg-pink-500 opacity-20 blur-xl"></div>

          <div className="text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Welcome to Viblog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Colorful Ideas for the Digital Age</h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Explore our vibrant collection of articles on technology, design, and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-white/90 hover:text-purple-800">
                <Link href="/posts">Explore Posts</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-blue-500 hover:bg-white/10">
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Load when visible */}
      <Suspense fallback={<Loading />}>
        <FeaturesSection />
      </Suspense>

      {/* Testimonials Section - Load when visible */}
      <Suspense fallback={<Loading />}>
        <TestimonialsSection />
      </Suspense>

      {/* CTA Section - Critical, load immediately */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-4xl relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-10 mr-10 w-20 h-20 rounded-full bg-yellow-400 opacity-20 blur-xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 ml-10 w-32 h-32 rounded-full bg-pink-500 opacity-20 blur-xl"></div>

          <div className="text-center space-y-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Explore?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover our collection of articles and join our community of readers and creators.
            </p>
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-white/90 hover:text-purple-800">
              <Link href="/posts" className="flex items-center gap-2">
                Browse All Posts <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
