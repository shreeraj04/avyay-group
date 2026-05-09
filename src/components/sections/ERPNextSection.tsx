'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, Monitor, Settings, BarChart3, FileText } from 'lucide-react'

const erpFeatures = [
  { icon: Monitor, text: 'Complete ERP implementation & setup' },
  { icon: Settings, text: 'Customization for your business workflows' },
  { icon: BarChart3, text: 'Financial reporting & real-time dashboards' },
  { icon: FileText, text: 'Accounting, invoicing & payroll integration' },
]

const erpModules = [
  'Accounts & Finance',
  'Inventory Management',
  'HR & Payroll',
  'CRM & Sales',
  'Purchase Management',
  'Manufacturing',
  'GST-ready Reporting',
  'Multi-branch Support',
]

export default function ERPNextSection() {
  return (
    <section id="erpnext" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--teal)' }}>
            Business Software
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--navy)' }}>
            ERPNext Implementation Partner
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Through <strong>Neelvinyas Solutions</strong>, Avyay Group is an authorised ERPNext
            implementation partner — helping businesses digitise, automate, and scale operations
            with India&apos;s most powerful open-source ERP.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-14 items-start mb-16">
          {/* Left — Screenshots */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Large image top-left */}
            <div className="col-span-2 rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <Image
                src="/assets/14.png"
                alt="ERPNext Dashboard"
                width={700}
                height={400}
                className="w-full object-cover"
              />
            </div>
            {/* Two smaller below */}
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <Image
                src="/assets/11.png"
                alt="ERPNext Modules"
                width={340}
                height={220}
                className="w-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <Image
                src="/assets/9.png"
                alt="ERPNext Reports"
                width={340}
                height={220}
                className="w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>
              End-to-End ERP for Your Business
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              ERPNext is a fully integrated, open-source business management solution — covering
              accounting, inventory, HR, CRM, manufacturing, and more. We handle everything from
              setup and data migration to training and ongoing support.
            </p>

            <div className="space-y-3 mb-8">
              {erpFeatures.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--teal-light)' }}
                  >
                    <Icon size={16} style={{ color: 'var(--teal)' }} />
                  </div>
                  <span className="text-sm text-gray-700">{text}</span>
                </div>
              ))}
            </div>

            {/* Modules grid */}
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--navy)' }}>
              Modules Covered
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {erpModules.map((mod) => (
                <div key={mod} className="flex items-center gap-2 text-xs text-gray-700">
                  <CheckCircle size={13} style={{ color: 'var(--teal)' }} />
                  {mod}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Neelvinyas Solutions Partnership Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
          style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image side */}
            <div className="relative min-h-[240px]">
              <Image
                src="/assets/15.png"
                alt="Neelvinyas Solutions ERPNext Partnership"
                fill
                className="object-cover"
              />
            </div>
            {/* Text side */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-5">
                <Image
                  src="/assets/Neelvinyas Logo.png"
                  alt="Neelvinyas Solutions"
                  width={120}
                  height={50}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Neelvinyas Solutions — Our ERP Division
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">
                Neelvinyas Solutions is the dedicated technology arm of Avyay Group, specialising in
                ERPNext implementation, customisation, and support for SMEs across Karnataka and beyond.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold self-start text-white"
                style={{ background: 'var(--teal)' }}
              >
                Request ERP Demo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
