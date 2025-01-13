import { Suspense } from 'react'
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </Suspense>
    </>
  )
}