'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowDown } from 'react-icons/fi'
import type { ParlourInfo } from '@/types'

interface HeroSectionProps {
  parlour: ParlourInfo
}

export default function HeroSection({ parlour }: HeroSectionProps) {
  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={parlour.heroImage}
          alt={parlour.name}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            // Fallback gradient if image not found
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/70 via-charcoal/50 to-primary-900/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-custom text-center py-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-body mb-6"
        >
          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
          Premium Beauty & Wellness
        </motion.div>

        {/* Parlour name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl text-white font-light leading-tight mb-4"
        >
          {parlour.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-body text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10"
        >
          {parlour.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`https://wa.me/${parlour.whatsapp}?text=Hi! I'd like to book an appointment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-body font-medium text-base transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <FaWhatsapp size={20} />
            Book on WhatsApp
          </a>

          <button
            onClick={scrollToServices}
            className="flex items-center gap-2 bg-white/15 backdrop-blur-sm hover:bg-white/25 border border-white/40 text-white px-8 py-4 rounded-full font-body font-medium text-base transition-all duration-300"
          >
            Explore Services
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '2000+', label: 'Happy Clients' },
            { value: '20+', label: 'Services' },
            { value: '4.9★', label: 'Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl text-white font-semibold">{stat.value}</div>
              <div className="font-body text-white/70 text-xs tracking-wide mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.button
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <FiArrowDown size={24} />
      </motion.button>
    </section>
  )
}
