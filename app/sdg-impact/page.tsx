import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Droplet,
  Recycle,
  Briefcase,
  Leaf,
  Waves,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { SDG_GOALS, WHATSAPP_MESSAGES } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "UN SDG Impact - Sustainable Development Goals",
  description:
    "Learn how Dovvia Still supports UN Sustainable Development Goals through clean water access, circular economy, job creation, and environmental protection.",
};

const iconMap: Record<string, any> = {
  droplet: Droplet,
  briefcase: Briefcase,
  recycle: Recycle,
  leaf: Leaf,
  waves: Waves,
};

export default function SDGImpactPage() {
  return (
    <div className="flex flex-col">
      <section className="py-20 bg-gradient-to-br from-dovvia-50 via-white to-dovvia-50">
        <div className="container mx-auto px-2">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-dovvia-500 hover:bg-dovvia-600">
              UN SDG Alignment
            </Badge>
            <h1>Our Sustainable Development Impact</h1>
            <p className="text-xl text-gray-600">
              Dovvia Still is committed to supporting the United Nations
              Sustainable Development Goals through our circular economy model
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-2">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070"
                  alt="Sustainable development"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2>Business with Purpose</h2>
                <p className="text-lg text-gray-600">
                  We believe that business success and positive social impact go
                  hand in hand. Our innovative glass bottle circular economy
                  model addresses multiple global challenges while delivering
                  premium quality water to our customers.
                </p>
                <p className="text-lg text-gray-600">
                  Every bottle you purchase and return contributes to
                  environmental protection, job creation, and community
                  empowerment across Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dovvia-50">
        <div className="container mx-auto px-2">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Our SDG Contributions</h2>
            <p className="text-lg text-gray-600">
              Aligned with the United Nations 2030 Agenda for Sustainable
              Development
            </p>
          </div>
          <div className="max-w-6xl mx-auto space-y-8">
            {SDG_GOALS.map((goal) => {
              const IconComponent = iconMap[goal.icon];
              return (
                <Card
                  key={goal.number}
                  className="overflow-hidden hover:shadow-xl transition-all"
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className="bg-gradient-to-br from-dovvia-500 to-dovvia-700 text-white p-8 flex flex-col justify-center items-center text-center">
                        <div className="h-20 w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                        <div className="text-3xl font-bold mb-2">
                          SDG {goal.number}
                        </div>
                        <h3 className="text-lg font-semibold">{goal.title}</h3>
                      </div>
                      <div className="md:col-span-2 p-8 space-y-4">
                        <p className="text-gray-700 font-medium">
                          {goal.description}
                        </p>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-dovvia-900">
                            Our Impact:
                          </h4>
                          {goal.impact.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <CheckCircle className="h-5 w-5 text-dovvia-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-2">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                {
                  title: "Environmental Impact",
                  desc: "Reducing plastic waste and ocean pollution through 100% recyclable glass bottles",
                  icon: Leaf,
                },
                {
                  title: "Social Impact",
                  desc: "Creating jobs and economic opportunities through our bottle return program",
                  icon: Briefcase,
                },
                {
                  title: "Economic Impact",
                  desc: "Supporting circular economy and providing value back to customers",
                  icon: Recycle,
                },
              ].map((impact, index) => (
                <Card
                  key={index}
                  className="border-2 border-dovvia-200 hover:border-dovvia-400 transition-all"
                >
                  <CardContent className="p-8 space-y-4">
                    <div className="h-16 w-16 bg-dovvia-100 rounded-full flex items-center justify-center mx-auto">
                      <impact.icon className="h-8 w-8 text-dovvia-600" />
                    </div>
                    <h3 className="text-xl font-bold text-dovvia-900">
                      {impact.title}
                    </h3>
                    <p className="text-gray-600">{impact.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dovvia-900 via-dovvia-800 to-dovvia-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Globe className="h-16 w-16 mx-auto" />
            <h2>Join the Movement</h2>
            <p className="text-xl text-dovvia-100">
              Every bottle you purchase and return contributes to a more
              sustainable future for Nigeria and our planet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-dovvia-900 hover:bg-dovvia-50"
              >
                <a
                  href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Dovvia Still
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                <Link href="/partners">Become a Partner</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
