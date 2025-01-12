'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const footerColumns = [
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'AR/VR Solutions', href: '/services/ar-vr' },
        { name: 'Social Media Management', href: '/services/social-media' },
        { name: 'Marketing & Analytics', href: '/services/marketing' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Support', href: '/support' }
      ]
    }
  ];

  const contactInfo = {
    email: 'contact@4thdimension.com',
    phone: '+1 (555) 123-4567',
    address: '123 Digital Avenue, Tech City, TC 12345'
  };

  return (
    <footer className="bg-gradient-to-t from-metallic-black to-metallic-dark/20 border-t border-silver/10">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Footer Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-silver font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-silver/80 hover:text-neon-blue transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h3 className="text-silver font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-silver/80 hover:text-neon-blue transition-colors">
                <MailIcon className="w-5 h-5 mr-2" />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>
              <li className="flex items-center text-silver/80 hover:text-neon-blue transition-colors">
                <PhoneIcon className="w-5 h-5 mr-2" />
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </li>
              <li className="flex items-start text-silver/80">
                <MapPinIcon className="w-5 h-5 mr-2 mt-1" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-silver/10 my-8" />

        {/* Brand Section */}
        <div className="text-center space-y-6">
          {/* Large Brand Text */}
          <div className="text-4xl md:text-5xl font-exo font-bold tracking-wider metallic-text-enhanced">
            4TH DIMENSION
          </div>
          
          {/* Copyright */}
          <p className="text-silver/60 text-sm">
            © {mounted ? new Date().getFullYear() : '2025'} 4TH DIMENSION. All rights reserved.
          </p>
        </div>

        {/* Ambient Light Effect */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-radial from-neon-blue/5 to-transparent opacity-30 pointer-events-none" />
      </div>
    </footer>
  );
};

export default Footer;