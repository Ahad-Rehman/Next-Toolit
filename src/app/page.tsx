import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import ProductShowcase from '@/components/home/ProductShowcase'
import InfoSection from '@/components/home/InfoSection'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-center italic mb-12 animate-fade-in">
          Our Experience in Outdoor Adventure Gear is more than any other dealer out there.
        </h1>
      </div>
      <Features />
      <ProductShowcase />
      <InfoSection />
    </>
  )
}
