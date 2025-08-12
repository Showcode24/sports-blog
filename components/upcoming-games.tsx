import Link from 'next/link'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'
import { upcomingGamesWidget } from '@/data/schedule'

export function UpcomingGames() {
  return (
    <AnimatedSection animation="fadeInUp">
      <div className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-2xl font-medium garamond-heading text-black mb-6">
          Upcoming Games
        </h3>
        
        <div className="space-y-6">
          {upcomingGamesWidget.map((game, index) => (
            <AnimatedSection 
              key={game.id} 
              animation="fadeInLeft" 
              delay={index * 100}
            >
              <div className="bg-white p-6 bbc-card-hover border-l-4 border-red-600 rounded-r-lg transition-all duration-200 hover:shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="bbc-category bbc-red-accent">{game.sport}</span>
                  {game.featured && (
                    <span className="text-xs font-semibold text-red-600 inter-body animate-pulse">Featured</span>
                  )}
                </div>
                
                <div className="text-center mb-4">
                  <h4 className="text-lg font-medium garamond-heading text-black">
                    {game.homeTeam} vs {game.awayTeam}
                  </h4>
                </div>
                
                <div className="space-y-2 bbc-meta">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-red-600" />
                    {game.date} at {game.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-600" />
                    {game.venue}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/schedule" className="text-sm font-medium text-gray-600 hover:text-red-600 inter-body transition-colors group">
            View Full Schedule 
            <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
