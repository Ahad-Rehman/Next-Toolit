'use client'

import Image from 'next/image'
import placeholders from '../../image-placeholders.json'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const teamMembers = [
  {
    name: 'Jaffery Salem',
    image: '/optimized/men.768.webp',
    description: 'Adventure gear specialist with 15 years of experience in outdoor equipment design and testing.',
    reverse: false,
  },
  {
    name: 'Umer Barak',
    image: '/optimized/boy.768.webp',
    description: 'Product development expert passionate about creating innovative solutions for outdoor enthusiasts.',
    reverse: true,
  },
  {
    name: 'Muhammad Ali',
    image: '/optimized/boy2.768.webp',
    description: 'Quality assurance lead ensuring every product meets the highest standards of durability and performance.',
    reverse: false,
  },
  {
    name: 'Balool',
    image: '/optimized/boy3.768.webp',
    description: 'Customer experience manager dedicated to providing exceptional service to our adventure community.',
    reverse: true,
  },
]

export default function AboutPage() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image src="/optimized/Pic1.1920.webp" alt="About hero" fill className="object-cover" priority placeholder="blur" blurDataURL={placeholders['Pic1']} />
        </div>
        <div className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-[1px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-20 drop-shadow-lg"
        >
          <h1 className="font-arimo text-5xl md:text-7xl font-bold text-white">
            About
          </h1>
        </motion.div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-arimo text-4xl font-bold mb-6">Our Team</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Meet the passionate individuals behind ToolIt who are dedicated to bringing you the finest outdoor adventure gear. 
              Our team combines decades of experience in design, manufacturing, and outdoor exploration.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </motion.div>

          {/* Team Members */}
          <div className="space-y-20 mt-16">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function TeamMember({ name, image, description, reverse, index }: any) {
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
        className="relative w-full md:w-1/2 h-96 rounded-lg overflow-hidden shadow-2xl"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
      <div className="w-full md:w-1/2 space-y-4">
        <h3 className="font-roboto text-3xl md:text-4xl font-bold text-black">
          {name}
        </h3>
        <p className="font-sans text-lg text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
