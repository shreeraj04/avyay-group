'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Service {
  name: string
  tagline: string
  logo: string
  showcaseImage?: string
  description: string
  features: string[]
  color: string
}

const services: Service[] = [
  {
    name: 'Fin Sudha',
    tagline: 'Essence of Modern Finance',
    logo: '/assets/Fin Sudha Logo.png',
    showcaseImage: '/assets/12.png',
    description:
      'A comprehensive financial planning and investment advisory platform. Fin Sudha guides you through mutual funds, fixed deposits, PPF, and more — with personalized strategies built around your risk profile and goals.',
    features: ['Mutual Fund Advisory', 'Portfolio Management', 'SIP Planning', 'Goal-Based Investing'],
    color: '#0D9B8E',
  },
  {
    name: 'V-Lookup',
    tagline: 'Smart Investment Research',
    logo: '/assets/Avyay Group Logo (Retouch).png',
    description:
      'V-Lookup provides deep-dive market research and valuation tools to help investors make data-driven decisions. Access comprehensive stock analysis and sector reports at your fingertips.',
    features: ['Stock Valuation', 'Sector Analysis', 'Market Reports', 'Investment Screening'],
    color: '#1A3A5C',
  },
  {
    name: 'EFX Motion',
    tagline: 'Digital Marketing & Fintech',
    logo: '/assets/EFX Motion Logo (A1).png',
    showcaseImage: '/assets/26.jpeg',
    description:
      'EFX Motion powers businesses forward with result-driven digital marketing and fintech innovation — from brand campaigns and social media strategies to financial automation tools.',
    features: ['Social Media Marketing', 'SEO & Content', 'Brand Strategy', 'Fintech Automation'],
    color: '#0F2744',
  },
  {
    name: 'Mixed Emotion',
    tagline: 'Behavioural Finance & Wellness',
    logo: '/assets/Avyay Group Logo (Retouch).png',
    description:
      'Money is emotional. Mixed Emotion helps you understand the psychology of investing, manage financial stress, and build healthier money habits through coaching and structured programs.',
    features: ['Financial Coaching', 'Behavioural Analysis', 'Stress Management', 'Money Mindset'],
    color: '#6B46C1',
  },
  {
    name: 'Professional Accounting',
    tagline: 'Precision in Every Number',
    logo: '/assets/Avyay Group Logo (Retouch).png',
    showcaseImage: '/assets/13.png',
    description:
      'End-to-end accounting and compliance services for businesses of all sizes. From bookkeeping and GST filing to statutory audits — we keep your financials clean, accurate, and fully compliant.',
    features: ['Bookkeeping & MIS', 'GST & Tax Filing', 'Statutory Audit', 'Payroll Management'],
    color: '#1A7A4A',
  },
  {
    name: 'Neelvinyas Solutions',
    tagline: 'ERPNext Implementation Partner',
    logo: '/assets/Neelvinyas Logo.png',
    description:
      "Avyay Group's technology arm — Neelvinyas Solutions brings enterprise-grade ERP to growing businesses. As certified ERPNext partners, we deploy, customise, and support end-to-end digital transformation.",
    features: ['ERPNext Deployment', 'Custom Modules', 'Data Migration', 'Ongoing Support'],
    color: '#B45309',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20" style={{ background: '#F9FAFB' }}>
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
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--navy)' }}>
            Our Services & Products
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Six specialised divisions, one unified mission — to grow and protect your financial future.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* Optional showcase image */}
              {service.showcaseImage && (
                <div className="relative w-full h-40 flex-shrink-0">
                  <Image
                    src={service.showcaseImage}
                    alt={`${service.name} showcase`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${service.color}55, transparent)` }}
                  />
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Logo + Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${service.color}15` }}
                  >
                    <Image
                      src={service.logo}
                      alt={service.name}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold leading-tight" style={{ color: 'var(--navy)' }}>
                      {service.name}
                    </h3>
                    <p className="text-xs font-medium mt-0.5" style={{ color: service.color }}>
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{service.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-1.5 mb-5">
                  {service.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-1.5 text-xs text-gray-700 px-2.5 py-1.5 rounded-lg"
                      style={{ background: `${service.color}10` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.color }} />
                      {feat}
                    </div>
                  ))}
                </div>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
                  style={{ color: service.color }}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
