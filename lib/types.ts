// Service Type
export interface Service {
  id: number;
  icon: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  price: string;
}

// Testimonial Type
export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

// Gallery Item Type
export interface GalleryItem {
  id: number;
  alt: string;
  category: string;
  src: string;
}

// FAQ Item Type
export interface FAQItem {
  q: string;
  a: string;
}

// Contact Form Type
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Navigation Link Type
export interface NavigationLink {
  name: string;
  href: string;
}

// Stat Type
export interface Stat {
  number: string;
  label: string;
}
