import Link from 'next/link'
import { ArrowLeft, Users, Award, Globe, Heart } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'

export default function AboutPage() {
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
              About SportsPulse
            </h1>
            <p className="text-responsive-base sm:text-responsive-lg lg:text-responsive-xl text-gray-600 max-w-3xl mx-auto inter-body leading-relaxed">
              Your trusted source for comprehensive sports coverage, breaking news, and expert analysis
            </p>
            <div className="w-16 sm:w-24 h-0.5 bg-red-600 mx-auto mt-6 sm:mt-8"></div>
          </div>
        </AnimatedSection>

        {/* Mission Statement */}
        <AnimatedSection animation="fadeInUp" delay={100}>
          <div className="bg-gray-50 p-6 sm:p-8 rounded-lg mb-12 sm:mb-16">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl font-medium garamond-heading text-gray-900 mb-4 sm:mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-responsive-base sm:text-responsive-lg text-gray-700 inter-body leading-relaxed text-center max-w-3xl mx-auto">
              At SportsPulse, we're dedicated to bringing you the most comprehensive, accurate, and engaging sports coverage. 
              From breaking news to in-depth analysis, we strive to keep sports fans informed and entertained with content 
              that matters most to them.
            </p>
          </div>
        </AnimatedSection>

        {/* Values */}
        <section className="mb-12 sm:mb-16">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl font-medium garamond-heading text-gray-900 mb-8 sm:mb-12 text-center">
              What We Stand For
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'We maintain the highest standards in sports journalism and reporting.'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building connections between sports fans around the world.'
              },
              {
                icon: Globe,
                title: 'Coverage',
                description: 'Comprehensive reporting across all major sports and leagues.'
              },
              {
                icon: Heart,
                title: 'Passion',
                description: 'Our love for sports drives everything we do.'
              }
            ].map((value, index) => (
              <AnimatedSection key={value.title} animation="fadeInUp" delay={index * 100}>
                <div className="text-center p-4 sm:p-6 hover:bg-gray-50 rounded-lg transition-colors">
                  <value.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-responsive-base sm:text-responsive-xl font-medium garamond-heading text-gray-900 mb-2 sm:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 inter-body text-sm sm:text-base">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Team */}
        <AnimatedSection animation="fadeInUp">
          <div className="text-center">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl font-medium garamond-heading text-gray-900 mb-4 sm:mb-6">
              Our Team
            </h2>
            <p className="text-responsive-base sm:text-responsive-lg text-gray-600 inter-body leading-relaxed max-w-2xl mx-auto">
              SportsPulse is powered by a team of experienced sports journalists, analysts, and content creators 
              who are passionate about delivering the best sports coverage to our readers.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
