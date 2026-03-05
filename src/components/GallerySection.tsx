'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import type { GalleryImage } from '@/types'

const DEMO_GALLERY: GalleryImage[] = [
  { id: '1', url: '/images/gallery/nails-1.jpg', caption: 'Elegant Nail Art', category: 'Nails', sortOrder: 1 },
  { id: '2', url: '/images/gallery/bridal-1.jpg', caption: 'Bridal Makeover', category: 'Bridal', sortOrder: 2 },
  { id: '3', url: '/images/gallery/facial-1.jpg', caption: 'Skin Glow Facial', category: 'Skin', sortOrder: 3 },
  { id: '4', url: '/images/gallery/hair-1.jpg', caption: 'Hair Colour & Style', category: 'Hair', sortOrder: 4 },
  { id: '5', url: '/images/gallery/nails-2.jpg', caption: 'Gel Manicure', category: 'Nails', sortOrder: 5 },
  { id: '6', url: '/images/gallery/bridal-2.jpg', caption: 'Pre-Bridal Package', category: 'Bridal', sortOrder: 6 },
]

const GALLERY_CATS = ['All', 'Nails', 'Bridal', 'Skin', 'Hair']

interface GallerySectionProps {
  images: GalleryImage[]
}

export default function GallerySection({ images }: GallerySectionProps) {
  const displayImages = images.length > 0 ? images : DEMO_GALLERY
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeFilter === 'All' ? displayImages : displayImages.filter((img) => img.category === activeFilter)

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)

  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null))
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null))

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-primary text-sm font-medium tracking-widest uppercase mb-2"
          >
            Our Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Beauty Gallery
          </motion.h2>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {GALLERY_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-primary-50 text-primary hover:bg-primary-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
              onClick={() => openLightbox(i)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                <span className="text-4xl text-white/40">📸</span>
              </div>
              <Image
                src={img.url}
                alt={img.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-end">
                <p className="font-body text-white text-sm font-medium p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            >
              <FiX size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 text-white/80 hover:text-white p-2"
            >
              <FiChevronLeft size={32} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-2xl aspect-square rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].url}
                alt={filtered[lightboxIndex].caption}
                fill
                className="object-cover"
              />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 text-white/80 hover:text-white p-2"
            >
              <FiChevronRight size={32} />
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-body text-sm">
              {filtered[lightboxIndex].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
