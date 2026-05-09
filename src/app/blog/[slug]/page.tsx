import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 300

type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  publishedAt?: string
  coverImage?: { asset: { _ref: string } }
  body?: unknown[]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post: Post | null = await client.fetch(postBySlugQuery, { slug }).catch(() => null)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts: Post[] = await client.fetch(postsQuery).catch(() => [])
  return posts.map((p) => ({ slug: p.slug.current }))
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => (
      <div className="my-6 rounded-xl overflow-hidden">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt ?? 'Blog image'}
          width={800}
          height={450}
          className="w-full object-cover"
        />
      </div>
    ),
  },
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post: Post | null = null
  try {
    post = await client.fetch(postBySlugQuery, { slug })
  } catch {
    post = null
  }

  if (!post) notFound()

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        {post.coverImage ? (
          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src={urlFor(post.coverImage).width(1200).height(500).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" style={{ background: 'rgba(15,39,68,0.5)' }} />
          </div>
        ) : (
          <div
            className="h-32 w-full"
            style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}
          />
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:gap-3 transition-all"
            style={{ color: 'var(--teal)' }}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {post.category && (
              <span
                className="text-xs font-medium px-3 py-1 rounded-full capitalize"
                style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}
              >
                <Tag size={10} className="inline mr-1" />
                {post.category.replace('-', ' ')}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar size={13} />
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight" style={{ color: 'var(--navy)' }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-600 mb-8 leading-relaxed border-l-4 pl-4" style={{ borderColor: 'var(--teal)' }}>
              {post.excerpt}
            </p>
          )}

          {/* Portable Text Body */}
          {post.body && (
            <div className="prose-content">
              <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={portableTextComponents} />
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ background: 'var(--teal)' }}
            >
              <ArrowLeft size={14} /> All Blog Posts
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
