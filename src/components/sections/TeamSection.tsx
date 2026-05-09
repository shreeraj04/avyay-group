'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone, Linkedin } from 'lucide-react'

const team = [
  {
    name: 'P Shriranjan Upadhyaya',
    role: 'Founder & CEO',
    qualifications: 'MBA Finance, B.Com',
    photo: '/assets/Founder.png',
    email: 'shriranjan.avyaygroup@gmail.com',
    phone: '+91 94839 27883',
    bio: 'A seasoned finance professional with expertise in investment advisory and portfolio management. Shriranjan founded Avyay Group with a vision to make quality financial services accessible to everyone.',
  },
  {
    name: 'P Chinmaya Upadhyaya',
    role: 'Co-Founder & CFO',
    qualifications: 'CA, B.Com',
    photo: '/assets/Co Founder.png',
    email: 'chinmaya.avyaygroup@gmail.com',
    phone: '+91 94485 13073',
    bio: 'A Chartered Accountant with a strong background in taxation, auditing, and financial strategy. Chinmaya ensures Avyay Group operates with the highest standards of financial integrity.',
  },
]

export default function TeamSection() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--teal)' }}>
            Meet the Team
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--navy)' }}>
            Leadership
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Founded and led by experienced finance professionals committed to your financial success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Photo */}
              <div
                className="relative h-96 w-full"
                style={{ background: 'var(--teal-light)' }}
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 10%' }}
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-0.5" style={{ color: 'var(--navy)' }}>
                  {member.name}
                </h3>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--teal)' }}>
                  {member.role}
                </p>
                <p className="text-xs text-gray-500 mb-4">{member.qualifications}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{member.bio}</p>

                <div className="flex flex-col gap-2 text-sm">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-[--teal] transition-colors"
                  >
                    <Mail size={14} style={{ color: 'var(--teal)' }} />
                    {member.email}
                  </a>
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-[--teal] transition-colors"
                  >
                    <Phone size={14} style={{ color: 'var(--teal)' }} />
                    {member.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
