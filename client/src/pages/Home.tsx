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
      name: "Chef's Trust Me 49",
      nameJp: "おまかせ",
      description: "Thinly sliced hamachi, yellowtail, toro, salmon, spicy tuna, scallop, and eel with special spicy sauce.",
      price: "$49",
      image: SUSHI_PLATTER,
      badge: "Chef's Choice",
    },
    {
      name: "The Kame Trust Me 59",
      nameJp: "亀のおまかせ",
      description: "Premium omakase featuring toro, spicy toro, toro & salmon sashimi, yellowtail belly, sea bass, aji, hamachi, shrimp, uni, and blue crab hand roll.",
      price: "$59",
      image: SUSHI_TOWER,
      badge: "Premium",
    },
    {
      name: "Moriawase - Chef Choice Sushi",
      nameJp: "盛り合わせ",
      description: "Classic (8pcs) or Kame Premium (9pcs) — chef's selection of fresh nigiri sushi.",
      price: "From $28",
      image: SASHIMI_PLATE,
    },
    {
      name: "Chef choice Sashimi",
      nameJp: "刺身盛り合わせ",
      description: "A (8 pcs 4 kinds), B (12 pcs 4 kinds), or C (20 pcs 4 kinds) — premium fresh sashimi selection.",
      price: "From $32",
    },
  ],
  "Sushi & Nigiri": [
    {
      name: "Toro",
      nameJp: "トロ",
      description: "Premium fatty tuna — 2 pcs sushi or 3 pcs sashimi.",
      price: "$10 / $18",
      badge: "Premium",
    },
    {
      name: "Fatty Toro",
      nameJp: "大トロ",
      description: "Extra fatty toro — 2 pcs sushi or 3 pcs sashimi.",
      price: "$8 / $23",
    },
    {
      name: "Otoro",
      nameJp: "大トロ",
      description: "Highest grade fatty tuna — 2 pcs sushi or 3 pcs sashimi.",
      price: "$9 / $25",
    },
    {
      name: "Chu Toro",
      nameJp: "中トロ",
      description: "Medium fatty tuna — 2 pcs sushi or 3 pcs sashimi.",
      price: "$8 / $21",
    },
    {
      name: "Hamachi",
      nameJp: "ハマチ",
      description: "Yellowtail — 2 pcs sushi or 3 pcs sashimi.",
      price: "$5 / $14",
    },
    {
      name: "Sake",
      nameJp: "サケ",
      description: "Fresh salmon — 2 pcs sushi or 3 pcs sashimi.",
      price: "$6 / $14",
    },
  ],
  "Sashimi": [
    {
      name: "Tamago Scallop-Hokkaido Uni",
      nameJp: "タマゴ帆立北海道ウニ",
      description: "Scallop with sea urchin — 2 pcs sushi or 3 pcs sashimi.",
      price: "$13 / $28",
      image: SASHIMI_PLATE,
      badge: "Premium",
    },
    {
      name: "Hotate + Fake Grass",
      nameJp: "ホタテ",
      description: "Scallop with garnish — 2 pcs sushi or 3 pcs sashimi.",
      price: "$10 / $28",
    },
    {
      name: "Hotate Sauce with Ikura",
      nameJp: "ホタテ イクラ",
      description: "Scallop with salmon roe — 2 pcs sushi or 3 pcs sashimi.",
      price: "$10 / $27",
    },
    {
      name: "Ama Ebi",
      nameJp: "甘エビ",
      description: "Sweet shrimp — 2 pcs sushi or 3 pcs sashimi.",
      price: "$8 / $23",
    },
    {
      name: "Uni",
      nameJp: "ウニ",
      description: "Sea urchin — 2 pcs sushi or 3 pcs sashimi.",
      price: "$5 / $11",
    },
  ],
  "Rolls": [
    {
      name: "Kame Roll",
      nameJp: "亀ロール",
      description: "Spicy tuna, spicy eel, cucumber, crab meat and avocado, topped with toro tuna and salmon spicy tuna.",
      price: "$22",
      badge: "House Special",
    },
    {
      name: "Spicy Kame Roll",
      nameJp: "スパイシー亀ロール",
      description: "Spicy tuna, cucumber and avocado, topped with spicy tuna and eel tuna with spicy mayo.",
      price: "$18",
    },
    {
      name: "Ultimate Shrimp Roll",
      nameJp: "海老ロール",
      description: "Shrimp tempura, spicy crab, and avocado, topped with tuna, salmon, yellowtail, butter shrimp, spice, jalapeno, creamy ponzu, and spicy mayo.",
      price: "$24",
      badge: "Popular",
    },
    {
      name: "Paradise Roll",
      nameJp: "パラダイスロール",
      description: "Spicy tuna, spicy crab, scallop, and shrimp tempura, topped with salmon, toro, shrimp tuna and topped eel coat with eel.",
      price: "$19",
    },
    {
      name: "California Roll",
      nameJp: "カリフォルニア",
      description: "Classic crab meat, avocado, cucumber.",
      price: "$9",
    },
    {
      name: "Philadelphia Roll",
      nameJp: "フィラデルフィア",
      description: "Smoked salmon, cream cheese, avocado.",
      price: "$11",
    },
  ],
  "Kitchen": [
    {
      name: "Tonkotsu Ramen",
      nameJp: "豚骨ラーメン",
      description: "Pork broth with pork chashu, menma, boiled egg, bean sprout, onion, black mushroom, nori. Add spicy +1",
      price: "$13",
    },
    {
      name: "Nagasaki Seafood Ramen",
      nameJp: "長崎シーフードラーメン",
      description: "Pork broth, seafood, mixed vegetables, boiled egg.",
      price: "$16",
    },
    {
      name: "Miso Ramen",
      nameJp: "味噌ラーメン",
      description: "Pork broth with miso chashu, boiled egg, green onion, bean sprout, menma, black mushroom, nori. Add spicy +1",
      price: "$14",
    },
    {
      name: "Hibachi Chicken",
      nameJp: "鶏のヒバチ",
      description: "Grilled chicken with hibachi vegetables, fried rice, and house sauce. Includes miso soup.",
      price: "$24",
    },
    {
      name: "Hibachi Salmon",
      nameJp: "鮭のヒバチ",
      description: "Grilled salmon fillet with hibachi vegetables, fried rice, and teriyaki glaze. Includes miso soup.",
      price: "$31",
    },
    {
      name: "Black Cod",
      nameJp: "黒ムツ",
      description: "Black cod, marinated with house-made Saikyo miso, served with light tempura enoki.",
      price: "$32",
    },
  ],
  "Bar": [
    {
      name: "Japanese Whisky Selection",
      nameJp: "日本ウイスキー",
      description: "Curated selection of premium Japanese whiskies including Yamazaki, Hibiki, and Hakushu. Ask your server for today's pour.",
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

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+12143089507"
            className="hidden sm:inline-block px-5 py-2 rounded-md transition-all duration-200"
            style={{
              background: "oklch(0.72 0.12 75)",
              color: "oklch(0.10 0.005 240)",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            Call Now
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
            style={{ color: "oklch(0.72 0.12 75)" }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className="absolute top-full left-0 right-0 md:hidden"
            style={{ background: "oklch(0.15 0.006 240)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a href="tel:+12143089507" className="nav-link" onClick={() => setOpen(false)}>
                Call Now
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .nav-link {
          font-family: 'Lato', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: oklch(0.85 0.005 65);
          text-decoration: none;
          transition: color 200ms ease-out;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: oklch(0.72 0.12 75);
          transition: width 200ms ease-out;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, oklch(0.08 0.004 240) 0%, oklch(0.12 0.005 240) 100%), url(${HERO_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "oklch(0.05 0.002 240 / 60%)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <h1
          className="text-6xl md:text-7xl font-bold mb-6 tracking-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "oklch(0.95 0.002 65)",
            textShadow: "0 2px 12px oklch(0 0 0 / 40%)",
          }}
        >
          Kame Sushi
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 tracking-wide"
          style={{
            fontFamily: "'Lato', sans-serif",
            color: "oklch(0.72 0.12 75)",
            fontWeight: 300,
          }}
        >
          Modern Japanese Omakase & Bar
        </p>
        <p
          className="text-base md:text-lg mb-12"
          style={{
            fontFamily: "'Lato', sans-serif",
            color: "oklch(0.85 0.005 65)",
            lineHeight: 1.6,
          }}
        >
          Authentic sushi crafted by master chefs. Premium sake and whisky. An experience of refined elegance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+12143089507"
            className="px-8 py-4 rounded-md font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "oklch(0.72 0.12 75)",
              color: "oklch(0.10 0.005 240)",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            <Phone size={18} className="inline mr-2" />
            Call Us to Order
          </a>
          <a
            href="#visit"
            className="px-8 py-4 rounded-md font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "oklch(0.20 0.006 240)",
              color: "oklch(0.72 0.12 75)",
              border: "2px solid oklch(0.72 0.12 75)",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            Visit Us to Dine In
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={28} style={{ color: "oklch(0.72 0.12 75)" }} />
      </div>
    </section>
  );
}

function MenuSection() {
  const [activeTab, setActiveTab] = useState<MenuCategory>("Signature");
  const { ref, inView } = useInView();

  const tabs: MenuCategory[] = ["Signature", "Sushi & Nigiri", "Sashimi", "Rolls", "Kitchen", "Bar"];

  return (
    <section
      id="menu"
      ref={ref}
      className="py-20 md:py-32 px-6"
      style={{
        background: "oklch(0.10 0.005 240)",
        opacity: inView ? 1 : 0.5,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "all 800ms ease-out",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2
          className="text-5xl md:text-6xl font-bold text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "oklch(0.95 0.002 65)",
          }}
        >
          Our Menu
        </h2>
        <div
          className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-16"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.12 75), transparent)" }}
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium"
              style={{
                background: activeTab === tab ? "oklch(0.72 0.12 75)" : "oklch(0.15 0.006 240)",
                color: activeTab === tab ? "oklch(0.10 0.005 240)" : "oklch(0.85 0.005 65)",
                fontFamily: "'Lato', sans-serif",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuData[activeTab].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "oklch(0.15 0.006 240)",
                border: "1px solid oklch(1 0 0 / 10%)",
              }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "oklch(0.95 0.002 65)",
                    }}
                  >
                    {item.name}
                  </h3>
                  {item.nameJp && (
                    <p
                      className="text-sm"
                      style={{
                        fontFamily: "'Noto Serif JP', serif",
                        color: "oklch(0.72 0.12 75)",
                      }}
                    >
                      {item.nameJp}
                    </p>
                  )}
                </div>
                {item.badge && (
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2"
                    style={{
                      background: "oklch(0.72 0.12 75 / 20%)",
                      color: "oklch(0.72 0.12 75)",
                      fontFamily: "'Lato', sans-serif",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <p
                className="text-sm mb-3"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: "oklch(0.75 0.005 65)",
                  lineHeight: 1.5,
                }}
              >
                {item.description}
              </p>
              <p
                className="text-lg font-semibold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.72 0.12 75)",
                }}
              >
                {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const { ref, inView } = useInView();
  const images = [SUSHI_PLATTER, SUSHI_TOWER, SASHIMI_PLATE, INTERIOR_DINING, SAKE_COCKTAILS, HERO_IMG];

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 md:py-32 px-6"
      style={{
        background: "oklch(0.08 0.004 240)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-bold text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "oklch(0.95 0.002 65)",
          }}
        >
          Gallery
        </h2>
        <div
          className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-16"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.12 75), transparent)" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative h-64 md:h-80 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                opacity: inView ? 1 : 0.3,
                transform: inView ? "scale(1)" : "scale(0.95)",
                transition: `all 600ms ease-out ${idx * 100}ms`,
              }}
            >
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "oklch(0 0 0 / 40%)" }}
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
    <section
      id="bar"
      ref={ref}
      className="py-20 md:py-32 px-6"
      style={{
        background: "oklch(0.10 0.005 240)",
        opacity: inView ? 1 : 0.5,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "all 800ms ease-out",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-bold text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "oklch(0.95 0.002 65)",
          }}
        >
          Premium Bar
        </h2>
        <div
          className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-16"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.12 75), transparent)" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuData["Bar"].map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                background: "oklch(0.15 0.006 240)",
                border: "1px solid oklch(1 0 0 / 10%)",
              }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-6"
                />
              )}
              <h3
                className="text-2xl font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.95 0.002 65)",
                }}
              >
                {item.name}
              </h3>
              {item.nameJp && (
                <p
                  className="text-sm mb-3"
                  style={{
                    fontFamily: "'Noto Serif JP', serif",
                    color: "oklch(0.72 0.12 75)",
                  }}
                >
                  {item.nameJp}
                </p>
              )}
              <p
                className="text-base mb-4"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: "oklch(0.75 0.005 65)",
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
              <p
                className="text-xl font-semibold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.72 0.12 75)",
                }}
              >
                {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisitSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="visit"
      ref={ref}
      className="py-20 md:py-32 px-6"
      style={{
        background: "oklch(0.08 0.004 240)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-bold text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "oklch(0.95 0.002 65)",
          }}
        >
          Visit Us
        </h2>
        <div
          className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-16"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.12 75), transparent)" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            {/* Address */}
            <div>
              <h3
                className="text-2xl font-bold mb-3 flex items-center gap-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.95 0.002 65)",
                }}
              >
                <MapPin size={28} style={{ color: "oklch(0.72 0.12 75)" }} />
                Location
              </h3>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: "oklch(0.85 0.005 65)",
                  lineHeight: 1.8,
                }}
              >
                5251 Panther Creek Pkwy #400<br />
                Frisco, TX 75033<br />
                United States
              </p>
            </div>

            {/* Phone */}
            <div>
              <h3
                className="text-2xl font-bold mb-3 flex items-center gap-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.95 0.002 65)",
                }}
              >
                <Phone size={28} style={{ color: "oklch(0.72 0.12 75)" }} />
                Phone
              </h3>
              <a
                href="tel:+12143089507"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: "oklch(0.72 0.12 75)",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                (214) 308-9507
              </a>
            </div>

            {/* Hours */}
            <div>
              <h3
                className="text-2xl font-bold mb-3 flex items-center gap-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.95 0.002 65)",
                }}
              >
                <Clock size={28} style={{ color: "oklch(0.72 0.12 75)" }} />
                Hours
              </h3>
              <div
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: "oklch(0.85 0.005 65)",
                  lineHeight: 2,
                }}
              >
                {hours.map((h, idx) => (
                  <div key={idx}>
                    <strong>{h.days}:</strong> {h.time}
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.95 0.002 65)",
                }}
              >
                Follow Us
              </h3>
              <a
                href="https://instagram.com/kamesushi_dfw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 hover:scale-110"
                style={{
                  background: "oklch(0.72 0.12 75 / 20%)",
                  color: "oklch(0.72 0.12 75)",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 600,
                }}
              >
                <Instagram size={20} />
                @kamesushi_dfw
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            className="rounded-lg overflow-hidden"
            style={{
              border: "1px solid oklch(1 0 0 / 10%)",
              height: "400px",
            }}
          >
            <MapView
              initialCenter={{ lat: 33.1960, lng: -96.8193 }}
              initialZoom={15}
              onMapReady={() => {}}
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
      className="py-8 px-6 text-center"
      style={{
        background: "oklch(0.08 0.004 240)",
        borderTop: "1px solid oklch(1 0 0 / 8%)",
      }}
    >
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          color: "oklch(0.60 0.01 85)",
          fontSize: "0.875rem",
        }}
      >
        © 2026 Kame Sushi. All rights reserved. | Frisco, Texas
      </p>
    </footer>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div
      style={{
        background: "oklch(0.10 0.005 240)",
        color: "oklch(0.85 0.005 65)",
      }}
    >
      <Navbar />
      <HeroSection />
      <MenuSection />
      <GallerySection />
      <BarSection />
      <VisitSection />
      <Footer />
    </div>
  );
}
