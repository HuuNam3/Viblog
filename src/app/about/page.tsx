import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg mb-6">
            We are a forward-thinking company dedicated to creating innovative solutions that help businesses thrive in
            the digital age. Founded in 2015, we've grown from a small startup to an industry leader.
          </p>

          <p className="text-lg mb-6">
            Our team of experts brings decades of combined experience in software development, design, and business
            strategy. We believe in collaboration, creativity, and delivering exceptional results for our clients.
          </p>

          <p className="text-lg mb-6">
            Our mission is to empower organizations with technology that drives growth and creates meaningful impact.
          </p>

          <Button asChild className="mt-4">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        <div>
          <Card className="p-6 h-full">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p>We constantly explore new ideas and technologies to stay ahead of the curve.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Quality</h3>
                <p>We are committed to excellence in everything we do, from code to customer service.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Integrity</h3>
                <p>We operate with honesty, transparency, and respect in all our relationships.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Collaboration</h3>
                <p>We believe the best solutions come from diverse perspectives working together.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
