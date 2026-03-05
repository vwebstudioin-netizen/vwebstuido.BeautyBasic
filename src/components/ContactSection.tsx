'use client'

import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import type { ParlourInfo } from '@/types'

interface ContactSectionProps {
  parlour: ParlourInfo
}

export default function ContactSection({ parlour }: ContactSectionProps) {
  const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const hours = DAY_ORDER.map((day) => ({
    day,
    time: parlour.openingHours[day] ?? 'Closed',
  }))

  return (
    <section id="contact" className="py-20 md:py-28 bg-ivory">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-primary text-sm font-medium tracking-widest uppercase mb-2"
          >
            Find Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Contact Us
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact details */}
            <div className="card p-6 space-y-4">
              <h3 className="font-display text-xl text-charcoal font-semibold mb-2">Get in Touch</h3>

              <a
                href={`https://wa.me/${parlour.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <FaWhatsapp className="text-green-500 text-lg" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted">WhatsApp (Booking)</p>
                  <p className="font-body text-sm font-medium text-charcoal group-hover:text-primary transition-colors">
                    +{parlour.whatsapp}
                  </p>
                </div>
              </a>

              <a href={`tel:${parlour.phone}`} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <FiPhone className="text-primary text-lg" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted">Call Us</p>
                  <p className="font-body text-sm font-medium text-charcoal group-hover:text-primary transition-colors">
                    {parlour.phone}
                  </p>
                </div>
              </a>

              <a href={`mailto:${parlour.email}`} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <FiMail className="text-primary text-lg" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted">Email</p>
                  <p className="font-body text-sm font-medium text-charcoal group-hover:text-primary transition-colors">
                    {parlour.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="text-primary text-lg" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted">Address</p>
                  <p className="font-body text-sm font-medium text-charcoal">{parlour.address}</p>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3 pt-2">
                {parlour.socialLinks.instagram && (
                  <a
                    href={parlour.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <FaInstagram />
                  </a>
                )}
                {parlour.socialLinks.facebook && (
                  <a
                    href={parlour.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <FaFacebook />
                  </a>
                )}
              </div>
            </div>

            {/* Opening Hours */}
            <div className="card p-6">
              <h3 className="font-display text-lg text-charcoal font-semibold mb-4 flex items-center gap-2">
                <FiClock className="text-primary" />
                Opening Hours
              </h3>
              <div className="space-y-2">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex justify-between items-center font-body text-sm">
                    <span className={time === 'Closed' ? 'text-muted' : 'text-charcoal'}>{day}</span>
                    <span
                      className={`font-medium ${
                        time === 'Closed' ? 'text-red-400' : 'text-charcoal'
                      }`}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Embedded map placeholder */}
            <div className="card overflow-hidden h-72 md:h-80">
              {/* Replace src with your actual Google Maps embed URL */}
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(parlour.address)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Parlour Location"
              />
            </div>

            {/* WhatsApp CTA card */}
            <div className="bg-gradient-to-br from-primary to-primary-700 rounded-2xl p-6 text-white text-center">
              <h3 className="font-display text-2xl font-light mb-2">Ready to Book?</h3>
              <p className="font-body text-white/80 text-sm mb-5">
                WhatsApp us to check availability and book your appointment instantly.
              </p>
              <a
                href={`https://wa.me/${parlour.whatsapp}?text=Hi! I'd like to book an appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-body font-medium text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <FaWhatsapp className="text-green-500 text-lg" />
                Book on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
