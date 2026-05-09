import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const services = [
  { name: 'Fin Sudha', href: '/#services' },
  { name: 'V-Lookup', href: '/#services' },
  { name: 'EFX Motion', href: '/#services' },
  { name: 'Mixed Emotion', href: '/#services' },
]

const quickLinks = [
  { name: 'About Us', href: '/#about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Videos', href: '/videos' },
  { name: 'Contact', href: '/#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--navy)' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/assets/Avyay Group Logo (Retouch).png"
                alt="Avyay Group"
                width={44}
                height={44}
                className="object-contain"
              />
              <span className="font-bold text-lg">Avyay Group</span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Comprehensive financial services and investment solutions tailored for your future.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--teal)' }}>
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--teal)' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--teal)' }}>
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--teal)' }} />
                <span>D.No. 2-4-14A7, Ground Floor, RAAJ TOWERS, Near City Bus Stand, Udupi – 576101</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" style={{ color: 'var(--teal)' }} />
                <a href="mailto:info@avyaygroup.in" className="hover:text-white transition-colors">
                  info@avyaygroup.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" style={{ color: 'var(--teal)' }} />
                <a href="tel:+919483927883" className="hover:text-white transition-colors">
                  +91 94839 27883
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {year} Avyay Group. All rights reserved.</p>
          <p>
            Designed & developed with{' '}
            <span className="text-red-400">♥</span>{' '}
            for avyaygroup.in
          </p>
        </div>
      </div>
    </footer>
  )
}
