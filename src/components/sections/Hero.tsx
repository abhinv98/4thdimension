'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Handle initial mounting
  useEffect(() => {
    setMounted(true);
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Handle animations after mounting
  useEffect(() => {
    if (!mounted || !heroRef.current) return;

    // Create particles with safe checks
    const createParticle = () => {
      if (!particlesRef.current || !mounted) return;

      const particle = document.createElement('div');
      const size = Math.random() * 2 + 1;
      const depth = Math.random();
      
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = `rgba(192, 192, 192, ${0.1 + depth * 0.2})`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      particlesRef.current.appendChild(particle);

      // Twinkling animation
      gsap.to(particle, {
        duration: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Floating animation
      gsap.to(particle, {
        duration: Math.random() * 10 + 5,
        y: -100,
        repeat: -1,
        ease: "none",
        onRepeat: () => {
          if (mounted) {
            particle.style.left = `${Math.random() * 100}%`;
            gsap.set(particle, { y: 100 });
          }
        }
      });
    };

    // Initialize particles with increased density
    for (let i = 0; i < 100; i++) {
      createParticle();
    }

    // Initial entrance animation
    timelineRef.current = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        // Ensure elements remain visible after animation
        const elements = [headingRef.current, subheadingRef.current, buttonRef.current];
        elements.forEach(element => {
          if (element) {
            gsap.set(element, {
              clearProps: "all",
              opacity: 1,
              visibility: "visible",
              display: "block"
            });
          }
        });
      }
    });

    // Entrance animations
    timelineRef.current
      .from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        filter: 'blur(10px)',
      })
      .from(subheadingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        filter: 'blur(5px)',
      }, "-=0.5")
      .from(buttonRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.6,
      }, "-=0.3");

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (particlesRef.current) {
        gsap.killTweensOf(particlesRef.current.children);
        while (particlesRef.current.firstChild) {
          particlesRef.current.removeChild(particlesRef.current.firstChild);
        }
      }
    };
  }, [mounted]);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-metallic-black"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-metallic-black via-metallic-dark/30 to-metallic-mid/20 opacity-90" />
      
      {/* Particles Container */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0">
        <div className="h-full w-full opacity-10 bg-[linear-gradient(transparent_0%,_rgba(192,192,192,0.2)_1%,_transparent_2%)_0_0/100%_24px,_linear-gradient(90deg,_transparent_0%,_rgba(192,192,192,0.2)_1%,_transparent_2%)_0_0/24px_100%]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-exo font-bold mb-8 tracking-wider opacity-100"
        >
          <span className="block metallic-text-enhanced drop-shadow-2xl">
            WELCOME TO THE 4TH DIMENSION
          </span>
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-lg md:text-xl text-silver/90 max-w-2xl mx-auto mb-12 font-exo tracking-wide drop-shadow-lg opacity-100"
        >
          Experience the future of digital innovation across dimensions
        </p>

        <div 
          ref={buttonRef}
          className="relative inline-block opacity-100"
        >
          <Button 
            size="lg"
            className="metallic-button-shine relative overflow-hidden
              border border-neon-blue text-neon-blue font-exo text-lg tracking-wider
              bg-metallic-black/50 shadow-[0_0_15px_rgba(0,163,255,0.3)]
              hover:shadow-[0_0_30px_rgba(0,163,255,0.6)]
              hover:scale-105
              transition-all duration-300
              group"
          >
            <span className="relative z-10 group-hover:text-white transition-colors">
              Begin Exploration
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-blue to-neon-green 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30 bg-gradient-radial from-neon-blue/10 to-transparent" />
        <div className="absolute inset-0 opacity-20 bg-gradient-radial from-neon-green/5 to-transparent" />
      </div>
    </section>
  );
}