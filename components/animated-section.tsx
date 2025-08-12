'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn'
  delay?: number
}

export function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0 
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  const animationClasses = {
    fadeInUp: 'translate-y-8 opacity-0',
    fadeInLeft: '-translate-x-8 opacity-0',
    fadeInRight: 'translate-x-8 opacity-0',
    fadeIn: 'opacity-0',
    scaleIn: 'scale-95 opacity-0'
  }

  const visibleClasses = {
    fadeInUp: 'translate-y-0 opacity-100',
    fadeInLeft: 'translate-x-0 opacity-100',
    fadeInRight: 'translate-x-0 opacity-100',
    fadeIn: 'opacity-100',
    scaleIn: 'scale-100 opacity-100'
  }

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? visibleClasses[animation] : animationClasses[animation]}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
