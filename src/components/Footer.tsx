import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import type { ParlourInfo } from '@/types'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

interface FooterProps {
  parlour: ParlourInfo
}

export default function Footer({ parlour }: FooterProps) {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl text-white font-light mb-3">{parlour.name}</h3>
            <p className="font-body text-sm leading-relaxed mb-4 text-white/60">{parlour.tagline}</p>
            <div className="flex gap-3">
              {parlour.socialLinks.whatsapp || parlour.whatsapp ? (
                <a
                  href={`https://wa.me/${parlour.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-green-500 transition-all duration-200"
                >
                  <FaWhatsapp />
                </a>
              ) : null}
              {parlour.socialLinks.instagram && (
                <a
                  href={parlour.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-200"
                >
                  <FaInstagram />
                </a>
              )}
              {parlour.socialLinks.facebook && (
                <a
                  href={parlour.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all duration-200"
                >
                  <FaFacebook />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-2 font-body text-sm">
              <p>{parlour.address}</p>
              <a href={`tel:${parlour.phone}`} className="block hover:text-primary transition-colors">
                {parlour.phone}
              </a>
              <a href={`mailto:${parlour.email}`} className="block hover:text-primary transition-colors">
                {parlour.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} {parlour.name}. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            Designed & Developed by{' '}
            <span className="text-primary">VwebStudio</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
