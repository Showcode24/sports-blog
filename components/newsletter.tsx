'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return
    
    setIsLoading(true)
    
    setTimeout(() => {
      setIsSubscribed(true)
      setEmail('')
      setIsLoading(false)
      setTimeout(() => setIsSubscribed(false), 5000)
    }, 1000)
  }

  return (
    <div className="bg-black text-white card-responsive rounded-lg p-8">
      <h3 className="text-responsive-xl sm:text-responsive-2xl font-medium garamond-heading mb-4">
        Newsletter
      </h3>
      
      {isSubscribed ? (
        <div className="text-center py-4 sm:py-6">
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 text-red-400" />
          <p className="font-medium inter-body text-sm sm:text-base">Successfully subscribed!</p>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">Thank you for joining our community.</p>
        </div>
      ) : (
        <>
          <p className="text-gray-300 mb-4 sm:mb-6 inter-body leading-relaxed text-sm sm:text-base">
            Get the latest sports news and analysis delivered to your inbox every morning.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-black border-0 focus:ring-2 focus:ring-red-400 h-10 sm:h-12"
              required
            />
            <Button 
              type="submit" 
              className="w-full bbc-btn-red font-medium inter-body h-10 sm:h-12"
              disabled={isLoading || !email}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          <p className="text-xs text-gray-400 mt-2 sm:mt-3 inter-body">
            Unsubscribe anytime. Privacy policy applies.
          </p>
        </>
      )}
    </div>
  )
}
