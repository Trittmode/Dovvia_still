import Image from 'next/image';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Droplet, Package, Recycle } from 'lucide-react';
import { PRODUCTS, WHATSAPP_MESSAGES } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Our Products - Glass Bottled Still Water',
  description: 'Discover Dovvia Still premium glass bottled water in 50cl and 75cl sizes. Earn ₦150 refund per bottle returned. Perfect for home, office, and events.',
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col">
      <section className="py-20 bg-gradient-to-br from-dovvia-50 via-white to-dovvia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-dovvia-500 hover:bg-dovvia-600">Our Products</Badge>
            <h1>Premium Glass Bottled Water</h1>
            <p className="text-xl text-gray-600">
              Experience pure hydration in eco-friendly glass bottles. Available in convenient sizes for every occasion.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {PRODUCTS.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all border-2 border-dovvia-100">
                <CardContent className="p-0">
                  <div className="relative h-96 bg-gradient-to-br from-dovvia-50 to-white flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={350}
                      height={384}
                      className="object-contain animate-float"
                    />
                    <Badge className="absolute top-6 right-6 bg-green-500 hover:bg-green-600 text-lg px-4 py-2">
                      ₦{product.refundAmount} Refund
                    </Badge>
                  </div>
                  <div className="p-8 space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-dovvia-900 mb-3">
                        {product.name}
                      </h2>
                      <p className="text-lg text-gray-600">{product.description}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Droplet className="h-5 w-5 text-dovvia-500" />
                        <span className="text-gray-700">Volume: {product.volume}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Package className="h-5 w-5 text-dovvia-500" />
                        <span className="text-gray-700">Premium Glass Bottle</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Recycle className="h-5 w-5 text-dovvia-500" />
                        <span className="text-gray-700">100% Recyclable</span>
                      </div>
                      {product.dimensions && (
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-dovvia-500" />
                          <span className="text-gray-700">
                            Dimensions: {product.dimensions.height} x {product.dimensions.diameter}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold text-dovvia-900 mb-3">Perfect For:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.useCases.map((useCase) => (
                          <Badge key={useCase} variant="secondary" className="text-sm">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-dovvia-500 hover:bg-dovvia-600"
                      size="lg"
                    >
                      <a
                        href={getWhatsAppLink(
                          product.id === '50cl'
                            ? WHATSAPP_MESSAGES.order50cl
                            : WHATSAPP_MESSAGES.order75cl
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Order {product.size} on WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dovvia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Bottle Return & Refund Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Purchase', desc: 'Buy your Dovvia Still water' },
                { step: '2', title: 'Enjoy', desc: 'Experience premium purity' },
                { step: '3', title: 'Return', desc: 'Bring back empty bottles' },
                { step: '4', title: 'Get ₦150', desc: 'Receive refund per bottle' },
              ].map((item) => (
                <Card key={item.step} className="text-center hover:shadow-lg transition-all">
                  <CardContent className="p-6 space-y-3">
                    <div className="h-12 w-12 bg-dovvia-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-dovvia-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2>Interested in Bulk Orders?</h2>
            <p className="text-xl text-gray-600">
              Contact us for special pricing on bulk orders for events, corporate offices, and distribution.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-dovvia-500 hover:bg-dovvia-600"
            >
              <a
                href={getWhatsAppLink(WHATSAPP_MESSAGES.bulkOrder)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inquire About Bulk Orders
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
