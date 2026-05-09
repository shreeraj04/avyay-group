import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Financial insights, market updates, and investment tips from the Avyay Group team.',
}

export const revalidate = 300

type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  publishedAt?: string
  coverImage?: { asset: { _ref: string } }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  let posts: Post[] = []
  try {
    posts = await client.fetch(postsQuery)
  } catch {
    posts = []
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <div
          className="py-16 text-white text-center"
          style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--teal)' }}>
            Insights & Updates
          </p>
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="mt-3 text-gray-300 max-w-lg mx-auto">
            Financial insights, market updates, and investment tips from our team.
          </p>
        </div>

        {/* Posts Grid */}
        <section className="py-16" style={{ background: '#F9FAFB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
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
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="relative h-52">
                        {post.coverImage ? (
                          <Image
                            src={urlFor(post.coverImage).width(500).height(260).url()}
                            alt={post.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center" style={{ background: 'var(--teal-light)' }}>
                            <Image src="/assets/Avyay Group Logo (Retouch).png" alt="Avyay Group" width={64} height={64} className="object-contain opacity-30" />
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
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
                      </div>

                      <Link href={`/blog/${post.slug.current}`}>
                        <h2 className="text-lg font-bold mb-2 line-clamp-2 hover:text-[--teal] transition-colors" style={{ color: 'var(--navy)', '--teal': '#0D9B8E' } as React.CSSProperties}>
                          {post.title}
                        </h2>
                      </Link>

                      {post.excerpt && (
                        <p className="text-sm text-gray-500 mb-4 line-clamp-3">{post.excerpt}</p>
                      )}

                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
                        style={{ color: 'var(--teal)' }}
                      >
                        Read More <ArrowRight size={13} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
