"use client"

import Image from 'next/image'
import placeholders from '../../image-placeholders.json'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Use Next/Image for optimized hero background */}
        <div className="absolute inset-0 -z-20">
        <Image src="/optimized/Pic1.1920.webp" alt="Hero background" fill className="object-cover" priority placeholder="blur" blurDataURL={placeholders['Pic1']} />
      </div>
      {/* translucent overlay to improve text contrast */}
      <div className="absolute inset-0 -z-10 bg-black/45 backdrop-blur-[1px]" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center relative z-20 drop-shadow-lg"
      >
        <h1 className="font-arimo text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
          <span className="block text-white">Discover your next</span>
          <span className="block mt-2 text-4xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Outdoor Adventure</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">High-quality gear for the trail, crafted for performance and comfort. Shop the latest collection.</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="/products" className="btn-primary">
            Shop Now
          </motion.a>
          <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="/information" className="text-white/90 font-semibold px-4 py-2 rounded-md border border-white/10 bg-white/5">
            Learn More
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
