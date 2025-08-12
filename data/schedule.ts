export interface Game {
  id: number
  homeTeam: string
  awayTeam: string
  sport: string
  date: string
  time: string
  venue: string
  importance: 'high' | 'medium' | 'low'
  description: string
}

export const upcomingGames: Game[] = [
  {
    id: 1,
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    sport: "Basketball",
    date: "December 15, 2024",
    time: "8:00 PM EST",
    venue: "Crypto.com Arena, Los Angeles",
    importance: "high",
    description: "Western Conference showdown between two championship contenders"
  },
  {
    id: 2,
    homeTeam: "Chiefs",
    awayTeam: "Bills",
    sport: "Football",
    date: "December 17, 2024",
    time: "4:30 PM EST",
    venue: "Arrowhead Stadium, Kansas City",
    importance: "high",
    description: "AFC Championship implications on the line"
  },
  {
    id: 3,
    homeTeam: "Djokovic",
    awayTeam: "Nadal",
    sport: "Tennis",
    date: "December 18, 2024",
    time: "2:00 PM EST",
    venue: "Centre Court, Wimbledon",
    importance: "high",
    description: "Legendary rivalry continues in exhibition match"
  },
  {
    id: 4,
    homeTeam: "Fury",
    awayTeam: "Wilder",
    sport: "Boxing",
    date: "December 20, 2024",
    time: "10:00 PM EST",
    venue: "MGM Grand, Las Vegas",
    importance: "high",
    description: "Heavyweight championship unification bout"
  },
  {
    id: 5,
    homeTeam: "Celtics",
    awayTeam: "Heat",
    sport: "Basketball",
    date: "December 22, 2024",
    time: "7:30 PM EST",
    venue: "TD Garden, Boston",
    importance: "medium",
    description: "Eastern Conference rivalry renewed"
  },
  {
    id: 6,
    homeTeam: "Cowboys",
    awayTeam: "Eagles",
    sport: "Football",
    date: "December 24, 2024",
    time: "1:00 PM EST",
    venue: "AT&T Stadium, Dallas",
    importance: "high",
    description: "NFC East division title on the line"
  }
]

export const upcomingGamesWidget = [
  {
    id: 1,
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    sport: "Basketball",
    date: "Dec 15",
    time: "8:00 PM",
    venue: "Crypto.com Arena",
    featured: true
  },
  {
    id: 2,
    homeTeam: "Chiefs",
    awayTeam: "Bills",
    sport: "Football",
    date: "Dec 17",
    time: "4:30 PM",
    venue: "Arrowhead Stadium",
    featured: true
  },
  {
    id: 3,
    homeTeam: "Djokovic",
    awayTeam: "Nadal",
    sport: "Tennis",
    date: "Dec 18",
    time: "2:00 PM",
    venue: "Centre Court",
    featured: false
  }
]
