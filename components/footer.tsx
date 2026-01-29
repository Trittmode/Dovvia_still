'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { SITE_CONFIG, CONTACT_INFO, NAVIGATION } from '@/lib/constants';
import { supabase } from '@/lib/supabase';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already Subscribed',
            description: 'This email is already subscribed to our newsletter.',
            variant: 'default',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Successfully Subscribed!',
          description: 'Thank you for subscribing to our newsletter.',
        });
        setEmail('');
      }
    } catch (error) {
      toast({
        title: 'Subscription Failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dovvia-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Image
              src="/dovvia_t.png"
              alt="Dovvia Still Logo"
              width={150}
              height={50}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-dovvia-100 text-sm leading-relaxed">
              Premium glass bottled still water. Pure and green, supporting sustainable communities.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-dovvia-200 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-dovvia-200 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-dovvia-200 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-dovvia-200 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-dovvia-200 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-dovvia-200 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/sdg-impact"
                  className="text-dovvia-200 hover:text-white transition-colors text-sm"
                >
                  SDG Impact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-dovvia-300 mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="text-dovvia-200 hover:text-white transition-colors text-sm"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-dovvia-300 mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-dovvia-200 hover:text-white transition-colors text-sm"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-dovvia-300 mt-0.5 flex-shrink-0" />
                <span className="text-dovvia-200 text-sm">
                  {CONTACT_INFO.address}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-dovvia-200 text-sm mb-4">
              Subscribe to get updates on new products and special offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-dovvia-800 border-dovvia-700 text-white placeholder:text-dovvia-400"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-dovvia-500 hover:bg-dovvia-600"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-dovvia-800 mt-12 pt-8 text-center">
          <p className="text-dovvia-300 text-sm">
            &copy; {currentYear} {SITE_CONFIG.company}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
