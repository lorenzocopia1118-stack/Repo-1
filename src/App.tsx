import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, Leaf, TreeDeciduous, Recycle, Package, Shield, Zap, Mail, Phone, MapPin, Star, Quote } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

const TreeFreeWebsite: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter Pack',
      price: '$29',
      description: 'Perfect for individuals starting their eco-journey',
      features: [
        '50 tree-free paper sheets',
        'Eco-friendly packaging',
        'Free shipping',
        'Digital sustainability guide',
        'Email support'
      ]
    },
    {
      name: 'Business Bundle',
      price: '$99',
      description: 'Ideal for small businesses and offices',
      features: [
        '250 tree-free paper sheets',
        'Premium eco-packaging',
        'Priority shipping',
        'Sustainability certificate',
        'Bulk discount available',
        'Priority support',
        'Custom branding options'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Large-scale solutions for corporations',
      features: [
        'Unlimited tree-free products',
        'White-label options',
        'Dedicated account manager',
        'Custom sustainability reports',
        'Volume pricing',
        '24/7 premium support',
        'Carbon offset tracking',
        'API integration'
      ]
    }
  ];

  const features: Feature[] = [
    {
      icon: <TreeDeciduous className="w-8 h-8" />,
      title: '100% Tree-Free',
      description: 'Made from sustainable agricultural waste, saving thousands of trees annually'
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: 'Fully Recyclable',
      description: 'Our products are completely recyclable and biodegradable within 90 days'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Superior durability and texture that matches traditional paper products'
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Eco Packaging',
      description: 'Shipped in 100% recyclable materials with carbon-neutral delivery'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Production',
      description: 'Quick turnaround times without compromising on sustainability'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Carbon Negative',
      description: 'Every purchase removes more CO2 than it produces'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, GreenTech Solutions',
      content: 'Switching to Tree Free products was the best decision for our company. The quality is outstanding and our clients love our commitment to sustainability.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Operations Manager',
      content: "We've reduced our environmental impact by 80% since partnering with Tree Free. The products are reliable and the service is exceptional.",
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Small Business Owner',
      content: 'As a small business, every choice matters. Tree Free helps us stay true to our values while maintaining professional quality.',
      rating: 5
    }
  ];

  const faqs: FAQ[] = [
    {
      question: 'What are Tree Free products made from?',
      answer: 'Our products are made from agricultural waste such as wheat straw, bamboo, and sugarcane bagasse. These materials are renewable, sustainable, and would otherwise be burned or discarded.'
    },
    {
      question: 'How does the quality compare to traditional paper?',
      answer: 'Tree Free products match or exceed the quality of traditional paper. They offer similar texture, durability, and printability while being more environmentally friendly.'
    },
    {
      question: 'What is your shipping policy?',
      answer: 'We offer free shipping on all Starter Pack orders and above. Business Bundle and Enterprise orders receive priority shipping. All shipments are carbon-neutral.'
    },
    {
      question: 'Can I customize products for my business?',
      answer: 'Yes! Our Business Bundle and Enterprise tiers offer custom branding options. Contact our sales team to discuss your specific requirements.'
    },
    {
      question: 'Do you offer bulk discounts?',
      answer: 'Absolutely! We offer competitive bulk pricing for businesses and organizations. Contact us for a custom quote based on your needs.'
    },
    {
      question: 'How long do products take to biodegrade?',
      answer: 'Our products are designed to biodegrade within 90 days in proper composting conditions, compared to traditional paper which can take much longer.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-green-600 hover:bg-green-700 text-white">
              <Leaf className="w-3 h-3 mr-1" />
              Sustainable & Eco-Friendly
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Paper Without the
              <span className="text-green-600 block mt-2">Environmental Cost</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of businesses making the switch to 100% tree-free paper products.
              Premium quality, zero guilt, maximum impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8">
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Products
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-green-600">50K+</div>
                <div className="text-sm text-muted-foreground mt-1">Trees Saved</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600">1000+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Sustainable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-muted-foreground">
              Companies worldwide are making the sustainable choice
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {['Company A', 'Company B', 'Company C', 'Company D'].map((company, idx) => (
              <div key={idx} className="text-center text-2xl font-bold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Tree Free?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of sustainability and quality
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your sustainability journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <Card
                key={idx}
                className={`relative border-border ${tier.popular ? 'border-green-600 border-2 shadow-xl' : ''}`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                    {tier.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${tier.popular ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from businesses making a difference
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-green-600 mb-2" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{testimonial.content}</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about Tree Free products
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>Fill out the form and we'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your needs..."
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-600" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">contact@treefree.com</p>
                  <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-1">Mon-Fri 9am-6pm EST</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">123 Eco Street</p>
                  <p className="text-muted-foreground">Green City, GC 12345</p>
                  <p className="text-sm text-muted-foreground mt-1">Visit by appointment</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-green-50">
            Join thousands of businesses choosing sustainability without compromise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-green-600">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TreeDeciduous className="w-8 h-8 text-green-600" />
                <span className="text-xl font-bold text-foreground">Tree Free</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making sustainable choices accessible for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Case Studies</li>
                <li>Reviews</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Tree Free. All rights reserved. Made with love for the planet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TreeFreeWebsite;
