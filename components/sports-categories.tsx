import Link from 'next/link'
import { AnimatedSection } from '@/components/animated-section'
import { categories } from '@/data/categories'

export function SportsCategories() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto container-responsive">
        <AnimatedSection animation="fadeInUp" className="text-center mb-8 sm:mb-12">
          <h2 className="text-responsive-3xl sm:text-responsive-4xl font-medium garamond-heading text-black mb-4">
            Sports Coverage
          </h2>
          <p className="text-responsive-base sm:text-responsive-lg text-gray-600 inter-body max-w-2xl mx-auto">
            Comprehensive reporting across all major sports with expert analysis and breaking news
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <AnimatedSection 
              key={category.name} 
              animation="fadeInUp" 
              delay={index * 100}
            >
              <Link href={category.href} className="group">
                <div className="text-center bbc-hover card-responsive">
                  <h3 className="text-responsive-base sm:text-responsive-xl font-medium garamond-heading text-black mb-2 group-hover:text-red-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="bbc-meta text-xs sm:text-sm">
                    {category.articles} articles
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
