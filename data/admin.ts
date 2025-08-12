export interface AdminArticle {
  id: number
  title: string
  category: string
  status: 'Published' | 'Draft' | 'Scheduled'
  views: string
  publishedAt: string
  author: string
}

export const mockArticles: AdminArticle[] = [
  {
    id: 1,
    title: "Championship Finals Set Historic Matchup This Weekend",
    category: "Football",
    status: "Published",
    views: "15.2k",
    publishedAt: "2 hours ago",
    author: "Sarah Johnson"
  },
  {
    id: 2,
    title: "Record-Breaking Performance Shakes Tennis World",
    category: "Tennis",
    status: "Draft",
    views: "0",
    publishedAt: "Draft",
    author: "Michael Chen"
  },
  {
    id: 3,
    title: "Trade Deadline Shakeup: Major Moves Across the League",
    category: "Basketball",
    status: "Published",
    views: "18.5k",
    publishedAt: "1 day ago",
    author: "Alex Thompson"
  },
  {
    id: 4,
    title: "MVP Race Heats Up: Top Candidates Analysis",
    category: "Basketball",
    status: "Published",
    views: "11.7k",
    publishedAt: "1 day ago",
    author: "Jordan Lee"
  },
  {
    id: 5,
    title: "Heavyweight Championship: The Fight of the Century",
    category: "Boxing",
    status: "Scheduled",
    views: "0",
    publishedAt: "Dec 20, 2024",
    author: "Carlos Rivera"
  }
]

export const mockStats = {
  totalArticles: 127,
  totalViews: 1200000,
  monthlyViews: 89000,
  subscribers: 15300,
  comments: 2840,
  authors: 12
}
