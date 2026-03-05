import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import AboutSection from '@/components/AboutSection'
import GallerySection from '@/components/GallerySection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getParlourInfo, getAvailableServices, getGalleryImages, getVisibleTestimonials } from '@/lib/firestore'
import { DEFAULT_PARLOUR, DEFAULT_SERVICES } from '@/types'

// ISR: revalidate every 60 seconds
export const revalidate = 60

export default async function Home() {
  const [parlourData, servicesData, galleryData, testimonialsData] = await Promise.all([
    getParlourInfo(),
    getAvailableServices(),
    getGalleryImages(),
    getVisibleTestimonials(),
  ])

  // Fall back to default demo data if Firebase not yet configured
  const parlour = parlourData ?? DEFAULT_PARLOUR
  const services = servicesData.length > 0 ? servicesData : DEFAULT_SERVICES

  return (
    <main>
      <Navbar parlourName={parlour.name} logo={parlour.logo} whatsapp={parlour.whatsapp} />
      <HeroSection parlour={parlour} />
      <ServicesSection services={services} />
      <AboutSection parlour={parlour} />
      <GallerySection images={galleryData} />
      <TestimonialsSection testimonials={testimonialsData} />
      <ContactSection parlour={parlour} />
      <Footer parlour={parlour} />
      <WhatsAppButton whatsapp={parlour.whatsapp} />
    </main>
  )
}
