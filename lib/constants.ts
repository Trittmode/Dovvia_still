import { Product, NavigationItem, FAQItem, Testimonial, SDGGoal } from './types';

export const SITE_CONFIG = {
  name: 'Dovvia Still',
  description: 'Premium glass bottled still water - Pure and affordable to support and sustain communities through cutting-edge water purification technology and returnable system.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://still.dovvia.com',
  company: 'Dovvia Industries Limited',
};

export const CONTACT_INFO = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348166167775',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+234 816 616 7775',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'admin@dovvia.com',
  address: 'Kuje, Abuja, Nigeria',
};

export const WHATSAPP_MESSAGES = {
  general: "Hello, I'd like to make an inquiry about Dovvia Still water.",
  order50cl: "Hello, I'd like to order Dovvia Still water - 50cl glass bottles.",
  order75cl: "Hello, I'd like to order Dovvia Still water - 75cl glass bottles.",
  partnership: "Hello, I'm interested in becoming a Dovvia Still distributor.",
  bulkOrder: "Hello, I'd like to discuss bulk orders of Dovvia Still water.",
};

export const NAVIGATION: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Quality', href: '/quality' },
  { name: 'Partners', href: '/partners' },
  { name: 'Contact', href: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: '50cl',
    name: 'Dovvia Still 50cl',
    price: 100,
    size: '50cl',
    volume: '500ml',
    description: '',
    refundAmount: 150,
    image: '/Dovvia still bg.png',
    useCases: ['Personal Use', 'Events', 'On-the-Go', 'Catering'],
    dimensions: {
      height: '24cm',
      diameter: '6cm',
    },
  },
  {
    id: '75cl',
    name: 'Dovvia Still 75cl',
    price: 120,
    size: '75cl',
    volume: '750ml',
    description: '',
    refundAmount: 150,
    image: '/Dovvia still bg.png',
    useCases: ['Home', 'Office', 'Meetings', 'Family'],
    dimensions: {
      height: '28cm',
      diameter: '7cm',
    },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Chioma Adewale',
    role: 'Event Planner, Lagos',
    content: 'Dovvia Still water has become our go-to choice for all corporate events. The glass bottles add a premium touch, and knowing we are supporting sustainability makes it even better.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Dr. Ibrahim Mohammed',
    role: 'Healthcare Professional',
    content: 'As a doctor, I recommend Dovvia Still to my patients. The purity standards and glass packaging ensure no chemical leaching, making it the healthiest choice for hydration.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sarah Okonkwo',
    role: 'Restaurant Owner',
    content: 'Our customers love the premium quality of Dovvia Still. The bottle return program is brilliant - it helps us reduce waste while offering great value.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Ahmed Bello',
    role: 'Corporate Executive',
    content: 'We switched our entire office to Dovvia Still. The quality is exceptional, and the circular economy model aligns perfectly with our company sustainability goals.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Grace Nwankwo',
    role: 'Fitness Instructor',
    content: 'I recommend Dovvia Still to all my fitness clients. Pure water in glass bottles - no plastic taste, no chemicals, just pure hydration.',
    rating: 5,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Product & Quality',
    question: 'What makes Dovvia Still water premium quality?',
    answer: 'Dovvia Still water undergoes a rigorous multi-stage purification process using cutting-edge Chinese and German engineering technology. Our water passes through pre-filtration, activated carbon filtration, reverse osmosis, UV sterilization, and ozonation. Every batch is tested to ensure the highest purity standards, and we bottle exclusively in glass to preserve taste and prevent chemical leaching.',
  },
  {
    category: 'Product & Quality',
    question: 'What sizes are available?',
    answer: 'We offer two premium sizes: 50cl (500ml) perfect for personal use and events, and 75cl (750ml) ideal for home and office use. Both are packaged in elegant glass bottles.',
  },
  {
    category: 'Product & Quality',
    question: 'Where does the water come from?',
    answer: 'Our water is sourced from carefully selected natural sources and treated using state-of-the-art purification technology that meets and exceeds Nigerian regulatory standards (NAFDAC and SON compliance).',
  },
  {
    category: 'Product & Quality',
    question: 'Why glass bottles instead of plastic?',
    answer: 'Glass bottles are 100% recyclable, preserve the pure taste of water, and prevent harmful chemical leaching that can occur with plastic bottles. Our glass packaging is part of our commitment to your health and environmental sustainability.',
  },
  {
    category: 'Ordering & Delivery',
    question: 'How do I order Dovvia Still water?',
    answer: 'You can order directly through WhatsApp using the "Order on WhatsApp" buttons throughout our website. Simply click the button for your preferred size, and our team will assist you with your order.',
  },
  {
    category: 'Ordering & Delivery',
    question: 'What are the delivery areas?',
    answer: 'We currently deliver across Lagos and surrounding areas. Contact us via WhatsApp or our contact page to confirm delivery to your specific location.',
  },
  {
    category: 'Ordering & Delivery',
    question: 'Is there a minimum order quantity?',
    answer: 'Minimum order quantities vary based on your location and delivery requirements. Contact our team via WhatsApp for specific details and to discuss bulk order discounts.',
  },
  {
    category: 'Bottle Return & Refund',
    question: 'How does the bottle return program work?',
    answer: 'Our circular economy model is simple: purchase Dovvia Still water, enjoy the premium quality, and return your empty glass bottles to receive ₦150 refund per bottle. This supports sustainability while providing value back to you.',
  },
  {
    category: 'Bottle Return & Refund',
    question: 'Where can I return empty bottles?',
    answer: 'You can return bottles at authorized collection points or during your next delivery. Contact us via WhatsApp to find the nearest collection point or arrange pickup.',
  },
  {
    category: 'Bottle Return & Refund',
    question: 'How long does it take to receive my refund?',
    answer: 'Refunds are typically processed within 24-48 hours of bottle return verification. You can choose to receive your refund as cash, credit towards your next order, or mobile money transfer.',
  },
  {
    category: 'Partnership & Distribution',
    question: 'How can I become a Dovvia Still distributor?',
    answer: 'We welcome partnership inquiries from businesses and individuals who share our commitment to quality and sustainability. Visit our Partners page to submit a distributor inquiry form, or contact us directly via WhatsApp.',
  },
  {
    category: 'Partnership & Distribution',
    question: 'What are the requirements to become a distributor?',
    answer: 'Ideal partners have business registration, storage facilities, distribution capabilities in their territory, and a commitment to maintaining our premium brand standards. We provide full training and marketing support.',
  },
  {
    category: 'Partnership & Distribution',
    question: 'Are territories exclusive?',
    answer: 'We offer exclusive territory opportunities for qualified distributors based on location and projected volume. Territory availability varies, so contact us early to secure your preferred area.',
  },
  {
    category: 'Sustainability & Impact',
    question: 'How does Dovvia Still support sustainability?',
    answer: 'We support multiple UN Sustainable Development Goals through our glass bottle circular economy model, reducing plastic waste, creating local jobs through our bottle return program, and ensuring access to clean drinking water. Every bottle returned prevents plastic pollution and supports community empowerment.',
  },
  {
    category: 'Sustainability & Impact',
    question: 'What is the environmental impact of glass vs plastic?',
    answer: 'Glass is infinitely recyclable without quality degradation, unlike plastic which can only be recycled a few times. Our glass bottles reduce microplastic pollution, ocean plastic waste, and carbon emissions. Plus, glass doesn\'t leach chemicals into water.',
  },
];

