'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Clock, TrendingUp, X } from 'lucide-react'
import { useSearch } from '@/hooks/use-search'
import Link from 'next/link'
import Image from 'next/image'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { query, setQuery, results, isLoading } = useSearch()
  const [recentSearches] = useState(['Championship', 'Basketball', 'Tennis'])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
    }
  }, [isOpen, setQuery])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0 mx-4">
        <DialogHeader className="p-4 sm:p-6 pb-0">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder="Search sports news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 sm:pl-12 pr-10 h-10 sm:h-12 text-sm sm:text-lg border-0 border-b border-gray-200 rounded-none focus:ring-0 focus:border-red-600"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6 overflow-y-auto">
          {!query && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3 flex items-center">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Recent Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <Button
                      key={search}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuery(search)}
                      className="text-xs"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3 flex items-center">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Trending Topics
                </h3>
                <div className="space-y-2">
                  {['Championship Finals', 'MVP Race', 'Trade Deadline'].map((topic) => (
                    <Button
                      key={topic}
                      variant="ghost"
                      className="w-full justify-start text-xs sm:text-sm"
                      onClick={() => setQuery(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query && (
            <div className="space-y-3 sm:space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-red-600"></div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                  </p>
                  {results.map((article) => (
                    <Link
                      key={article.id}
                      href={`/article/${article.id}`}
                      onClick={onClose}
                      className="flex gap-3 sm:gap-4 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="relative w-12 h-9 sm:w-16 sm:h-12 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs sm:text-sm line-clamp-1 mb-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-red-600 font-medium">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-400">
                            {article.publishedAt}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                    <Link 
                      href={`/search?q=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="block w-full text-center py-2 text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                      View All {results.length} Results →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <p className="text-gray-600 text-sm sm:text-base">No results found for "{query}"</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Try different keywords or browse our categories
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
