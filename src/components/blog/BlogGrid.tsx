'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight, Tag, Clock } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  publishedAt?: string
  readingTime?: number
  coverImage?: { asset: { _ref: string } }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Finance', value: 'finance' },
  { label: 'Investment', value: 'investment' },
  { label: 'Market Update', value: 'market-update' },
  { label: 'Company News', value: 'company-news' },
  { label: 'General', value: 'general' },
]

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter((p) => p.category === activeCategory)

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--teal-light)' }}>
          <Tag size={24} style={{ color: 'var(--teal)' }} />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--navy)' }}>No posts yet</h2>
        <p className="text-gray-600 mb-6">Blog posts will appear here once published from the admin panel.</p>
        <Link href="/studio" className="inline-flex px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: 'var(--teal)' }}>
          Go to Admin Panel
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={
              activeCategory === cat.value
                ? { background: 'var(--teal)', color: '#fff' }
                : { background: '#fff', color: '#374151', border: '1px solid #e5e7eb' }
            }
          >
            {cat.label}
            {cat.value !== 'all' && (
              <span className="ml-1.5 text-xs opacity-60">
                ({posts.filter((p) => p.category === cat.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-500">
              No posts in this category yet.
            </div>
          )}
          {filtered.map((post, i) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Link href={`/blog/${post.slug.current}`}>
                <div className="relative h-52 overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={urlFor(post.coverImage).width(500).height(260).url()}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center" style={{ background: 'var(--teal-light)' }}>
                      <Image src="/assets/Avyay Group Logo (Retouch).png" alt="Avyay Group" width={64} height={64} className="object-contain opacity-30" />
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  {post.category && (
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full capitalize"
                      style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}
                    >
                      {post.category.replace('-', ' ')}
                    </span>
                  )}
                  {post.publishedAt && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      {formatDate(post.publishedAt)}
                    </span>
                  )}
                  {post.readingTime && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={11} />
                      {post.readingTime} min read
                    </span>
                  )}
                </div>

                <Link href={`/blog/${post.slug.current}`}>
                  <h2
                    className="text-lg font-bold mb-2 line-clamp-2 hover:text-[--teal] transition-colors"
                    style={{ color: 'var(--navy)', '--teal': '#0D9B8E' } as React.CSSProperties}
                  >
                    {post.title}
                  </h2>
                </Link>

                {post.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
                )}

                <Link
                  href={`/blog/${post.slug.current}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
                  style={{ color: 'var(--teal)' }}
                >
                  Read More <ArrowRight size={13} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
