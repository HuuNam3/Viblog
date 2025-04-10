import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BackButton from "@/components/common/BackButton"
import Link from "next/link"


export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <BackButton/>
      </div>
      <div className="space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About Us</h1>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Company Description */}
          <div className="space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed">
                We are a forward-thinking company dedicated to creating innovative solutions that help businesses thrive
                in the digital age. Founded in 2015, we&apos;ve grown from a small startup to an industry leader.
              </p>

              <p className="text-lg leading-relaxed">
                Our team of experts brings decades of combined experience in software development, design, and business
                strategy. We believe in collaboration, creativity, and delivering exceptional results for our clients.
              </p>

              <p className="text-lg leading-relaxed">
                Our mission is to empower organizations with technology that drives growth and creates meaningful
                impact.
              </p>
            </div>

            <Link href="/contact">
              <Button size="lg" className="mt-6 cursor-pointer">
                Contact us
              </Button>
            </Link>
          </div>

          {/* Right Column - Values */}
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl md:text-3xl font-bold">Our Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary">Innovation</h3>
                <p>We constantly explore new ideas and technologies to stay ahead of the curve.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary">Quality</h3>
                <p>We are committed to excellence in everything we do, from code to customer service.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary">Integrity</h3>
                <p>We operate with honesty, transparency, and respect in all our relationships.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary">Collaboration</h3>
                <p>We believe the best solutions come from diverse perspectives working together.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
