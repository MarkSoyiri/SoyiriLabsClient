export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  clientName: string;
  industry: string;
  technologies: string[];
  thumbnail: string;
  gallery: string[];
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  completionYear: number;
  servicesProvided: string[];
  colorTheme: string;
  status: 'completed' | 'in-progress' | 'maintenance';
  seoTitle?: string;
  seoDescription?: string;
  challenges?: string;
  solution?: string;
  results?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  icon: string;
  image?: string;
  features: string[];
  process: ProcessStep[];
  price?: string;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  duration?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  company: string;
  position: string;
  photo: string;
  rating: number;
  review: string;
  featured: boolean;
  createdAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  readingTime: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface HomepageContent {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  stats: Stat[];
  aboutText: string;
  ctaTitle: string;
  ctaDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface CompanyInfo {
  _id: string;
  name: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  values: Value[];
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: SocialLink[];
  createdAt: string;
  updatedAt: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
