export interface Article {
  id: number
  title: string
  content?: string
  excerpt: string
  image: string
  category: string
  readTime: string
  views: string
  publishedAt: string
  author: {
    name: string
    avatar: string
    bio: string
    twitter?: string
  }
  tags: string[]
  featured?: boolean
  breaking?: boolean
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Championship Finals Set Historic Matchup This Weekend",
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-700 mb-8 leading-relaxed">In what promises to be one of the most exciting championship games in recent memory, two powerhouse teams are set to clash this weekend in a battle that has captured the attention of sports fans worldwide.</p>
        
        <p>The road to this championship has been filled with incredible performances, unexpected upsets, and moments that will be remembered for years to come. Both teams have shown exceptional skill and determination throughout the season, making this matchup a true test of athletic excellence.</p>
        
        <h2 class="text-3xl font-medium garamond-heading text-gray-900 mt-12 mb-6">Team Analysis</h2>
        <p>The home team comes into this game with a perfect record in their last ten matches, showcasing a balanced attack that has overwhelmed opponents all season. Their defense has been particularly impressive, allowing the fewest points in the league while maintaining an aggressive style that has become their trademark.</p>
        
        <p>Meanwhile, the visiting team brings an explosive offense that has broken multiple scoring records this season. Their ability to perform under pressure has been tested time and again, and they've consistently risen to the occasion with performances that have left fans and analysts alike in awe.</p>
        
        <h2 class="text-3xl font-medium garamond-heading text-gray-900 mt-12 mb-6">Key Players to Watch</h2>
        <p>Several star players will be crucial to their team's success in this championship game. The MVP candidate from the home team has been in phenomenal form, averaging career-high numbers while leading by example both on and off the field.</p>
        
        <p>The visiting team's veteran leader brings years of championship experience to what is largely a young roster. His leadership and clutch performances in crucial moments have been instrumental in getting the team to this point.</p>
        
        <h2 class="text-3xl font-medium garamond-heading text-gray-900 mt-12 mb-6">Historical Context</h2>
        <p>This matchup represents more than just a championship - it's a clash of different playing styles, philosophies, and generations of talent. The last time these two teams met in a championship setting was over a decade ago, making this reunion all the more special for longtime fans.</p>
        
        <p>Both organizations have rich histories of success, with multiple championships between them. However, this game will determine which team can claim supremacy in what many consider to be the most competitive era in the sport's history.</p>
        
        <h2 class="text-3xl font-medium garamond-heading text-gray-900 mt-12 mb-6">What's at Stake</h2>
        <p>Beyond the obvious championship implications, this game carries significant weight for both franchises. For the home team, a victory would cement their dynasty and potentially establish them as one of the greatest teams of all time.</p>
        
        <p>For the visitors, winning would validate years of rebuilding and strategic planning, proving that their patient approach to team building can compete with more established powerhouses.</p>
        
