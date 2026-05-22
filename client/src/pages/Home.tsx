/**
 * Kame Sushi — Home Page
 * Design: Japanese Omakase + Luxury Dining Aesthetic
 * Colors: Charcoal Black (#0a0a0a) + Amber Gold (#d4a843) + Cream White (#f0ebe3)
 * Fonts: Playfair Display (headings) + Lato (body) + Noto Serif JP (accent)
 */

import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Clock, ChevronDown, Menu, X, Instagram } from "lucide-react";
import { MapView } from "@/components/Map";

// ── Image URLs ──────────────────────────────────────────────────────────────
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663684356858/guW3a8JT7hCMuUFDTFFuEY/hero_sushi_bar-ZSAUDxiFmZkBUXpZa5KZND.webp";
const SUSHI_PLATTER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663684356858/guW3a8JT7hCMuUFDTFFuEY/sushi_platter-M6p8ySqZpzBzGjfxfF8xks.webp";
const SUSHI_TOWER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663684356858/guW3a8JT7hCMuUFDTFFuEY/sushi_tower-29iVtMqSHZPePPacHqgUYQ.webp";
const SAKE_COCKTAILS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663684356858/guW3a8JT7hCMuUFDTFFuEY/sake_cocktails-8XrxTUoFcFkf9FGheUi2yj.webp";
const INTERIOR_DINING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663684356858/guW3a8JT7hCMuUFDTFFuEY/interior_dining-dJAKAGNtwp5pW2UTmygCxs.webp";
const SASHIMI_PLATE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663684356858/guW3a8JT7hCMuUFDTFFuEY/sashimi_plate-GQjr3QD6YFmEtSWT6i2hpS.webp";

// ── Data ─────────────────────────────────────────────────────────────────────
type MenuCategory = "Signature" | "Sushi & Nigiri" | "Sashimi" | "Rolls" | "Kitchen" | "Bar";

interface MenuItem {
  name: string;
  nameJp?: string;
  description: string;
  price: string;
  image?: string;
  badge?: string;
}

