"use client"

import Image from 'next/image'
import placeholders from '../../image-placeholders.json'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const infoItems = [
  {
    image: '/cycle1.jpg',
    title: 'Morgan Dak Bike',
    description: 'High-performance mountain bike designed for extreme terrain. Built with aerospace-grade aluminum and equipped with advanced suspension systems for the smoothest ride on any trail.',
    reverse: false,
  },
  {
    image: '/blackhelmet1.jpg',
    title: 'Zoro Safety Helmet',
    description: 'State-of-the-art safety helmet with multi-impact protection. Features advanced ventilation system and moisture-wicking interior for maximum comfort during long rides.',
    reverse: true,
  },
  {
    image: '/blackorange-shows.jpg',
    title: 'Multi Terrain Shoes',
    description: 'Engineered for versatility across all outdoor conditions. Waterproof, breathable material with superior grip technology for unmatched performance in any environment.',
    reverse: false,
  },
  {
    image: '/bottle.jpg',
    title: 'Pisa All Condition Liquid Bottle',
    description: 'Premium insulated bottle that keeps beverages hot for 12 hours or cold for 24 hours. Made from food-grade stainless steel with leak-proof design.',
    reverse: true,
  },
  {
    image: '/greybag.jpg',
    title: 'Hiking Traveling Bags',
    description: 'Ultra-durable semi-rigid construction with ergonomic design. Features multiple compartments, water-resistant coating, and reinforced straps for heavy loads.',
    reverse: false,
  },
]

export default function InformationPage() {
  return (
    <>
      {/* Hero Section - use next/image for optimized background */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image src="/optimized/Pic1.1920.webp" alt="Info hero" fill className="object-cover" priority placeholder="blur" blurDataURL={placeholders['Pic1']} />
        </div>
        <div className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-[1px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-20 drop-shadow-lg"
        >
          <h1 className="font-arimo text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            Info
          </h1>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-light text-center mb-16"
          >
            Info about some gears that are being used by our team, having some great reviews
          </motion.h2>

          {/* Info Items */}
          <div className="space-y-20">
            {infoItems.map((item, index) => (
              <InfoItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function InfoItem({ image, title, description, reverse, index }: any) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-center gap-8`}
    >
      <motion.div 
        className="relative w-full md:w-1/2 h-80 rounded-lg overflow-hidden shadow-2xl"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
      <div className="w-full md:w-1/2 space-y-4">
        <h3 className="font-roboto text-3xl md:text-4xl font-bold text-black">
          {title}
        </h3>
        <p className="font-sans text-lg text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
