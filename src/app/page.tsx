import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import InvestmentSection from '@/components/sections/InvestmentSection'
import ERPNextSection from '@/components/sections/ERPNextSection'
import TeamSection from '@/components/sections/TeamSection'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <InvestmentSection />
        <ERPNextSection />
        <TeamSection />
        <BlogPreviewSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
