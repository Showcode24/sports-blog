'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto container-responsive py-6 sm:py-8">
        {/* Back Button */}
        <AnimatedSection animation="fadeIn">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black mb-6 sm:mb-8 inter-body transition-colors group">
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
        </AnimatedSection>

        {/* Page Header */}
        <AnimatedSection animation="fadeInUp">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-responsive-4xl sm:text-responsive-5xl font-medium garamond-heading text-gray-900 mb-4 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-responsive-base sm:text-responsive-lg lg:text-responsive-xl text-gray-600 max-w-3xl mx-auto inter-body leading-relaxed">
              Have a question, story tip, or feedback? We'd love to hear from you.
            </p>
            <div className="w-16 sm:w-24 h-0.5 bg-red-600 mx-auto mt-6 sm:mt-8"></div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <AnimatedSection animation="fadeInLeft">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg">
              <h2 className="text-responsive-xl sm:text-responsive-2xl font-medium garamond-heading text-gray-900 mb-4 sm:mb-6">
                Send us a message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Email *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Subject *</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="text-sm"
                  />
                </div>
                
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows={6}
                    required
                    className="text-sm"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bbc-btn-primary text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </AnimatedSection>

          {/* Contact Information */}
          <AnimatedSection animation="fadeInRight">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-responsive-xl sm:text-responsive-2xl font-medium garamond-heading text-gray-900 mb-4 sm:mb-6">
                  Get in touch
                </h2>
                <p className="text-gray-600 inter-body leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                  Whether you have breaking news, want to contribute, or just want to say hello, 
                  we're here to listen. Our team is always ready to connect with fellow sports enthusiasts.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-medium garamond-heading text-gray-900 mb-1 text-sm sm:text-base">Email</h3>
                    <p className="text-gray-600 inter-body text-sm sm:text-base">contact@sportspulse.com</p>
                    <p className="text-xs sm:text-sm text-gray-500 inter-body">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-medium garamond-heading text-gray-900 mb-1 text-sm sm:text-base">Phone</h3>
                    <p className="text-gray-600 inter-body text-sm sm:text-base">+1 (555) 123-4567</p>
                    <p className="text-xs sm:text-sm text-gray-500 inter-body">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-medium garamond-heading text-gray-900 mb-1 text-sm sm:text-base">Address</h3>
                    <p className="text-gray-600 inter-body text-sm sm:text-base">
                      123 Sports Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-gray-200">
                <h3 className="font-medium garamond-heading text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                  For Press Inquiries
                </h3>
                <p className="text-gray-600 inter-body text-sm sm:text-base">
                  Email: press@sportspulse.com<br />
                  Phone: +1 (555) 123-4568
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <Toaster />
    </div>
  )
}
