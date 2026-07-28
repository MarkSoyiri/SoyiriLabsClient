import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import AdminLayout from '@/components/layout/AdminLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/services/Services'
import ServiceDetail from '@/pages/services/ServiceDetail'
import Portfolio from '@/pages/portfolio/Portfolio'
import ProjectDetail from '@/pages/portfolio/ProjectDetail'
import Blog from '@/pages/blog/Blog'
import BlogPost from '@/pages/blog/BlogPost'
import Contact from '@/pages/Contact'
import FAQ from '@/pages/FAQ'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminProjects from '@/pages/admin/AdminProjects'
import AdminServices from '@/pages/admin/AdminServices'
import AdminTestimonials from '@/pages/admin/AdminTestimonials'
import AdminBlog from '@/pages/admin/AdminBlog'
import AdminMessages from '@/pages/admin/AdminMessages'
import AdminSettings from '@/pages/admin/AdminSettings'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:slug" element={<ProjectDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
