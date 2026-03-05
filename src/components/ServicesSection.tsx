'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiClock, FiTag } from 'react-icons/fi'
import type { Service, ServiceCategory } from '@/types'

const CATEGORIES: { key: ServiceCategory | 'All'; label: string; emoji: string }[] = [
  { key: 'All', label: 'All Services', emoji: '✨' },
  { key: 'Nails', label: 'Nails', emoji: '💅' },
  { key: 'Skin', label: 'Skin Care', emoji: '🌸' },
  { key: 'Hair', label: 'Hair', emoji: '💇' },
  { key: 'Waxing', label: 'Waxing', emoji: '🌿' },
  { key: 'Bridal', label: 'Bridal', emoji: '👰' },
]

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'All'>('All')

  const filtered =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory)

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-primary text-sm font-medium tracking-widest uppercase mb-2"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mt-4 max-w-xl mx-auto"
          >
            From everyday beauty routines to special occasion makeovers, we have you covered.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-primary-50 text-primary hover:bg-primary-100'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card p-6 group"
            >
              {/* Category badge */}
              <span className="inline-block bg-primary-50 text-primary text-xs font-body font-medium px-3 py-1 rounded-full mb-3">
                {service.category}
              </span>

              {/* Service name */}
              <h3 className="font-display text-xl text-charcoal font-semibold mb-2 group-hover:text-primary transition-colors">
                {service.name}
              </h3>

              {/* Description */}
              <p className="font-body text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Price & Duration */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary-100">
                <div className="flex items-center gap-1.5 text-charcoal font-body font-semibold">
                  <FiTag className="text-primary text-sm" />
                  <span className="text-lg">₹{service.price}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted text-xs font-body">
                  <FiClock className="text-sm" />
                  {service.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted font-body py-10">
            No services found in this category.
          </p>
        )}
      </div>
    </section>
  )
}
