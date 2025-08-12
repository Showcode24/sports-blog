'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, ThumbsUp, Reply } from 'lucide-react'

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies?: Comment[]
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Excellent analysis! I completely agree with your take on the defensive strategies. This championship game is going to be absolutely incredible to watch. The level of preparation from both teams is unprecedented.",
    timestamp: "2 hours ago",
    likes: 12,
    replies: [
      {
        id: 2,
        author: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "The defensive matchups will definitely be the key factor in determining the outcome. Both teams have such different approaches.",
        timestamp: "1 hour ago",
        likes: 5
      }
    ]
  },
  {
    id: 3,
    author: "Alex Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I've been following both teams all season long, and this matchup couldn't be more evenly matched. The statistical analysis really supports how close this game will be. Can't wait for game day!",
    timestamp: "3 hours ago",
    likes: 8
  },
  {
    id: 4,
    author: "Jessica Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Great piece of journalism here. The historical context really adds depth to understanding why this game means so much to both franchises and their fan bases.",
    timestamp: "4 hours ago",
    likes: 15
  }
]

interface CommentSectionProps {
  articleId: number
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState('')

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: newComment,
      timestamp: "Just now",
      likes: 0
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const handleSubmitReply = (parentId: number) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: replyContent,
      timestamp: "Just now",
      likes: 0
    }

    setComments(comments.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ))
    
    setReplyContent('')
    setReplyingTo(null)
  }

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12 mt-6' : ''}`}>
      <div className="flex space-x-4">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
          <AvatarFallback>{comment.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-sm inter-body">{comment.author}</span>
              <span className="text-xs text-gray-500 inter-body">{comment.timestamp}</span>
            </div>
            <p className="text-sm inter-body leading-relaxed">{comment.content}</p>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <Button variant="ghost" size="sm" className="text-xs hover:bg-gray-50">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {comment.likes}
            </Button>
            {!isReply && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs hover:bg-gray-50"
                onClick={() => setReplyingTo(comment.id)}
              >
                <Reply className="w-3 h-3 mr-1" />
                Reply
              </Button>
            )}
          </div>
          
          {replyingTo === comment.id && (
            <div className="mt-4">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="mb-3"
                rows={3}
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                  Reply
                </Button>
                <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies && comment.replies.map(reply => (
        <CommentComponent key={reply.id} comment={reply} isReply={true} />
      ))}
    </div>
  )

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <div className="flex items-center mb-8">
        <MessageCircle className="w-6 h-6 mr-3 text-gray-600" />
        <h3 className="text-2xl font-medium garamond-heading text-gray-900">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-12">
        <Textarea
          placeholder="Share your thoughts about this article..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-4"
          rows={4}
        />
        <Button type="submit" disabled={!newComment.trim()} className="forbes-btn-primary">
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="inter-body">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </section>
  )
}
