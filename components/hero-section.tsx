'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'
import { heroArticles } from '@/data/articles'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroArticles.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const currentArticle = heroArticles[currentSlide]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroArticles.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroArticles.length) % heroArticles.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  return (
    <section className="relative bg-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 container-responsive py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <AnimatedSection animation="fadeInLeft" className="order-2 lg:order-1">
            <div className="bbc-category mb-3 sm:mb-4 bbc-red-accent animate-pulse">
              {currentArticle.category}
            </div>
            
            <h1 className="text-responsive-4xl lg:text-responsive-5xl font-medium garamond-heading text-black mb-4 sm:mb-6 leading-tight">
              {currentArticle.title}
            </h1>
            
            <p className="text-responsive-lg sm:text-responsive-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed inter-body">
              {currentArticle.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 sm:mb-8 bbc-meta text-sm">
              <span>By {currentArticle.author.name}</span>
              <span className="hidden sm:inline">•</span>
              <span>{currentArticle.publishedAt}</span>
              <span className="hidden sm:inline">•</span>
              <span>{currentArticle.readTime}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href={`/article/${currentArticle.id}`} className="w-full sm:w-auto">
                <Button className="bbc-btn-primary w-full sm:w-auto px-6 sm:px-8 py-3 text-base group hover:scale-105 transition-all duration-200">
                  Read Full Story
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Button>
              </Link>
              <Link href="/highlights" className="w-full sm:w-auto">
                <Button variant="outline" className="bbc-btn-secondary w-full sm:w-auto px-6 sm:px-8 py-3 text-base group hover:scale-105 transition-all duration-200">
                  <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Watch Highlights
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Image */}
          <AnimatedSection animation="fadeInRight" className="order-1 lg:order-2 relative">
            <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden group rounded-lg">
              <Image
                src={currentArticle.image || "/placeholder.svg"}
                alt={currentArticle.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {currentArticle.breaking && (
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 animate-bounce">
                  <span className="bbc-breaking text-xs sm:text-sm">Breaking</span>
                </div>
              )}
            </div>
            
            {/* Navigation */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-1.5 sm:p-2 bg-black/80 text-white hover:bg-black transition-all duration-200 hover:scale-110 backdrop-blur-sm rounded"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-1.5 sm:p-2 bg-black/80 text-white hover:bg-black transition-all duration-200 hover:scale-110 backdrop-blur-sm rounded"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex space-x-2">
              {heroArticles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-red-600 w-4 sm:w-6' : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
