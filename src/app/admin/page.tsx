'use client'

import { useState, useEffect } from 'react'
import { FiScissors, FiImage, FiMessageSquare, FiInfo, FiSave, FiPlus, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi'
import {
  getParlourInfo,
  saveParlourInfo,
  getServices,
  addService,
  updateService,
  deleteService,
  getGalleryImages,
  deleteGalleryImage,
  getAllTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '@/lib/firestore'
import type { ParlourInfo, Service, GalleryImage, Testimonial, ServiceCategory } from '@/types'
import { DEFAULT_PARLOUR } from '@/types'

type Tab = 'overview' | 'services' | 'gallery' | 'testimonials'

const SERVICE_CATEGORIES: ServiceCategory[] = ['Nails', 'Skin', 'Hair', 'Waxing', 'Bridal']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [parlour, setParlour] = useState<ParlourInfo>(DEFAULT_PARLOUR)
  const [services, setServices] = useState<Service[]>([])
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // New service form state
  const [newService, setNewService] = useState({
    name: '', description: '', price: 0, duration: '30 min',
    category: 'Nails' as ServiceCategory, isAvailable: true, sortOrder: 0,
  })

  // New testimonial form state
  const [newTestimonial, setNewTestimonial] = useState({
    clientName: '', comment: '', rating: 5, service: '', isVisible: true,
  })

  useEffect(() => {
    const load = async () => {
      const [p, s, g, t] = await Promise.all([
        getParlourInfo(), getServices(), getGalleryImages(), getAllTestimonials(),
      ])
      if (p) setParlour(p)
      setServices(s)
      setGallery(g)
      setTestimonials(t)
    }
    load()
  }, [])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  // ─── Parlour Info ────────────────────────
  const handleSaveParlour = async () => {
    setSaving(true)
    await saveParlourInfo(parlour)
    setSaving(false)
    showMessage('Parlour info saved successfully!')
  }

  // ─── Services ────────────────────────────
  const handleAddService = async () => {
    if (!newService.name || !newService.price) return
    const id = await addService(newService)
    setServices((prev) => [...prev, { ...newService, id }])
    setNewService({ name: '', description: '', price: 0, duration: '30 min', category: 'Nails', isAvailable: true, sortOrder: 0 })
    showMessage('Service added!')
  }

  const handleToggleService = async (id: string, isAvailable: boolean) => {
    await updateService(id, { isAvailable: !isAvailable })
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, isAvailable: !isAvailable } : s))
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await deleteService(id)
    setServices((prev) => prev.filter((s) => s.id !== id))
    showMessage('Service deleted.')
  }

  // ─── Testimonials ─────────────────────────
  const handleAddTestimonial = async () => {
    if (!newTestimonial.clientName || !newTestimonial.comment) return
    const id = await addTestimonial(newTestimonial)
    setTestimonials((prev) => [...prev, { ...newTestimonial, id }])
    setNewTestimonial({ clientName: '', comment: '', rating: 5, service: '', isVisible: true })
    showMessage('Testimonial added!')
  }

  const handleToggleTestimonial = async (id: string, isVisible: boolean) => {
    await updateTestimonial(id, { isVisible: !isVisible })
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, isVisible: !isVisible } : t))
  }

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await deleteTestimonial(id)
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
    showMessage('Testimonial deleted.')
  }

  const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'overview', label: 'Parlour Info', icon: FiInfo },
    { key: 'services', label: `Services (${services.length})`, icon: FiScissors },
    { key: 'gallery', label: `Gallery (${gallery.length})`, icon: FiImage },
    { key: 'testimonials', label: `Reviews (${testimonials.length})`, icon: FiMessageSquare },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl text-charcoal font-semibold">Dashboard</h1>
        <p className="font-body text-muted text-sm mt-1">Manage your parlour content</p>
      </div>

      {/* Success message */}
      {message && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 font-body text-sm">
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Services', value: services.length, icon: '💅' },
          { label: 'Gallery Photos', value: gallery.length, icon: '📸' },
          { label: 'Reviews', value: testimonials.length, icon: '⭐' },
          { label: 'Active Services', value: services.filter((s) => s.isAvailable).length, icon: '✅' },
        ].map((stat) => (
          <div key={stat.label} className="admin-card flex items-center gap-4">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="font-display text-2xl text-charcoal font-semibold">{stat.value}</p>
              <p className="font-body text-xs text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-charcoal border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ─── Parlour Info Tab ─── */}
      {activeTab === 'overview' && (
        <div className="admin-card space-y-5">
          <h2 className="font-display text-xl text-charcoal font-semibold">Parlour Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Parlour Name', key: 'name' as const },
              { label: 'Tagline', key: 'tagline' as const },
              { label: 'Phone', key: 'phone' as const },
              { label: 'WhatsApp (numbers only)', key: 'whatsapp' as const },
              { label: 'Email', key: 'email' as const },
            ].map((field) => (
              <div key={field.key}>
                <label className="block font-body text-sm font-medium text-charcoal mb-1.5">{field.label}</label>
                <input
                  type="text"
                  value={parlour[field.key]}
                  onChange={(e) => setParlour({ ...parlour, [field.key]: e.target.value })}
                  className="input-field"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block font-body text-sm font-medium text-charcoal mb-1.5">Address</label>
              <input
                type="text"
                value={parlour.address}
                onChange={(e) => setParlour({ ...parlour, address: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-body text-sm font-medium text-charcoal mb-1.5">About / Description</label>
              <textarea
                value={parlour.description}
                onChange={(e) => setParlour({ ...parlour, description: e.target.value })}
                rows={3}
                className="input-field resize-none"
              />
            </div>
          </div>
          <button onClick={handleSaveParlour} disabled={saving} className="btn-primary gap-2">
            <FiSave />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* ─── Services Tab ─── */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          {/* Add new service */}
          <div className="admin-card">
            <h2 className="font-display text-xl text-charcoal font-semibold mb-4">Add New Service</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-medium text-charcoal mb-1.5">Service Name *</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="e.g. Classic Manicure"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-charcoal mb-1.5">Category *</label>
                <select
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value as ServiceCategory })}
                  className="input-field"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-charcoal mb-1.5">Price (₹) *</label>
                <input
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-charcoal mb-1.5">Duration</label>
                <input
                  type="text"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  placeholder="30 min"
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-body text-sm font-medium text-charcoal mb-1.5">Description</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  rows={2}
                  className="input-field resize-none"
                />
              </div>
            </div>
            <button onClick={handleAddService} className="btn-primary mt-4 gap-2">
              <FiPlus /> Add Service
            </button>
          </div>

          {/* Services list */}
          <div className="admin-card">
            <h2 className="font-display text-xl text-charcoal font-semibold mb-4">All Services</h2>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.id} className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-body font-semibold text-charcoal text-sm">{service.name}</span>
                      <span className="bg-primary-100 text-primary text-xs px-2 py-0.5 rounded-full font-body">{service.category}</span>
                      {!service.isAvailable && <span className="bg-gray-200 text-muted text-xs px-2 py-0.5 rounded-full font-body">Hidden</span>}
                    </div>
                    <p className="font-body text-muted text-xs mt-0.5">₹{service.price} · {service.duration}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleService(service.id, service.isAvailable)}
                      className={`p-2 rounded-lg transition-colors ${service.isAvailable ? 'text-green-500 bg-green-50 hover:bg-green-100' : 'text-muted bg-gray-100 hover:bg-gray-200'}`}
                      title={service.isAvailable ? 'Hide service' : 'Show service'}
                    >
                      {service.isAvailable ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="p-2 rounded-lg text-red-400 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {services.length === 0 && (
                <p className="text-center font-body text-muted text-sm py-8">No services added yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Gallery Tab ─── */}
      {activeTab === 'gallery' && (
        <div className="admin-card">
          <h2 className="font-display text-xl text-charcoal font-semibold mb-4">Gallery</h2>
          <p className="font-body text-sm text-muted mb-6">
            Upload images to Firebase Storage and add the URL here. Supported categories: Nails, Bridal, Skin, Hair, General.
          </p>
          {gallery.length === 0 ? (
            <p className="text-center font-body text-muted text-sm py-10">
              No gallery images yet. Upload images to Firebase Storage and add their URLs via the Firebase Console.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {gallery.map((img) => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={async () => {
                        if (!confirm('Delete this image?')) return
                        await deleteGalleryImage(img.id)
                        setGallery((prev) => prev.filter((i) => i.id !== img.id))
                        showMessage('Image deleted.')
                      }}
                      className="bg-red-500 text-white p-2 rounded-lg"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs font-body p-2 truncate">
                    {img.caption}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── Testimonials Tab ─── */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          {/* Add testimonial */}
          <div className="admin-card">
            <h2 className="font-display text-xl text-charcoal font-semibold mb-4">Add Testimonial</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-medium text-charcoal mb-1.5">Client Name *</label>
                <input
                  type="text"
                  value={newTestimonial.clientName}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-charcoal mb-1.5">Service</label>
                <input
                  type="text"
                  value={newTestimonial.service}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, service: e.target.value })}
                  placeholder="e.g. Bridal Makeup"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-charcoal mb-1.5">Rating</label>
                <select
                  value={newTestimonial.rating}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                  className="input-field"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-body text-sm font-medium text-charcoal mb-1.5">Comment *</label>
                <textarea
                  value={newTestimonial.comment}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
            </div>
            <button onClick={handleAddTestimonial} className="btn-primary mt-4 gap-2">
              <FiPlus /> Add Review
            </button>
          </div>

          {/* Testimonials list */}
          <div className="admin-card space-y-3">
            <h2 className="font-display text-xl text-charcoal font-semibold mb-4">All Reviews</h2>
            {testimonials.map((t) => (
              <div key={t.id} className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-body font-semibold text-charcoal text-sm">{t.clientName}</span>
                    <span className="text-accent text-sm">{'★'.repeat(t.rating)}</span>
                    {!t.isVisible && <span className="bg-gray-200 text-muted text-xs px-2 py-0.5 rounded-full font-body">Hidden</span>}
                  </div>
                  <p className="font-body text-muted text-xs">{t.service}</p>
                  <p className="font-body text-charcoal text-sm mt-1 line-clamp-2">{t.comment}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggleTestimonial(t.id, t.isVisible)}
                    className={`p-2 rounded-lg transition-colors ${t.isVisible ? 'text-green-500 bg-green-50 hover:bg-green-100' : 'text-muted bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {t.isVisible ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(t.id)}
                    className="p-2 rounded-lg text-red-400 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {testimonials.length === 0 && (
              <p className="text-center font-body text-muted text-sm py-8">No reviews yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
