import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
        <Link href="/">
            <Button variant="ghost" className="flex cursor-pointer items-center gap-2 pl-0 hover:pl-1 transition-all">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Send us a message</CardTitle>
            <p className="text-muted-foreground mt-2">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">
                  Name
                </Label>
                <Input id="name" placeholder="Your name" className="h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="your.email@example.com" className="h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-medium">
                  Message
                </Label>
                <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px] resize-none" />
              </div>

              <Button type="submit" className="w-full cursor-pointer h-12 text-base font-medium">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <address className="not-italic text-muted-foreground">
                    123 Business Avenue
                    <br />
                    Tech District
                    <br />
                    San Francisco, CA 94103
                  </address>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                      (555) 123-4567
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:info@yourcompany.com" className="hover:text-primary transition-colors">
                      info@yourcompany.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday:</span>
                  <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday:</span>
                  <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday:</span>
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}