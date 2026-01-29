import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Beaker, ShieldCheck, Award, Factory, ArrowRight } from 'lucide-react';
import { PURIFICATION_STEPS, WHATSAPP_MESSAGES } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Quality & Process - Advanced Water Purification Technology',
  description: 'Learn about our cutting-edge Chinese and German engineering technology for water purification, bottling, and quality control. NAFDAC and SON certified.',
};

export default function QualityPage() {
  return (
    <div className="flex flex-col">
      <section className="py-20 bg-gradient-to-br from-dovvia-50 via-white to-dovvia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-dovvia-500 hover:bg-dovvia-600">Quality & Technology</Badge>
            <h1>World-Class Purification Technology</h1>
            <p className="text-xl text-gray-600">
              Cutting-edge Chinese and German engineering ensures every drop meets the highest international standards
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="space-y-6">
                <h2>Advanced Engineering Excellence</h2>
                <p className="text-lg text-gray-600">
                  Our entire water treatment, bottling, and packaging processes employ state-of-the-art Chinese and German professional engineering principles and technology.
                </p>
                <p className="text-lg text-gray-600">
                  We've invested in cutting-edge equipment and systems that represent the pinnacle of water purification and bottling technology, ensuring consistent quality and safety in every bottle.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'German Filtration',
                    'Chinese Automation',
                    'NAFDAC Certified',
                    'SON Compliant',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-dovvia-500" />
                      <span className="font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070"
                  alt="Advanced water purification technology"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dovvia-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4">Multi-Stage Purification Process</h2>
              <p className="text-xl text-dovvia-100">
                Seven carefully monitored stages ensure absolute purity
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PURIFICATION_STEPS.map((step) => (
                <Card key={step.step} className="bg-dovvia-800 border-dovvia-700">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 bg-dovvia-500 rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                      <Beaker className="h-6 w-6 text-dovvia-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-dovvia-200">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4">Quality Assurance & Certifications</h2>
              <p className="text-lg text-gray-600">
                Rigorous testing and compliance with Nigerian and international standards
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: 'NAFDAC Registered',
                  desc: 'Full compliance with Nigerian food and drug regulations',
                },
                {
                  icon: Award,
                  title: 'SON Certified',
                  desc: 'Meets Standards Organisation of Nigeria requirements',
                },
                {
                  icon: Beaker,
                  title: 'Lab Tested',
                  desc: 'Regular testing for microbiological and chemical safety',
                },
                {
                  icon: Factory,
                  title: 'ISO Standards',
                  desc: 'International quality management systems compliance',
                },
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-dovvia-100 rounded-full flex items-center justify-center mx-auto">
                      <item.icon className="h-8 w-8 text-dovvia-600" />
                    </div>
                    <h3 className="font-semibold text-dovvia-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dovvia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1624876379146-a4c95e8be4b6?q=80&w=2070"
                  alt="Glass bottle production"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2>Why Glass Bottles?</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: 'No Chemical Leaching',
                      desc: 'Glass is inert and does not leach harmful chemicals into water, unlike plastic.',
                    },
                    {
                      title: 'Preserves Purity',
                      desc: 'Maintains the natural taste and quality of water without plastic aftertaste.',
                    },
                    {
                      title: '100% Recyclable',
                      desc: 'Glass can be recycled infinitely without quality degradation.',
                    },
                    {
                      title: 'Eco-Friendly',
                      desc: 'Reduces plastic pollution and supports environmental sustainability.',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-dovvia-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-dovvia-900">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2>Experience the Quality Difference</h2>
            <p className="text-xl text-gray-600">
              Order Dovvia Still today and taste the purity that comes from world-class technology
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
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
