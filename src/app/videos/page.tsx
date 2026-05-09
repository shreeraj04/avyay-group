import type { Metadata } from 'next'
import { PlayCircle } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { videosQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch financial insights, investment guides, and market analysis videos from Avyay Group.',
}

export const revalidate = 300

type Video = {
  _id: string
  title: string
  youtubeUrl: string
  description?: string
  category?: string
  publishedAt?: string
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtube\.com\/shorts\/([^?]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default async function VideosPage() {
  let videos: Video[] = []
  try {
    videos = await client.fetch(videosQuery)
  } catch {
    videos = []
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
            Watch & Learn
          </p>
          <h1 className="text-4xl font-bold">Videos</h1>
          <p className="mt-3 text-gray-300 max-w-lg mx-auto">
            Financial insights, market analysis, and investment guides — all in one place.
          </p>
        </div>

        {/* Videos Grid */}
        <section className="py-16" style={{ background: '#F9FAFB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {videos.length === 0 ? (
              <div className="text-center py-20">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'var(--teal-light)' }}
                >
                  <PlayCircle size={28} style={{ color: 'var(--teal)' }} />
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--navy)' }}>
                  No videos yet
                </h2>
                <p className="text-gray-600">
                  Videos will appear here once added from the admin panel.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => {
                  const videoId = getYouTubeId(video.youtubeUrl)
                  if (!videoId) return null
                  const embedUrl = `https://www.youtube.com/embed/${videoId}`

                  return (
                    <div
                      key={video._id}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      {/* Responsive YouTube Embed */}
                      <div className="relative" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          src={embedUrl}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                          loading="lazy"
                        />
                      </div>

                      <div className="p-5">
                        {video.category && (
                          <span
                            className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 capitalize"
                            style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}
                          >
                            {video.category.replace('-', ' ')}
                          </span>
                        )}
                        <h3 className="font-bold text-base mb-2 line-clamp-2" style={{ color: 'var(--navy)' }}>
                          {video.title}
                        </h3>
                        {video.description && (
                          <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