export const SDG_GOALS: SDGGoal[] = [
  {
    number: 6,
    title: 'Clean Water and Sanitation',
    description: 'Ensuring availability and sustainable management of water and sanitation for all',
    icon: 'droplet',
    impact: [
      'Providing access to premium purified drinking water',
      'Meeting highest purity and quality standards',
      'Transparent quality testing and certification',
    ],
  },
  {
    number: 8,
    title: 'Decent Work and Economic Growth',
    description: 'Promoting sustained, inclusive and sustainable economic growth',
    icon: 'briefcase',
    impact: [
      'Creating jobs through bottle collection and return program',
      'Supporting local employment in production and distribution',
      'Empowering communities through economic participation',
    ],
  },
  {
    number: 12,
    title: 'Responsible Consumption and Production',
    description: 'Ensuring sustainable consumption and production patterns',
    icon: 'recycle',
    impact: [
      'Implementing circular economy through bottle returns',
      'Using 100% recyclable glass packaging',
      'Incentivizing responsible consumption with refund program',
    ],
  },
  {
    number: 13,
    title: 'Climate Action',
    description: 'Taking urgent action to combat climate change and its impacts',
    icon: 'leaf',
    impact: [
      'Reducing plastic waste and carbon emissions',
      'Preventing plastic from entering landfills and oceans',
      'Supporting sustainable packaging alternatives',
    ],
  },
  {
    number: 14,
    title: 'Life Below Water',
    description: 'Conserving and sustainably using the oceans, seas and marine resources',
    icon: 'waves',
    impact: [
      'Preventing plastic bottle ocean pollution',
      'Protecting marine ecosystems from plastic waste',
      'Promoting ocean-friendly packaging solutions',
    ],
  },
];

export const PURIFICATION_STEPS = [
  {
    step: 1,
    title: 'Pre-Filtration',
    description: 'Initial filtration removes sediment and larger particles from the source water.',
  },
  {
    step: 2,
    title: 'Activated Carbon Filtration',
    description: 'Advanced carbon filters remove chlorine, organic compounds, and unwanted tastes or odors.',
  },
  {
    step: 3,
    title: 'Reverse Osmosis',
    description: 'State-of-the-art RO technology removes up to 99% of dissolved solids, minerals, and contaminants.',
  },
  {
    step: 4,
    title: 'UV Sterilization',
    description: 'Ultraviolet light eliminates bacteria, viruses, and other microorganisms for microbiologically safe water.',
  },
  {
    step: 5,
    title: 'Ozonation',
    description: 'Final ozone treatment ensures complete disinfection and maintains water freshness.',
  },
  {
    step: 6,
    title: 'Quality Testing',
    description: 'Every batch undergoes rigorous laboratory testing to verify purity standards before bottling.',
  },
  {
    step: 7,
    title: 'Glass Bottling',
    description: 'Purified water is bottled in premium glass bottles using automated integrated engineering systems.',
  },
];

export const CORE_VALUES = [
  {
    title: 'Excellence',
    description: 'We maintain the highest standards in every aspect of our business, from water purification to customer service.',
    icon: 'award',
  },
  {
    title: 'Simplicity',
    description: 'We simplify complex processes and models to deliver clean, safe, and premium water to our customers.',
    icon: 'check-circle',
  },
  {
    title: 'Innovation',
    description: 'We invest in cutting-edge technology and research to deliver superior water quality.',
    icon: 'lightbulb',
  },
  {
    title: 'Sustainability',
    description: 'Our circular economy model reduces waste while creating value for our customers and communities.',
    icon: 'leaf',
  },
  {
    title: 'Integrity',
    description: 'We are transparent about our processes, testing, and commitment to quality without false health claims.',
    icon: 'shield',
  },
  {
    title: 'Community',
    description: 'We empower local communities through job creation and our bottle return program.',
    icon: 'users',
  },
];
