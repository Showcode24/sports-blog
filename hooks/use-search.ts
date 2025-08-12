'use client'

import { useState, useEffect } from 'react'
import { articles } from '@/data/articles'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof articles>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
      setResults(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return { query, setQuery, results, isLoading }
}
