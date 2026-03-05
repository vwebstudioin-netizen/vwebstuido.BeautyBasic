'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiCheck } from 'react-icons/fi'
import type { ParlourInfo } from '@/types'

const HIGHLIGHTS = [
  'Trained and certified beauticians',
  'Premium quality products only',
  'Hygienic & sanitised tools',
  'Personalised service for every client',
  'Special packages for brides & groups',
]

interface AboutSectionProps {
  parlour: ParlourInfo
}

export default function AboutSection({ parlour }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-ivory">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[420px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/about.jpg"
                alt="About us"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
              {/* Fallback gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                <span className="font-display text-7xl text-white/50">✨</span>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-lg p-4 border border-primary-100">
              <div className="font-display text-4xl text-primary font-bold">5+</div>
              <div className="font-body text-muted text-xs">Years of Excellence</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-primary text-sm font-medium tracking-widest uppercase mb-2">
              Who We Are
            </p>
            <h2 className="section-title mb-6">
              Beauty That Feels{' '}
              <span className="text-primary italic">Personal</span>
            </h2>
            <p className="section-subtitle mb-6">{parlour.description}</p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-charcoal">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                    <FiCheck className="text-primary text-xs" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/${parlour.whatsapp}?text=Hi! I'd like to know more about your services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
