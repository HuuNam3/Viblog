import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

const testimonials = [
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
]

export default function TestimonialsSection() {
  return (
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
          {testimonials.map((testimonial, index) => (
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
  )
} 