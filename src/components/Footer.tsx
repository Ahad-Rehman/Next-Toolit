'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  const socialImages = [
    { src: '/trail.jpg', alt: 'Trail adventure' },
    { src: '/bridge.jpg', alt: 'Bridge crossing' },
    { src: '/grass.jpg', alt: 'Grassland' },
    { src: '/harley.jpg', alt: 'Harley adventure' },
  ]

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'More About Us' },
    { href: '/products', label: 'Buy Product' },
    { href: '/information', label: 'Product Info' },
    { href: '/contact', label: 'Contact Info' },
  ]

  const productionLinks = [
    'Our Company Info',
    'About our Product',
    'Material',
    'Ranking',
    'Delivery',
  ]

  return (
    <footer className="mt-12 bg-gradient-to-t from-brand to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-arimo text-3xl text-center mb-8 text-white/90">
          On Our Social Media
        </h2>

        {/* Social Images */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {socialImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative h-48 overflow-hidden rounded-xl card"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Social */}
          <div>
            <h3 className="font-arimo text-3xl mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">ToolIt</span>
            </h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:opacity-90 transition-opacity transform hover:-translate-y-1">
                <Image src="/fb.png" alt="Facebook" width={40} height={40} />
              </a>
              <a href="#" className="hover:opacity-90 transition-opacity transform hover:-translate-y-1">
                <Image src="/ig.png" alt="Instagram" width={40} height={40} />
              </a>
              <a href="#" className="hover:opacity-90 transition-opacity transform hover:-translate-y-1">
                <Image src="/twit.png" alt="Twitter" width={40} height={40} />
              </a>
            </div>
            <p className="font-arimo text-sm leading-relaxed">
              Experience the best outdoor adventure gear with ToolIt. Quality, durability, and performance in every product.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-arimo text-xl mb-4">Navigation</h3>
            <div className="flex flex-col space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-primary transition-colors font-sans font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Production */}
          <div>
            <h3 className="font-arimo text-xl mb-4">Production</h3>
            <div className="flex flex-col space-y-2">
              {productionLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white hover:text-primary transition-colors font-sans font-semibold"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-arimo text-xl mb-4">Hear From Us</h3>
            <p className="font-arimo text-sm mb-4">
              Get in touch with us by just giving us your email
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
                />
                <button className="btn-primary">Subscribe</button>
              </div>
              <p className="text-xs text-white/70">No spam — unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/80 text-white text-center py-4 mt-8">
        <p className="font-sans">© {new Date().getFullYear()} ToolIt — All rights reserved</p>
      </div>
    </footer>
  )
}
