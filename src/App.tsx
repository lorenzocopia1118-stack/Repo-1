import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Ship,
  Plane,
  Truck,
  ShieldCheck,
  Handshake,
  Boxes,
  Globe2,
  ArrowRight,
  Mail,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  Clock,
  Headset,
  BadgeCheck,
  TrendingUp,
  PackageCheck,
  Anchor,
  Warehouse,
} from 'lucide-react';
import { motion } from 'motion/react';
import { DotGlobeHero } from '@/components/ui/globe-hero';
import logo from '@/assets/inexo-logo.png';
import logoWhite from '@/assets/inexo-logo-white.png';

interface Service {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  points: string[];
}

interface ValueProp {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// Replace with iNexo's real Formspree form ID (https://formspree.io → New form).
// Until then, submissions fall back to a mailto: handoff so nothing is lost.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';
const CONTACT_EMAIL = 'inexotrade@gmail.com';
const CONTACT_ADDRESS = '610 Rincón, Montevideo, Uruguay';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_ADDRESS)}`;
const LEGAL_NAME = 'Inexo SA';
const TAGLINE = 'Global trade, simplified.';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why iNexo', href: '#why' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const services: Service[] = [
  {
    icon: <Ship className="h-7 w-7" />,
    title: 'International Logistics',
    tagline: 'Air · Sea · Land',
    description:
      'Full-scale freight forwarding and supply chain management across air, sea, and land — connecting your business to every corner of the globe.',
    points: ['Freight forwarding & consolidation', 'Customs clearance & compliance', 'Door-to-door supply chain visibility'],
  },
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: 'Cargo Insurance',
    tagline: 'Origin to destination',
    description:
      'Comprehensive cargo insurance tailored to your trade routes and commodities. We protect your shipments from origin to destination.',
    points: ['Route & commodity-specific cover', 'All-risk and named-peril policies', 'Fast, transparent claims handling'],
  },
  {
    icon: <Handshake className="h-7 w-7" />,
    title: 'Sales & Representation',
    tagline: 'Market growth',
    description:
      'Strategic commercial representation and business development that opens new markets, forges key partnerships, and drives international growth.',
    points: ['Market entry & expansion', 'Partner sourcing & negotiation', 'Brand and commercial representation'],
  },
  {
    icon: <Boxes className="h-7 w-7" />,
    title: 'Trading',
    tagline: 'Quality, competitively priced',
    description:
      'We offer our customers a wide variety of quality products through an excellent service at international competitive prices.',
    points: ['Broad, vetted product portfolio', 'Competitive global pricing', 'Reliable sourcing & fulfilment'],
  },
];

const valueProps: ValueProp[] = [
  {
    icon: <Globe2 className="h-6 w-6" />,
    title: 'Truly Global Network',
    description: 'Agents and partners across major trade lanes keep your cargo moving, wherever it needs to go.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'On-Time, Every Time',
    description: 'Proactive tracking and milestone management mean fewer surprises and dependable transit times.',
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: 'Compliance First',
    description: 'Customs, documentation and regulatory expertise that keeps your shipments clear of costly delays.',
  },
  {
    icon: <Headset className="h-6 w-6" />,
    title: 'One Point of Contact',
    description: 'A dedicated coordinator who knows your account — no call-centre runaround, just answers.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Built to Scale',
    description: 'From a single pallet to full programmes, our solutions grow with your business.',
  },
  {
    icon: <PackageCheck className="h-6 w-6" />,
    title: 'End-to-End Protection',
    description: 'Integrated insurance and risk management so the value of your goods is never exposed.',
  },
];

const steps: Step[] = [
  { number: '01', title: 'Consult', description: 'We learn your routes, commodities and timelines to map the right solution.' },
  { number: '02', title: 'Plan', description: 'A tailored logistics, insurance and trading plan with clear, competitive pricing.' },
  { number: '03', title: 'Move', description: 'We execute across air, sea and land with live tracking at every milestone.' },
  { number: '04', title: 'Deliver', description: 'Goods arrive protected, on time, with full documentation and support.' },
];

const stats = [
  { value: '3', label: 'Transport modes — air, sea & land', suffix: '' },
  { value: '100', label: 'Global trade lanes served', suffix: '+' },
  { value: '24', label: 'Shipment support', suffix: '/7' },
  { value: '4', label: 'Integrated core services', suffix: '' },
];

const partners = ['Maersk', 'DHL', 'MSC', 'Kuehne+Nagel', 'DB Schenker', 'CMA CGM', 'DSV', 'Hapag-Lloyd'];

const faqs: FAQ[] = [
  {
    question: 'Which regions and trade lanes do you cover?',
    answer:
      'Through our global network of agents and partners, iNexo manages shipments across all major air, sea and land corridors worldwide. Tell us your origin and destination and we will confirm the best routing and transit options.',
  },
  {
    question: 'Can you handle both the shipping and the insurance for my cargo?',
    answer:
      'Yes. We combine freight forwarding with cargo insurance tailored to your specific routes and commodities, so your goods are protected from origin to destination under a single, coordinated point of contact.',
  },
  {
    question: 'Do you only forward freight, or can you also source and trade products?',
    answer:
      'Both. Alongside logistics, our trading division offers a wide variety of quality products at internationally competitive prices, and our Sales & Representation team can open new markets and partnerships on your behalf.',
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Send us your shipment or sourcing details through the contact form below, or reach us directly by phone or email. We typically respond with a tailored proposal within one business day.',
  },
];

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal elements as they scroll into view (futuristic fade/slide-up).
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) next.message = 'Please tell us a little about your needs.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');

    const subject = `Quote request from ${formData.name}${formData.company ? ` (${formData.company})` : ''}`;

    // If Formspree hasn't been configured yet, fall back to a mailto: handoff
    // so a real quote request is never silently dropped.
    if (FORMSPREE_ENDPOINT.includes('your-form-id')) {
      const body =
        `Name: ${formData.name}\n` +
        `Company: ${formData.company || '—'}\n` +
        `Email: ${formData.email}\n` +
        `Service: ${formData.service || '—'}\n\n` +
        `${formData.message}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('success');
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: subject }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-foreground"
      >
        Skip to content
      </a>
      {/* ===== Header ===== */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-border bg-background/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2" aria-label="iNexo — home">
            <img src={logo} alt="iNexo" width={134} height={34} className="h-7 w-auto sm:h-8" />
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
              <a href="#contact">
                Get a Quote
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
          </div>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 bg-brand text-brand-foreground hover:bg-brand/90">
                <a href="#contact" onClick={() => setMenuOpen(false)}>
                  Get a Quote
                </a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content">
      {/* ===== Hero (3D globe) ===== */}
      <DotGlobeHero
        id="home"
        rotationSpeed={0.0035}
        color="#1b5cf0"
        opacity={0.28}
        className="bg-grid h-auto min-h-screen pt-28 pb-20 sm:pt-32 lg:pt-36"
      >
        {/* Legibility + glow overlays */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/50 via-background/10 to-background/80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
        >
          <Badge className="mb-6 border-brand/20 bg-brand/10 text-brand backdrop-blur-sm hover:bg-brand/10">
            <Globe2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
            {TAGLINE}
          </Badge>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            Connecting your business to
            <span className="text-gradient-brand"> every corner of the globe</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            iNexo delivers freight forwarding, cargo insurance, commercial representation and trading under one roof — moving
            your goods across air, sea and land, protected from origin to destination.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-brand text-brand-foreground shadow-glow hover:bg-brand/90">
              <a href="#contact">
                Get a Quote
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/60 backdrop-blur-sm">
              <a href="#services">Explore Services</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand" /> Air, sea & land freight
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand" /> Insured end-to-end
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand" /> Competitive pricing
            </span>
          </div>

          {/* Freight modes card */}
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card/70 shadow-glow backdrop-blur-md">
            <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
              {[
                { icon: <Plane className="h-6 w-6" />, label: 'Air Freight', sub: 'Fast, time-critical' },
                { icon: <Ship className="h-6 w-6" />, label: 'Sea Freight', sub: 'FCL & LCL' },
                { icon: <Truck className="h-6 w-6" />, label: 'Land Freight', sub: 'Road & rail' },
                { icon: <Warehouse className="h-6 w-6" />, label: 'Warehousing', sub: 'Storage & distribution' },
              ].map((item) => (
                <div key={item.label} className="bg-card/80 p-5 text-left">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    {item.icon}
                  </div>
                  <div className="font-semibold text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-between gap-2 border-t border-border bg-muted/40 px-6 py-4 sm:flex-row">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Anchor className="h-4 w-4 text-brand" /> Origin to destination, fully tracked
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Live <span className="h-2 w-2 animate-pulse-glow rounded-full bg-brand" />
              </span>
            </div>
          </div>
        </motion.div>
      </DotGlobeHero>

      {/* ===== Partner marquee ===== */}
      <section aria-label="Trusted carriers and partners" className="border-y border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Working alongside the world&apos;s leading carriers
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-12">
              {[...partners, ...partners].map((p, i) => (
                <span key={i} className="whitespace-nowrap text-xl font-bold text-muted-foreground/60">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">What we do</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Core Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Four integrated capabilities that move, protect, represent and supply your business across borders.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {services.map((service, idx) => (
              <Card
                key={service.title}
                style={{ '--reveal-delay': `${idx * 90}ms` } as React.CSSProperties}
                className="reveal hover-glow group relative overflow-hidden border-border transition-all hover:border-brand/40"
              >
                <CardContent className="p-7">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                      {service.icon}
                    </div>
                    <Badge variant="secondary" className="font-medium text-muted-foreground">
                      {service.tagline}
                    </Badge>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-2 text-muted-foreground">{service.description}</p>
                  <ul className="mt-5 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stats band ===== */}
      <section className="border-y border-border bg-[var(--ink)] py-16 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              style={{ '--reveal-delay': `${idx * 90}ms` } as React.CSSProperties}
              className="reveal text-center"
            >
              <div className="text-4xl font-bold sm:text-5xl">
                <span className="text-brand">{stat.value}</span>
                <span className="text-brand">{stat.suffix}</span>
              </div>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Why iNexo ===== */}
      <section id="why" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">Why iNexo</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A logistics partner, not just a vendor
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We combine global reach with hands-on service, so your supply chain is faster, safer and easier to manage.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((vp, idx) => (
              <div
                key={vp.title}
                style={{ '--reveal-delay': `${idx * 80}ms` } as React.CSSProperties}
                className="reveal hover-glow rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  {vp.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{vp.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{vp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section id="process" className="bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">How we work</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">From enquiry to delivery</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A clear, four-step process that keeps you informed at every milestone.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                style={{ '--reveal-delay': `${idx * 90}ms` } as React.CSSProperties}
                className="reveal relative rounded-xl border border-border bg-card p-6"
              >
                <span className="text-3xl font-bold text-brand/30">{step.number}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                {idx < steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-brand/40 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">About iNexo</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              One partner for global trade
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              iNexo brings logistics, insurance, representation and trading together into a single, accountable relationship.
              Whether you are importing, exporting, entering a new market or sourcing products, we handle the complexity so you
              can focus on growth.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our team works as an extension of yours — proactive, transparent and obsessed with getting your goods where they
              need to be, on time and fully protected.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Integrated logistics, insurance & trading',
                'Dedicated account coordinators',
                'Competitive international pricing',
                'Customs & compliance expertise',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Accordion type="single" collapsible defaultValue="item-0" className="rounded-xl border border-border bg-card px-5">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className={idx === faqs.length - 1 ? 'border-b-0' : ''}>
                  <AccordionTrigger className="text-left text-base font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="bg-muted/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand">Get in touch</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Let&apos;s move your business forward
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Tell us about your shipment, route or sourcing need and we&apos;ll respond with a tailored proposal — usually
                within one business day.
              </p>

              {/* NOTE: Replace the placeholder contact details (defined as constants
                  at the top of this file) with iNexo's real info. */}
              <div className="mt-8 space-y-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Email</span>
                    <span className="font-medium text-foreground">{CONTACT_EMAIL}</span>
                  </span>
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Office</span>
                    <span className="font-medium text-foreground">{CONTACT_ADDRESS}</span>
                    <span className="mt-0.5 block text-sm text-brand">View on Google Maps →</span>
                  </span>
                </a>
              </div>
            </div>

            <Card className="border-border">
              <CardContent className="p-6 sm:p-8">
                {status === 'success' ? (
                  <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center" role="status">
                    <CheckCircle2 className="h-14 w-14 text-brand" aria-hidden="true" />
                    <h3 className="mt-4 text-xl font-semibold text-foreground">Thank you!</h3>
                    <p className="mt-2 max-w-sm text-muted-foreground">
                      Your request has been received. A member of the iNexo team will be in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-label="Request a quote">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">
                          Name <span className="text-brand">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleInputChange}
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-sm text-destructive">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Company name"
                          value={formData.company}
                          onChange={handleInputChange}
                          autoComplete="organization"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">
                        Email <span className="text-brand">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="service">Service of interest</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        <option value="">Select a service…</option>
                        {services.map((s) => (
                          <option key={s.title} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Other">Other / Not sure</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">
                        Message <span className="text-brand">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your shipment, route or sourcing need…"
                        value={formData.message}
                        onChange={handleInputChange}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-sm text-destructive">{errors.message}</p>
                      )}
                    </div>
                    {status === 'error' && (
                      <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        Something went wrong sending your request. Please try again, or email us directly at{' '}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline">{CONTACT_EMAIL}</a>.
                      </p>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === 'submitting'}
                      className="w-full bg-brand text-brand-foreground hover:bg-brand/90 disabled:opacity-70"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Request a Quote'}
                      {status !== 'submitting' && <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      We&apos;ll only use your details to respond to your enquiry.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-[var(--ink)] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <img src={logoWhite} alt="iNexo" width={134} height={34} loading="lazy" className="h-8 w-auto" />
              <p className="mt-3 text-sm font-semibold text-brand">{TAGLINE}</p>
              <p className="mt-3 max-w-xs text-sm text-white/60">
                International logistics, cargo insurance, representation and trading — connecting your business to every corner
                of the globe.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Services</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                {services.map((s) => (
                  <li key={s.title}>
                    <a href="#services" className="transition-colors hover:text-brand">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Company</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                <li><a href="#why" className="transition-colors hover:text-brand">Why iNexo</a></li>
                <li><a href="#process" className="transition-colors hover:text-brand">Process</a></li>
                <li><a href="#about" className="transition-colors hover:text-brand">About</a></li>
                <li><a href="#contact" className="transition-colors hover:text-brand">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Get in touch</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 transition-colors hover:text-brand">
                    <Mail className="h-4 w-4 text-brand" aria-hidden="true" /> {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 transition-colors hover:text-brand"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" aria-hidden="true" /> {CONTACT_ADDRESS}
                  </a>
                </li>
              </ul>
              <Button asChild className="mt-5 bg-brand text-brand-foreground hover:bg-brand/90">
                <a href="#contact">Get a Quote</a>
              </Button>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-white">Privacy</a>
              <a href="#" className="transition-colors hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
