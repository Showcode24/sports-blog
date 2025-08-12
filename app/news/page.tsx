import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Eye, ArrowLeft, TrendingUp, Filter } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'
import { articles, trendingNews } from '@/data/articles'

export default function NewsPage() {
  const allNews = [...articles, ...trendingNews].sort((a, b) => {
    // Sort by breaking news first, then by date
    if (a.breaking && !b.breaking) return -1
    if (!a.breaking && b.breaking) return 1
    return 0
  })

  const breakingNews = allNews.filter(article => article.breaking)
  const regularNews = allNews.filter(article => !article.breaking)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto container-responsive py-6 sm:py-8">
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
              Latest Sports News
            </h1>
            <p className="text-responsive-base sm:text-responsive-lg lg:text-responsive-xl text-gray-600 max-w-3xl mx-auto inter-body leading-relaxed">
              Stay updated with breaking news, analysis, and insights from the world of sports
            </p>
            <div className="w-16 sm:w-24 h-0.5 bg-red-600 mx-auto mt-6 sm:mt-8"></div>
          </div>
        </AnimatedSection>

        {/* Breaking News Section */}
        {breakingNews.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <AnimatedSection animation="fadeInUp">
              <div className="flex items-center mb-6 sm:mb-8">
                <h2 className="bbc-section-header mr-4 text-responsive-2xl sm:text-responsive-3xl">
                  Breaking News
                </h2>
                <div className="flex-1 h-0.5 bg-red-600"></div>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 ml-4" />
              </div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {breakingNews.slice(0, 4).map((article, index) => (
                <AnimatedSection 
                  key={article.id} 
                  animation="fadeInUp" 
                  delay={index * 100}
                >
                  <article className="group">
                    <Link href={`/article/${article.id}`}>
                      <div className="bg-red-50 border-l-4 border-red-600 p-4 sm:p-6 hover:bg-red-100 transition-all duration-200 hover:shadow-sm rounded-r-lg">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <span className="bbc-breaking animate-pulse text-xs">Breaking</span>
                          <span className="bbc-category bbc-red-accent text-xs">{article.category}</span>
                        </div>
                        
                        <h3 className="text-responsive-base sm:text-responsive-xl font-medium garamond-heading text-black mb-2 sm:mb-3 group-hover:text-red-600 line-clamp-2 transition-colors duration-200">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 inter-body text-sm sm:text-base">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 bbc-meta text-xs sm:text-sm">
                          <span>By {article.author?.name || 'Staff Writer'}</span>
                          <span className="hidden sm:inline">•</span>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {article.readTime}
                          </div>
                          <span>{article.publishedAt}</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}

        {/* Regular News Section */}
        <section>
          <AnimatedSection animation="fadeInUp">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
              <h2 className="bbc-section-header text-responsive-2xl sm:text-responsive-3xl">
                All News
              </h2>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="flex items-center text-xs sm:text-sm">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularNews.map((article, index) => (
              <AnimatedSection 
                key={article.id} 
                animation="fadeInUp" 
                delay={index * 50}
              >
                <article className="group bbc-hover">
                  <Link href={`/article/${article.id}`}>
                    <div className="relative h-40 sm:h-48 mb-3 sm:mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="bbc-category mb-2 sm:mb-3 bbc-red-accent text-xs">
                      {article.category}
                    </div>
                    
                    <h3 className="text-responsive-base sm:text-responsive-xl font-medium garamond-heading text-black mb-2 sm:mb-3 group-hover:text-red-600 line-clamp-2 transition-colors duration-200">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 inter-body text-xs sm:text-sm">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between bbc-meta text-xs">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {article.views}
                        </div>
                      </div>
                      <span className="text-xs">{article.publishedAt}</span>
                    </div>
                    
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
                      <span className="text-xs sm:text-sm font-medium inter-body">
                        By {article.author?.name || 'Staff Writer'}
                      </span>
                    </div>
                  </Link>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Load More */}
        <AnimatedSection animation="fadeInUp" className="text-center mt-12 sm:mt-16">
          <Button className="bbc-btn-secondary px-6 sm:px-8 py-2 sm:py-3 group hover:scale-105 transition-all duration-200 text-sm sm:text-base">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            Load More Articles
          </Button>
        </AnimatedSection>
      </div>
    </div>
  )
}
