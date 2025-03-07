import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GreenSage Consulting - Sustainable Business Solutions",
  description: "Expert consulting for eco-friendly and sustainable business practices",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          document.addEventListener('mousemove', function(e) {
            const cards = document.querySelectorAll('.tilt-card');
            cards.forEach(card => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              
              const rotateX = (y - centerY) / 10;
              const rotateY = (centerX - x) / 10;
              
              card.style.setProperty('--rotate-x', rotateX + 'deg');
              card.style.setProperty('--rotate-y', rotateY + 'deg');
            });
          });
        `,
          }}
        />
      </body>
    </html>
  )
}



import './globals.css'