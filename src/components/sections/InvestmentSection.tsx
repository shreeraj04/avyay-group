'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, PieChart, Target, Landmark } from 'lucide-react'

const whyInvest = [
  {
    icon: TrendingUp,
    title: 'Beat Inflation',
    desc: 'Keep your money growing faster than inflation with the right investment mix.',
  },
  {
    icon: Target,
    title: 'Goal-Based Planning',
    desc: 'Whether it\'s buying a home, children\'s education, or retirement — we build a plan around your goals.',
  },
  {
    icon: PieChart,
    title: 'Diversified Portfolio',
    desc: 'Spread risk across mutual funds, equities, fixed income, and alternative assets.',
  },
  {
    icon: Landmark,
    title: 'Tax-Efficient Growth',
    desc: 'Invest in ELSS, NPS, and PPF to grow wealth while saving on taxes.',
  },
]

const galleryImages = [
  { src: '/assets/5.png', alt: 'Investment Growth Pyramid' },
  { src: '/assets/3.png', alt: 'Investment Options Overview' },
  { src: '/assets/8.png', alt: 'Portfolio Allocation' },
  { src: '/assets/38.png', alt: 'Market Insights' },
]

export default function InvestmentSection() {
  return (
    <section id="invest" className="py-20" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--teal)' }}>
            Grow Your Wealth
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--navy)' }}>
            Smart Investment Solutions
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            From first-time investors to seasoned wealth builders — we offer structured,
            transparent investment solutions tailored to every stage of life.
          </p>
        </motion.div>

        {/* Why Invest cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {whyInvest.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'var(--teal-light)' }}
              >
                <item.icon size={22} style={{ color: 'var(--teal)' }} />
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: 'var(--navy)' }}>
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Image gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--teal)' }}
          >
            Start Investing Today
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
