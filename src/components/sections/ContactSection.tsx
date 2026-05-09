'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--teal)' }}>
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--navy)' }}>
            Start Your Financial Journey
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Talk to our advisors and discover the right financial plan for your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className="rounded-2xl p-8 h-full text-white"
              style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}
            >
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(13,155,142,0.2)' }}>
                    <MapPin size={18} style={{ color: 'var(--teal)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Office Address</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      D.No. 2-4-14A7, Ground Floor,<br />
                      RAAJ TOWERS, Near City Bus Stand,<br />
                      Udupi – 576101, Karnataka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(13,155,142,0.2)' }}>
                    <Mail size={18} style={{ color: 'var(--teal)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Email</p>
                    <a href="mailto:info@avyaygroup.in" className="text-sm text-gray-300 hover:text-white transition-colors">
                      info@avyaygroup.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(13,155,142,0.2)' }}>
                    <Phone size={18} style={{ color: 'var(--teal)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Phone</p>
                    <a href="tel:+919483927883" className="block text-sm text-gray-300 hover:text-white transition-colors">
                      P Shriranjan: +91 94839 27883
                    </a>
                    <a href="tel:+919448513073" className="block text-sm text-gray-300 hover:text-white transition-colors">
                      P Chinmaya: +91 94485 13073
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400">Office Hours</p>
                <p className="text-sm font-semibold mt-1">Mon – Sat: 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {status === 'success' ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-10">
                  <CheckCircle size={56} className="mx-auto mb-4" style={{ color: 'var(--teal)' }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--navy)' }}>Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-5 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ background: 'var(--teal)' }}
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[--teal] focus:ring-1 transition"
                      style={{ '--teal': '#0D9B8E' } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[--teal] focus:ring-1 transition"
                      style={{ '--teal': '#0D9B8E' } as React.CSSProperties}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[--teal] focus:ring-1 transition"
                      style={{ '--teal': '#0D9B8E' } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[--teal] focus:ring-1 transition bg-white"
                      style={{ '--teal': '#0D9B8E' } as React.CSSProperties}
                    >
                      <option value="">Select a topic</option>
                      <option value="investment-advisory">Investment Advisory</option>
                      <option value="portfolio-review">Portfolio Review</option>
                      <option value="fin-sudha">Fin Sudha</option>
                      <option value="v-lookup">V-Lookup</option>
                      <option value="efx-motion">EFX Motion</option>
                      <option value="mixed-emotion">Mixed Emotion</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your financial goals and how we can help..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[--teal] focus:ring-1 transition resize-none"
                    style={{ '--teal': '#0D9B8E' } as React.CSSProperties}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600">Something went wrong. Please try again or email us directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                  style={{ background: 'var(--teal)' }}
                >
                  <Send size={16} />
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