const menuData: Record<MenuCategory, MenuItem[]> = {
  "Signature": [
    {
      name: "Kame's Trust Me",
      nameJp: "おまかせ",
      description: "Chef's omakase selection served with miso soup and fresh seasonal salad. Let the chef guide your experience.",
      price: "Market Price",
      image: SUSHI_PLATTER,
      badge: "Chef's Choice",
    },
    {
      name: "Sushi Tower",
      nameJp: "寿司タワー",
      description: "Layered tower of sushi rice, spicy tuna, crab, and avocado topped with crispy rice cracker, served in ponzu sauce.",
      price: "$28",
      image: SUSHI_TOWER,
      badge: "Popular",
    },
    {
      name: "Hawaiian Poke Bowl",
      nameJp: "ポケボウル",
      description: "Assorted sashimi on avocado salad with wakame, cucumber, oshinko, and sushi rice with house poke sauce.",
      price: "$18",
      image: SASHIMI_PLATE,
    },
    {
      name: "Asian Mango Seafood Ceviche",
      nameJp: "マンゴーセビーチェ",
      description: "Fresh seafood tossed with ripe mango, citrus ponzu, jalapeño, and microgreens. A refreshing fusion starter.",
      price: "$16",
    },
  ],
  "Sushi & Nigiri": [
    {
      name: "Sushi Special Combo (12+1)",
      nameJp: "寿司スペシャル",
      description: "12 pieces of premium sushi, California roll, and spicy tuna roll. Salmon, tuna, yellowtail, red snapper, and more.",
      price: "$28.99",
      badge: "Best Value",
    },
    {
      name: "Salmon Lover's Combo",
      nameJp: "サーモン盛り合わせ",
      description: "Eight pieces of fresh salmon nigiri and one double salmon roll. For the salmon enthusiast.",
      price: "From $24.99",
    },
    {
      name: "Tuna Lover's Combo",
      nameJp: "マグロ盛り合わせ",
      description: "Eight pieces of premium tuna nigiri and one double tuna roll. Rich, buttery bluefin.",
      price: "From $24.99",
    },
    {
      name: "Chirashi Special",
      nameJp: "ちらし寿司",
      description: "Assorted sashimi, masago, avocado, wasabi, and ginger over seasoned sushi rice.",
      price: "$25.99",
    },
    {
      name: "SaKeDon",
      nameJp: "鮭丼",
      description: "Salmon sashimi bowl — thick-cut premium salmon over warm sushi rice with house sauce.",
      price: "$30.99",
    },
    {
      name: "TekkaDon",
      nameJp: "鉄火丼",
      description: "Tuna sashimi bowl — premium bluefin tuna over warm sushi rice with house sauce.",
      price: "$30.99",
    },
  ],
  "Sashimi": [
    {
      name: "Sashimi Regular Combo (15)",
      nameJp: "刺身レギュラー",
      description: "15 pieces of fresh sashimi: salmon (3), tuna (3), white tuna (3), red snapper (3), yellowtail (3).",
      price: "$28.99",
      image: SASHIMI_PLATE,
    },
    {
      name: "Sashimi Special Combo (25)",
      nameJp: "刺身スペシャル",
      description: "25 pieces of premium sashimi: salmon (5), tuna (5), white tuna (5), red snapper (5), yellowtail (5).",
      price: "$47.99",
      badge: "Premium",
    },
    {
      name: "Sashimi Wrap Apple Roll",
      nameJp: "刺身ラップ",
      description: "Signature dish — fresh sashimi wrapped with thinly sliced apple and cucumber, drizzled with yuzu dressing.",
      price: "$22",
      badge: "Signature",
    },
  ],
  "Rolls": [
    {
      name: "Kame Roll",
      nameJp: "亀ロール",
      description: "Our signature roll — spicy tuna, cucumber, and avocado inside, topped with seared salmon and house kame sauce.",
      price: "$16",
      badge: "House Special",
    },
    {
      name: "Bluefin Lover Roll",
      nameJp: "本マグロロール",
      description: "Premium bluefin tuna, avocado, and cucumber inside, topped with more bluefin and microgreens.",
      price: "$22",
    },
    {
      name: "Ultimate Shrimp Roll",
      nameJp: "海老ロール",
      description: "Tempura shrimp, crab, cucumber inside, topped with spicy shrimp, avocado, and spicy mayo.",
      price: "$18",
      badge: "Popular",
    },
    {
      name: "Crispy Rice Bites",
      nameJp: "クリスピーライス",
      description: "Crispy sushi rice topped with spicy tuna, jalapeño, and house sauce. Six pieces.",
      price: "$14",
    },
    {
      name: "California Roll",
      nameJp: "カリフォルニア",
      description: "Classic crab, cucumber, and avocado roll. Eight pieces.",
      price: "$6.50",
    },
    {
      name: "Philadelphia Roll",
      nameJp: "フィラデルフィア",
      description: "Smoked salmon, avocado, and cream cheese. Eight pieces.",
      price: "$7.99",
    },
  ],
  "Kitchen": [
    {
      name: "Tonkotsu Ramen",
      nameJp: "豚骨ラーメン",
      description: "Rich pork bone broth, chashu pork belly, soft-boiled egg, bamboo shoots, nori, and green onion.",
      price: "$16",
    },
    {
      name: "Hibachi Chicken",
      nameJp: "鶏のヒバチ",
      description: "Grilled chicken with hibachi vegetables, fried rice, and house ginger sauce.",
      price: "$18",
    },
    {
      name: "Hibachi Salmon",
      nameJp: "鮭のヒバチ",
      description: "Grilled salmon fillet with hibachi vegetables, fried rice, and teriyaki glaze.",
      price: "$22",
    },
    {
      name: "Lunch Bento Box",
      nameJp: "弁当",
      description: "Choice of protein with miso soup, house salad, rice, and seasonal sides. Available Mon–Fri 11AM–3PM.",
      price: "From $14",
      badge: "Lunch Special",
    },
  ],
  "Bar": [
    {
      name: "Japanese Whisky Selection",
      nameJp: "日本ウイスキー",
      description: "Curated selection of premium Japanese whiskies. Ask your server for today's pour.",
      price: "Market Price",
      image: SAKE_COCKTAILS,
      badge: "Premium",
    },
    {
      name: "Sake Flight",
      nameJp: "日本酒フライト",
      description: "Three curated sake pours — junmai, ginjo, and daiginjo. Served with tasting notes.",
      price: "$18",
    },
    {
      name: "Handcrafted Cocktails",
      nameJp: "カクテル",
      description: "Seasonal Japanese-inspired cocktails crafted by our bar team. Ask about today's specials.",
      price: "From $12",
    },
    {
      name: "Beer & Wine",
      nameJp: "ビール・ワイン",
      description: "Japanese beers (Sapporo, Kirin, Asahi) and a curated wine list to complement your meal.",
      price: "From $6",
    },
  ],
};

