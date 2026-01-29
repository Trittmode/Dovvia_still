'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { TrendingUp, Users, Handshake, Award, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { WHATSAPP_MESSAGES } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function PartnersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      business_name: formData.get('business_name') as string,
      contact_name: formData.get('contact_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      whatsapp: formData.get('whatsapp') as string,
      location: formData.get('location') as string,
      business_type: formData.get('business_type') as string,
      expected_volume: formData.get('expected_volume') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase
        .from('distributor_inquiries')
        .insert([data]);

      if (error) throw error;

      toast({
        title: 'Application Submitted!',
        description: 'Thank you for your interest. Our team will contact you within 48 hours.',
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
            <Badge className="bg-dovvia-500 hover:bg-dovvia-600">Partnership Opportunities</Badge>
            <h1>Become a Dovvia Still Distributor</h1>
            <p className="text-xl text-gray-600">
              Join Nigeria's leading sustainable water brand and build a profitable business with purpose
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Why Partner with Dovvia Still?</h2>
            <p className="text-lg text-gray-600">
              Build a profitable business while making a positive environmental and social impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: 'Attractive Margins',
                desc: 'Competitive profit margins and commission structure for partners',
              },
              {
                icon: Award,
                title: 'Premium Brand',
                desc: 'Represent a trusted, quality brand with strong market demand',
              },
              {
                icon: Users,
                title: 'Full Support',
                desc: 'Marketing materials, training, and ongoing business support',
              },
              {
                icon: Handshake,
                title: 'Exclusive Territory',
                desc: 'Opportunity for exclusive distribution rights in your area',
              },
            ].map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-14 w-14 bg-dovvia-100 rounded-full flex items-center justify-center mx-auto">
                    <benefit.icon className="h-7 w-7 text-dovvia-600" />
                  </div>
                  <h3 className="font-semibold text-dovvia-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dovvia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <div>
                  <h2 className="mb-6">Partner Requirements</h2>
                  <div className="space-y-4">
                    {[
                      'Valid business registration or entrepreneurial capability',
                      'Storage facility for product inventory',
                      'Distribution network or customer base',
                      'Commitment to maintaining brand quality standards',
                      'Passion for sustainability and environmental responsibility',
                      'Financial capacity for initial inventory investment',
                    ].map((req, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="h-6 w-6 bg-dovvia-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-dovvia-200">
                  <h3 className="text-xl font-semibold text-dovvia-900 mb-4">
                    Partnership Process
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Submit inquiry form or contact via WhatsApp',
                      'Initial review and qualification assessment',
                      'Territory availability confirmation',
                      'Partnership agreement and terms discussion',
                      'Training and onboarding',
                      'Launch and ongoing support',
                    ].map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <ArrowRight className="h-4 w-4 text-dovvia-500" />
                        <span className="text-sm text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="bg-gradient-to-br from-dovvia-500 to-dovvia-700 text-white">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2">Prefer to chat directly?</h4>
                    <p className="text-dovvia-100 mb-4 text-sm">
                      Contact us on WhatsApp for immediate response to your partnership inquiries
                    </p>
                    <Button
                      asChild
                      variant="secondary"
                      className="w-full bg-white text-dovvia-900 hover:bg-dovvia-50"
                    >
                      <a
                        href={getWhatsAppLink(WHATSAPP_MESSAGES.partnership)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-dovvia-900 mb-6">
                    Distributor Inquiry Form
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="business_name">Business/Individual Name *</Label>
                      <Input
                        id="business_name"
                        name="business_name"
                        required
                        placeholder="Your business name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact_name">Contact Person Name *</Label>
                      <Input
                        id="contact_name"
                        name="contact_name"
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
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        placeholder="+234..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location/Territory of Interest *</Label>
                      <Input
                        id="location"
                        name="location"
                        required
                        placeholder="e.g., Lagos, Ikeja"
                      />
                    </div>

                    <div>
                      <Label htmlFor="business_type">Business Type *</Label>
                      <Select name="business_type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail Store</SelectItem>
                          <SelectItem value="wholesale">Wholesale Distribution</SelectItem>
                          <SelectItem value="events">Events & Catering</SelectItem>
                          <SelectItem value="corporate">Corporate Supply</SelectItem>
                          <SelectItem value="individual">Individual Entrepreneur</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="expected_volume">Expected Monthly Volume</Label>
                      <Select name="expected_volume">
                        <SelectTrigger>
                          <SelectValue placeholder="Select expected volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100-500">100-500 bottles</SelectItem>
                          <SelectItem value="500-1000">500-1,000 bottles</SelectItem>
                          <SelectItem value="1000-5000">1,000-5,000 bottles</SelectItem>
                          <SelectItem value="5000+">5,000+ bottles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your experience, distribution network, or any questions..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-dovvia-500 hover:bg-dovvia-600"
                      size="lg"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
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
