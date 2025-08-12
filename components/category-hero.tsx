'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Play, TrendingUp, Clock, Eye } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'

interface CategoryHeroProps {
  categoryName: string
  description: string
  featuredArticles: Array<{
    id: number
    title: string
    excerpt: string
    image: string
    readTime: string
    views: string
    publishedAt: string
    author: string
    breaking?: boolean
  }>
}

export function CategoryHero({ categoryName, description, featuredArticles }: CategoryHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || featuredArticles.length <= 1) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, featuredArticles.length])

  const currentArticle = featuredArticles[currentSlide] || featuredArticles[0]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length)
    setIsAutoPlaying(false)
  }

  if (!currentArticle) return null

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentArticle.image || "/placeholder.svg"}
          alt={currentArticle.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Content */}
          <AnimatedSection animation="fadeInLeft" className="z-10">
            {/* Category Badge */}
            <div className="flex items-center space-x-4 mb-6">
              <Badge className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors">
                {categoryName}
              </Badge>
              {currentArticle.breaking && (
                <Badge className="bg-white text-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider animate-pulse">
                  Breaking
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-medium garamond-heading text-white mb-6 leading-tight">
              {currentArticle.title}
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed inter-body max-w-2xl">
              {currentArticle.excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex items-center space-x-6 mb-8 text-gray-300 inter-body">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium">{currentArticle.author.charAt(0)}</span>
                </div>
                <span className="text-sm">By {currentArticle.author}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentArticle.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {currentArticle.views}
                </div>
                <span>{currentArticle.publishedAt}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/article/${currentArticle.id}`}>
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base font-medium group transition-all duration-200 hover:scale-105">
                  Read Full Story
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Button>
              </Link>
              <Link href="/highlights">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-base font-medium group transition-all duration-200 hover:scale-105">
                  <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Watch Highlights
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Featured Articles Sidebar */}
          <AnimatedSection animation="fadeInRight" className="z-10">
            <div className="bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium garamond-heading text-white">
                  More {categoryName} Stories
                </h3>
                <TrendingUp className="w-5 h-5 text-red-400" />
              </div>
              
              <div className="space-y-4">
                {featuredArticles.slice(0, 3).map((article, index) => (
                  <Link key={article.id} href={`/article/${article.id}`} className="group block">
                    <div className="flex gap-4 p-3 hover:bg-white/10 rounded-lg transition-all duration-200">
                      <div className="relative w-16 h-12 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white group-hover:text-red-400 line-clamp-2 transition-colors duration-200">
                          {article.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                          <span>{article.publishedAt}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-700">
                <Link href={`/category/${categoryName.toLowerCase()}`} className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors group">
                  View All {categoryName} News
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Navigation Controls */}
        {featuredArticles.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
            <button
              onClick={prevSlide}
              className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {featuredArticles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-red-600 w-8' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Category Description */}
      <div className="relative bg-gradient-to-r from-gray-900 to-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatedSection animation="fadeInUp">
            <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto inter-body leading-relaxed">
              {description}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
