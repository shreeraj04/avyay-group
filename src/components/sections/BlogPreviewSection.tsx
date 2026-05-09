import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { recentPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  publishedAt?: string
  coverImage?: { asset: { _ref: string } }
}

async function getRecentPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(recentPostsQuery, {}, { next: { revalidate: 300 } })
    return posts ?? []
  } catch {
    return []
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function BlogPreviewSection() {
  const posts = await getRecentPosts()

  return (
    <section id="blog-preview" className="py-20" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--teal)' }}>
              Insights
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--navy)' }}>
              Latest from the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:gap-2.5"
            style={{ color: 'var(--teal)' }}
          >
            View All Posts <ArrowRight size={14} />
          </Link>
        </div>

        {posts.length === 0 ? (
          /* Placeholder cards when no posts exist yet */
          <div className="grid md:grid-cols-3 gap-6">
            {['Market Update: Q1 2026 Investment Outlook', 'Understanding Mutual Funds: A Beginner\'s Guide', 'Top 5 Financial Planning Tips for 2026'].map((title, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="h-44 flex items-center justify-center" style={{ background: 'var(--teal-light)' }}>
                  <Image src="/assets/Avyay Group Logo (Retouch).png" alt="Avyay Group" width={60} height={60} className="object-contain opacity-40" />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-medium px-2 py-1 rounded mb-3" style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}>Finance</span>
                  <h3 className="font-bold text-base mb-2 line-clamp-2" style={{ color: 'var(--navy)' }}>{title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">Expert insights from the Avyay Group team to help you navigate your financial journey.</p>
                  <Link href="/blog" className="text-sm font-semibold flex items-center gap-1" style={{ color: 'var(--teal)' }}>
                    Read More <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative h-44">
                  {post.coverImage ? (
                    <Image
                      src={urlFor(post.coverImage).width(400).height(200).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center" style={{ background: 'var(--teal-light)' }}>
                      <Image src="/assets/Avyay Group Logo (Retouch).png" alt="Avyay Group" width={60} height={60} className="object-contain opacity-40" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {post.category && (
                    <span className="inline-block text-xs font-medium px-2 py-1 rounded mb-3 capitalize" style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}>
                      {post.category.replace('-', ' ')}
                    </span>
                  )}
                  <h3 className="font-bold text-base mb-2 line-clamp-2" style={{ color: 'var(--navy)' }}>{post.title}</h3>
                  {post.excerpt && <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>}
                  {post.publishedAt && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                      <Calendar size={11} />
                      {formatDate(post.publishedAt)}
                    </div>
                  )}
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color: 'var(--teal)' }}
                  >
                    Read More <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--teal)' }}>
            View All Posts <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
