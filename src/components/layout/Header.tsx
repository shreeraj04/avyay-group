'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Team', href: '/#team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Videos', href: '/videos' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/assets/Avyay Group Logo (Retouch).png"
              alt="Avyay Group"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
            <div className="hidden sm:block">
              <p className="font-bold text-lg leading-tight" style={{ color: 'var(--navy)' }}>
                Avyay Group
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[--teal] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/#contact"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: 'var(--teal)' }}
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 px-3 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[--teal] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="mt-2 py-2.5 px-3 rounded-md text-sm font-semibold text-white text-center"
              style={{ background: 'var(--teal)' }}
              onClick={() => setMobileOpen(false)}
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
