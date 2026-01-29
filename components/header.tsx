'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NAVIGATION, WHATSAPP_MESSAGES } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/dovvia_t.png"
              alt="Dovvia Still Logo"
              width={180}
              height={60}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-dovvia-400 ${
                  isActivePath(item.href)
                    ? 'text-dovvia-500'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              className="border-dovvia-400 text-dovvia-600 hover:bg-dovvia-50"
            >
              <a
                href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Now
              </a>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-8">
                <Link href="/" className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/dovvia_t.png"
                    alt="Dovvia Still Logo"
                    width={150}
                    height={50}
                    className="h-10 w-auto"
                  />
                </Link>

                <nav className="flex flex-col space-y-4">
                  {NAVIGATION.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-dovvia-400 ${
                        isActivePath(item.href)
                          ? 'text-dovvia-500'
                          : 'text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 border-t">
                  <Button
                    asChild
                    className="w-full bg-dovvia-500 hover:bg-dovvia-600"
                  >
                    <a
                      href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Order on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
