'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { toast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { PlusCircle, Edit, Trash2, Eye, BarChart3, Users, FileText, Settings, Search, Filter, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { mockArticles, mockStats, AdminArticle } from '@/data/admin'
import { AnimatedSection } from '@/components/animated-section'

interface NewArticle {
  title: string
  content: string
  category: string
  excerpt: string
  tags: string
  featured: boolean
  breaking: boolean
  status: 'Draft' | 'Published' | 'Scheduled'
  scheduledDate?: string
}

export default function AdminPage() {
  const [articles, setArticles] = useState<AdminArticle[]>(mockArticles)
  const [filteredArticles, setFilteredArticles] = useState<AdminArticle[]>(mockArticles)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<AdminArticle | null>(null)
  const [newArticle, setNewArticle] = useState<NewArticle>({
    title: '',
    content: '',
    category: '',
    excerpt: '',
    tags: '',
    featured: false,
    breaking: false,
    status: 'Draft'
  })

  // Filter articles based on search and filters
  useEffect(() => {
    let filtered = articles

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(article => article.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(article => article.category === categoryFilter)
    }

    setFilteredArticles(filtered)
  }, [articles, searchQuery, statusFilter, categoryFilter])

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newArticle.title || !newArticle.content || !newArticle.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    const article: AdminArticle = {
      id: Date.now(),
      title: newArticle.title,
      category: newArticle.category,
      status: newArticle.status,
      views: newArticle.status === 'Published' ? '0' : '0',
      publishedAt: newArticle.status === 'Published' ? 'Just now' : 
                   newArticle.status === 'Scheduled' ? newArticle.scheduledDate || 'Scheduled' : 'Draft',
      author: "Admin"
    }

    setArticles([article, ...articles])
    setNewArticle({ 
      title: '', 
      content: '', 
      category: '', 
      excerpt: '', 
      tags: '', 
      featured: false, 
      breaking: false,
      status: 'Draft'
    })
    setIsCreateModalOpen(false)
    
    toast({
      title: "Success",
      description: `Article ${newArticle.status === 'Published' ? 'published' : 'saved as draft'} successfully!`,
    })
  }

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id))
    toast({
      title: "Article Deleted",
      description: "The article has been permanently deleted.",
    })
  }

  const handlePublishArticle = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id 
        ? { ...article, status: "Published" as const, publishedAt: "Just now", views: "0" }
        : article
    ))
    toast({
      title: "Article Published",
      description: "The article is now live on your website.",
    })
  }

  const handleUnpublishArticle = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id 
        ? { ...article, status: "Draft" as const, publishedAt: "Draft", views: "0" }
        : article
    ))
    toast({
      title: "Article Unpublished",
      description: "The article has been moved back to drafts.",
    })
  }

  const handleEditArticle = (article: AdminArticle) => {
    setEditingArticle(article)
    setNewArticle({
      title: article.title,
      content: '',
      category: article.category,
      excerpt: '',
      tags: '',
      featured: false,
      breaking: false,
      status: article.status
    })
  }

  const handleUpdateArticle = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingArticle) return

    setArticles(articles.map(article => 
      article.id === editingArticle.id 
        ? { ...article, title: newArticle.title, category: newArticle.category, status: newArticle.status }
        : article
    ))
    
    setEditingArticle(null)
    setNewArticle({ 
      title: '', 
      content: '', 
      category: '', 
      excerpt: '', 
      tags: '', 
      featured: false, 
      breaking: false,
      status: 'Draft'
    })
    
    toast({
      title: "Article Updated",
      description: "The article has been successfully updated.",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Published':
        return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
      case 'Draft':
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
      case 'Scheduled':
        return <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto container-responsive py-6 sm:py-8">
        <AnimatedSection animation="fadeInUp">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-responsive-3xl sm:text-responsive-4xl font-medium garamond-heading text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 inter-body mt-1 sm:mt-2 text-sm sm:text-base">Manage your sports blog content and analytics</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Badge variant="outline" className="text-xs sm:text-sm">
                SportsPulse CMS v2.0
              </Badge>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bbc-btn-primary w-full sm:w-auto">
                    <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-sm sm:text-base">New Article</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto mx-4">
                  <DialogHeader>
                    <DialogTitle className="garamond-heading text-lg sm:text-xl">Create New Article</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateArticle} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Title *</label>
                        <Input
                          placeholder="Enter article title..."
                          value={newArticle.title}
                          onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                          required
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Category *</label>
                        <Select value={newArticle.category} onValueChange={(value) => setNewArticle({...newArticle, category: value})}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Football">Football</SelectItem>
                            <SelectItem value="Basketball">Basketball</SelectItem>
                            <SelectItem value="Tennis">Tennis</SelectItem>
                            <SelectItem value="Boxing">Boxing</SelectItem>
                            <SelectItem value="Athletics">Athletics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Excerpt</label>
                      <Textarea
                        placeholder="Brief description of the article..."
                        value={newArticle.excerpt}
                        onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                        rows={3}
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Content *</label>
                      <Textarea
                        placeholder="Write your article content here..."
                        value={newArticle.content}
                        onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                        rows={6}
                        required
                        className="text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Tags</label>
                        <Input
                          placeholder="Enter tags separated by commas..."
                          value={newArticle.tags}
                          onChange={(e) => setNewArticle({...newArticle, tags: e.target.value})}
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Status</label>
                        <Select value={newArticle.status} onValueChange={(value: 'Draft' | 'Published' | 'Scheduled') => setNewArticle({...newArticle, status: value})}>
                          <SelectTrigger className="text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Save as Draft</SelectItem>
                            <SelectItem value="Published">Publish Now</SelectItem>
                            <SelectItem value="Scheduled">Schedule for Later</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {newArticle.status === 'Scheduled' && (
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Scheduled Date</label>
                        <Input
                          type="datetime-local"
                          value={newArticle.scheduledDate}
                          onChange={(e) => setNewArticle({...newArticle, scheduledDate: e.target.value})}
                          className="text-sm"
                        />
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newArticle.featured}
                          onChange={(e) => setNewArticle({...newArticle, featured: e.target.checked})}
                          className="rounded"
                        />
                        <span className="text-xs sm:text-sm inter-body">Featured Article</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newArticle.breaking}
                          onChange={(e) => setNewArticle({...newArticle, breaking: e.target.checked})}
                          className="rounded"
                        />
                        <span className="text-xs sm:text-sm inter-body">Breaking News</span>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 border-t">
                      <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)} className="text-sm">
                        Cancel
                      </Button>
                      <Button type="submit" className="bbc-btn-primary text-sm">
                        {newArticle.status === 'Published' ? 'Publish Article' : 
                         newArticle.status === 'Scheduled' ? 'Schedule Article' : 'Save Draft'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </AnimatedSection>

        <Tabs defaultValue="overview" className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 text-xs sm:text-sm">
            <TabsTrigger value="overview" className="px-2 sm:px-4">Overview</TabsTrigger>
            <TabsTrigger value="articles" className="px-2 sm:px-4">Articles ({articles.length})</TabsTrigger>
            <TabsTrigger value="analytics" className="px-2 sm:px-4">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="px-2 sm:px-4">Settings</TabsTrigger>
            <TabsTrigger value="users" className="px-2 sm:px-4">Users</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <AnimatedSection animation="fadeInUp" delay={0}>
                <Card className="bbc-card hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 inter-body">Total Articles</p>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold garamond-heading">{articles.length}</p>
                        <p className="text-xs text-green-600 inter-body">+{articles.filter(a => a.status === 'Published').length} published</p>
                      </div>
                      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="fadeInUp" delay={100}>
                <Card className="bbc-card hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 inter-body">Total Views</p>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold garamond-heading">{(mockStats.totalViews / 1000000).toFixed(1)}M</p>
                        <p className="text-xs text-green-600 inter-body">+12% from last month</p>
                      </div>
                      <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="fadeInUp" delay={200}>
                <Card className="bbc-card hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 inter-body">Subscribers</p>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold garamond-heading">{(mockStats.subscribers / 1000).toFixed(1)}K</p>
                        <p className="text-xs text-green-600 inter-body">+22% from last month</p>
                      </div>
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={300}>
                <Card className="bbc-card hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 inter-body">Drafts</p>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold garamond-heading">{articles.filter(a => a.status === 'Draft').length}</p>
                        <p className="text-xs text-yellow-600 inter-body">Pending review</p>
                      </div>
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <AnimatedSection animation="fadeInLeft">
                <Card className="bbc-card">
                  <CardHeader>
                    <CardTitle className="garamond-heading text-lg sm:text-xl">Recent Articles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      {articles.slice(0, 5).map((article) => (
                        <div key={article.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium inter-body truncate text-sm sm:text-base">{article.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-500 inter-body">{article.category} • {article.publishedAt}</p>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            {getStatusIcon(article.status)}
                            <Badge className={`${getStatusColor(article.status)} text-xs`}>
                              {article.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight">
                <Card className="bbc-card">
                  <CardHeader>
                    <CardTitle className="garamond-heading text-lg sm:text-xl">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <Button 
                      className="w-full justify-start bbc-btn-primary text-sm"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Create New Article
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Site Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </TabsContent>

          {/* Articles Management */}
          <TabsContent value="articles">
            <AnimatedSection animation="fadeInUp">
              <Card className="bbc-card">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="flex items-center garamond-heading text-lg sm:text-xl">
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Manage Articles
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                        <Input
                          placeholder="Search articles..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8 sm:pl-10 w-full sm:w-64 text-sm"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-32 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full sm:w-32 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="Football">Football</SelectItem>
                          <SelectItem value="Basketball">Basketball</SelectItem>
                          <SelectItem value="Tennis">Tennis</SelectItem>
                          <SelectItem value="Boxing">Boxing</SelectItem>
                          <SelectItem value="Athletics">Athletics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {filteredArticles.map((article, index) => (
                      <AnimatedSection key={article.id} animation="fadeInLeft" delay={index * 50}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                              {getStatusIcon(article.status)}
                              <h3 className="font-medium text-base sm:text-lg garamond-heading truncate">{article.title}</h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 inter-body">
                              <Badge variant="outline" className="text-xs">{article.category}</Badge>
                              <span>By {article.author}</span>
                              <span className="hidden sm:inline">{article.publishedAt}</span>
                              {article.status === 'Published' && (
                                <div className="flex items-center">
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  {article.views}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                            <Badge className={`${getStatusColor(article.status)} text-xs`}>
                              {article.status}
                            </Badge>
                            
                            {article.status === 'Draft' && (
                              <Button 
                                size="sm" 
                                onClick={() => handlePublishArticle(article.id)}
                                className="bbc-btn-primary text-xs"
                              >
                                Publish
                              </Button>
                            )}
                            
                            {article.status === 'Published' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleUnpublishArticle(article.id)}
                                className="text-xs"
                              >
                                Unpublish
                              </Button>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditArticle(article)}
                              className="text-xs"
                            >
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                                >
                                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="mx-4">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-lg">Delete Article</AlertDialogTitle>
                                  <AlertDialogDescription className="text-sm">
                                    Are you sure you want to delete "{article.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                  <AlertDialogCancel className="text-sm">Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteArticle(article.id)}
                                    className="bg-red-600 hover:bg-red-700 text-sm"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                    
                    {filteredArticles.length === 0 && (
                      <div className="text-center py-8 sm:py-12 text-gray-500">
                        <FileText className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-300" />
                        <p className="inter-body text-sm sm:text-base">No articles found matching your criteria.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {[
                { title: 'Total Views', value: `${(mockStats.totalViews / 1000000).toFixed(1)}M`, change: '+12%', icon: BarChart3, color: 'text-blue-500' },
                { title: 'Monthly Views', value: `${(mockStats.monthlyViews / 1000).toFixed(0)}K`, change: '+8%', icon: Eye, color: 'text-green-500' },
                { title: 'Comments', value: `${(mockStats.comments / 1000).toFixed(1)}K`, change: '+15%', icon: Users, color: 'text-orange-500' },
                { title: 'Subscribers', value: `${(mockStats.subscribers / 1000).toFixed(1)}K`, change: '+22%', icon: Users, color: 'text-purple-500' }
              ].map((stat, index) => (
                <AnimatedSection key={stat.title} animation="fadeInUp" delay={index * 100}>
                  <Card className="bbc-card hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-600 inter-body">{stat.title}</p>
                          <p className="text-lg sm:text-xl lg:text-2xl font-bold garamond-heading">{stat.value}</p>
                          <p className="text-xs text-green-600 inter-body">{stat.change} from last month</p>
                        </div>
                        <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <AnimatedSection animation="fadeInLeft">
                <Card className="bbc-card">
                  <CardHeader>
                    <CardTitle className="garamond-heading text-lg sm:text-xl">Top Performing Articles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      {articles.filter(a => a.status === 'Published').slice(0, 5).map((article, index) => (
                        <div key={article.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium inter-body truncate text-sm sm:text-base">{article.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-500 inter-body">{article.category}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-semibold inter-body text-sm sm:text-base">{article.views} views</p>
                            <p className="text-xs sm:text-sm text-gray-500 inter-body">{article.publishedAt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight">
                <Card className="bbc-card">
                  <CardHeader>
                    <CardTitle className="garamond-heading text-lg sm:text-xl">Category Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      {['Football', 'Basketball', 'Tennis', 'Boxing', 'Athletics'].map((category, index) => {
                        const categoryCount = articles.filter(a => a.category === category).length
                        const percentage = Math.round((categoryCount / articles.length) * 100)
                        return (
                          <div key={category} className="flex items-center justify-between">
                            <span className="inter-body text-sm sm:text-base">{category}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-red-600 h-2 rounded-full transition-all duration-500" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs sm:text-sm text-gray-500 inter-body w-12 sm:w-16">{categoryCount} ({percentage}%)</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <AnimatedSection animation="fadeInLeft">
                <Card className="bbc-card">
                  <CardHeader>
                    <CardTitle className="garamond-heading text-lg sm:text-xl">Site Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Site Name</label>
                      <Input defaultValue="SportsPulse" className="text-sm" />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Site Description</label>
                      <Textarea 
                        defaultValue="Your ultimate sports destination for news, highlights, and analysis." 
                        rows={3}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Contact Email</label>
                      <Input defaultValue="admin@sportspulse.com" type="email" className="text-sm" />
                    </div>
                    <Button className="bbc-btn-primary text-sm">Save Settings</Button>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight">
                <Card className="bbc-card">
                  <CardHeader>
                    <CardTitle className="garamond-heading text-lg sm:text-xl">Content Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs sm:text-sm font-medium inter-body">Auto-publish scheduled articles</label>
                        <p className="text-xs text-gray-500">Automatically publish articles at their scheduled time</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs sm:text-sm font-medium inter-body">Enable comments</label>
                        <p className="text-xs text-gray-500">Allow readers to comment on articles</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs sm:text-sm font-medium inter-body">Email notifications</label>
                        <p className="text-xs text-gray-500">Send email alerts for new comments and articles</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <Button className="bbc-btn-primary text-sm">Save Settings</Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users">
            <AnimatedSection animation="fadeInUp">
              <Card className="bbc-card">
                <CardHeader>
                  <CardTitle className="garamond-heading text-lg sm:text-xl">User Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="space-y-3">
                    {['Sarah Johnson', 'Michael Chen', 'Alex Thompson', 'Jordan Lee', 'Emma Davis'].map((author, index) => (
                      <AnimatedSection key={author} animation="fadeInLeft" delay={index * 100}>
                        <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                              <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} alt={author} />
                              <AvatarFallback className="text-xs sm:text-sm">{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-medium inter-body text-sm sm:text-base">{author}</span>
                              <p className="text-xs sm:text-sm text-gray-500">Sports Journalist</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">Author</Badge>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full text-sm">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Edit Article Modal */}
      <Dialog open={!!editingArticle} onOpenChange={() => setEditingArticle(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto mx-4">
          <DialogHeader>
            <DialogTitle className="garamond-heading text-lg sm:text-xl">Edit Article</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateArticle} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Title</label>
                <Input
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                  required
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Category</label>
                <Select value={newArticle.category} onValueChange={(value) => setNewArticle({...newArticle, category: value})}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Football">Football</SelectItem>
                    <SelectItem value="Basketball">Basketball</SelectItem>
                    <SelectItem value="Tennis">Tennis</SelectItem>
                    <SelectItem value="Boxing">Boxing</SelectItem>
                    <SelectItem value="Athletics">Athletics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-xs sm:text-sm font-medium mb-2 block inter-body">Status</label>
              <Select value={newArticle.status} onValueChange={(value: 'Draft' | 'Published' | 'Scheduled') => setNewArticle({...newArticle, status: value})}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setEditingArticle(null)} className="text-sm">
                Cancel
              </Button>
              <Button type="submit" className="bbc-btn-primary text-sm">
                Update Article
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <Toaster />
    </div>
  )
}