const hours = [
  { days: "Sunday – Thursday", time: "11:00 AM – 10:00 PM" },
  { days: "Friday – Saturday", time: "11:00 AM – 10:30 PM" },
];

// ── Intersection Observer hook ────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#gallery", label: "Gallery" },
    { href: "#bar", label: "Bar" },
    { href: "#visit", label: "Visit" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.10 0.005 240 / 95%)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span
            className="text-2xl font-bold tracking-wider"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "oklch(0.72 0.12 75)",
            }}
          >
            KAME
          </span>
          <span
            className="text-[0.55rem] tracking-[0.35em] uppercase"
            style={{ color: "oklch(0.60 0.01 85)", fontFamily: "'Lato', sans-serif", fontWeight: 700 }}
          >
            SUSHI · FRISCO
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="tel:+12143089507"
          className="hidden md:inline-flex btn-gold px-5 py-2 text-xs tracking-widest uppercase font-bold rounded-none"
        >
          <span>Call to Order</span>
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "oklch(0.10 0.005 240 / 98%)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-base"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+12143089507"
            className="btn-gold px-5 py-3 text-xs tracking-widest uppercase font-bold text-center mt-2"
          >
            <span>Call to Order</span>
          </a>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end grain-overlay overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.10 0.005 240) 0%, oklch(0.10 0.005 240 / 60%) 40%, oklch(0.10 0.005 240 / 20%) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
        <div className="max-w-2xl">
          <p className="section-label mb-4 fade-up">
            Modern Japanese · Frisco, Texas
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 fade-up fade-up-delay-1"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.93 0.01 85)" }}
          >
            Where Craft
            <br />
            <em className="italic" style={{ color: "oklch(0.72 0.12 75)" }}>
              Meets Tradition
            </em>
          </h1>
          <p
            className="text-base md:text-lg mb-10 leading-relaxed fade-up fade-up-delay-2"
            style={{ color: "oklch(0.75 0.01 85)", fontWeight: 300 }}
          >
            Premium sushi, sashimi, and chef-driven specialties in a refined yet
            approachable atmosphere. Now open in Frisco, TX.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 fade-up fade-up-delay-3">
            <a
              href="tel:+12143089507"
              className="btn-gold px-8 py-4 text-sm tracking-widest uppercase font-bold text-center"
            >
              <span>Call Us to Order</span>
            </a>
            <a
              href="#visit"
              className="px-8 py-4 text-sm tracking-widest uppercase font-bold text-center border border-white/20 hover:border-white/40 transition-colors"
              style={{ color: "oklch(0.80 0.01 85)" }}
            >
              Visit Us to Dine In
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-50">
        <span className="text-[0.6rem] tracking-widest uppercase" style={{ color: "oklch(0.72 0.12 75)" }}>
          Scroll
        </span>
        <ChevronDown size={14} style={{ color: "oklch(0.72 0.12 75)" }} />
      </div>
    </section>
  );
}

