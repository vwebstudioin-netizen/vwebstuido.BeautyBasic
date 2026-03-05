'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

interface WhatsAppButtonProps {
  whatsapp: string
}

export default function WhatsAppButton({ whatsapp }: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Show button after 2 seconds
    const timer = setTimeout(() => setShowButton(true), 2000)
    // Show tooltip after 3 seconds
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 3000)
    // Hide tooltip after 7 seconds
    const hideTimer = setTimeout(() => setShowTooltip(false), 7000)

    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2 bg-white rounded-xl shadow-lg px-4 py-2 border border-primary-100"
              >
                <p className="font-body text-sm text-charcoal whitespace-nowrap">
                  Book your appointment! 💅
                </p>
                <button
                  onClick={() => setShowTooltip(false)}
                  className="text-muted hover:text-charcoal ml-1"
                >
                  <FiX size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={`https://wa.me/${whatsapp}?text=Hi! I'd like to book an appointment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 relative"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={28} />
            {/* Ping animation */}
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
