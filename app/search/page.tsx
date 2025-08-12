'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Clock, Eye, ArrowLeft, Filter, TrendingUp } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { articles } from '@/data/articles'
import { AnimatedSection } from '@/components/animated-section'
import { SearchWrapper } from '@/components/search-wrapper'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState(articles)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!query.trim()) {
      setResults(articles)
      return
    }

    setIsLoading(true)
    
    const timer = setTimeout(() => {
      let filtered = articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )

      if (filter !== 'all') {
        filtered = filtered.filter(article => article.category === filter)
      }

      setResults(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, filter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by useEffect
  }

  return (
    <SearchWrapper>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto container-responsive py-6 sm:py-8">
          {/* Back Button */}
          <AnimatedSection animation="fadeIn">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black mb-6 sm:mb-8 inter-body transition-colors group">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm sm:text-base">Back to Home</span>
            </Link>
          </AnimatedSection>

          {/* Search Header */}
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-responsive-3xl sm:text-responsive-4xl font-medium garamond-heading text-gray-900 mb-4 sm:mb-6">
                Search Sports News
              </h1>
              <p className="text-responsive-base sm:text-responsive-lg text-gray-600 inter-body">
                Find articles, analysis, and breaking news across all sports
              </p>
            </div>
          </AnimatedSection>

          {/* Search Form */}
          <AnimatedSection animation="fadeInUp" delay={100}>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8 sm:mb-12">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <Input
                  type="text"
                  placeholder="Search for articles, players, teams..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 sm:pl-12 pr-4 h-12 sm:h-14 text-sm sm:text-lg border-2 border-gray-200 focus:border-red-600 rounded-lg"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                <Filter className="w-4 h-4 text-gray-500 self-center sm:self-auto" />
                <div className="flex flex-wrap gap-2 justify-center">
                  {['all', 'Football', 'Basketball', 'Tennis', 'Boxing', 'Athletics'].map((category) => (
                    <Button
                      key={category}
                      type="button"
                      variant={filter === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter(category)}
                      className={`${filter === category ? "bbc-btn-primary" : ""} text-xs sm:text-sm`}
                    >
                      {category === 'all' ? 'All Sports' : category}
                    </Button>
                  ))}
                </div>
              </div>
            </form>
          </AnimatedSection>

          {/* Search Results */}
          <div className="max-w-4xl mx-auto">
            {query && (
              <AnimatedSection animation="fadeInUp" delay={200}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                  <h2 className="text-responsive-xl sm:text-responsive-2xl font-medium garamond-heading text-gray-900">
                    {isLoading ? 'Searching...' : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
                  </h2>
                  {results.length > 0 && (
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 inter-body">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Sorted by relevance
                    </div>
                  )}
                </div>
              </AnimatedSection>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center py-8 sm:py-12">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-red-600"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6 sm:space-y-8">
                {results.map((article, index) => (
                  <AnimatedSection key={article.id} animation="fadeInUp" delay={index * 100}>
                    <article className="group">
                      <Link href={`/article/${article.id}`}>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm">
                          <div className="relative w-full sm:w-48 h-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg order-1 sm:order-none">
                            <Image
                              src={article.image || "/placeholder.svg"}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0 order-2 sm:order-none">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <Badge className="bbc-category bbc-red-accent text-xs">
                                {article.category}
                              </Badge>
                              {article.breaking && (
                                <Badge className="bbc-breaking animate-pulse text-xs">
                                  Breaking
                                </Badge>
                              )}
                            </div>
                            
                            <h3 className="text-responsive-base sm:text-responsive-xl font-medium garamond-heading text-black mb-2 sm:mb-3 group-hover:text-red-600 line-clamp-2 transition-colors duration-200">
                              {article.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 inter-body text-sm sm:text-base">
                              {article.excerpt}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 bbc-meta text-xs sm:text-sm">
                              <span>By {article.author.name}</span>
                              <span className="hidden sm:inline">•</span>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {article.readTime}
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {article.views}
                              </div>
                              <span>{article.publishedAt}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            ) : query ? (
              <AnimatedSection animation="fadeInUp">
                <div className="text-center py-8 sm:py-12">
                  <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-responsive-base sm:text-responsive-xl font-medium garamond-heading text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 inter-body mb-4 sm:mb-6 text-sm sm:text-base">
                    We couldn't find any articles matching "{query}". Try different keywords or browse our categories.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Football', 'Basketball', 'Tennis', 'Boxing', 'Athletics'].map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setQuery(category)
                          setFilter('all')
                        }}
                        className="text-xs sm:text-sm"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ) : (
              <AnimatedSection animation="fadeInUp">
                <div className="text-center py-8 sm:py-12">
                  <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-responsive-base sm:text-responsive-xl font-medium garamond-heading text-gray-900 mb-2">
                    Start your search
                  </h3>
                  <p className="text-gray-600 inter-body mb-4 sm:mb-6 text-sm sm:text-base">
                    Enter keywords to find articles, player profiles, match analysis, and more.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="text-xs sm:text-sm text-gray-500 inter-body">Popular searches:</span>
                    {['Championship', 'MVP', 'Trade', 'Playoffs', 'Records'].map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery(term)}
                        className="text-xs"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </SearchWrapper>
  )
}
