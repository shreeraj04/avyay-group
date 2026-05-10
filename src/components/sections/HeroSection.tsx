'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Users } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import LottieAnimation from '@/components/ui/LottieAnimation'

const stats = [
  { label: 'Years of Expertise', value: 3, suffix: '+' },
  { label: 'Happy Clients', value: 50, suffix: '+' },
  { label: 'Services Offered', value: 6, suffix: '' },
  { label: 'Cities Served', value: 5, suffix: '+' },
]

// Free finance animation from LottieFiles (open license).
// Swap this URL with any .json URL from lottiefiles.com to change the animation.
const HERO_LOTTIE_URL = 'https://assets4.lottiefiles.com/packages/lf20_xvrofzfk.json'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 60%, #1a4a6e 100%)' }}
    >
      {/* Background geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'var(--teal)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-5"
          style={{ background: 'var(--gold)' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ background: 'rgba(13,155,142,0.2)', color: 'var(--teal)' }}
            >
              <TrendingUp size={14} />
              <span>Your Trusted Financial Partner</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Grow Your{' '}
              <span style={{ color: 'var(--teal)' }}>Wealth</span>
              <br />
              With Confidence
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
              Avyay Group provides comprehensive financial services — from investment advisory
              to wealth management — designed to secure your financial future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ background: 'var(--teal)' }}
              >
                Explore Services
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-white border border-white/30 hover:border-white/60 transition-all duration-200"
              >
                Talk to an Advisor
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield size={14} style={{ color: 'var(--teal)' }} />
                <span>SEBI Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} style={{ color: 'var(--teal)' }} />
                <span>Trusted by 50+ Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={14} style={{ color: 'var(--teal)' }} />
                <span>3+ Years Experience</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Lottie animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-full max-w-md">
              {/* Lottie — loads from LottieFiles CDN, falls back to logo if unavailable */}
              <LottieAnimation
                src={HERO_LOTTIE_URL}
                className="w-full"
                loop
                autoplay
              />
              {/* Fallback decorative circle shown behind the Lottie */}
              <div
                className="absolute inset-0 -z-10 w-80 h-80 m-auto rounded-full"
                style={{ background: 'rgba(13,155,142,0.08)', border: '1px solid rgba(13,155,142,0.2)' }}
              >
                <Image
                  src="/assets/Avyay Group Logo (Retouch).png"
                  alt="Avyay Group"
                  width={200}
                  height={200}
                  className="object-contain absolute inset-0 m-auto opacity-20"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <p className="text-3xl font-bold text-white">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
