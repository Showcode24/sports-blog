import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/animated-section'
import { featuredArticles } from '@/data/articles'

export function FeaturedArticles() {
  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto container-responsive">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
            <h2 className="bbc-section-header text-responsive-2xl sm:text-responsive-3xl">
              Featured Stories
            </h2>
            <Link href="/articles" className="text-sm font-medium text-gray-600 hover:text-red-600 inter-body transition-colors group self-start sm:self-auto">
              View All         
              <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
            </Link>
          </div>
        </AnimatedSection>
        
        <div className="grid-responsive grid-responsive-md-2 grid-responsive-lg-3">
          {featuredArticles.map((article, index) => (
            <AnimatedSection 
              key={article.id} 
              animation="fadeInUp" 
              delay={index * 100}
              className="group"
            >
              <article className="bbc-hover">
                <Link href={`/article/${article.id}`}>
                  <div className="relative h-48 sm:h-56 lg:h-64 mb-4 sm:mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="bbc-category mb-2 sm:mb-3 bbc-red-accent">
                    {article.category}
                  </div>
                  
                  <h3 className="text-responsive-xl sm:text-responsive-2xl font-medium garamond-heading text-black mb-3 sm:mb-4 group-hover:text-red-600 line-clamp-2 transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 inter-body leading-relaxed text-sm sm:text-base">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 bbc-meta text-xs sm:text-sm">
                    <span>By {article.author}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{article.publishedAt}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{article.readTime}</span>
                  </div>
                </Link>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
