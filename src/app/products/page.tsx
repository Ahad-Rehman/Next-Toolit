'use client'

import Image from 'next/image'
import placeholders from '../../image-placeholders.json'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const products = [
  {
    name: 'Glacier Bag',
    price: 19.99,
    image: '/optimized/redbag.768.webp',
    description: 'Premium adventure bag for all terrains',
  },
  {
    name: 'Edelson Gear Kit',
    price: 9.99,
    image: '/optimized/gear.768.webp',
    description: 'Complete outdoor gear set',
  },
  {
    name: 'Morgan Rail Cycle',
    price: 399.99,
    image: '/optimized/cycle1.768.webp',
    description: 'High-performance mountain bike',
  },
  {
    name: 'Floppa Helmet',
    price: 11.99,
    image: '/optimized/blackhelmet.768.webp',
    description: 'Safety first with style',
  },
  {
    name: 'Okz Shoe',
    price: 35.99,
    image: '/optimized/blackorange-shows.1200.webp',
    placeholderKey: 'blackorange-shows',
    description: 'All-terrain outdoor shoes',
  },
  {
  name: 'Hiking Boots',
  price: 21.99,
  image: '/optimized/brown-boot.1200.webp',
  placeholderKey: 'brown-boot',
  description: 'Durable hiking boots',
  },
  {
    name: 'Artimes Cycle',
    price: 899.99,
    image: '/optimized/cycle.768.webp',
    description: 'Professional grade bicycle',
  },
  {
    name: 'Robo Helmet',
    price: 75.99,
    image: '/optimized/redhelmet.768.webp',
    description: 'Advanced protection helmet',
  },
  {
    name: 'Sigma Helmet',
    price: 114.99,
    image: '/optimized/rehelmet1.768.webp',
    description: 'Premium safety helmet',
  },
  {
    name: 'Johnnsi Winter Cap',
    price: 5.99,
    image: '/optimized/hat.768.webp',
    description: 'Warm winter cap',
  },
  {
    name: 'Hiks Multi Tool',
    price: 14.99,
    image: '/optimized/tool.768.webp',
    description: 'Essential multi-purpose tool',
  },
  {
    name: 'Piosa Bottle',
    price: 34.99,
    image: '/optimized/bottle.768.webp',
    description: 'Insulated water bottle',
  },
]

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image src="/optimized/Pic1.1920.webp" alt="Products hero" fill className="object-cover" priority placeholder="blur" blurDataURL={placeholders['Pic1']} />
        </div>
        <div className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-[1px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-20 drop-shadow-lg"
        >
          <h1 className="font-arimo text-5xl md:text-7xl font-bold text-white">
            Buy
          </h1>
        </motion.div>
      </section>

      {/* Description Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-light text-center mb-12"
          >
            Shop the Tool It Product collection – semi-rigid bags crafted for the toughest of adventures.
          </motion.h2>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ProductCard({ product, index }: any) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
        <div className="relative h-64 overflow-hidden group">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          {...(product.placeholderKey ? { placeholder: 'blur', blurDataURL: (placeholders as any)[product.placeholderKey] } : {})}
        />
      </div>
      <div className="p-4">
        <h3 className="font-roboto text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-primary mb-2">${product.price}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-primary hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded border-2 border-primary transition-colors duration-300"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}
