import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Code, Globe, Palette, Zap } from "lucide-react"

export default function FeaturesSection() {
  return (
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
  )
} 