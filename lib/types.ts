export interface Product {
  id: string;
  name: string;
  size: string;
  volume: string;
  description: string;
  refundAmount: number;
  price?: number;
  image: string;
  useCases: string[];
  dimensions?: {
    height: string;
    diameter: string;
  };
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface DistributorInquiry {
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  location: string;
  business_type?: string;
  expected_volume?: string;
  message?: string;
}

export interface NewsletterSubscription {
  email: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface SDGGoal {
  number: number;
  title: string;
  description: string;
  icon: string;
  impact: string[];
}
