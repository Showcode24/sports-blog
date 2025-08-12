import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/animated-section'
import { trendingNews } from '@/data/articles'

export function TrendingNews() {
  return (
    <section>
      <AnimatedSection>
        <div className="mb-6 sm:mb-8">
          <h2 className="bbc-section-header text-responsive-2xl sm:text-responsive-3xl">
            Latest News
          </h2>
        </div>
      </AnimatedSection>
      
      <div className="space-y-6 sm:space-y-8">
        {trendingNews.map((news, index) => (
          <AnimatedSection 
            key={news.id} 
            animation="fadeInLeft" 
            delay={index * 100}
          >
            <article className="group">
              <Link href={`/article/${news.id}`}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bbc-card-hover p-4 sm:p-6 -mx-4 sm:-mx-6 rounded-lg transition-all duration-200 hover:shadow-sm">
                  <div className="relative w-full sm:w-32 h-48 sm:h-24 flex-shrink-0 overflow-hidden rounded order-1 sm:order-none">
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0 order-2 sm:order-none">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      {news.breaking && (
                        <span className="bbc-breaking animate-pulse text-xs">Breaking</span>
                      )}
                      <span className="bbc-category bbc-red-accent text-xs">{news.category}</span>
                    </div>
                    
                    <h3 className="text-responsive-lg sm:text-responsive-xl font-medium garamond-heading text-black mb-2 group-hover:text-red-600 line-clamp-2 transition-colors duration-200">
                      {news.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2 inter-body text-sm sm:text-base">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 bbc-meta text-xs sm:text-sm">
                      <span>{news.publishedAt}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{news.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
