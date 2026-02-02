import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[600px] flex items-center justify-center bg-gradient-to-br from-dovvia-50 via-white to-dovvia-50">
      <div className="container mx-auto px-2">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-9xl font-bold text-dovvia-500">404</h1>
            <h2 className="text-3xl font-bold text-dovvia-900">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved or doesn't exist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-dovvia-500 hover:bg-dovvia-600"
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">View Products</Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-dovvia-200">
            <p className="text-gray-600 mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Products", href: "/products" },
                { name: "Quality", href: "/quality" },
                { name: "Partners", href: "/partners" },
                { name: "Contact", href: "/contact" },
                { name: "FAQ", href: "/faq" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-dovvia-600 hover:text-dovvia-700 hover:underline text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
