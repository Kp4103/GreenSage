"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote: "GreenSage's insights transformed our supply chain, reducing costs and environmental impact simultaneously.",
    author: "Sarah Johnson",
    role: "COO, EcoTech Industries",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "Their expertise in sustainable practices helped us achieve our carbon neutrality goals two years ahead of schedule.",
    author: "Michael Chen",
    role: "Sustainability Director, GreenLeaf Corp",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote: "GreenSage's tailored solutions significantly improved our energy efficiency and boosted our brand image.",
    author: "Emma Rodriguez",
    role: "CEO, Sustainable Futures",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-[#F5F5F3] to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-5 bg-cover bg-center"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#2D4A29] mb-4">
            What Our <span className="italic text-[#4A6B47]">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how we've helped businesses achieve their sustainability goals and drive positive change.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl p-8 md:p-12 relative"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#4A6B47] rounded-full p-4">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].author}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="flex justify-center mb-6 mt-8">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-700 italic text-center mb-8">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            <div className="text-center">
              <div className="font-semibold text-lg text-[#2D4A29]">{testimonials[currentIndex].author}</div>
              <div className="text-gray-600">{testimonials[currentIndex].role}</div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-[#4A6B47] text-white hover:bg-[#2D4A29] transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-[#4A6B47] text-white hover:bg-[#2D4A29] transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

