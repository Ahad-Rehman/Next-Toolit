'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    image: '/optimized/bike.1200.webp',
    title: 'Best Route, Next Time',
    description: 'Experience the perfect adventure with our carefully curated routes and premium biking gear designed for enthusiasts.',
    reverse: false,
  },
  {
    image: '/optimized/van.1200.webp',
    title: 'Take Break, Better',
    description: 'Discover comfort and convenience with our camping equipment that makes every break an unforgettable experience.',
    reverse: true,
  },
  {
    image: '/optimized/girl.1200.webp',
    title: 'Unforgettable Memories',
    description: 'Create lasting memories with high-quality gear that captures the essence of every outdoor adventure.',
    reverse: false,
  },
]

export default function Features() {
  return (
    <section className="py-16 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>
    </section>
  )
}

function FeatureCard({ image, title, description, reverse, index }: any) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-center justify-between gap-8 mb-16`}
    >
      <div className="relative w-full md:w-1/2 h-96 md:h-[600px] rounded-lg overflow-hidden shadow-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="font-roboto text-4xl md:text-5xl font-bold text-black">
          {title}
        </h2>
        <p className="font-sans text-lg md:text-xl text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
