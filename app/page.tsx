import { HeroSection } from '@/components/hero-section'
import { FeaturedArticles } from '@/components/featured-articles'
import { TrendingNews } from '@/components/trending-news'
import { UpcomingGames } from '@/components/upcoming-games'
import { SportsCategories } from '@/components/sports-categories'
import { Newsletter } from '@/components/newsletter'
import { AnimatedSection } from '@/components/animated-section'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection />
      <SportsCategories />
      <FeaturedArticles />
      
      <AnimatedSection>
        <div className="bbc-divider"></div>
      </AnimatedSection>
      
      <div className="max-w-7xl mx-auto py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrendingNews />
          </div>
          <div className="space-y-6 sm:space-y-8">
            <UpcomingGames />
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  )
}
