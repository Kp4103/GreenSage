"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, Shield, BarChart3, Layers } from "lucide-react"

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Lightning Fast Performance",
      description: "Experience unparalleled speed with our optimized platform, delivering results in milliseconds.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Enterprise-Grade Security",
      description:
        "Rest easy knowing your data is protected by military-grade encryption and advanced security protocols.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Advanced Analytics",
      description: "Gain valuable insights with our powerful analytics tools, helping you make data-driven decisions.",
    },
    {
      icon: <Layers className="h-6 w-6 text-primary" />,
      title: "Seamless Integration",
      description: "Connect with your existing tools and workflows through our extensive API and integration options.",
    },
  ]

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern noise-bg opacity-30"></div>

      {/* Purple glow */}
      <div className="blur-glow bg-primary/30" style={{ bottom: "20%", left: "10%" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glow">
            <span className="gradient-text">Powerful</span> Features
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our platform offers cutting-edge capabilities designed to transform your digital experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeFeature === index
                    ? "bg-white/5 border border-primary/20 shadow-lg shadow-primary/10"
                    : "bg-transparent border border-white/5 hover:bg-white/5"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg ${activeFeature === index ? "bg-primary/10" : "bg-white/5"}`}>
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="aspect-square w-full max-w-md mx-auto relative">
              {/* Feature visualization */}
              <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-black to-gray-900 grid-pattern">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-6">
                      <div className="w-14 h-14 rounded-full bg-primary/40 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          {features[activeFeature].icon}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text">{features[activeFeature].title}</h3>
                    <p className="text-white/70">{features[activeFeature].description}</p>
                  </motion.div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

