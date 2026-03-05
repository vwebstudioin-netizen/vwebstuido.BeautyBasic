'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'
import type { Testimonial } from '@/types'

const DEMO_TESTIMONIALS: Testimonial[] = [
  { id: '1', clientName: 'Priya Reddy', comment: 'Absolutely loved my bridal makeover! The team made me feel like a queen. The attention to detail was incredible and my makeup lasted all day.', rating: 5, service: 'Classic Bridal Package', isVisible: true },
  { id: '2', clientName: 'Anitha Rao', comment: 'Best facial I have ever had! My skin was glowing for days after. The staff is so friendly and professional. Highly recommend the Gold Facial.', rating: 5, service: 'Gold Facial', isVisible: true },
  { id: '3', clientName: 'Sravani M', comment: 'Regular customer here for 2 years. The nail art is always perfect and my pedicure is so relaxing. Great value for money and clean, hygienic salon.', rating: 5, service: 'Gel Manicure', isVisible: true },
  { id: '4', clientName: 'Kavitha N', comment: 'Came in for full body wax and the Rica wax was so gentle on my skin. Zero irritation and super smooth results. Will definitely be back!', rating: 5, service: 'Rica Wax', isVisible: true },
]

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'text-accent' : 'text-gray-200'}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : DEMO_TESTIMONIALS
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((i) => (i - 1 + displayTestimonials.length) % displayTestimonials.length)
  const next = () => setCurrent((i) => (i + 1) % displayTestimonials.length)

  const active = displayTestimonials[current]

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-primary-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-primary text-sm font-medium tracking-widest uppercase mb-2"
          >
            Client Love
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-primary-100 text-center"
            >
              <FaQuoteLeft className="text-primary-200 text-4xl mx-auto mb-6" />

              <StarRating rating={active.rating} />

              <p className="font-body text-muted text-base md:text-lg leading-relaxed mt-4 mb-6 italic">
                &ldquo;{active.comment}&rdquo;
              </p>

              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="font-display text-primary text-xl font-semibold">
                    {active.clientName.charAt(0)}
                  </span>
                </div>
                <p className="font-body font-semibold text-charcoal text-sm">{active.clientName}</p>
                <p className="font-body text-muted text-xs">{active.service}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-primary-200 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center"
            >
              <FiChevronLeft />
            </button>

            <div className="flex gap-1.5">
              {displayTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-200 rounded-full ${
                    i === current ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-primary-200 hover:bg-primary-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-primary-200 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