function AboutSection() {
  const { ref, inView } = useInView();
  return (
    <section id="about" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className={inView ? "fade-up" : "opacity-0"}>
            <p className="section-label mb-4">Our Story</p>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A Refined Sushi
              <br />
              <em className="italic" style={{ color: "oklch(0.72 0.12 75)" }}>
                Experience
              </em>
            </h2>
            <div className="gold-divider mb-8" />
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "oklch(0.70 0.01 85)", fontWeight: 300 }}
            >
              Kame Sushi brings a premium Japanese dining experience to the heart
              of Frisco, Texas. Our chefs source the finest ingredients daily —
              from bluefin tuna to fresh-caught yellowtail — crafting each piece
              with precision and care.
            </p>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "oklch(0.70 0.01 85)", fontWeight: 300 }}
            >
              Beyond sushi, our curated bar features Japanese whisky, sake
              flights, and handcrafted cocktails. Whether you're joining us for a
              casual lunch bento or an evening omakase, every visit is a
              celebration of Japanese culinary artistry.
            </p>
            <div className="flex gap-8">
              {[
                { value: "Daily", label: "Fresh Ingredients" },
                { value: "Real", label: "Wasabi" },
                { value: "Full", label: "Bar & Sake" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.72 0.12 75)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "oklch(0.55 0.01 85)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative ${inView ? "fade-up fade-up-delay-2" : "opacity-0"}`}
          >
            <div className="gallery-img rounded-sm overflow-hidden aspect-[4/3]">
              <img
                src={INTERIOR_DINING}
                alt="Kame Sushi dining room interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Accent border */}
            <div
              className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border rounded-sm pointer-events-none"
              style={{ borderColor: "oklch(0.72 0.12 75 / 30%)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const categories = Object.keys(menuData) as MenuCategory[];
  const [active, setActive] = useState<MenuCategory>("Signature");
  const { ref, inView } = useInView();

  const items = menuData[active];

  return (
    <section id="menu" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-12 ${inView ? "fade-up" : "opacity-0"}`}>
          <p className="section-label mb-3">Our Menu</p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Crafted with{" "}
            <em className="italic" style={{ color: "oklch(0.72 0.12 75)" }}>
              Precision
            </em>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-0 mb-12 border-b ${inView ? "fade-up fade-up-delay-1" : "opacity-0"}`}
          style={{ borderColor: "oklch(1 0 0 / 10%)" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`tab-btn ${active === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <MenuCard key={item.name} item={item} delay={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p
            className="text-sm mb-6"
            style={{ color: "oklch(0.55 0.01 85)", letterSpacing: "0.05em" }}
          >
            Prices subject to change. Consuming raw or undercooked seafood may increase risk of foodborne illness.
          </p>
          <a
            href="tel:+12143089507"
            className="btn-gold inline-flex px-10 py-4 text-sm tracking-widest uppercase font-bold"
          >
            <span>Call to Order — (214) 308-9507</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function MenuCard({ item, delay }: { item: MenuItem; delay: number }) {
  return (
    <div
      className={`menu-card border rounded-sm overflow-hidden flex flex-col fade-up`}
      style={{
        borderColor: "oklch(1 0 0 / 10%)",
        background: "oklch(0.14 0.005 240)",
        animationDelay: `${delay * 60}ms`,
      }}
    >
      {item.image && (
        <div className="gallery-img h-44 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3
              className="text-base font-semibold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {item.name}
            </h3>
            {item.nameJp && (
              <span
                className="text-xs"
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  color: "oklch(0.55 0.01 85)",
                }}
              >
                {item.nameJp}
              </span>
            )}
          </div>
          {item.badge && (
            <span
              className="text-[0.6rem] tracking-widest uppercase px-2 py-0.5 shrink-0 mt-0.5"
              style={{
                border: "1px solid oklch(0.72 0.12 75 / 50%)",
                color: "oklch(0.72 0.12 75)",
              }}
            >
              {item.badge}
            </span>
          )}
        </div>
        <p
          className="text-sm leading-relaxed mt-2 flex-1"
          style={{ color: "oklch(0.60 0.01 85)", fontWeight: 300 }}
        >
          {item.description}
        </p>
        <div
          className="mt-4 pt-4 text-sm font-bold"
          style={{
            borderTop: "1px solid oklch(1 0 0 / 8%)",
            color: "oklch(0.72 0.12 75)",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {item.price}
        </div>
      </div>
    </div>
  );
}

function GallerySection() {
  const { ref, inView } = useInView();
  const images = [
    { src: INTERIOR_DINING, alt: "Dining room interior", span: "md:col-span-2 md:row-span-2" },
    { src: SUSHI_PLATTER, alt: "Premium nigiri platter" },
    { src: SUSHI_TOWER, alt: "Signature sushi tower" },
    { src: SASHIMI_PLATE, alt: "Fresh sashimi selection" },
    { src: SAKE_COCKTAILS, alt: "Japanese whisky and sake bar" },
  ];

  return (
    <section id="gallery" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-12 ${inView ? "fade-up" : "opacity-0"}`}>
          <p className="section-label mb-3">Gallery</p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Kame{" "}
            <em className="italic" style={{ color: "oklch(0.72 0.12 75)" }}>
              Experience
            </em>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {images.map((img, i) => (
            <div
              key={img.alt}
              className={`gallery-img overflow-hidden rounded-sm ${img.span || ""} ${inView ? `fade-up fade-up-delay-${Math.min(i + 1, 5)}` : "opacity-0"}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BarSection() {
  const { ref, inView } = useInView();
  return (
    <section id="bar" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${SAKE_COCKTAILS})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.10 0.005 240 / 95%) 0%, oklch(0.10 0.005 240 / 85%) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-xl">
          <div className={inView ? "fade-up" : "opacity-0"}>
            <p className="section-label mb-4">The Bar</p>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Japanese Spirits &{" "}
              <em className="italic" style={{ color: "oklch(0.72 0.12 75)" }}>
                Crafted Cocktails
              </em>
            </h2>
            <div className="gold-divider mb-8" />
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "oklch(0.70 0.01 85)", fontWeight: 300 }}
            >
              Our bar program celebrates the depth of Japanese spirits. From
              rare single-malt whiskies to curated sake flights and
              house-crafted cocktails, every sip is designed to complement your
              meal.
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-4 ${inView ? "fade-up fade-up-delay-2" : "opacity-0"}`}>
            {[
              { title: "Japanese Whisky", desc: "Curated selection of premium pours" },
              { title: "Sake Flights", desc: "Junmai, Ginjo & Daiginjo" },
              { title: "Craft Cocktails", desc: "Seasonal Japanese-inspired creations" },
              { title: "Beer & Wine", desc: "Sapporo, Kirin, Asahi & more" },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 border rounded-sm"
                style={{ borderColor: "oklch(0.72 0.12 75 / 25%)", background: "oklch(0.14 0.005 240 / 60%)" }}
              >
                <h4
                  className="text-sm font-semibold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.72 0.12 75)" }}
                >
                  {item.title}
                </h4>
                <p className="text-xs" style={{ color: "oklch(0.60 0.01 85)", fontWeight: 300 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VisitSection() {
  const { ref, inView } = useInView();
  const [mapReady, setMapReady] = useState(false);

  return (
    <section id="visit" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 ${inView ? "fade-up" : "opacity-0"}`}>
          <p className="section-label mb-3">Find Us</p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Visit{" "}
            <em className="italic" style={{ color: "oklch(0.72 0.12 75)" }}>
              Kame Sushi
            </em>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className={inView ? "fade-up fade-up-delay-1" : "opacity-0"}>
            {/* Address */}
            <div className="flex gap-4 mb-8">
              <MapPin size={20} className="mt-1 shrink-0" style={{ color: "oklch(0.72 0.12 75)" }} />
              <div>
                <p className="section-label mb-1">Location</p>
                <p style={{ color: "oklch(0.80 0.01 85)" }}>
                  5251 Panther Creek Pkwy, Suite 400
                </p>
                <p style={{ color: "oklch(0.80 0.01 85)" }}>Frisco, TX 75033</p>
                <a
                  href="https://maps.google.com/?q=5251+Panther+Creek+Pkwy+%23400+Frisco+TX+75033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-1 inline-block"
                  style={{ color: "oklch(0.72 0.12 75)" }}
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 mb-8">
              <Phone size={20} className="mt-1 shrink-0" style={{ color: "oklch(0.72 0.12 75)" }} />
              <div>
                <p className="section-label mb-1">Phone</p>
                <a
                  href="tel:+12143089507"
                  className="text-lg font-semibold hover:opacity-80 transition-opacity"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.80 0.01 85)" }}
                >
                  (214) 308-9507
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4 mb-10">
              <Clock size={20} className="mt-1 shrink-0" style={{ color: "oklch(0.72 0.12 75)" }} />
              <div>
                <p className="section-label mb-3">Hours</p>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.days} className="flex flex-col sm:flex-row sm:gap-4">
                      <span className="text-sm w-44" style={{ color: "oklch(0.60 0.01 85)" }}>
                        {h.days}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: "oklch(0.80 0.01 85)" }}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+12143089507"
                className="btn-gold px-8 py-4 text-sm tracking-widest uppercase font-bold text-center"
              >
                <span>Call Us to Order</span>
              </a>
              <a
                href="https://maps.google.com/?q=5251+Panther+Creek+Pkwy+%23400+Frisco+TX+75033"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-sm tracking-widest uppercase font-bold text-center border transition-colors"
                style={{
                  borderColor: "oklch(1 0 0 / 15%)",
                  color: "oklch(0.80 0.01 85)",
                }}
              >
                Visit Us to Dine In
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            className={`rounded-sm overflow-hidden h-80 md:h-[420px] ${inView ? "fade-up fade-up-delay-2" : "opacity-0"}`}
            style={{ border: "1px solid oklch(1 0 0 / 10%)" }}
          >
            <MapView
              onMapReady={(map) => {
                setMapReady(true);
                const position = { lat: 33.1484, lng: -96.8236 };
                map.setCenter(position);
                map.setZoom(15);
                new google.maps.Marker({
                  position,
                  map,
                  title: "Kame Sushi",
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: "#d4a843",
                    fillOpacity: 1,
                    strokeColor: "#0a0a0a",
                    strokeWeight: 2,
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-12 border-t"
      style={{ borderColor: "oklch(1 0 0 / 8%)", background: "oklch(0.08 0.005 240)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <span
              className="text-2xl font-bold tracking-wider"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.72 0.12 75)" }}
            >
              KAME SUSHI
            </span>
            <span
              className="text-[0.6rem] tracking-[0.3em] uppercase mt-0.5"
              style={{ color: "oklch(0.45 0.01 85)" }}
            >
              Frisco, Texas
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            {["About", "Menu", "Gallery", "Bar", "Visit"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-xs tracking-widest uppercase transition-colors hover:opacity-80"
                style={{ color: "oklch(0.50 0.01 85)" }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Social */}
          <a
            href="https://www.instagram.com/kamesushi_dfw/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.72 0.12 75)" }}
          >
            <Instagram size={16} />
            @kamesushi_dfw
          </a>
        </div>

        <div className="gold-divider my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: "oklch(0.35 0.01 85)" }}>
          <p>© {new Date().getFullYear()} Kame Sushi. All rights reserved.</p>
          <p>5251 Panther Creek Pkwy #400, Frisco, TX 75033 · (214) 308-9507</p>
        </div>
      </div>
    </footer>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.005 240)" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <BarSection />
      <VisitSection />
      <Footer />
    </div>
  );
}
