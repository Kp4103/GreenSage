"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pacifico } from "next/font/google"
import { Menu, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

interface FormData {
  name: string
  email: string
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight - 80
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Adjust this value based on your navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const scrollToFooter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const footer = document.querySelector("footer")
    if (footer) {
      const yOffset = -80
      const y = footer.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      toast({
        title: "Success!",
        description: "Thank you for your interest. We'll be in touch soon!",
        duration: 5000,
        className: "bg-green-100 border-green-400 text-green-700",
      })

      // Reset form and close dialog
      setFormData({ name: "", email: "" })
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 5000,
        className: "bg-red-100 border-red-400 text-red-700",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    return (
      formData.name.trim() !== "" && formData.email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
  }

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                className={`w-8 h-8 transition-colors duration-300 ${scrolled ? "text-[#2D4A29]" : "text-white"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              <span
                className={`text-2xl font-semibold transition-colors duration-300 ${pacifico.className} ${
                  scrolled ? "text-[#2D4A29]" : "text-white text-shadow"
                }`}
              >
                GreenSage
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {["services", "testimonials"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`font-medium transition-colors duration-300 ${
                    scrolled ? "text-gray-600 hover:text-[#2D4A29]" : "text-[#F0F4F0] hover:text-white text-shadow"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
              <a
                href="#contact"
                onClick={scrollToFooter}
                className={`font-medium transition-colors duration-300 ${
                  scrolled ? "text-gray-600 hover:text-[#2D4A29]" : "text-[#F0F4F0] hover:text-white text-shadow"
                }`}
              >
                Contact
              </a>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className={`transition-all duration-300 ${
                      scrolled
                        ? "bg-[#2D4A29] text-white hover:bg-[#4A6B47]"
                        : "bg-white text-[#2D4A29] hover:bg-[#F0F4F0]"
                    }`}
                  >
                    Get Started
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Get Started with GreenSage</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to begin your sustainability journey with GreenSage Consulting.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="col-span-3 border-gray-300 focus:border-[#2D4A29] focus:ring-[#2D4A29]"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="email" className="text-right font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="col-span-3 border-gray-300 focus:border-[#2D4A29] focus:ring-[#2D4A29]"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button
                        type="submit"
                        disabled={!validateForm() || isLoading}
                        className={`bg-[#2D4A29] text-white hover:bg-[#4A6B47] ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="md:hidden">
              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="ghost"
                className={`p-2 ${scrolled ? "text-[#2D4A29]" : "text-white"}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
              {["services", "testimonials"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className="block py-2 text-gray-600 hover:text-[#2D4A29]"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
              <a href="#contact" onClick={scrollToFooter} className="block py-2 text-gray-600 hover:text-[#2D4A29]">
                Contact
              </a>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-4 bg-[#2D4A29] text-white hover:bg-[#4A6B47]">Get Started</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Get Started with GreenSage</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to begin your sustainability journey with GreenSage Consulting.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="col-span-3 border-gray-300 focus:border-[#2D4A29] focus:ring-[#2D4A29]"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="email" className="text-right font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="col-span-3 border-gray-300 focus:border-[#2D4A29] focus:ring-[#2D4A29]"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button
                        type="submit"
                        disabled={!validateForm() || isLoading}
                        className={`bg-[#2D4A29] text-white hover:bg-[#4A6B47] ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </nav>
      <Toaster position="top-center" />
    </>
  )
}

