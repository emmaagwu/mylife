import { Header } from "@/components/shared/Header"
import { HeroSection } from "@/components/landing/Hero/HeroSection"
import { FeaturesSection } from "@/components/landing/Features/FeaturesSection"
import { BenefitsSection } from "@/components/landing/Benefits/BenefitsSection"
import { TestimonialsSection } from "@/components/landing/Testimonials/TestimonialsSection"
import { OnboardingSection } from "@/components/landing/Onboarding/OnboardingSection"
import { Footer } from "@/components/shared/Footer"

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="relative w-full">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <OnboardingSection />
      </main>
      <Footer />
    </div>
  )
}