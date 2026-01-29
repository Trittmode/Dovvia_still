import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ_ITEMS, WHATSAPP_MESSAGES } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description: 'Find answers to common questions about Dovvia Still water products, quality, ordering, bottle returns, partnerships, and sustainability.',
};

export default function FAQPage() {
  const categories = Array.from(new Set(FAQ_ITEMS.map((item) => item.category)));

  return (
    <div className="flex flex-col">
      <section className="py-20 bg-gradient-to-br from-dovvia-50 via-white to-dovvia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-dovvia-500 hover:bg-dovvia-600">FAQ</Badge>
            <h1>Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our products, services, and partnerships
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {categories.map((category) => (
              <div key={category} className="space-y-6">
                <h2 className="text-2xl font-bold text-dovvia-900 border-b-2 border-dovvia-200 pb-3">
                  {category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {FAQ_ITEMS.filter((item) => item.category === category).map(
                    (item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category}-${index}`}
                        className="border-2 border-dovvia-100 rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left hover:text-dovvia-600">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dovvia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <MessageCircle className="h-16 w-16 text-dovvia-600 mx-auto" />
              <h2>Still Have Questions?</h2>
              <p className="text-lg text-gray-600">
                Our team is here to help. Contact us for personalized assistance.
              </p>
            </div>
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
                  Chat on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