        <p>Fans can expect a thrilling contest that will showcase the very best of professional sports, with both teams leaving everything on the field in pursuit of championship glory.</p>
      </div>
    `,
    excerpt: "Two powerhouse teams prepare for what could be the most exciting championship game in decades, with both sides bringing unprecedented talent to the field.",
    image: "/championship-finals-stadium.png",
    category: "Football",
    readTime: "8 min read",
    views: "15.2k",
    publishedAt: "2 hours ago",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Senior Sports Journalist with 15+ years covering professional football",
      twitter: "@sarahjsports"
    },
    tags: ["Championship", "Football", "Analysis", "Preview", "Breaking"],
    featured: true,
    breaking: true
  },
  {
    id: 2,
    title: "Record-Breaking Performance Shakes Tennis World",
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-700 mb-8 leading-relaxed">In a stunning display of athletic prowess that has sent shockwaves through the tennis community, a young athlete has shattered a 20-year-old record that many thought would never be broken.</p>
        
        <p>The performance came during what was expected to be a routine match, but quickly transformed into a historic moment that will be remembered for generations. Spectators witnessed something truly special as the athlete pushed the boundaries of what was thought possible in professional tennis.</p>
        
        <h2 class="text-3xl font-medium garamond-heading text-gray-900 mt-12 mb-6">The Record-Breaking Moment</h2>
        <p>The previous record had stood since 2003, set by a legendary player during their prime years. Many experts believed the record was untouchable, given the specific circumstances and exceptional skill required to achieve such a feat.</p>
        
        <p>However, this young athlete approached the challenge with a combination of modern training techniques, mental preparation, and raw talent that proved to be the perfect formula for success.</p>
        
        <h2 class="text-3xl font-medium garamond-heading text-gray-900 mt-12 mb-6">Expert Analysis</h2>
        <p>Tennis analysts and former professionals have been unanimous in their praise for the achievement. The technical aspects of the performance demonstrate a level of skill and precision that typically takes decades to develop.</p>
        
        <p>What makes this accomplishment even more remarkable is the athlete's age and relative inexperience at the professional level. This breakthrough performance suggests we may be witnessing the emergence of a generational talent.</p>
      </div>
    `,
    excerpt: "Young athlete breaks 20-year-old record in stunning display of skill and determination that has experts calling it the performance of a generation.",
    image: "/tennis-victory-celebration.png",
    category: "Tennis",
    readTime: "6 min read",
    views: "12.8k",
    publishedAt: "4 hours ago",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Tennis correspondent and former professional player",
      twitter: "@mchen_tennis"
    },
    tags: ["Tennis", "Records", "Breaking News", "Analysis"],
    featured: true,
    breaking: true
  },
  {
    id: 3,
    title: "Championship Preview: What to Expect This Weekend",
    excerpt: "Complete breakdown of team strategies and key players to watch.",
    image: "/championship-preview-analysis.png",
    category: "Football",
    readTime: "6 min read",
    views: "8.3k",
    publishedAt: "1 day ago",
    author: {
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Senior Football Analyst"
    },
    tags: ["Football", "Preview", "Analysis"],
    featured: true
  },
  {
    id: 4,
    title: "Player Spotlight: From Rookie to MVP in Record Time",
    excerpt: "The incredible journey of this season's most improved player.",
    image: "/mvp-spotlight-celebration.png",
    category: "Basketball",
    readTime: "5 min read",
    views: "11.7k",
    publishedAt: "2 days ago",
    author: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Basketball Reporter"
    },
    tags: ["Basketball", "Profile", "MVP"],
    featured: false
  }
]

export const heroArticles = articles.filter(article => article.featured).slice(0, 2)

export const featuredArticles = [
  {
    id: 1,
    title: "The Rise of Young Athletes Breaking Barriers in Professional Sports",
    excerpt: "How the new generation is reshaping competitive sports with innovative training methods and mental preparation techniques.",
    image: "/placeholder-8bepw.png",
    category: "Analysis",
    readTime: "8 min read",
    author: "Sarah Johnson",
    publishedAt: "2 hours ago"
  },
  {
    id: 2,
    title: "Championship Preview: What to Expect This Weekend",
    excerpt: "Complete breakdown of team strategies, key players to watch, and predictions for the biggest game of the season.",
    image: "/championship-preview-analysis.png",
    category: "Preview",
    readTime: "6 min read",
    author: "Mike Rodriguez",
    publishedAt: "4 hours ago"
  },
  {
    id: 3,
    title: "Player Spotlight: From Rookie to MVP in Record Time",
    excerpt: "The incredible journey of this season's most improved player and what makes them truly special in today's game.",
    image: "/mvp-spotlight-celebration.png",
    category: "Profile",
    readTime: "5 min read",
    author: "Emma Davis",
    publishedAt: "6 hours ago"
  }
]

export const trendingNews = [
  {
    id: 1,
    title: "Major Trade Sends Star Player to Championship Contender",
    excerpt: "In a shocking move, the league's leading scorer has been traded to a playoff-bound team in what analysts are calling the deal of the decade.",
    image: "/placeholder-u96ip.png",
    category: "Breaking News",
    readTime: "3 min read",
    publishedAt: "30 min ago",
    breaking: true
  },
  {
    id: 2,
    title: "Key Player Expected to Return for Playoffs",
    excerpt: "Medical team optimistic about recovery timeline for the team's star athlete after successful surgery.",
    image: "/athlete-injury-recovery.png",
    category: "Injury Report",
    readTime: "2 min read",
    publishedAt: "1 hour ago",
    breaking: false
  },
  {
    id: 3,
    title: "Record Attendance Expected for Championship Game",
    excerpt: "Ticket sales break previous records as fans prepare for what promises to be a historic matchup.",
    image: "/championship-stadium-crowd.png",
    category: "Championship",
    readTime: "4 min read",
    publishedAt: "2 hours ago",
    breaking: false
  },
  {
    id: 4,
    title: "Young Rookie Makes History with Performance of the Year",
    excerpt: "First-year player achieves milestone that hasn't been reached in over a decade of professional play.",
    image: "/rookie-historic-celebration.png",
    category: "Records",
    readTime: "5 min read",
    publishedAt: "3 hours ago",
    breaking: false
  }
]
