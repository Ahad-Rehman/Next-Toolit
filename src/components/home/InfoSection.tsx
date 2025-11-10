'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function InfoSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-arimo text-4xl md:text-5xl font-bold mb-6"
        >
          Information About Our Products
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-lg md:text-xl italic text-gray-600"
        >
          Want to know more about our products quality and material, check out our blog.
        </motion.p>
      </div>
    </section>
  )
}
