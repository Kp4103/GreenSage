import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F3]">
      <Navbar />
      <Hero />
      <Services />
      <Testimonials />
      <Footer />
    </main>
  )
}

