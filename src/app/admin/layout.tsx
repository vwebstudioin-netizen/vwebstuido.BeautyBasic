'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'
import { FiHome, FiScissors, FiImage, FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi'

const SIDEBAR_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: FiHome },
  { href: '/admin/services', label: 'Services', icon: FiScissors },
  { href: '/admin/gallery', label: 'Gallery', icon: FiImage },
  { href: '/admin/testimonials', label: 'Testimonials', icon: FiMessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: FiSettings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login')
      }
      setLoading(false)
    })
    return unsub
  }, [router, pathname])

  const handleSignOut = async () => {
    await signOut(auth)
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r border-gray-100 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-primary-100 rounded-xl flex items-center justify-center">
            <span className="text-lg">💅</span>
          </div>
          <div>
            <p className="font-display text-base font-semibold text-charcoal">Parlour Admin</p>
            <p className="font-body text-xs text-muted">Content Management</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary'
                    : 'text-charcoal hover:bg-gray-50 hover:text-primary'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-body text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <FiLogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-charcoal p-1 rounded-lg hover:bg-gray-50"
          >
            {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="font-body text-sm text-muted hover:text-primary transition-colors"
            >
              View Site →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
