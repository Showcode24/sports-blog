import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Eye, ArrowLeft, TrendingUp } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'
import { CategoryHero } from '@/components/category-hero'
import { categoryData } from '@/data/categories'

export default function CategoryPage({ params }: { params: { sport: string } }) {
  const data = categoryData[params.sport] || categoryData.football
  const featuredArticles = data.articles.filter(article => article.featured)
  const regularArticles = data.articles.filter(article => !article.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <CategoryHero 
        categoryName={data.name}
        description={data.description}
        featuredArticles={featuredArticles}
      />

      <div className="max-w-7xl mx-auto container-responsive py-12 sm:py-16">
        {/* Back Button */}
        <AnimatedSection animation="fadeIn">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black mb-8 sm:mb-12 inter-body transition-colors group">
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
        </AnimatedSection>

        {/* Regular Articles */}
        {regularArticles.length > 0 && (
          <section>
            <AnimatedSection animation="fadeInUp">
              <div className="flex items-center mb-6 sm:mb-8">
                <h2 className="bbc-section-header mr-4 text-responsive-2xl sm:text-responsive-3xl">
                  Latest {data.name} News
                </h2>
                <div className="flex-1 h-0.5 bg-gray-200"></div>
              </div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {regularArticles.map((article, index) => (
                <AnimatedSection 
                  key={article.id} 
                  animation="fadeInUp" 
                  delay={index * 100}
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
                        
                        {article.breaking && (
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 animate-pulse">
                            <span className="bbc-breaking text-xs">Breaking</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="bbc-category mb-2 sm:mb-3 bbc-red-accent text-xs">
                        {data.name}
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
                        <span className="text-xs sm:text-sm font-medium inter-body">By {article.author}</span>
                      </div>
                    </Link>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}

        {/* Load More */}
        <AnimatedSection animation="fadeInUp" className="text-center">
          <Button className="bbc-btn-secondary px-6 sm:px-8 py-2 sm:py-3 group hover:scale-105 transition-all duration-200 text-sm sm:text-base">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            Load More Articles
          </Button>
        </AnimatedSection>
      </div>
    </div>
  )
}
