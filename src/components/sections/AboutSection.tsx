'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const highlights = [
  'Personalised investment advisory',
  'Risk assessment and portfolio management',
  'Financial planning for individuals & families',
  'Corporate financial consulting',
  'Market research and insights',
  'Transparent, client-first approach',
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--teal)' }}>
              Who We Are
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: 'var(--navy)' }}>
              Your Trusted Partner in Financial Growth
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Avyay Group is a full-spectrum financial services company headquartered in Udupi, Karnataka.
              We combine deep market expertise with a personalised approach to help individuals, families,
              and businesses achieve their financial goals.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Founded by experienced finance professionals, Avyay Group brings together advisory services
              across investment management, financial planning, and specialized wealth-building tools — all
              under one roof.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--teal)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — visual card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="rounded-2xl p-8 text-white"
              style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}
            >
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                To empower every client with the knowledge, tools, and guidance needed to build lasting financial security.
              </p>

              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                To be the most trusted financial services group in coastal Karnataka, known for integrity, innovation, and impact.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--teal)' }}>3+</p>
                  <p className="text-xs text-gray-400">Years in Business</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--teal)' }}>₹10Cr+</p>
                  <p className="text-xs text-gray-400">Assets Managed</p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10"
              style={{ background: 'var(--teal-light)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
