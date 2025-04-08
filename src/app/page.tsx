import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, CheckCircle, Code, Globe, MessageSquare, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Innovative Solutions for the Digital Age</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              We help businesses transform their ideas into powerful digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg">
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer a comprehensive range of services to help your business succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="pb-2">
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Web Development</CardTitle>
                <CardDescription>
                  Custom websites and web applications built with the latest technologies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Responsive Design", "E-commerce Solutions", "Content Management"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Code className="h-10 w-10 text-primary mb-2" />
                <CardTitle>App Development</CardTitle>
                <CardDescription>Native and cross-platform mobile applications for iOS and Android.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["iOS & Android Apps", "Cross-platform Solutions", "App Maintenance"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Digital Strategy</CardTitle>
                <CardDescription>Strategic planning and consulting for your digital transformation.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Market Research", "Competitive Analysis", "Growth Strategy"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
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
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our clients have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                quote:
                  "Working with this team has been a game-changer for our business. They delivered beyond our expectations.",
              },
              {
                name: "Michael Chen",
                role: "Marketing Director, GrowthCo",
                quote:
                  "The attention to detail and commitment to quality is unmatched. I highly recommend their services.",
              },
              {
                name: "Emily Rodriguez",
                role: "Founder, InnovateNow",
                quote:
                  "From concept to execution, they guided us through every step of the process with expertise and professionalism.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    <p className="italic">{testimonial.quote}</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let&apos;s work together to bring your vision to life. Contact us today to discuss your project.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/contact" className="flex items-center gap-2">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
