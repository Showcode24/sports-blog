export interface CategoryData {
  name: string
  description: string
  articles: Array<{
    id: number
    title: string
    excerpt: string
    image: string
    readTime: string
    views: string
    publishedAt: string
    author: string
    featured: boolean
    breaking: boolean
  }>
}

export const categoryData: Record<string, CategoryData> = {
  football: {
    name: 'Football',
    description: 'Comprehensive coverage of professional football including game analysis, player profiles, trade news, and championship updates.',
    articles: [
      {
        id: 1,
        title: "Championship Finals Set Historic Matchup This Weekend",
        excerpt: "Two powerhouse teams prepare for what could be the most exciting championship game in decades, with both sides bringing unprecedented talent.",
        image: "/championship-finals-stadium.png",
        readTime: "8 min read",
        views: "15.2k",
        publishedAt: "2 hours ago",
        author: "Sarah Johnson",
        featured: true,
        breaking: true
      },
      {
        id: 2,
        title: "Draft Analysis: Top Prospects to Watch This Season",
        excerpt: "Breaking down the most promising college players entering the professional draft and their potential impact on team dynamics.",
        image: "/placeholder.svg?height=300&width=400",
        readTime: "7 min read",
        views: "8.3k",
        publishedAt: "1 day ago",
        author: "Mike Rodriguez",
        featured: true,
        breaking: false
      },
      {
        id: 3,
        title: "Injury Report: Key Players Return for Playoffs",
        excerpt: "Several star players are expected to return from injury just in time for the postseason, potentially changing championship odds.",
        image: "/athlete-injury-recovery.png",
        readTime: "4 min read",
        views: "6.1k",
        publishedAt: "2 days ago",
        author: "Emma Davis",
        featured: false,
        breaking: false
      }
    ]
  },
  basketball: {
    name: 'Basketball',
    description: 'Complete NBA coverage including game recaps, player statistics, trade analysis, and playoff predictions.',
    articles: [
      {
        id: 6,
        title: "Trade Deadline Shakeup: Major Moves Across the League",
        excerpt: "Several blockbuster trades reshape team dynamics as playoffs approach, with championship contenders making bold moves.",
        image: "/placeholder.svg?height=300&width=400",
        readTime: "6 min read",
        views: "18.5k",
        publishedAt: "3 hours ago",
        author: "Alex Thompson",
        featured: true,
        breaking: true
      },
      {
        id: 7,
        title: "MVP Race Heats Up: Top Candidates Analysis",
        excerpt: "Breaking down the leading contenders for this year's Most Valuable Player award with statistical comparisons.",
        image: "/mvp-spotlight-celebration.png",
        readTime: "8 min read",
        views: "11.7k",
        publishedAt: "1 day ago",
        author: "Jordan Lee",
        featured: true,
        breaking: false
      }
    ]
  },
  tennis: {
    name: 'Tennis',
    description: 'Grand Slam coverage, player rankings, tournament analysis, and professional tennis insights.',
    articles: [
      {
        id: 9,
        title: "Record-Breaking Performance Shakes Tennis World",
        excerpt: "Young athlete breaks 20-year-old record in stunning display of skill and determination that has experts amazed.",
        image: "/tennis-victory-celebration.png",
        readTime: "5 min read",
        views: "12.8k",
        publishedAt: "4 hours ago",
        author: "Michael Chen",
        featured: true,
        breaking: true
      }
    ]
  },
  boxing: {
    name: 'Boxing',
    description: 'Professional boxing coverage including fight previews, results, rankings, and championship news.',
    articles: [
      {
        id: 11,
        title: "Heavyweight Championship: The Fight of the Century",
        excerpt: "Two undefeated champions prepare for the most anticipated bout in years, with legacy and titles on the line.",
        image: "/placeholder.svg?height=300&width=400",
        readTime: "6 min read",
        views: "22.1k",
        publishedAt: "1 day ago",
        author: "Carlos Rivera",
        featured: true,
        breaking: false
      }
    ]
  },
  athletics: {
    name: 'Athletics',
    description: 'Track and field events, Olympic coverage, world records, and athletic achievements.',
    articles: [
      {
        id: 12,
        title: "World Record Attempt: Sprinter Eyes Historic Mark",
        excerpt: "Olympic champion prepares for attempt at breaking the 100m world record in upcoming international meet.",
        image: "/placeholder.svg?height=300&width=400",
        readTime: "4 min read",
        views: "9.7k",
        publishedAt: "6 hours ago",
        author: "David Park",
        featured: true,
        breaking: false
      }
    ]
  }
}

export const categories = [
  { name: 'Football', href: '/category/football', articles: 24 },
  { name: 'Basketball', href: '/category/basketball', articles: 18 },
  { name: 'Tennis', href: '/category/tennis', articles: 12 },
  { name: 'Boxing', href: '/category/boxing', articles: 8 },
  { name: 'Athletics', href: '/category/athletics', articles: 15 }
]
