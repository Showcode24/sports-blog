'use client'

import { Button } from '@/components/ui/button'
import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { useState } from 'react'

interface SocialShareProps {
  title: string
}

export function SocialShare({ title }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-500 inter-body">Share:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareUrls.facebook, '_blank')}
        className="hover:bg-gray-50"
      >
        <Facebook className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareUrls.twitter, '_blank')}
        className="hover:bg-gray-50"
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareUrls.linkedin, '_blank')}
        className="hover:bg-gray-50"
      >
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="hover:bg-gray-50"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </Button>
    </div>
  )
}
