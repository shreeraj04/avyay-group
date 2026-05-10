'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X, MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '919483927883' // P Shriranjan — no + or spaces

export default function FloatingCTA() {
  const [open, setOpen] = useState(false)

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello! I'd like to learn more about Avyay Group's financial services."
  )}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-64 mb-1"
          >
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--navy)' }}>
              Chat with us
            </p>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              We&apos;re online Mon–Sat, 9 AM–6 PM. Usually reply in minutes.
            </p>
            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: '#25D366' }}
              >
                <MessageCircle size={16} />
                WhatsApp Chat
              </a>
              <a
                href="tel:+919483927883"
                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--teal)' }}
              >
                <Phone size={16} />
                +91 94839 27883
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-colors"
        style={{ background: open ? 'var(--navy)' : '#25D366' }}
        aria-label={open ? 'Close contact options' : 'Contact us on WhatsApp'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
