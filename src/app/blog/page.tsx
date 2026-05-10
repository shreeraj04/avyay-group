import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BlogGrid from '@/components/blog/BlogGrid'
import { client } from '@/sanity/lib/client'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Financial insights, market updates, and investment tips from the Avyay Group team.',
}

export const revalidate = 300

const postsWithReadingTimeQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  coverImage,
  "readingTime": round(length(pt::text(body)) / 5 / 180)
}`

export default async function BlogPage() {
  let posts = []
  try {
    posts = await client.fetch(postsWithReadingTimeQuery)
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

        {/* Posts Grid with category filter */}
        <section className="py-16" style={{ background: '#F9FAFB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogGrid posts={posts} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
