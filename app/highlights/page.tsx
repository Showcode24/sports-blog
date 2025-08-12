'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Clock, Eye, ArrowLeft, Pause, Volume2, Maximize, Share } from 'lucide-react'
import { highlights } from '@/data/highlights'
import { AnimatedSection } from '@/components/animated-section'

export default function HighlightsPage() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const [featuredVideo, setFeaturedVideo] = useState(highlights[0])

  const handlePlayVideo = (id: number) => {
    setPlayingVideo(playingVideo === id ? null : id)
  }

  const handleFeaturedPlay = () => {
    setPlayingVideo(playingVideo === featuredVideo.id ? null : featuredVideo.id)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto container-responsive py-6 sm:py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black mb-6 sm:mb-8 inter-body transition-colors group">
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm sm:text-base">Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-responsive-4xl sm:text-responsive-5xl font-medium garamond-heading text-gray-900 mb-4 sm:mb-6">
            Sports Highlights
          </h1>
          <p className="text-responsive-base sm:text-responsive-lg lg:text-responsive-xl text-gray-600 max-w-3xl mx-auto inter-body leading-relaxed">
            Watch the most exciting moments from recent games and matches across all major sports
          </p>
          <div className="w-16 sm:w-24 h-0.5 bg-black mx-auto mt-6 sm:mt-8"></div>
        </div>

        {/* Featured Highlight */}
        <section className="mb-12 sm:mb-16">
          <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px] overflow-hidden rounded-lg mb-6 sm:mb-8 group">
            <Image
              src={featuredVideo.thumbnail || "/placeholder.svg"}
              alt={featuredVideo.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button 
                size="lg" 
                className="bg-white/90 text-black hover:bg-white rounded-full p-4 sm:p-6 group-hover:scale-110 transition-all duration-200"
                onClick={handleFeaturedPlay}
              >
                {playingVideo === featuredVideo.id ? (
                  <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
                ) : (
                  <Play className="w-6 h-6 sm:w-8 sm:h-8" />
                )}
              </Button>
            </div>
            
            {/* Video Controls Overlay */}
            {playingVideo === featuredVideo.id && (
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-black/80 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-white hover:bg-white/20 p-1 sm:p-2"
                      onClick={handleFeaturedPlay}
                    >
                      <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1 sm:p-2">
                      <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <span className="text-xs sm:text-sm">0:45 / {featuredVideo.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1 sm:p-2">
                      <Share className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1 sm:p-2">
                      <Maximize className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
                <div className="w-full bg-white/30 rounded-full h-1 mt-2 sm:mt-3">
                  <div className="bg-red-600 h-1 rounded-full w-1/3"></div>
                </div>
              </div>
            )}
            
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <Badge className="mb-2 sm:mb-3 bg-white/90 text-black text-xs">
                {featuredVideo.category}
              </Badge>
              <h2 className="text-responsive-2xl sm:text-responsive-3xl font-medium garamond-heading text-white mb-2">
                {featuredVideo.title}
              </h2>
              <p className="text-white/90 inter-body mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">
                {featuredVideo.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/80 text-xs sm:text-sm inter-body">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {featuredVideo.duration}
                </div>
                <div className="flex items-center">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {featuredVideo.views}
                </div>
                <span>{featuredVideo.publishedAt}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Grid */}
        <section>
          <h2 className="text-responsive-2xl sm:text-responsive-3xl font-medium garamond-heading text-gray-900 mb-6 sm:mb-8">
            Recent Highlights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {highlights.slice(1).map((highlight) => (
              <article key={highlight.id} className="group cursor-pointer">
                <div className="relative h-40 sm:h-48 overflow-hidden rounded-lg mb-3 sm:mb-4">
                  <Image
                    src={highlight.thumbnail || "/placeholder.svg"}
                    alt={highlight.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Button 
                      size="sm" 
                      className="bg-white/90 text-black hover:bg-white rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handlePlayVideo(highlight.id)}
                    >
                      {playingVideo === highlight.id ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded inter-body">
                    {highlight.duration}
                  </div>
                  
                  {/* Playing indicator */}
                  {playingVideo === highlight.id && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded inter-body animate-pulse">
                      Playing
                    </div>
                  )}
                </div>
                
                <div className="forbes-category mb-2 text-xs">
                  {highlight.category}
                </div>
                
                <h3 className="text-responsive-base sm:text-responsive-xl font-medium garamond-heading text-gray-900 mb-2 group-hover:text-black line-clamp-2">
                  {highlight.title}
                </h3>
                
                <p className="text-gray-600 mb-2 sm:mb-3 line-clamp-2 inter-body text-xs sm:text-sm">
                  {highlight.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 forbes-meta text-xs">
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {highlight.views}
                  </div>
                  <span>{highlight.publishedAt}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center mt-12 sm:mt-16">
          <Button className="forbes-btn-secondary px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
            Load More Highlights
          </Button>
        </div>
      </div>
    </div>
  )
}
