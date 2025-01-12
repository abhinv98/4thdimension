import { Suspense } from 'react'
import Hero from '@/components/sections/Hero'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Service dimension data
const dimensions = [
  {
    id: 1,
    title: "AR/VR Solutions",
    description: "Step into immersive realities where digital and physical worlds converge.",
    icon: "🎮",
    color: "from-neon-blue/20 to-transparent"
  },
  {
    id: 2,
    title: "Social Media",
    description: "Navigate the dynamic landscape of digital connections and engagement.",
    icon: "🌐",
    color: "from-neon-green/20 to-transparent"
  },
  {
    id: 3,
    title: "Digital Marketing",
    description: "Amplify your brand's presence across the digital universe.",
    icon: "📈",
    color: "from-purple-500/20 to-transparent"
  },
  {
    id: 4,
    title: "Web Development",
    description: "Create stunning digital experiences that push boundaries.",
    icon: "💻",
    color: "from-pink-500/20 to-transparent"
  }
]

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </Suspense>
    </>
  )
}