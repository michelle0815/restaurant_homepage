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
type MenuCategory = "Hibachi & Hot Specialties" | "Hand Roll, Regular Roll & Sides" | "Bake Roll, Roll without Rice, Deep Fried Roll & Dessert" | "Sushi Bar" | "Sushi & Sashimi" | "Moriawase & Chef's Trust Me" | "Special Roll";

interface MenuItem {
  name: string;
  description?: string;
  price: string;
  image?: string;
  badge?: string;
}

interface MenuSection {
  title: string;
  description?: string;
  items: MenuItem[];
}

interface MenuCategoryData {
  sections?: MenuSection[];
  items?: MenuItem[];
}

const menuData: Record<MenuCategory, MenuCategoryData> = {
  "Hibachi & Hot Specialties": {
    sections: [
      {
        title: "Hibachi",
        description: "All hibachi entrees include miso soup or clear soup, stir-fried hibachi vegetables, and steamed rice. Fried rice substitute +3",
        items: [
          { name: "New York", price: "$35" },
          { name: "Chicken", price: "$24" },
          { name: "Shrimp", price: "$33" },
          { name: "Salmon", price: "$31" },
          { name: "New York & Chicken", price: "$36" },
          { name: "New York & Shrimp", price: "$38" },
          { name: "Veggies", price: "$21" },
        ],
      },
      {
        title: "Hot Specialties",
        description: "All hot specialties include miso soup or clear soup, and steamed rice. Fried rice substitute +3",
        items: [
          { name: "Saba Shioyaki", description: "Perfectly grilled Norwegian mackerel with house ponzu", price: "$26" },
          { name: "Black Cod", description: "Black cod, marinated with house-made Saikyo miso, served with light tempura enoki", price: "$32" },
          { name: "Pork Belly Rice", description: "Stir-fried rice with roast pork, fresh vegetables and egg", price: "$29" },
          { name: "Modley Tempura Dinner", description: "Crispy shrimp tempura (5pc, karaage) with mixed seasonal vegetable seeds", price: "$21" },
          { name: "Range Chicken", description: "Grilled chicken in teriyaki sauce served crispy with seasonal vegetable seeds", price: "$22" },
          { name: "Salmon Yuzu-Yaki", description: "Yuzu-marinated salmon served with sautéed seasonal vegetables", price: "$28" },
        ],
      },
      {
        title: "Ramen & Udon",
        items: [
          { name: "Tonkotsu Ramen", description: "Pork broth with pork chashu, menma, boiled egg, bean sprout, onion, black mushroom, nori. Add spicy +1", price: "$13" },
          { name: "Nagasaki Seafood Ramen", description: "Pork broth, seafood, mixed vegetables, boiled egg", price: "$16" },
          { name: "Miso Ramen", description: "Pork broth with miso chashu, boiled egg, green onion, bean sprout, menma, black mushroom, nori. Add spicy +1", price: "$14" },
          { name: "Udon", description: "Udon noodles, with fish cake, nori, and green onions", price: "$13" },
          { name: "Tempura Udon", description: "Udon noodles, with fried tempura, fish cake, nori, green onions", price: "$16" },
          { name: "Yaki Udon or Yaki Soba", description: "Stir-fried Japanese noodles with vegetables and house-made sauce. Add chicken 5 / Beef 6 / Shrimp 7", price: "$12" },
          { name: "Udon Carbonara", description: "Udon noodles in a creamy carbonara sauce with bacon, mushroom, and green onions", price: "$16" },
          { name: "Asari Miso Soup", description: "Miso soup, clams, and scallions", price: "$7" },
          { name: "Daikon Nashi Soup", description: "Daikon nashi flowers and scallions", price: "$8" },
          { name: "Miso Soup / Clear Soup", price: "$4" },
        ],
      },
    ],
  },
  "Hand Roll, Regular Roll & Sides": {
    sections: [
      {
        title: "Hand Roll",
        items: [
          { name: "Salmon", price: "$5" },
          { name: "Spicy Salmon", price: "$6" },
          { name: "Tuna", price: "$6" },
          { name: "Spicy Tuna", price: "$7" },
          { name: "Yellowtail (Hamachi)", price: "$7" },
          { name: "Spicy Yellowtail", price: "$7" },
          { name: "Flounder (Hirame)", price: "$7" },
          { name: "Eel (Unagi)", price: "$7" },
          { name: "Scallop (Hotate)", price: "$7" },
          { name: "Chutoro", price: "$7" },
          { name: "Real Crabmeat", price: "$7" },
          { name: "Ebi Katsu (Shrimp Tempura)", price: "$7" },
          { name: "Sea Bream (Madai)", price: "$7" },
          { name: "Kanikachi Katsu (Amberjack Tempura)", price: "$7" },
        ],
      },
      {
        title: "Regular Roll",
        items: [
          { name: "Real Crab Roll", description: "Snow crab, avocado, masago", price: "$14" },
          { name: "Basic Roll", description: "Tuna or Yellowtail", price: "$9" },
          { name: "Shrimp Tempura Roll", description: "Shrimp tempura, crab meat, cucumber, avocado, ashi eel sauce", price: "$11" },
          { name: "California Roll", description: "Crab meat, avocado, cucumber", price: "$9" },
          { name: "Eel", description: "Eel, avocado, cucumber with eel sauce", price: "$11" },
          { name: "Philadelphia Roll", description: "Smoked salmon, cream cheese, avocado", price: "$11" },
          { name: "Spicy Salmon Roll", description: "Spicy salmon, cucumber", price: "$10" },
          { name: "Spicy California Roll", description: "Spicy crab meat, avocado, cucumber", price: "$10" },
          { name: "Spicy Tuna Roll", description: "Spicy tuna, cucumber", price: "$10" },
          { name: "Spicy Yellowtail Roll", description: "Spicy yellowtail, cucumber", price: "$11" },
          { name: "Spider Roll", description: "Soft shell crab, tempura, crab meat, avocado, cucumber, mango, seasoned eel soy paper with eel sauce", price: "$14" },
          { name: "Veggie Roll", description: "Asparagus, avocado, cucumber, yamgobo, kaiwara", price: "$10" },
          { name: "Salmon Avocado Roll", description: "Salmon, avocado", price: "$10" },
          { name: "Avocado Roll", description: "Avocado", price: "$7" },
        ],
      },
      {
        title: "Sushi Bar Sides",
        items: [
          { name: "Sushi Rice", price: "$4" },
          { name: "Steam Rice", price: "$3" },
          { name: "Fresh Wasabi", price: "$3" },
          { name: "Kizami Wasabi", price: "$3" },
        ],
      },
    ],
  },
  "Bake Roll, Roll without Rice, Deep Fried Roll & Dessert": {
    sections: [
      {
        title: "Bake Roll",
        items: [
          { name: "Volcano Roll", description: "Crabmeal and avocado, topped with baked crabmeat, crabmeal and scallop finished eel sauce, and spicy mayo", price: "$17" },
          { name: "Baked Salmon Roll", description: "Crabmeal and avocado, topped with salmon, and eel sauce", price: "$17" },
          { name: "Baked Shrimp Roll", description: "Crabmeal and avocado, topped with shrimp, and eel sauce", price: "$17" },
        ],
      },
      {
        title: "Roll without Rice",
        items: [
          { name: "Cherry Blossom Roll", description: "Salmon, cucumber, avocado, and crabmeal, topped with tuna, mango, and orange slices", price: "$20" },
          { name: "Ultimate Shrimp Roll", description: "Shrimp tempura, spicy crab, and avocado, topped with tuna, salmon, yellowtail, butter shrimp, spice, jalapeno, creamy ponzu, and spicy mayo", price: "$24" },
          { name: "Aurora Roll", description: "Shrimp tempura, spicy tuna, and crabmeal, topped with tuna, salmon, caviar, spicy ponzu, and ebi tempura", price: "$20" },
          { name: "Pure Sashimi Roll", description: "Salmon, tuna, hamachi, spicy tuna-gyro mix, and avocado wrapped in rice paper with spicy ponzu and sweet chili sauce", price: "$20" },
          { name: "Tropical Roll", description: "Tuna, salmon, yellowtail, white fish, crabmeal, and avocado wrapped in cucumber with spicy creamy ponzu sauce", price: "$18" },
        ],
      },
      {
        title: "Deep Fried Roll",
        items: [
          { name: "Crazy Boy Roll", description: "Crabmeal and cream cheese, deep fried, topped with spicy tuna, jalapeno, eel sauce, and spicy mayo", price: "$18" },
          { name: "Crunch Roll", description: "Shrimp tempura, crab meat, and avocado, topped with crunch, and eel sauce", price: "$14" },
          { name: "Crispy California Roll", description: "Deep fried california roll with eel sauce", price: "$13" },
        ],
      },
      {
        title: "Dessert",
        items: [
          { name: "Ice Cream (vanilla, green tea)", price: "$7" },
          { name: "Deep Fried Banana Ice Cream", price: "$14" },
          { name: "Mochi Ice Cream", price: "$7" },
          { name: "Cheesecake", price: "$7" },
          { name: "Sugar Glass Tomatoes", price: "$8" },
          { name: "Fresh Cream & Mixed Fruits", price: "$15" },
        ],
      },
    ],
  },
  "Sushi Bar": {
    items: [
      { name: "Toro Toro Duo", description: "Minced fatty toro and diced with salmon and caviar, wrapped in soft nori roll with crispy rice topping", price: "$34" },
      { name: "Maki Combo", description: "Toro, hamachi, and salmon with avocado and mango, served 3 pieces each with crispy rice and chili oil", price: "$23" },
      { name: "Spicy Seared Tuna", description: "Seared spicy tuna with spicy mayo, spicy sauce and salmon", price: "$18" },
      { name: "Hamachi Jalapeño", description: "Hamachi with jalapeño, spicy mayo, and miso sauce", price: "$19" },
      { name: "Salmon Carpaccio", description: "Thinly sliced salmon with ponzu and citrus, garnish with micro-greens, then served with crispy rice and chili oil", price: "$16" },
      { name: "Asian Bacon Seared Ceviche", description: "Seared diced tuna, salmon, spicy tuna, and crispy eel, topped with micro-greens with chili rice sauce", price: "$18" },
      { name: "Fried Sea Urchin", description: "Marinated sea urchin with butter eel, scallion, finished with fully fried jalapeño pepper", price: "$18" },
      { name: "Spicy Scallop Medley", description: "Delicate scallop mixed with spicy diced jalapeño, crispy fried chili, miso, and fresh onions", price: "$17" },
      { name: "Sashimi Ahi (Toro by Salmon or Hamachi)", description: "Sliced fresh fish, topped with ponzu and citrus, garnish with micro-greens", price: "$15" },
      { name: "Crispy Rice Bites (Toro is Salmon)", description: "Crispy crispy rice topped with spicy jalapeño sauce, eel sauce, and spicy mayo, eel, miso", price: "$16" },
      { name: "The Wine Street Hidden", description: "Sweet smoked complemented by a crispy seared scallop eel fried assorted pieces", price: "$20" },
      { name: "Sashimi Wrap Aged Roll (for Roe)", description: "Seared scallop wrapped with cucumber, combined with spicy tuna, crab meat, and avocado, elegantly wrapped in rice and served with a special soy-garlic sauce", price: "$21" },
      { name: "Smoked Hamachi Carpaccio", description: "Smoked hamachi, served in carpaccio with tamo sprinkled sauce", price: "$29" },
      { name: "Caviar", description: "Chef's choice of assorted fresh-caught served eel assorted roe eel with miso chili sauce", price: "$27" },
      { name: "Hazelnut Poke", description: "Diced fresh tuna with cucumber, scalloped eel mango and furikake in a soy-vin", price: "$22" },
      { name: "Hive Display (Korean Sashimi Rice Bowl)", description: "Mixed salmon over rice with fresh vegetables, served with Korean spicy gochujang sauce and miso eel rice soup", price: "$24" },
      { name: "Kame Tower (Toro or Salmon)", description: "Layered sashimi with spicy mayo, spicy mayo, topped with eel sauce, spicy mayo, and sesame sauce", price: "$19" },
      { name: "Flame Kissed Scallop", description: "Seared scallop with dry mustard and flame signature sauce", price: "$18" },
      { name: "Flame Toro Toro", description: "Flash-seared toro toro topped with caviar, served with soy-toasted and flame signature sauce", price: "$18" },
    ],
  },
  "Sushi & Sashimi": {
    items: [
      { name: "Toro", description: "Premium fatty tuna — 2 pcs sushi or 3 pcs sashimi", price: "$10 / $18" },
      { name: "Fatty Toro", description: "Extra fatty toro — 2 pcs sushi or 3 pcs sashimi", price: "$8 / $23" },
      { name: "Otoro", description: "Highest grade fatty tuna — 2 pcs sushi or 3 pcs sashimi", price: "$9 / $25" },
      { name: "Chu Toro", description: "Medium fatty tuna — 2 pcs sushi or 3 pcs sashimi", price: "$8 / $21" },
      { name: "Hamachi", description: "Yellowtail — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $14" },
      { name: "Akagi", description: "Red snapper — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $14" },
      { name: "Sake", description: "Fresh salmon — 2 pcs sushi or 3 pcs sashimi", price: "$6 / $14" },
      { name: "Sake Toro", description: "Fatty salmon — 2 pcs sushi or 3 pcs sashimi", price: "$6 / $14" },
      { name: "Maguro", description: "Bluefin tuna — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $12" },
      { name: "King Sake", description: "King salmon — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $14" },
      { name: "Tai", description: "Red snapper — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $12" },
      { name: "Tamago Sushi Toro", description: "Egg custard with fatty tuna — 2 pcs sushi or 3 pcs sashimi", price: "$6 / $14" },
      { name: "Uni (Sea Urchin)", description: "Sea urchin — 2 pcs sushi or 3 pcs sashimi", price: "$8 / $24" },
      { name: "Smoked Sake", description: "Smoked salmon — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $14" },
      { name: "Ama Ebi", description: "Sweet shrimp — 2 pcs sushi or 3 pcs sashimi", price: "$8 / $23" },
      { name: "Tamago Yaki", description: "Egg custard — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $9" },
      { name: "Aji Miyazaki", description: "Horse mackerel — 2 pcs sushi", price: "$11" },
      { name: "Tamago Scallop-Hokkaido Uni", description: "Scallop with sea urchin — 2 pcs sushi or 3 pcs sashimi", price: "$13 / $28" },
      { name: "Hotate + Fake Grass", description: "Scallop with garnish — 2 pcs sushi or 3 pcs sashimi", price: "$10 / $28" },
      { name: "Hotate Sauce with Ikura", description: "Scallop with salmon roe — 2 pcs sushi or 3 pcs sashimi", price: "$10 / $27" },
      { name: "Hotate", description: "Scallop — 2 pcs sushi or 3 pcs sashimi", price: "$7 / $20" },
      { name: "Smoked scallop with yuzu salt", description: "Smoked scallop — 2 pcs sushi or 3 pcs sashimi", price: "$9 / $14" },
      { name: "Kawaski", description: "Amberjack — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $13" },
      { name: "Aji", description: "Horse mackerel — 2 pcs sushi or 3 pcs sashimi", price: "$6 / $12" },
      { name: "Black Dag", description: "Black snapper — 2 pcs sushi", price: "$17" },
      { name: "Uni", description: "Sea urchin — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $11" },
    ],
  },
  "Moriawase & Chef's Trust Me": {
    sections: [
      {
        title: "Moriawase",
        items: [
          { name: "Chef choice Sushi - Classic (8pcs)", price: "$28" },
          { name: "Chef choice Sushi - Kame Premium (9pcs)", price: "$45" },
        ],
      },
      {
        title: "Chef choice Sashimi",
        items: [
          { name: "A (8 pcs 4 kinds)", price: "$32" },
          { name: "B (12 pcs 4 kinds)", price: "$48" },
          { name: "C (20 pcs 4 kinds)", price: "$95" },
        ],
      },
      {
        title: "Chef's Trust Me 49",
        description: "Thinly sliced hamachi, yellowtail, toro, salmon, spicy tuna, scallop, and eel with special spicy sauce.",
        items: [
          { name: "Chef's Trust Me 49", price: "$49" },
        ],
      },
      {
        title: "The Kame Trust Me 59",
        description: "Premium omakase featuring toro, spicy toro, toro & salmon sashimi, yellowtail belly, sea bass, aji, hamachi, shrimp, uni, and blue crab hand roll.",
        items: [
          { name: "The Kame Trust Me 59", price: "$59" },
        ],
      },
    ],
  },
  "Special Roll": {
    items: [
      { name: "Kame Roll", description: "Spicy tuna, spicy eel, cucumber, crab meat and avocado, topped with toro tuna and salmon spicy tuna", price: "$22" },
      { name: "Spicy Kame Roll", description: "Spicy tuna, cucumber and avocado, topped with spicy tuna and eel tuna with spicy mayo", price: "$18" },
      { name: "Shofin Lover Roll", description: "Spicy tuna, cucumber, spicy tuna mayo, spicy tuna, topped with shofin tuna and scallop with spicy tuna ponzu and eel sauce", price: "$23" },
      { name: "Rainbow Roll", description: "Spicy tuna, cucumber, spicy tuna, topped with rainbow fresh fish with spicy ponzu", price: "$17" },
      { name: "Dancing Eel Roll", description: "Shrimp tempura, eel and asparagus, topped eel with eel sauce", price: "$17" },
      { name: "Spicy Crunch Eel Roll", description: "Spicy tuna, mango, roasted chili, and cucumber, topped with roasted shrimp tuna spicy cilantro eel garlic ponzu clam", price: "$21" },
      { name: "Shrimp Lover Roll", description: "Shrimp tempura, spicy tuna, topped with shrimp tempura and spicy mayo", price: "$18" },
      { name: "Salmon Fire Roll", description: "Spicy salmon with scallop and asparagus, topped eel spiced salmon, spicy tuna, and topped with spicy", price: "$20" },
      { name: "Spicy Salmon Roll", description: "Spicy salmon, spicy tuna, cucumber, topped with spicy tuna ponzu and eel sauce", price: "$19" },
      { name: "Paradise Roll", description: "Spicy tuna, spicy crab, scallop, and shrimp tempura, topped with salmon, toro, shrimp tuna and topped eel coat with eel", price: "$19" },
      { name: "Crunch Roll", description: "Shrimp tempura, crab meat, and avocado, topped with crunchy spicy mayo, spicy mayo, roasted spicy tuna, topped eel", price: "$25" },
      { name: "Kame Spicy Roll", description: "Spicy tuna, cucumber, and avocado, topped with spicy tuna, mango tuna, and topped with spicy ponzu", price: "$18" },
      { name: "Tempura Roll", description: "Shrimp tempura, cream cheese, and avocado, topped with spicy tuna, eel ponzu, spicy mayo and eel sauce", price: "$25" },
      { name: "Lobster Roll", description: "Spicy tuna, lobster, and avocado, topped with lobster tempura, spicy spicy tuna, and eel sauce", price: "$23" },
      { name: "Spicy Tuna Roll", description: "Spicy tuna, cucumber, topped with spicy tuna, spicy tuna, avocado and spicy ponzu sauce", price: "$15" },
      { name: "PGA Dragon Roll", description: "Spicy tuna, mango, spicy tuna, avocado, topped with spicy tuna, eel sauce, spicy mayo, and salmon", price: "$21" },
      { name: "Angry Mango Roll", description: "Spicy tuna, mango, and cucumber wrapped in rice paper, topped with mango, spicy eel sauce and sriracha", price: "$18" },
      { name: "Mango Tango Roll", description: "Salmon, avocado, mango, and spicy tuna, topped with mango, spicy tuna, mango sauce, and sriracha", price: "$20" },
      { name: "Unagi Lover Roll", description: "Eel, cucumber, and cucumber avocado, topped with eel sauce and spicy mayo, topped with eel sauce and baby shrimp, finished with spicy ponzu", price: "$21" },
      { name: "Monster Roll", description: "Spicy tuna, baby shrimp, and avocado, topped with deep fried crabmeat and baby shrimp", price: "$17" },
      { name: "Crunchy Crunch Roll", description: "Crunchy, roasted crab, spicy tuna, topped with eel fried crabmeat, mango, and eel sauce", price: "$11" },
      { name: "Salmon Tempura Roll", description: "Crabmeat, cucumber and avocado, topped with salmon tempura, spicy tuna, mango, and eel sauce and sauce", price: "Market Price" },
    ],
  },
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
  const [activeTab, setActiveTab] = useState<MenuCategory>("Hibachi & Hot Specialties");
  const { ref, inView } = useInView();

  const tabs: MenuCategory[] = [
    "Hibachi & Hot Specialties",
    "Hand Roll, Regular Roll & Sides",
    "Bake Roll, Roll without Rice, Deep Fried Roll & Dessert",
    "Sushi Bar",
    "Sushi & Sashimi",
    "Moriawase & Chef's Trust Me",
    "Special Roll",
  ];

  const currentData = menuData[activeTab];
  const hasSubsections = "sections" in currentData && currentData.sections;
  const items = ("items" in currentData ? currentData.items : []) as MenuItem[];

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
              className="px-3 py-2 rounded-full transition-all duration-200 text-xs md:text-sm font-medium"
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

        {/* Menu Items */}
        {hasSubsections && currentData.sections ? (
          <div className="space-y-12">
            {currentData.sections.map((section, sIdx) => (
              <div key={sIdx}>
                <h3
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "oklch(0.95 0.002 65)",
                  }}
                >
                  {section.title}
                </h3>
                {section.description && (
                  <p
                    className="text-sm mb-6"
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      color: "oklch(0.72 0.12 75)",
                      fontStyle: "italic",
                    }}
                  >
                    {section.description}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{
                        background: "oklch(0.15 0.006 240)",
                        border: "1px solid oklch(1 0 0 / 10%)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4
                          className="text-lg font-bold"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "oklch(0.95 0.002 65)",
                          }}
                        >
                          {item.name}
                        </h4>
                      </div>
                      {item.description && (
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
                      )}
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
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "oklch(0.15 0.006 240)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                }}
              >
                <h4
                  className="text-lg font-bold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "oklch(0.95 0.002 65)",
                  }}
                >
                  {item.name}
                </h4>
                {item.description && (
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
                )}
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
        )}
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
      <VisitSection />
      <Footer />
    </div>
  );
}
