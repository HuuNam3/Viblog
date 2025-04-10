import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, CheckCircle, Code, Globe, MessageSquare, Zap, Palette, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              <span>Our Topics</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Dive into Colorful Content</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From technical deep-dives to creative inspiration, our blog covers a spectrum of topics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <CardHeader className="pb-2">
                <Globe className="h-10 w-10 text-purple-600 mb-2 group-hover:text-purple-700 transition-colors" />
                <CardTitle>Web Development</CardTitle>
                <CardDescription>Modern techniques and frameworks for building exceptional websites.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Next.js Innovations", "CSS Architecture", "Performance Optimization"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <CardHeader className="pb-2">
                <Code className="h-10 w-10 text-blue-600 mb-2 group-hover:text-blue-700 transition-colors" />
                <CardTitle>Programming</CardTitle>
                <CardDescription>Deep dives into languages, algorithms, and best practices.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["TypeScript Patterns", "Algorithm Analysis", "Clean Code Principles"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <CardHeader className="pb-2">
                <Palette className="h-10 w-10 text-amber-600 mb-2 group-hover:text-amber-700 transition-colors" />
                <CardTitle>Design Trends</CardTitle>
                <CardDescription>Exploring the latest in UI/UX and visual design.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Color Theory", "Responsive Layouts", "Animation Principles"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageSquare className="h-4 w-4" />
              <span>Reader Feedback</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Readers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of readers who find inspiration and knowledge in our articles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "UX Designer",
                quote:
                  "The design articles have transformed my approach to user interfaces. I reference them in all my projects now.",
                color: "bg-gradient-to-br from-pink-500 to-rose-500",
              },
              {
                name: "Michael Chen",
                role: "Full-Stack Developer",
                quote:
                  "The technical depth combined with clear explanations makes this my go-to resource for staying current.",
                color: "bg-gradient-to-br from-violet-500 to-purple-600",
              },
              {
                name: "Emily Rodriguez",
                role: "Creative Director",
                quote:
                  "I've found so much inspiration here. The articles strike the perfect balance between trends and timeless principles.",
                color: "bg-gradient-to-br from-blue-500 to-indigo-600",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg overflow-hidden">
                <div className={`h-2 ${testimonial.color}`}></div>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="bg-white/50 p-4 rounded-lg italic text-gray-700">{testimonial.quote}</div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
