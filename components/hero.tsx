"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf } from "lucide-react"
import { motion } from "framer-motion"

function FloatingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create leaves
    const leaves: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      opacity: number
      type: number
    }[] = []

    for (let i = 0; i < 30; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * -1 - 0.5, // Moving upward
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.3 + 0.1,
        type: Math.floor(Math.random() * 3),
      })
    }

    // Draw leaf
    function drawLeaf(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
      type: number,
    ) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = opacity

      // Different leaf shapes
      if (type === 0) {
        // Simple leaf
        ctx.beginPath()
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.ellipse(0, 0, size, size / 2, 0, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"
        ctx.moveTo(-size, 0)
        ctx.lineTo(size, 0)
        ctx.stroke()
      } else if (type === 1) {
        // Circular bubble
        ctx.beginPath()
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Small dot
        ctx.beginPath()
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
        ctx.arc(0, 0, size / 4, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    // Animation loop
    function animate() {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        leaves.forEach((leaf) => {
          // Update position
          leaf.x += leaf.speedX
          leaf.y += leaf.speedY
          leaf.rotation += leaf.rotationSpeed

          // Reset if out of bounds
          if (leaf.y < -leaf.size) {
            leaf.y = canvas.height + leaf.size
            leaf.x = Math.random() * canvas.width
          }

          if (leaf.x < -leaf.size) {
            leaf.x = canvas.width + leaf.size
          } else if (leaf.x > canvas.width + leaf.size) {
            leaf.x = -leaf.size
          }

          // Draw
          drawLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.rotation, leaf.opacity, leaf.type)
        })

        requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />
}

export default function Hero() {
  const [tiltedCards, setTiltedCards] = useState<{ [key: number]: { x: number; y: number } }>({})
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = (y - centerY) / 10
    const tiltY = (centerX - x) / 10

    setTiltedCards((prev) => ({ ...prev, [index]: { x: tiltX, y: tiltY } }))
  }

  const handleMouseLeave = (index: number) => {
    setTiltedCards((prev) => {
      const newState = { ...prev }
      delete newState[index]
      return newState
    })
  }

  const handleButtonHover = (buttonName: string | null) => {
    setHoveredButton(buttonName)
  }

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      const yOffset = -80 // Adjust based on your navbar height
      const y = servicesSection.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const metallicStyle = {
    background: "linear-gradient(to bottom, #ffffff 0%, #e0e0e0 50%, #ffffff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "2px 2px 4px rgba(0,0,0,0.1), -2px -2px 4px rgba(255,255,255,0.3)",
    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3))",
    lineHeight: "1.3", // Adjusted line height
    padding: "0.5em 0", // Added padding
  }

  return (
    <section className="pt-20 pb-32 px-4 bg-gradient-to-br from-[#2D4A29] to-[#8BA888] relative overflow-hidden">
      <FloatingLeaves />

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto metallic-text" style={metallicStyle}>
          Sustainable Solutions for
          <br />
          <span className="italic font-light inline-block mb-2">Forward-Thinking</span>{" "}
          <span className="inline-block">Businesses</span>
        </h1>

        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Expert consulting to help your business thrive while minimizing environmental impact.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={scrollToServices}
              onMouseEnter={() => handleButtonHover("services")}
              onMouseLeave={() => handleButtonHover(null)}
              className="bg-white text-[#2D4A29] hover:bg-[#4A6B47] hover:text-white text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-white">
                <Leaf
                  className={`w-5 h-5 mr-2 ${hoveredButton === "services" ? "animate-bounce" : ""} transition-colors duration-300 group-hover:text-white`}
                />
                Our Services
              </span>
              <span className="absolute inset-0 bg-[#4A6B47] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onMouseEnter={() => handleButtonHover("learn")}
              onMouseLeave={() => handleButtonHover(null)}
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#2D4A29] text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                Learn More
                <ArrowRight
                  className={`ml-2 h-5 w-5 transition-all duration-300 ${
                    hoveredButton === "learn" ? "translate-x-1" : ""
                  }`}
                />
              </span>
            </Button>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {["Carbon Footprint Analysis", "Sustainable Supply Chain", "Green Technology Integration"].map(
            (item, index) => (
              <div
                key={index}
                className="group perspective hover:z-10"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div
                  className="relative transform transition-all duration-300 ease-out preserve-3d"
                  style={{
                    transform: tiltedCards[index]
                      ? `rotateX(${tiltedCards[index].x}deg) rotateY(${tiltedCards[index].y}deg)`
                      : "none",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-xl backdrop-blur-md shadow-lg"></div>
                  <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 text-white border border-white/20 shadow-xl z-10">
                    <h3 className="text-xl font-semibold mb-2 relative z-20">{item}</h3>
                    <p className="text-white/80 relative z-20">
                      Optimize your business operations with our expert {item.toLowerCase()} services.
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

