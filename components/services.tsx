"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Leaf, Recycle, Zap, TrendingUp, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from "sonner"

const services = [
  {
    icon: <Leaf className="h-12 w-12" />,
    title: "Eco-Friendly Strategies",
    description: "Develop comprehensive strategies to reduce your environmental impact while improving efficiency.",
    details:
      "Our eco-friendly strategies encompass a wide range of sustainable practices, including waste reduction, energy efficiency, and sustainable sourcing. We work closely with your team to identify areas for improvement and implement tailored solutions that align with your business goals and environmental values.",
  },
  {
    icon: <Recycle className="h-12 w-12" />,
    title: "Circular Economy Solutions",
    description: "Implement circular economy principles to minimize waste and maximize resource utilization.",
    details:
      "Our circular economy solutions focus on creating closed-loop systems within your business operations. We help you redesign products and processes to eliminate waste, extend product lifecycles, and create new value from what was previously considered waste. This approach not only reduces environmental impact but often leads to cost savings and new revenue streams.",
  },
  {
    icon: <Zap className="h-12 w-12" />,
    title: "Energy Efficiency",
    description: "Optimize energy consumption and transition to renewable sources to reduce costs and emissions.",
    details:
      "Our energy efficiency services include comprehensive energy audits, implementation of energy-saving technologies, and strategies for transitioning to renewable energy sources. We help you identify and prioritize energy-saving opportunities, implement smart energy management systems, and develop long-term plans for sustainable energy use.",
  },
  {
    icon: <TrendingUp className="h-12 w-12" />,
    title: "Sustainable Growth",
    description:
      "Align your business growth with sustainable practices to ensure long-term success and positive impact.",
    details:
      "Our sustainable growth strategies focus on integrating sustainability into your core business model and growth plans. We help you identify sustainable market opportunities, develop eco-friendly products and services, and create a corporate culture that values and prioritizes sustainability. This approach ensures that your business growth contributes positively to both your bottom line and the environment.",
  },
]

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [bubbles, setBubbles] = useState<Array<{ size: number; left: number; animationDuration: number }>>([])
  const [selectedService, setSelectedService] = useState<number | null>(null)

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, () => ({
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      animationDuration: Math.random() * 20 + 10,
    }))
    setBubbles(newBubbles)
  }, [])

  const handleContactClick = (service: string) => {
    toast(`Thank you for your interest in ${service}`, {
      description: "We'll be in touch soon!",
      action: {
        label: "Close",
        onClick: () => console.log("Toast closed"),
      },
    })
  }

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-[#F0F4F0] overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className="bubble absolute rounded-full bg-[#4A6B47] opacity-5"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              bottom: `-${bubble.size}px`,
              animationDuration: `${bubble.animationDuration}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D4A29] mb-4">
            Our <span className="italic text-[#4A6B47]">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions to drive sustainability across your entire business ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative z-10 h-full flex flex-col">
                <div className="mb-6 text-[#4A6B47] transition-transform duration-300 hover:scale-110 relative">
                  <div className="absolute -inset-4 bg-[#4A6B47]/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[#2D4A29] group-hover:text-[#4A6B47] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="mt-6 flex items-center text-[#4A6B47] font-medium cursor-pointer hover:text-[#2D4A29] transition-colors duration-300 group"
                      onClick={() => setSelectedService(index)}
                    >
                      <span className="mr-2">Learn More</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-gradient-to-br from-white to-[#F5F5F3]">
                    <div className="relative">
                      {/* Header with gradient background */}
                      <div className="bg-gradient-to-r from-[#2D4A29] to-[#4A6B47] p-6 text-white">
                        <DialogTitle className="text-2xl font-bold flex items-center space-x-3">
                          {service.icon}
                          <span>{service.title}</span>
                        </DialogTitle>
                      </div>

                      {/* Content section */}
                      <div className="p-6">
                        <DialogDescription className="text-gray-600 text-lg leading-relaxed space-y-4">
                          <div className="space-y-4">
                            <p>{service.details}</p>
                            <div className="mt-6 space-y-4">
                              <h4 className="font-semibold text-[#2D4A29]">Key Benefits:</h4>
                              <ul className="space-y-2">
                                {[
                                  "Reduced environmental impact",
                                  "Cost savings through efficiency",
                                  "Enhanced brand reputation",
                                  "Regulatory compliance",
                                ].map((benefit, i) => (
                                  <li key={i} className="flex items-start">
                                    <div className="h-2 w-2 mt-2 mr-2 bg-[#4A6B47] rounded-full" />
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </DialogDescription>

                        {/* Call to action section */}
                        <div className="mt-8 flex justify-end">
                          <Button
                            className="bg-[#2D4A29] text-white hover:bg-[#4A6B47]"
                            onClick={() => handleContactClick(service.title)}
                          >
                            Contact Us
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#4A6B47] rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2D4A29] rounded-full opacity-5 translate-x-1/2 translate-y-1/2" />
      <BubbleStyle />
      <Toaster />
    </section>
  )
}

const bubbleKeyframes = `
  @keyframes float {
    0% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-75vh) scale(1.5);
    }
    100% {
      transform: translateY(-150vh) scale(1);
    }
  }

  .bubble {
    position: absolute;
    animation: float linear infinite;
  }
`

const BubbleStyle = () => (
  <style jsx global>
    {bubbleKeyframes}
  </style>
)

