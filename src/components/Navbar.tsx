'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  parlourName: string
  logo: string
  whatsapp: string
}

export default function Navbar({ parlourName, logo, whatsapp }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-primary-100' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
              {logo && logo !== '/images/logo.png' ? (
                <Image src={logo} alt={parlourName} width={40} height={40} className="object-cover" />
              ) : (
                <span className="text-primary font-display font-bold text-lg">
                  {parlourName.charAt(0)}
                </span>
              )}
            </div>
            <span
              className={`font-display text-xl font-semibold transition-colors duration-300 ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              {parlourName}
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`font-body text-sm font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                    isScrolled ? 'text-charcoal' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${whatsapp}?text=Hi! I'd like to book an appointment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md"
          >
            <FaWhatsapp className="text-base" />
            Book Now
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-charcoal hover:bg-primary-50' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-primary-100 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left px-4 py-3 font-body text-sm font-medium text-charcoal hover:text-primary hover:bg-primary-50 rounded-xl transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={`https://wa.me/${whatsapp}?text=Hi! I'd like to book an appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-2 bg-green-500 text-white px-4 py-3 rounded-xl text-sm font-medium"
              >
                <FaWhatsapp />
                Book on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
