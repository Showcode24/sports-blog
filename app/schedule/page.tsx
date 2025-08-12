'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Calendar, Clock, MapPin, ArrowLeft, Bell, BellOff, Plus } from 'lucide-react'
import { upcomingGames } from '@/data/schedule'
import { AnimatedSection } from '@/components/animated-section'

export default function SchedulePage() {
  const [reminders, setReminders] = useState<Set<number>>(new Set())
  
  const featuredGames = upcomingGames.filter(game => game.importance === 'high')
  const regularGames = upcomingGames.filter(game => game.importance !== 'high')

  const handleSetReminder = (gameId: number, gameTitle: string) => {
    const newReminders = new Set(reminders)
    
    if (reminders.has(gameId)) {
      newReminders.delete(gameId)
      setReminders(newReminders)
      toast({
        title: "Reminder Removed",
        description: `You won't be notified about ${gameTitle}`,
      })
    } else {
      newReminders.add(gameId)
      setReminders(newReminders)
      toast({
        title: "Reminder Set",
        description: `You'll be notified before ${gameTitle} starts`,
      })
    }
  }

  const handleAddToCalendar = (game: any) => {
    // Create calendar event data
    const startDate = new Date(`${game.date} ${game.time}`)
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000) // 3 hours later
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(game.homeTeam + ' vs ' + game.awayTeam)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(game.description)}&location=${encodeURIComponent(game.venue)}`
    
    window.open(calendarUrl, '_blank')
    
    toast({
      title: "Calendar Event",
      description: "Opening Google Calendar to add this game",
    })
  }

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto container-responsive py-6 sm:py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black mb-6 sm:mb-8 inter-body transition-colors group">
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm sm:text-base">Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-responsive-4xl sm:text-responsive-5xl font-medium garamond-heading text-gray-900 mb-4 sm:mb-6">
            Sports Schedule
          </h1>
          <p className="text-responsive-base sm:text-responsive-lg lg:text-responsive-xl text-gray-600 max-w-3xl mx-auto inter-body leading-relaxed">
            Stay up to date with upcoming games and matches across all major sports
          </p>
          <div className="w-16 sm:w-24 h-0.5 bg-black mx-auto mt-6 sm:mt-8"></div>
        </div>

        {/* Featured Games */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl font-medium garamond-heading text-gray-900">
              Featured Games
            </h2>
            <Button 
              variant="outline" 
              className="forbes-btn-secondary text-sm sm:text-base"
              onClick={() => {
                const allReminders = new Set([...reminders, ...featuredGames.map(g => g.id)])
                setReminders(allReminders)
                toast({
                  title: "All Reminders Set",
                  description: `Set reminders for ${featuredGames.length} featured games`,
                })
              }}
            >
              <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Set All Reminders
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {featuredGames.map((game) => (
              <AnimatedSection key={game.id} animation="fadeInUp" delay={game.id * 100}>
                <div className="bg-gray-50 p-6 sm:p-8 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex flex-wrap items-center justify-between mb-3 sm:mb-4 gap-2">
                    <Badge className="bg-black text-white text-xs">
                      {game.sport}
                    </Badge>
                    <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 text-xs">
                      Featured
                    </Badge>
                  </div>
                  
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-responsive-xl sm:text-responsive-2xl font-medium garamond-heading text-gray-900 mb-2">
                      {game.homeTeam} vs {game.awayTeam}
                    </h3>
                    <p className="text-gray-600 inter-body text-sm sm:text-base">
                      {game.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3 forbes-meta text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400" />
                      <span>{game.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400" />
                      <span>{game.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400" />
                      <span>{game.venue}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="flex-1 forbes-btn-primary text-sm"
                      onClick={() => handleAddToCalendar(game)}
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Add to Calendar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSetReminder(game.id, `${game.homeTeam} vs ${game.awayTeam}`)}
                      className={`${reminders.has(game.id) ? "bg-red-50 border-red-200 text-red-600" : ""} text-sm`}
                    >
                      {reminders.has(game.id) ? (
                        <BellOff className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* All Upcoming Games */}
        <section>
          <h2 className="text-responsive-2xl sm:text-responsive-3xl font-medium garamond-heading text-gray-900 mb-6 sm:mb-8">
            All Upcoming Games
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            {upcomingGames.map((game) => (
              <AnimatedSection key={game.id} animation="fadeInLeft" delay={game.id * 50}>
                <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {game.sport}
                        </Badge>
                        {game.importance === 'high' && (
                          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 text-xs">
                            Featured
                          </Badge>
                        )}
                        {reminders.has(game.id) && (
                          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-xs">
                            Reminder Set
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-responsive-base sm:text-responsive-xl font-medium garamond-heading text-gray-900 mb-1">
                        {game.homeTeam} vs {game.awayTeam}
                      </h3>
                      
                      <p className="text-gray-600 inter-body text-xs sm:text-sm mb-2 sm:mb-3">
                        {game.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 sm:gap-6 forbes-meta text-xs sm:text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {game.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {game.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {game.venue}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetReminder(game.id, `${game.homeTeam} vs ${game.awayTeam}`)}
                        className={`${reminders.has(game.id) ? "bg-red-50 border-red-200 text-red-600" : ""} text-xs`}
                      >
                        {reminders.has(game.id) ? (
                          <BellOff className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddToCalendar(game)}
                        className="text-xs"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Calendar
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center mt-12 sm:mt-16">
          <Button className="forbes-btn-secondary px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
            View More Games
          </Button>
        </div>
      </div>
      
      <Toaster />
    </div>
  )
}
