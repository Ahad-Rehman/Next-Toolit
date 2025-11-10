'use client'

import Image from 'next/image'
import placeholders from '../../image-placeholders.json'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const products = [
  { src: '/gear.jpg', alt: 'Adventure Gear' },
  { src: '/optimized/blackorange-shows.768.webp', alt: 'Outdoor Shoes', placeholderKey: 'blackorange-shows' },
  { src: '/cycle.jpg', alt: 'Mountain Bike' },
]

export default function ProductShowcase() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-arimo text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Check Out Our Products
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="relative group card"
            >
              <Link href="/products">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    {...(product.placeholderKey ? { placeholder: 'blur', blurDataURL: (placeholders as any)[product.placeholderKey] } : {})}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
