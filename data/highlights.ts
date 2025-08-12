export interface Highlight {
  id: number
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  category: string
  publishedAt: string
}

export const highlights: Highlight[] = [
  {
    id: 1,
    title: "Championship Game Winning Goal",
    description: "The moment that decided the championship - an incredible last-minute goal that sent fans into a frenzy.",
    thumbnail: "/championship-finals-stadium.png",
    duration: "2:45",
    views: "125K",
    category: "Football",
    publishedAt: "2 hours ago"
  },
  {
    id: 2,
    title: "Record-Breaking Tennis Serve",
    description: "Witness the serve that broke a 20-year-old speed record and left spectators in complete awe.",
    thumbnail: "/tennis-victory-celebration.png",
    duration: "1:30",
    views: "89K",
    category: "Tennis",
    publishedAt: "4 hours ago"
  },
  {
    id: 3,
    title: "Basketball Buzzer Beater",
    description: "An impossible shot from half-court that sealed the victory in the final seconds of the game.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    duration: "3:12",
    views: "156K",
    category: "Basketball",
    publishedAt: "1 day ago"
  },
  {
    id: 4,
    title: "Boxing Knockout Compilation",
    description: "The most spectacular knockouts from this month's championship fights.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    duration: "4:20",
    views: "203K",
    category: "Boxing",
    publishedAt: "2 days ago"
  },
  {
    id: 5,
    title: "Olympic Sprint Final",
    description: "The thrilling finish to the 100m final that had everyone on the edge of their seats.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    duration: "2:15",
    views: "178K",
    category: "Athletics",
    publishedAt: "3 days ago"
  },
  {
    id: 6,
    title: "Football Trick Play Success",
    description: "An ingenious trick play that caught the defense completely off guard.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    duration: "1:45",
    views: "92K",
    category: "Football",
    publishedAt: "4 days ago"
  }
]
