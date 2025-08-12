'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, Search, X, Bell, User, Globe } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SearchModal } from '@/components/search-modal'
import { categories } from '@/data/categories'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Top Breaking News Bar */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8">
            <div className="flex items-center space-x-2 sm:space-x-4 text-xs font-medium animate-pulse min-w-0 flex-1">
              <span className="bg-white text-red-600 px-2 py-0.5 rounded text-xs font-bold flex-shrink-0">BREAKING</span>
              <div className="marquee-container flex-1">
                <div className="marquee-text">
                  <span>Championship Finals Set for Historic Weekend Showdown • Record-Breaking Performance Shakes Tennis World • Major Trade Deadline Moves</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-3 text-xs flex-shrink-0">
              <span>Live</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group mr-4 sm:mr-8 lg:mr-12 flex-shrink-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 flex items-center justify-center transition-transform group-hover:scale-110">
                  <span className="text-white font-bold text-sm sm:text-lg">S</span>
                </div>
                <span className="text-lg sm:text-2xl font-bold tracking-tight group-hover:text-red-400 transition-colors">
                  SportsPulse
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1">
              <Link
                href="/"
                className="text-sm font-medium text-white hover:text-red-400 transition-all duration-200 border-b-2 border-transparent hover:border-red-400 pb-1 relative group"
              >
                Home
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 border-b-2 border-transparent hover:border-red-400 pb-1 relative group"
                >
                  {category.name}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              ))}
              <Link
                href="/highlights"
                className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 border-b-2 border-transparent hover:border-red-400 pb-1 relative group"
              >
                Highlights
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link
                href="/schedule"
                className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 border-b-2 border-transparent hover:border-red-400 pb-1 relative group"
              >
                Schedule
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4 ml-auto lg:ml-0">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
              >
                <Search className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-800 relative transition-all duration-200 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
              >
                <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full text-xs animate-pulse"></span>
              </Button>

              {/* Language/Region */}
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-800 hidden md:flex transition-all duration-200 hover:scale-110"
              >
                <Globe className="h-4 w-4" />
              </Button>

              {/* User Account */}
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[300px] bg-black text-white border-gray-800">
                  <div className="flex flex-col space-y-1 mt-8">
                    <Link
                      href="/"
                      className="mobile-nav-item text-base font-medium text-white hover:text-red-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="mobile-nav-item text-base font-medium text-gray-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link 
                      href="/highlights" 
                      className="mobile-nav-item text-base font-medium text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Highlights
                    </Link>
                    <Link 
                      href="/schedule" 
                      className="mobile-nav-item text-base font-medium text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Schedule
                    </Link>
                    <div className="pt-4 border-t border-gray-800 mt-4">
                      <Link 
                        href="/admin" 
                        className="mobile-nav-item text-base font-medium text-gray-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Navigation Bar */}
      <div className="bg-gray-900 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 sm:h-10">
            <div className="flex items-center space-x-3 sm:space-x-6 text-xs overflow-hidden min-w-0 flex-1">
              <span className="text-red-400 font-medium animate-pulse flex-shrink-0">LIVE SCORES</span>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <div className="marquee-container flex-1">
                <div className="marquee-text">
                  <span className="text-gray-300">Lakers 98 - Warriors 95 • Chiefs 21 - Bills 14 • Djokovic def. Nadal 6-4, 6-2</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-xs text-gray-400 flex-shrink-0">
              <span>Updated 2 min ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
