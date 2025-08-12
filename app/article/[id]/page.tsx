import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CommentSection } from '@/components/comment-section'
import { SocialShare } from '@/components/social-share'
import { RelatedArticles } from '@/components/related-articles'
import { Clock, Eye, Calendar, ArrowLeft, Share2 } from 'lucide-react'

// Mock article data - in a real app, this would come from a database
const getArticle = (id: string) => {
  const articles = {
    '1': {
      id: 1,
      title: "Championship Finals Set Historic Matchup This Weekend",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">In what promises to be one of the most exciting championship games in recent memory, two powerhouse teams are set to clash this weekend in a battle that has captured the attention of sports fans worldwide.</p>
          
          <p class="mb-4 sm:mb-6">The road to this championship has been filled with incredible performances, unexpected upsets, and moments that will be remembered for years to come. Both teams have shown exceptional skill and determination throughout the season, making this matchup a true test of athletic excellence.</p>
          
          <h2 class="text-2xl sm:text-3xl font-medium garamond-heading text-gray-900 mt-8 sm:mt-12 mb-4 sm:mb-6">Team Analysis</h2>
          <p class="mb-4 sm:mb-6">The home team comes into this game with a perfect record in their last ten matches, showcasing a balanced attack that has overwhelmed opponents all season. Their defense has been particularly impressive, allowing the fewest points in the league while maintaining an aggressive style that has become their trademark.</p>
          
          <p class="mb-4 sm:mb-6">Meanwhile, the visiting team brings an explosive offense that has broken multiple scoring records this season. Their ability to perform under pressure has been tested time and again, and they've consistently risen to the occasion with performances that have left fans and analysts alike in awe.</p>
          
          <h2 class="text-2xl sm:text-3xl font-medium garamond-heading text-gray-900 mt-8 sm:mt-12 mb-4 sm:mb-6">Key Players to Watch</h2>
          <p class="mb-4 sm:mb-6">Several star players will be crucial to their team's success in this championship game. The MVP candidate from the home team has been in phenomenal form, averaging career-high numbers while leading by example both on and off the field.</p>
          
          <p class="mb-4 sm:mb-6">The visiting team's veteran leader brings years of championship experience to what is largely a young roster. His leadership and clutch performances in crucial moments have been instrumental in getting the team to this point.</p>
          
          <h2 class="text-2xl sm:text-3xl font-medium garamond-heading text-gray-900 mt-8 sm:mt-12 mb-4 sm:mb-6">Historical Context</h2>
          <p class="mb-4 sm:mb-6">This matchup represents more than just a championship - it's a clash of different playing styles, philosophies, and generations of talent. The last time these two teams met in a championship setting was over a decade ago, making this reunion all the more special for longtime fans.</p>
          
          <p class="mb-4 sm:mb-6">Both organizations have rich histories of success, with multiple championships between them. However, this game will determine which team can claim supremacy in what many consider to be the most competitive era in the sport's history.</p>
          
          <h2 class="text-2xl sm:text-3xl font-medium garamond-heading text-gray-900 mt-8 sm:mt-12 mb-4 sm:mb-6">What's at Stake</h2>
          <p class="mb-4 sm:mb-6">Beyond the obvious championship implications, this game carries significant weight for both franchises. For the home team, a victory would cement their dynasty and potentially establish them as one of the greatest teams of all time.</p>
          
          <p class="mb-4 sm:mb-6">For the visitors, winning would validate years of rebuilding and strategic planning, proving that their patient approach to team building can compete with more established powerhouses.</p>
          
          <p class="mb-4 sm:mb-6">Fans can expect a thrilling contest that will showcase the very best of professional sports, with both teams leaving everything on the field in pursuit of championship glory.</p>
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
      tags: ["Championship", "Football", "Analysis", "Preview", "Breaking"]
    },
    '2': {
      id: 2,
      title: "Record-Breaking Performance Shakes Tennis World",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">In a stunning display of athletic prowess that has sent shockwaves through the tennis community, a young athlete has shattered a 20-year-old record that many thought would never be broken.</p>
          
          <p class="mb-4 sm:mb-6">The performance came during what was expected to be a routine match, but quickly transformed into a historic moment that will be remembered for generations. Spectators witnessed something truly special as the athlete pushed the boundaries of what was thought possible in professional tennis.</p>
          
          <h2 class="text-2xl sm:text-3xl font-medium garamond-heading text-gray-900 mt-8 sm:mt-12 mb-4 sm:mb-6">The Record-Breaking Moment</h2>
          <p class="mb-4 sm:mb-6">The previous record had stood since 2003, set by a legendary player during their prime years. Many experts believed the record was untouchable, given the specific circumstances and exceptional skill required to achieve such a feat.</p>
          
          <p class="mb-4 sm:mb-6">However, this young athlete approached the challenge with a combination of modern training techniques, mental preparation, and raw talent that proved to be the perfect formula for success.</p>
          
          <h2 class="text-2xl sm:text-3xl font-medium garamond-heading text-gray-900 mt-8 sm:mt-12 mb-4 sm:mb-6">Expert Analysis</h2>
          <p class="mb-4 sm:mb-6">Tennis analysts and former professionals have been unanimous in their praise for the achievement. The technical aspects of the performance demonstrate a level of skill and precision that typically takes decades to develop.</p>
          
          <p class="mb-4 sm:mb-6">What makes this accomplishment even more remarkable is the athlete's age and relative inexperience at the professional level. This breakthrough performance suggests we may be witnessing the emergence of a generational talent.</p>
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
      tags: ["Tennis", "Records", "Breaking News", "Analysis"]
    }
  }
  
  return articles[id as keyof typeof articles] || articles['1']
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticle(params.id)

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto container-responsive py-6 sm:py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black mb-6 sm:mb-8 inter-body transition-colors group">
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm sm:text-base">Back to Home</span>
        </Link>

        {/* Article Header */}
        <article>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <span className="forbes-category text-xs sm:text-sm">{article.category}</span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 forbes-meta text-xs sm:text-sm">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {article.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {article.views}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {article.publishedAt}
                </div>
              </div>
            </div>

            <h1 className="text-responsive-3xl sm:text-responsive-4xl lg:text-responsive-5xl font-medium garamond-heading text-gray-900 mb-6 sm:mb-8 leading-tight">
              {article.title}
            </h1>

            <p className="text-responsive-base sm:text-responsive-lg lg:text-responsive-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed inter-body">
              {article.excerpt}
            </p>

            {/* Author Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200 gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                  <AvatarFallback className="text-sm">{article.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium inter-body text-sm sm:text-base">{article.author.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500 inter-body">{article.author.bio}</div>
                </div>
              </div>
              
              <SocialShare title={article.title} />
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] mb-8 sm:mb-12 overflow-hidden rounded-lg">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div 
            className="mb-8 sm:mb-12 prose prose-sm sm:prose-base lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-200">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs sm:text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Related Articles */}
          <RelatedArticles currentArticleId={article.id} category={article.category} />

          {/* Comment Section */}
          <CommentSection articleId={article.id} />
        </article>
      </div>
    </div>
  )
}
