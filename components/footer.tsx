import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto container-responsive py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">S</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold garamond-heading">SportsPulse</span>
            </div>
            <p className="text-gray-400 inter-body leading-relaxed text-sm sm:text-base">
              Your ultimate destination for sports news, analysis, and insights across all major sports.
            </p>
          </div>

          {/* Sports */}
          <div>
            <h3 className="font-medium text-base sm:text-lg mb-3 sm:mb-4 garamond-heading">Sports</h3>
            <ul className="space-y-1 sm:space-y-2 inter-body text-sm sm:text-base">
              <li><Link href="/category/football" className="text-gray-400 hover:text-white transition-colors">Football</Link></li>
              <li><Link href="/category/basketball" className="text-gray-400 hover:text-white transition-colors">Basketball</Link></li>
              <li><Link href="/category/tennis" className="text-gray-400 hover:text-white transition-colors">Tennis</Link></li>
              <li><Link href="/category/boxing" className="text-gray-400 hover:text-white transition-colors">Boxing</Link></li>
              <li><Link href="/category/athletics" className="text-gray-400 hover:text-white transition-colors">Athletics</Link></li>
            </ul>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-medium text-base sm:text-lg mb-3 sm:mb-4 garamond-heading">Content</h3>
            <ul className="space-y-1 sm:space-y-2 inter-body text-sm sm:text-base">
              <li><Link href="/news" className="text-gray-400 hover:text-white transition-colors">Latest News</Link></li>
              <li><Link href="/highlights" className="text-gray-400 hover:text-white transition-colors">Highlights</Link></li>
              <li><Link href="/schedule" className="text-gray-400 hover:text-white transition-colors">Schedule</Link></li>
              <li><Link href="/analysis" className="text-gray-400 hover:text-white transition-colors">Analysis</Link></li>
              <li><Link href="/profiles" className="text-gray-400 hover:text-white transition-colors">Player Profiles</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-base sm:text-lg mb-3 sm:mb-4 garamond-heading">Company</h3>
            <ul className="space-y-1 sm:space-y-2 inter-body text-sm sm:text-base">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 inter-body text-sm sm:text-base">&copy; {new Date().getFullYear()} SportsPulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
