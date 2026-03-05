export type ServiceCategory = 'Nails' | 'Skin' | 'Hair' | 'Waxing' | 'Bridal'

export interface ParlourInfo {
  name: string
  tagline: string
  description: string
  phone: string
  whatsapp: string
  email: string
  address: string
  openingHours: Record<string, string>
  socialLinks: {
    instagram?: string
    facebook?: string
    google?: string
  }
  heroImage: string
  logo: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: string
  category: ServiceCategory
  image?: string
  isAvailable: boolean
  sortOrder: number
}

export interface GalleryImage {
  id: string
  url: string
  caption: string
  category: string
  sortOrder: number
}

export interface Testimonial {
  id: string
  clientName: string
  comment: string
  rating: number
  service: string
  isVisible: boolean
}

// Default fallback data used when Firebase is not yet configured
export const DEFAULT_PARLOUR: ParlourInfo = {
  name: 'Glamour Touch Parlour',
  tagline: 'Your Beauty, Our Passion',
  description:
    'We are a premium beauty parlour offering a wide range of services including manicure, pedicure, facials, waxing, hair styling, and exclusive bridal packages. Our expert beauticians ensure you leave looking and feeling your best.',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'hello@glamourtouch.in',
  address: '12, Lakshmi Nagar, Near Bus Stand, Tanuku, Andhra Pradesh - 534211',
  openingHours: {
    Monday: '9:00 AM - 7:00 PM',
    Tuesday: '9:00 AM - 7:00 PM',
    Wednesday: '9:00 AM - 7:00 PM',
    Thursday: '9:00 AM - 7:00 PM',
    Friday: '9:00 AM - 7:00 PM',
    Saturday: '9:00 AM - 8:00 PM',
    Sunday: 'Closed',
  },
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
  heroImage: '/images/hero.jpg',
  logo: '/images/logo.png',
}

export const DEFAULT_SERVICES: Service[] = [
  { id: '1', name: 'Classic Manicure', description: 'Nail shaping, filing, cuticle care, and a relaxing hand massage with polish.', price: 299, duration: '30 min', category: 'Nails', isAvailable: true, sortOrder: 1 },
  { id: '2', name: 'Gel Manicure', description: 'Long-lasting gel polish with professional finish. Lasts up to 2 weeks.', price: 599, duration: '45 min', category: 'Nails', isAvailable: true, sortOrder: 2 },
  { id: '3', name: 'Classic Pedicure', description: 'Foot soak, nail care, callus removal, and moisturising massage with polish.', price: 399, duration: '45 min', category: 'Nails', isAvailable: true, sortOrder: 3 },
  { id: '4', name: 'Nail Art', description: 'Custom nail art designs — florals, French tips, ombre, or patterns of your choice.', price: 199, duration: '20 min', category: 'Nails', isAvailable: true, sortOrder: 4 },
  { id: '5', name: 'Basic Facial', description: 'Deep cleansing facial with steam, scrub, face pack, and moisturiser.', price: 499, duration: '45 min', category: 'Skin', isAvailable: true, sortOrder: 5 },
  { id: '6', name: 'Gold Facial', description: 'Luxury gold-infused facial for glowing skin. Reduces dark spots and brightens complexion.', price: 999, duration: '60 min', category: 'Skin', isAvailable: true, sortOrder: 6 },
  { id: '7', name: 'D-Tan Pack', description: 'De-tanning treatment for face and neck. Removes tan and brightens skin instantly.', price: 349, duration: '30 min', category: 'Skin', isAvailable: true, sortOrder: 7 },
  { id: '8', name: 'Bleaching', description: 'Mild bleach treatment for face or full body to lighten skin tone.', price: 249, duration: '20 min', category: 'Skin', isAvailable: true, sortOrder: 8 },
  { id: '9', name: 'Haircut & Styling', description: 'Professional haircut with wash, blow-dry, and styling as per your preference.', price: 349, duration: '45 min', category: 'Hair', isAvailable: true, sortOrder: 9 },
  { id: '10', name: 'Hair Colour', description: 'Full hair colouring using premium products. Includes consultation for shade selection.', price: 799, duration: '90 min', category: 'Hair', isAvailable: true, sortOrder: 10 },
  { id: '11', name: 'Hair Spa', description: 'Deep conditioning hair spa treatment to repair damage and restore shine.', price: 599, duration: '60 min', category: 'Hair', isAvailable: true, sortOrder: 11 },
  { id: '12', name: 'Full Body Wax', description: 'Complete body waxing for smooth, hair-free skin. Uses premium cold or warm wax.', price: 699, duration: '60 min', category: 'Waxing', isAvailable: true, sortOrder: 12 },
  { id: '13', name: 'Rica Wax (Arms + Legs)', description: 'Gentle Rica wax — ideal for sensitive skin. Smooth finish with no irritation.', price: 499, duration: '45 min', category: 'Waxing', isAvailable: true, sortOrder: 13 },
  { id: '14', name: 'Threading', description: 'Precise eyebrow and upper lip threading for a clean, defined shape.', price: 49, duration: '10 min', category: 'Waxing', isAvailable: true, sortOrder: 14 },
  { id: '15', name: 'Classic Bridal Package', description: 'Complete bridal makeover: HD makeup, hair styling, draping, and nail art.', price: 8999, duration: '4-5 hrs', category: 'Bridal', isAvailable: true, sortOrder: 15 },
  { id: '16', name: 'Pre-Bridal Package', description: '3-session pre-bridal care: facial, D-tan, full body wax, manicure & pedicure.', price: 4999, duration: '3 sessions', category: 'Bridal', isAvailable: true, sortOrder: 16 },
]
