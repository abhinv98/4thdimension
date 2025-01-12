'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { debounce } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Enhanced scroll handling with direction detection
  const handleScroll = useCallback(
    debounce(() => {
      const currentScrollY = window.scrollY;
      
      // Update header visibility based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    }, 50),
    [lastScrollY]
  );

  useEffect(() => {
    setMounted(true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navItems = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Services',
      href: '/services',
      children: [
        {
          title: 'AR/VR Solutions',
          href: '/services/ar-vr',
          description: 'Step into immersive realities where digital and physical worlds converge.',
          icon: '🎮'
        },
        {
          title: 'Social Media',
          href: '/services/social-media',
          description: 'Navigate the dynamic landscape of digital connections and engagement.',
          icon: '🌐'
        },
        {
          title: 'Marketing & Analytics',
          href: '/services/marketing',
          description: "Amplify your brand's presence across the digital universe.",
          icon: '📈'
        }
      ]
    },
    {
      title: 'Contact',
      href: '/contact',
    }
  ];

  const headerClass = mounted
    ? `fixed w-full z-50 transition-all duration-300 transform-gpu ${
        isScrolled 
          ? 'bg-metallic-black/95 backdrop-blur-md shadow-lg border-b border-silver/10' 
          : 'bg-transparent'
      } ${
        isVisible 
          ? 'translate-y-0' 
          : '-translate-y-full'
      }`
    : 'fixed w-full z-50';

  return (
    <header className={headerClass}>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-metallic-black/50 to-transparent opacity-50"
        style={{
          background: isScrolled 
            ? 'linear-gradient(180deg, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.8) 100%)' 
            : 'transparent'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative group"
          >
            <span className="text-xl font-bold tracking-wider metallic-text-enhanced">
              4TH DIMENSION
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-blue/50 to-neon-blue 
              transition-all duration-300 group-hover:w-full transform-gpu"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger 
                          className="text-silver hover:text-neon-blue transition-colors px-4 py-2
                            data-[state=open]:text-neon-blue data-[state=open]:bg-metallic-black/80
                            transform-gpu group"
                        >
                          <span className="relative">
                            {item.title}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-green 
                              transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[400px] lg:w-[500px] p-4
                            bg-metallic-black/95 backdrop-blur-md
                            border border-neon-blue/20
                            shadow-[0_0_15px_rgba(0,163,255,0.1)]
                            rounded-lg transform-gpu
                            animate-in fade-in-0 zoom-in-95 duration-200">
                            {/* Metallic gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-silver/5 via-transparent to-neon-blue/5 pointer-events-none rounded-lg" />
                            
                            <ul className="grid gap-3 relative z-10">
                              {item.children.map((child) => (
                                <li key={child.title} className="group">
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={child.href}
                                      className="block p-4 rounded-lg 
                                        transition-all duration-300
                                        border border-transparent
                                        hover:border-neon-blue/20
                                        hover:bg-neon-blue/5
                                        transform-gpu
                                        relative overflow-hidden
                                        group"
                                    >
                                      {/* Hover glow effect */}
                                      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/5 to-neon-blue/0 
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                      
                                      <div className="relative z-10">
                                        <div className="flex items-center space-x-2">
                                          <span className="text-xl">{child.icon}</span>
                                          <div className="text-neon-blue font-medium
                                            group-hover:text-neon-blue/90 transition-colors">
                                            {child.title}
                                          </div>
                                        </div>
                                        <p className="text-silver/80 text-sm leading-snug mt-1
                                          group-hover:text-silver/90 transition-colors">
                                          {child.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-silver hover:text-neon-blue transition-colors px-4 py-2
                          relative group inline-block transform-gpu"
                      >
                        <span className="relative">
                          {item.title}
                          <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-blue/50 to-neon-blue 
                            transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                        </span>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Button */}
            <Button 
              className="metallic-button-shine relative overflow-hidden
                bg-metallic-black/50 border border-neon-blue text-neon-blue font-medium
                shadow-[0_0_15px_rgba(0,163,255,0.3)] 
                hover:shadow-[0_0_30px_rgba(0,163,255,0.6)]
                hover:border-neon-blue/80
                hover:scale-105
                transition-all duration-300
                px-6 py-2 transform-gpu
                group"
            >
              <span className="relative z-10 group-hover:text-white transition-colors">
                Begin Exploration
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-blue to-neon-green 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                className="p-2 text-silver hover:text-neon-blue transition-colors"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[300px] bg-metallic-black/95 backdrop-blur-md border-neon-blue/20"
            >
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.children ? item.href : item.href}
                    className="metallic-button-shine text-silver hover:text-neon-blue 
                      transition-colors py-2 px-4 relative group overflow-hidden
                      border border-transparent hover:border-neon-blue/20 rounded-lg"
                  >
                    <span className="relative z-10">{item.title}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/5 to-neon-blue/0 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                ))}
                <Button 
                  className="metallic-button-shine relative overflow-hidden
                    bg-metallic-black/50 border border-neon-blue text-neon-blue
                    shadow-[0_0_15px_rgba(0,163,255,0.3)] 
                    hover:shadow-[0_0_30px_rgba(0,163,255,0.6)]
                    transition-all duration-300 mt-4
                    group"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors">
                    Begin Exploration
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-blue to-neon-green 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;