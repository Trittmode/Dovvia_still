import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Target, Eye, Heart, ArrowRight } from 'lucide-react';
import { CORE_VALUES, WHATSAPP_MESSAGES, SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'About Us - Our Story & Values',
  description: 'Learn about Dovvia Industries Limited, our commitment to premium water quality, sustainability, and community empowerment through innovative glass bottle circular economy.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="relative py-20 bg-gradient-to-br from-dovvia-50 via-white to-dovvia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1>Our Story</h1>
            <p className="text-xl text-gray-600">
              Transforming the African water industry through premium quality, sustainability, and community empowerment
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070"
                  alt="About Dovvia Still"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2>Who We Are</h2>
                <p className="text-lg text-gray-600">
                  Dovvia Industries Limited is a leading Nigerian company committed to providing premium glass bottled still water that meets the highest international standards. We combine cutting-edge technology with environmental responsibility to deliver water excellence.
                </p>
                <p className="text-lg text-gray-600">
                  Our journey began with a simple yet powerful vision: to revolutionize water consumption in Nigeria by offering a sustainable alternative to plastic bottles while maintaining uncompromising quality standards.
                </p>
                <p className="text-lg text-gray-600">
                  Today, we stand as pioneers in the circular economy model, proving that environmental sustainability and business success can go hand in hand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dovvia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white border-2 border-dovvia-200">
                <CardContent className="p-8 space-y-4">
                  <div className="h-12 w-12 bg-dovvia-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-dovvia-600" />
                  </div>
                  <h3>Our Mission</h3>
                  <p className="text-gray-600">
                    To provide Nigerians with premium quality water in eco-friendly glass bottles while creating sustainable value for our customers, communities, and the environment through our innovative bottle return program.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-dovvia-200">
                <CardContent className="p-8 space-y-4">
                  <div className="h-12 w-12 bg-dovvia-100 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-dovvia-600" />
                  </div>
                  <h3>Our Vision</h3>
                  <p className="text-gray-600">
                    To become Africa's leading sustainable water brand, setting the standard for quality, environmental responsibility, and community impact in the beverage industry.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2>Our Core Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {CORE_VALUES.map((value, index) => (
              <Card key={index} className="border-2 hover:border-dovvia-300 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 bg-dovvia-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-dovvia-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-dovvia-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dovvia-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <h2>Our Commitment</h2>
              <p className="text-xl text-dovvia-100">
                Quality, sustainability, and community are at the heart of everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Advanced Technology',
                  description: 'Investment in modern engineering technology ensures world-class water purification and bottling standards.',
                },
                {
                  title: 'Regulatory Compliance',
                  description: 'Full compliance with NAFDAC and SON regulations, with regular testing and certification.',
                },
                {
                  title: 'Environmental Responsibility',
                  description: 'Our glass bottle circular economy model reduces plastic waste and supports United Nations Sustainable Development Goals.',
                },
                {
                  title: 'Community Empowerment',
                  description: 'Creating jobs and economic opportunities through our bottle return and collection model.',
                },
              ].map((item, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-dovvia-200">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2>Join Our Journey</h2>
            <p className="text-xl text-gray-600">
              Partner with us and, or enjoy our premium water. Together, we're building a sustainable world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-dovvia-500 hover:bg-dovvia-600"
              >
                <a
                  href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order on WhatsApp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/partners">Become a Partner</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
