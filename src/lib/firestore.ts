import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  where,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { ParlourInfo, Service, GalleryImage, Testimonial } from '@/types'

// ─── Parlour Info ────────────────────────────────────────────────

export async function getParlourInfo(): Promise<ParlourInfo | null> {
  try {
    const snap = await getDoc(doc(db, 'parlour', 'info'))
    return snap.exists() ? (snap.data() as ParlourInfo) : null
  } catch {
    return null
  }
}

export async function saveParlourInfo(data: Partial<ParlourInfo>): Promise<void> {
  await setDoc(doc(db, 'parlour', 'info'), { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

// ─── Services ────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  try {
    const q = query(collection(db, 'services'), orderBy('sortOrder'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service))
  } catch {
    return []
  }
}

export async function getAvailableServices(): Promise<Service[]> {
  try {
    const q = query(
      collection(db, 'services'),
      where('isAvailable', '==', true),
      orderBy('sortOrder')
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service))
  } catch {
    return []
  }
}

export async function addService(data: Omit<Service, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'services'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}

export async function updateService(id: string, data: Partial<Service>): Promise<void> {
  await updateDoc(doc(db, 'services', id), data)
}

export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db, 'services', id))
}

// ─── Gallery ─────────────────────────────────────────────────────

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const q = query(collection(db, 'gallery'), orderBy('sortOrder'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryImage))
  } catch {
    return []
  }
}

export async function addGalleryImage(data: Omit<GalleryImage, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'gallery'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}

export async function deleteGalleryImage(id: string): Promise<void> {
  await deleteDoc(doc(db, 'gallery', id))
}

// ─── Testimonials ─────────────────────────────────────────────────

export async function getVisibleTestimonials(): Promise<Testimonial[]> {
  try {
    const q = query(collection(db, 'testimonials'), where('isVisible', '==', true))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial))
  } catch {
    return []
  }
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const snap = await getDocs(collection(db, 'testimonials'))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial))
  } catch {
    return []
  }
}

export async function addTestimonial(data: Omit<Testimonial, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'testimonials'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<void> {
  await updateDoc(doc(db, 'testimonials', id), data)
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, 'testimonials', id))
}
