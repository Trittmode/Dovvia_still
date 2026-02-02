"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplet,
  Recycle,
  Shield,
  Leaf,
  Award,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
  Globe,
  Factory,
  HeartHandshake,
} from "lucide-react";
import { PRODUCTS, TESTIMONIALS, WHATSAPP_MESSAGES } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/whatsapp";

function useScrollVisible(threshold = 100) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - threshold) setVisible(true);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return [ref, visible] as const;
}

const partners = [
    { name: "Ebeano", logo: "./ebeano.jpg" },
    { name: "Dovvia", logo: "./superchefs-logo.png" },
    { name: "Justrite", logo: "./justrite.png" },
    { name: "Blenco", logo: "./blenco.png" },
    { name: "ValueCity", logo: "./value-city.png" },
    { name: "Aflon", logo: "./aflon.png" },
    { name: "bokku", logo: "./bokku.png" },
  ];


export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[700px] md:min-h-[800px] flex items-center justify-center bg-gradient-to-b from-white via-dovvia-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548266652-99cf27701ced?q=80&w=2070')] bg-cover bg-center opacity-[0.15]"></div>

        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-dovvia-100/40 to-transparent"></div>

        <div className="container mx-auto px-2 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="hidden lg:flex space-y-8 lg:text-left order-2 lg:order-1 flex-col mb-28">
              <div className="space-y-4 ">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dovvia-900 typing">
                  Dovvia Still
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 font-medium">
                  Premium glass bottled water crafted for a healthier lifestyle.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-dovvia-500 hover:bg-dovvia-600 text-white px-8 py-6 text-lg shadow-lg"
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
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-dovvia-500 text-dovvia-600 hover:bg-dovvia-50 px-8 py-6 text-lg"
                >
                  <Link href="/partners">Become a Partner</Link>
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-6 max-w-md mx-auto lg:mx-0 pt-4">
                {[
                  { value: "100%", label: "Pure" },
                  { value: "₦150", label: "Refund" },
                  { value: "Glass", label: "Eco-Friendly" },
                  { value: "150mt", label: "Plastic/yr" },
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-dovvia-600">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] md:h-[650px] flex items-start justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576670159805-381d2d1f4c8e?q=80&w=2070')] bg-contain bg-left bg-no-repeat opacity-30 scale-110 blur-sm"></div>

              <div className="absolute left-0 inset-0 flex justify-center pb-60 ">
                <div className="relative w-[500px] h-full flex items-center">
                  {/* <div className="absolute left-0 inset-0 bg-gradient-radial from-dovvia-200/50 via-dovvia-100/30 to-transparent rounded-full blur-2xl"></div> */}

                  <div className="relative z-2 animate-float">
                    <Image
                      src="/Dovvia still bg.png"
                      alt="Dovvia Still Premium Glass Bottled Water"
                      width={500}
                      height={900}
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Mobile overlay: place heading and short paragraph to the right of the bottle */}
              <div className="lg:hidden z-1 absolute inset-0">
                <h1 className="absolute right-4 mt-20 w-[calc(100%-32px)] px-4 justify-center text-center order-1 text-3xl md:text-4xl font-bold text-dovvia-900 typing">
                  Dovvia{"               "}Still
                </h1>
                {/* <div className="absolute flex flex-col left-[1px] mt-20 transform -translate-y-1/4 w-[calc(100%-3200px)] px-4 text-center text-3xl md:text-4xl font-bold text-dovvia-900 typing">
                  <p className="mr-60"> Dovvia </p> <p className="ml-60"> Still </p>
                </div> */}

                <div className="space-y-8 lg:text-left order-2 lg:order-1">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start  mt-80">
                    <Button
                      asChild
                      size="lg"
                      className="bg-dovvia-500 hover:bg-dovvia-600 text-white px-8 py-6 text-lg shadow-lg"
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
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-2 border-dovvia-500 text-dovvia-600 hover:bg-dovvia-50 px-8 py-6 text-lg"
                    >
                      <Link href="/partners">Become a Partner</Link>
                    </Button>
                  </div>

                  <div className="grid grid-cols-4 gap-6 max-w-md mx-auto lg:mx-0 pt-4">
                    {[
                      { value: "100%", label: "Pure" },
                      { value: "₦150", label: "Refund" },
                      { value: "Glass", label: "ESG" },
                      { value: "150mt", label: "Plastic/yr" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center lg:text-left">
                        <div className="text-xl md:text-3xl font-bold text-dovvia-600">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-2">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-dovvia-900 mb-4">
              Why Choose Dovvia Still
            </h2>
            <p className="text-lg text-gray-600">
              Experience the difference of premium quality water delivered in
              sustainable glass bottles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Droplet,
                title: "Premium",
                description:
                  "Purity with advanced multi-stage purification using cutting-edge German and Chinese engineering technology ensures the highest quality standards.",
                image: "/pure_water.webp",
              },
              {
                icon: Shield,
                title: "Glass",
                description:
                  "Packaging that preserves taste, prevent leaching, & 100% recyclable for ultimate safety and sustainability.",
                image: "/glass_bottle.webp",
              },
              {
                icon: Recycle,
                title: "Circular Economy",
                description:
                  "Return your bottles or give to the needy to receive ₦150 refund.",
                image: "/circular.jpg",
              },
              {
                icon: Factory,
                title: "Advanced Technology",
                description:
                  "State-of-the-art Chinese and German engineering systems.",
                image: "/tech.avif",
              },
              {
                icon: HeartHandshake,
                title: "Community Support",
                description:
                  "Our bottle return program creates jobs and empowers communities while reducing environmental impact.",
                image: "/support.jpg",
              },
              {
                icon: Globe,
                title: "United Nations SDG",
                description:
                  "Aligned to 4 sustainable development goals including clean water, responsible consumption, and climate action.",
                image: "/unsdg.jpg",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-dovvia-300 transition-all hover:shadow-lg relative overflow-hidden min-h-[220px]"
              >
                {feature.image ? (
                  <div className="absolute inset-0 w-full h-full z-0">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                ) : (
                  <div className="h-12 w-12 bg-dovvia-100 rounded-lg flex items-center justify-center mt-6 ml-6">
                    <feature.icon className="h-6 w-6 text-dovvia-600" />
                  </div>
                )}
                <CardContent
                  className={
                    feature.image
                      ? "relative z-10 p-6 space-y-4 text-white"
                      : "p-6 space-y-4"
                  }
                >
                  <h3 className="text-xl font-semibold text-dovvia-100">
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm line-clamp-2 ${feature.image ? "text-white" : "text-gray-600"}`}
                  >
                    {" "}
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dovvia-50">
        <div className="container mx-auto px-2">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-dovvia-900 mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600">
              Premium glass bottled still water in convenient sizes for
              everybody
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PRODUCTS.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-2xl transition-all"
              >
                <CardContent className="p-0">
                  <div className="relative h-80 bg-gradient-to-br from-dovvia-50 to-white flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={320}
                      className="object-contain animate-pulse"
                    />
                    <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                      ₦{product.refundAmount} Refund
                    </Badge>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-dovvia-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                    {/* <div className="flex flex-wrap gap-2">
                      {product.useCases.map((useCase) => (
                        <Badge key={useCase} variant="secondary">
                          {useCase}
                        </Badge>
                      ))}
                    </div> */}
                    <Button
                      asChild
                      className="w-full bg-dovvia-500 hover:bg-dovvia-600"
                      size="lg"
                    >
                      <a
                        href={getWhatsAppLink(
                          product.id === "50cl"
                            ? WHATSAPP_MESSAGES.order50cl
                            : WHATSAPP_MESSAGES.order75cl,
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
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-2">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-dovvia-900">
                  Cutting-Edge Purification Technology
                </h2>
                <p className="text-lg text-gray-600">
                  Dovvia water treatment, bottling, and packaging employ
                  state-of-the-art Chinese and German professional engineering
                  principles and technology.
                </p>
                <div className="space-y-4">
                  {[
                    "Multi-stage purification process",
                    "German filtration technology",
                    "Chinese precision engineering",
                    "NAFDAC and SON certified",
                    "Regular laboratory testing",
                    "International quality standards",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-dovvia-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-dovvia-500 hover:bg-dovvia-600"
                >
                  <Link href="/quality">
                    Learn More About Our Process
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070"
                  alt="Water purification technology"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dovvia-500 to-dovvia-700 text-white">
        <div className="container mx-auto px-2">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Circular Economy Model
              </h2>
              <p className="text-xl text-dovvia-100">
                Dovvia bottle return program creates a sustainable cycle that
                benefits everybody
              </p>
            </div>
            <div className="overflow-x-auto md:overflow-visible">
              <div className="flex gap-6 md:flex-wrap md:justify-center">
                {[
                  { step: 1, title: "Purchase", icon: "🛒" },
                  { step: 2, title: "Enjoy", icon: "💧" },
                  { step: 3, title: "Return", icon: "♻️" },
                  { step: 4, title: "Get Refund", icon: "💰" },
                  { step: 5, title: "Support", icon: "👥" },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="text-center flex-shrink-0 w-40 md:w-auto"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/20 transition-all">
                      <div className="text-4xl mb-2">{item.icon}</div>
                      <div className="text-sm font-semibold text-dovvia-200">
                        Step {item.step}
                      </div>
                      <div className="text-lg font-bold">{item.title}</div>
                    </div>
                  </div>
                ))}
                <div
                  key={6}
                  className="text-center flex-shrink-0 w-40 md:w-auto hidden md:block"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/20 transition-all">
                    <div className="text-4xl mb-2">🌍</div>
                    <div className="text-sm font-semibold text-dovvia-200">
                      Step 6
                    </div>
                    <div className="text-lg font-bold">No Waste</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
                <div className="text-5xl font-bold mb-2">₦150</div>
                <div className="text-lg">Refund per bottle returned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-2">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-dovvia-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied customers across Nigeria
            </p>
          </div>
          <div className="overflow-x-auto md:overflow-visible">
            <div className="flex gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {TESTIMONIALS.slice(0, 3).map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="hover:shadow-lg transition-all flex-shrink-0 w-80 md:w-auto"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-dovvia-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-12 bg-white overflow-hidden"
        style={{
          borderTop: "6px solid",
          borderImage: "linear-gradient(to right, #220640, #006400) 1",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-bakery-dark-green text-center mb-8">
            Our Trusted Partners
          </h2>
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .scrolling-container {
              display: flex;
              animation: scroll 30s linear infinite;
            }
            .scrolling-container:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="scrolling-container gap-8">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className={`w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0`}
                title={p.name}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-16 max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dovvia-900 via-dovvia-800 to-dovvia-900 text-white">
        <div className="container mx-auto px-2">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Experience Premium Quality?
            </h2>
            <p className="text-xl text-dovvia-100">
              Order Dovvia Still water today and join the sustainable water
              revolution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-dovvia-900 hover:bg-dovvia-300 px-8 py-6 text-lg"
              >
                <a
                  href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Now on WhatsApp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-dovvia-900 hover:bg-dovvia-300 px-8 py-6 text-lg"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
