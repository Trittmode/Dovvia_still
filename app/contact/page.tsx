'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { CONTACT_INFO, WHATSAPP_MESSAGES } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (error) throw error;

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      Promise.all([
        fetch(`${supabaseUrl}/functions/v1/send-email-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ formType: 'contact', data }),
        }).catch(err => console.error('Email notification failed:', err)),

        fetch(`${supabaseUrl}/functions/v1/send-whatsapp-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ formType: 'contact', data }),
        }).catch(err => console.error('WhatsApp notification failed:', err)),
      ]);

      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will respond within 24 hours.',
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Please try again or contact us via WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="py-20 bg-gradient-to-br from-dovvia-50 via-white to-dovvia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1>Contact Us</h1>
            <p className="text-xl text-gray-600">
              We're here to help. Reach out to us for orders, inquiries, or partnership opportunities
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {[
              {
                icon: MessageCircle,
                title: 'WhatsApp',
                info: CONTACT_INFO.whatsapp,
                link: getWhatsAppLink(WHATSAPP_MESSAGES.general),
                color: 'bg-green-500',
              },
              {
                icon: Phone,
                title: 'Phone',
                info: CONTACT_INFO.phone,
                link: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
                color: 'bg-dovvia-500',
              },
              {
                icon: Mail,
                title: 'Email',
                info: CONTACT_INFO.email,
                link: `mailto:${CONTACT_INFO.email}`,
                color: 'bg-dovvia-600',
              },
              {
                icon: MapPin,
                title: 'Location',
                info: CONTACT_INFO.address,
                link: '#',
                color: 'bg-dovvia-700',
              },
            ].map((contact, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-4 text-center">
                  <div className={`h-14 w-14 ${contact.color} rounded-full flex items-center justify-center mx-auto`}>
                    <contact.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dovvia-900 mb-1">{contact.title}</h3>
                    {contact.link !== '#' ? (
                      <a
                        href={contact.link}
                        className="text-sm text-dovvia-600 hover:underline"
                        target={contact.title === 'WhatsApp' ? '_blank' : undefined}
                        rel={contact.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                      >
                        {contact.info}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-600">{contact.info}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="mb-6">Send Us a Message</h2>
                  <p className="text-gray-600">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

                <Card className="bg-dovvia-50 border-dovvia-200">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-6 w-6 text-dovvia-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-dovvia-900 mb-2">Business Hours</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                          <p>Saturday: 9:00 AM - 4:00 PM</p>
                          <p>Sunday: 12:00 PM - 3:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-dovvia-500 to-dovvia-700 text-white">
                  <CardContent className="p-6 space-y-4">
                    <MessageCircle className="h-10 w-10" />
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Need Immediate Assistance?</h4>
                      <p className="text-dovvia-100 text-sm mb-4">
                        Chat with us on WhatsApp for quick responses to your questions
                      </p>
                      <Button
                        asChild
                        variant="secondary"
                        className="w-full bg-white text-dovvia-900 hover:bg-dovvia-50"
                      >
                        <a
                          href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open WhatsApp Chat
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+234..."
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Select name="subject" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                          <SelectItem value="Product Order">Product Order</SelectItem>
                          <SelectItem value="Partnership">Partnership Opportunity</SelectItem>
                          <SelectItem value="Support">Customer Support</SelectItem>
                          <SelectItem value="Feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-dovvia-500 hover:bg-dovvia-600"
                      size="lg"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
