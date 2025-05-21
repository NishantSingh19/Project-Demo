"use client";

import Link from 'next/link';
import { Hotel, Heart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/wishlist', label: 'Wishlist', icon: Heart },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <Hotel size={28} />
          <span>Occasion Stays</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                "hover:bg-primary-foreground/10",
                pathname === link.href ? "bg-primary-foreground/20 font-semibold" : ""
              )}
            >
              <Link href={link.href} className="flex items-center gap-2">
                <link.icon size={18} />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
