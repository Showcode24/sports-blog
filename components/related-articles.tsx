import Image from 'next/image'
import Link from 'next/link'

interface RelatedArticlesProps {
  currentArticleId: number
  category: string
}

const relatedArticles = [
  {
    id: 3,
    title: "Championship Preview: What to Expect This Weekend",
    excerpt: "Complete breakdown of team strategies and key players to watch.",
    image: "/championship-preview-analysis.png",
    category: "Football",
    readTime: "6 min read",
    publishedAt: "1 day ago"
  },
  {
    id: 4,
    title: "Player Spotlight: From Rookie to MVP in Record Time",
    excerpt: "The incredible journey of this season's most improved player.",
    image: "/mvp-spotlight-celebration.png",
    category: "Football",
    readTime: "5 min read",
    publishedAt: "2 days ago"
  },
  {
    id: 5,
    title: "Tennis Rankings Shake-Up After Historic Tournament",
    excerpt: "Major changes in world rankings following unprecedented performances.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Tennis",
    readTime: "4 min read",
    publishedAt: "3 days ago"
  }
]

export function RelatedArticles({ currentArticleId, category }: RelatedArticlesProps) {
  const filtered = relatedArticles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 3)

  return (
    <section className="mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h3 className="text-3xl font-medium garamond-heading text-gray-900 mb-8">
        Related Articles
      </h3>
      
      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map((article) => (
          <article key={article.id} className="group">
            <Link href={`/article/${article.id}`}>
              <div className="relative h-48 mb-4 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="forbes-category mb-2">
                {article.category}
              </div>
              
              <h4 className="text-lg font-medium garamond-heading text-gray-900 mb-2 group-hover:text-black line-clamp-2">
                {article.title}
              </h4>
              
              <p className="text-gray-600 mb-3 line-clamp-2 inter-body text-sm">
                {article.excerpt}
              </p>
              
              <div className="flex items-center space-x-2 forbes-meta">
                <span>{article.publishedAt}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
