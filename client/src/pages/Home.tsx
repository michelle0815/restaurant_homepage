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
const KAME_LOGO = "/images/kame_logo.jpg";
const HERO_IMG = "/images/food_1.jpg";
const SUSHI_PLATTER = "/images/food_2.jpg";
const SUSHI_TOWER = "/images/food_3.jpg";
const SAKE_COCKTAILS = "/images/food_4.jpg";
const INTERIOR_DINING = "/images/food_5.jpg";
const SASHIMI_PLATE = "/images/food_6.jpg";
const FOOD_7 = "/images/food_7.jpg";
const FOOD_8 = "/images/food_8.jpg";
const FOOD_9 = "/images/food_9.jpg";

// ── Data ─────────────────────────────────────────────────────────────────────
type MenuCategory = "Starter" | "Salad" | "Hibachi & Hot Specialties" | "Hand Roll, Regular Roll & Sides" | "Bake Roll, Roll without Rice, Deep Fried Roll & Dessert" | "Sushi Bar" | "Sushi & Sashimi ( Sushi 1PC / Sashimi 3PCS )" | "Moriawase & Chef's Trust Me" | "Special Roll" | "Korean & Japanese Cuisine" | "Kids Menu" | "Lunch Special";

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
  "Starter": {
    sections: [
      {
        title: "Starter",
        items: [
          { name: "Okonomiyaki", description: "Japanese style pancake with seafood shaved bonito.", price: "$16" },
          { name: "Kara-A-GE Chicken", description: "Japanese style marinated deep-fried chicken", price: "$12" },
          { name: "Shrimp Tempura (5pc)", description: "Crispy lightly battered shrimp tempura, served with tempura dipping sauce", price: "$12" },
          { name: "Vegetable Tempura", description: "Kakiage with mixed vegetable tempura", price: "$14" },
          { name: "Nasu Dengaku", description: "Grilled Japanese eggplant with house-made sweet miso sauce, shaved bonito, and sesame", price: "$13" },
          { name: "Takoyaki", description: "Japanese-style octopus balls, lightly grilled and served with savory sauce", price: "$13" },
          { name: "Fried Calamari", description: "Crispy battered squid, served with dipping sauce", price: "$13" },
          { name: "Avocado Bomb", description: "Stuffed with spicy tuna and crabmeat, topped with green onion topped with eel sauce and spicy mayo", price: "$13" },
          { name: "Shishito Peppers", description: "Lightly blistered and seasoned, topped with bushikatsuo, and served with ponzu sauce and yuzu", price: "$10" },
          { name: "Panko Oyster", description: "Bread-crusted and deep-fried, served with shaved garnish and cilantro aioli", price: "$16" },
          { name: "Brussel Sprout", description: "Lightly fried brussels sprout tossed with house sweet chili sauce", price: "$10" },
          { name: "Horenso Gomae", description: "Blanched spinach dressed in a savory Japanese sesame sauce.", price: "$6" },
          { name: "Edamame", price: "$6" },
          { name: "Garlic/Spicy Garlic Edamame", price: "$8" },
          { name: "Gyoza Pork, Vegetable 5pc", description: "(Steamed) / Pan Fried+1 / Deep Fried+1", price: "$12" },
          { name: "Egg Roll (Pork, Veggie) 2pc", price: "$7" },
          { name: "Baked Red Snapper Tempura", description: "Crispy battered red snapper, lightly fried drizzled with house sauce", price: "$12" },
          { name: "Fried Wonton Poke Nachos", description: "Topped with bluefin tuna, avocado, jalapeno, marinated in house poke sauce", price: "$18" },
          { name: "Wagyu", description: "Tender, marbled Japanese-style beef, lightly seared on a hot stone and served with ponzu sauce", price: "$24" },
          { name: "Heart Attack", description: "Stuffed with crabmeat and cream cheese, topped with eel sauce and spicy mayo", price: "$13" },
          { name: "Soft Shell Crab Tempura", description: "Crispy battered soft-shell crab, served with ponzu sauce", price: "$13" },
          { name: "Grilled Kama", description: "Grilled yellowtail collar with ponzu", price: "$16" },
          { name: "Crab Rangoon", description: "Crispy fried wonton filled with a creamy blend of crab and cream cheese, served with sweet chili sauce", price: "$11" },
        ],
      },
    ],
  },
  "Salad": {
    sections: [
      {
        title: "Salad",
        items: [
          { name: "Ika Tomato Salad", description: "Fresh mixed greens, cherry tomatoes, blueberry, squid, sliced almonds, beetroot & choice of ginger or sesame dressing.", price: "$16" },
          { name: "Spicy Sashimi Salad", description: "Fresh assorted sashimi with avocado, spicy sauce, and mixed greens.", price: "$22" },
          { name: "Squid Salad", price: "$9" },
          { name: "Seaweed Salad", price: "$7" },
          { name: "Grilled Chicken Salad", description: "Fresh mixed greens, grilled chicken breast, cherry tomatoes, blueberry, sliced almonds, beetroot & choice of ginger or sesame dressing.", price: "$16" },
          { name: "Green Salad", description: "Fresh mixed greens, tomatoes, avocado, cucumber, carrot with ginger dressing.", price: "$9" },
          { name: "Cucumber Salad", price: "$8" },
        ],
      },
    ],
  },
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
          { name: "Black Cod", description: "Broiled black cod with house-made Saikyo miso, served with light tempura enoki", price: "$32" },
          { name: "Blue Crab Fried-Rice", description: "Stir-fried rice with real crab, fresh vegetables and egg", price: "$29" },
          { name: "Medley Tempura Dinner", description: "Crispy shrimp tempura (5pc) kakiage with mixed vegetable tempura", price: "$21" },
          { name: "Range Chicken", description: "Broiled chicken in balsamic teriyaki sauce with seasonal vegetable sauté", price: "$22" },
          { name: "Salmon Yuzu-Yaki", description: "Yuzu-marinated salmon served with sautéed seasonal vegetables", price: "$26" },
        ],
      },
      {
        title: "Ramen & Udon",
        items: [
          { name: "Tonkotsu Ramen", description: "Pork broth with pork chashu, menma, boiled egg, bean sprouts, green onion, black mushrooms, nori, and naruto. Served with thin noodles. Add spicy +1", price: "$13" },
          { name: "Nagasaki Seafood Ramen", description: "Pork broth, mixed seafood, nori, mixed vegetables, boiled egg. Served with thin noodles", price: "$16" },
          { name: "Miso Ramen", description: "Pork broth, with miso chashu, boiled egg, green onion, bean sprout, menma, black mushroom, naruto. Served with thin noodles. Add spicy +1", price: "$14" },
          { name: "Udon", description: "Udon noodles, with fish cake, nori, and green onions", price: "$13" },
          { name: "Tempura Udon", description: "Udon noodles, with fried tempura, fish cake, nori, green onion", price: "$16" },
          { name: "Yaki Udon or Yaki Soba", description: "Stir-fried Japanese noodles with vegetables and house-made sauce. Add spicy +1. Add chicken 5 / Beef 6 / Shrimp 7", price: "$12" },
          { name: "Udon Carbonara", description: "Udon noodles in a creamy carbonara sauce with bacon, mushrooms, cheese, and green onions", price: "$16" },
          { name: "Asari Miso Soup", description: "Manila clams, kaiware, and scallions", price: "$7" },
          { name: "Daikon Miso Soup", description: "Daikon radish flowers and scallions", price: "$6" },
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
          { name: "Real Crab Roll", description: "Snow crab, cucumber, avocado, masago", price: "$14" },
          { name: "Basic Roll", description: "Tuna or Salmon or Yellowtail", price: "$9" },
          { name: "Shrimp Tempura Roll", description: "Shrimp tempura, crab meat, cucumber, avocado with eel sauce", price: "$11" },
          { name: "California Roll", description: "Crab meat, avocado, cucumber", price: "$9" },
          { name: "Eel", description: "Eel, avocado, cucumber with eel sauce", price: "$11" },
          { name: "Philadelphia Roll", description: "Smoked salmon, cream cheese, avocado", price: "$11" },
          { name: "Spicy Salmon Roll", description: "Spicy salmon, cucumber", price: "$10" },
          { name: "Spicy California Roll", description: "Spicy crab meat, avocado, cucumber", price: "$10" },
          { name: "Spicy Tuna Roll", description: "Spicy tuna, cucumber", price: "$10" },
          { name: "Spicy Yellowtail Roll", description: "Spicy yellowtail, cucumber", price: "$11" },
          { name: "Spider Roll", description: "Soft shell crab tempura, crab meat, avocado, cucumber, masago, seaweed and soy paper with eel sauce", price: "$14" },
          { name: "Veggie Roll", description: "Asparagus, avocado, cucumber, yamagobo, kaiware", price: "$10" },
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
          { name: "Kizani Wasabi", price: "$3" },
        ],
      },
    ],
  },
  "Bake Roll, Roll without Rice, Deep Fried Roll & Dessert": {
    sections: [
      {
        title: "Bake Roll",
        items: [
          { name: "Volcano Roll", description: "Crabmeat and avocado, topped with baked crawfish, crabmeat and scallop finished eel sauce, and spicy mayo", price: "$17" },
          { name: "Baked Salmon Roll", description: "Crabmeat and avocado, topped with salmon, and eel sauce", price: "$17" },
          { name: "Baked Shrimp Roll", description: "Crabmeat and avocado, topped with shrimp, and eel sauce", price: "$17" },
        ],
      },
      {
        title: "Roll without Rice",
        items: [
          { name: "Cherry Blossom Roll", description: "Salmon, cucumber, avocado, and crabmeat, topped with tuna, mango, and orange slices", price: "$19" },
          { name: "Ultimate Shrimp Roll", description: "Shrimp tempura, spicy crab, and avocado, topped with tuna, salmon, yellowtail, butter shrimp, onion, jalapeno, creamy ponzu, eel sauce, and sriracha", price: "$22" },
          { name: "Aurora Roll", description: "Shrimp tempura, spicy tuna, and crabmeat, topped with tuna, salmon, caviar, spicy ponzu, and vinaigrette", price: "$20" },
          { name: "Pure Sashimi Roll", description: "Salmon, tuna, hamachi, spicy tuna, spring mix, and avocado wrapped in rice paper with spicy ponzu and sweet chili sauce", price: "$20" },
          { name: "Tropical Roll", description: "Tuna, salmon, yellowtail, white fish, crabmeat, and avocado wrapped in cucumber with spicy creamy ponzu sauce", price: "$18" },
        ],
      },
      {
        title: "Deep Fried Roll",
        items: [
          { name: "Crazy Boy Roll", description: "Crabmeat and cream cheese, deep fried, topped with spicy tuna, jalapeno, eel sauce, and spicy mayo", price: "$18" },
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
      { name: "Toro Tartar Don 6pc", description: "Minced fatty tuna and ikura with takuan and kaiware, wrapped in nori over sushi rice", price: "$30" },
      { name: "Madai Crudo", description: "Delicate madai slices topped with smoked sea salt, mango, onion, finished with yuzu, ponzu sauce and truffle oil", price: "$23" },
      { name: "Spicy Seared Tuna", description: "Seared tuna served with the Chef's signature spicy sauce and daikon", price: "$18" },
      { name: "Hamachi with Jalapeño", description: "Hamachi with jalapeño, spicy mayo, and miso sauce", price: "$18" },
      { name: "Salmon Carpaccio", description: "Thinly sliced salmon with ponzu and citrus, garnish with micro-greens, then served with crispy rice and chili oil", price: "$16" },
      { name: "Asian Mango Seafood Ceviche", description: "An assortment of tuna, salmon, hamachi, white fish, and shrimp with masago and mango finished with yuzu sauce", price: "$16" },
      { name: "Tuna Tartar", description: "Fresh tuna tartar seasoned with lemon salt, scallions and sesame, finished with truffle oil and a balance of yuzu and ponzu sauce", price: "$18" },
      { name: "Salmon Truffle Vinaigrette", description: "Delicate salmon dressed with truffle oil, ponzu sauce, vinegar and thinly sliced onion, tobiko, and black sesame", price: "$15" },
      { name: "Sashimi Aioli (Tuna or Salmon or Hamachi)", description: "Delicate sashimi paired with avocado and light usukuchi soy, enhanced by sambai garlic miso and yuzu sauce", price: "$18" },
      { name: "Crispy Rice Bites (Tuna or Salmon)", description: "Golden crispy rice layered with tuna or salmon, avocado, and cilantro, finished with eel sauce, spicy mayo, and Kame signature sauce", price: "$18" },
      { name: "The Wine Grape Hotate", description: "Seared scallops complemented by a velvety red wine reduction and fresh seasonal grapes", price: "$20" },
      { name: "Sashimi Wrap Apple Roll (no rice)", description: "Fresh tuna, salmon, and yellowtail sashimi combined with spicy tuna, crabmeat, and avocado, elegantly wrapped in apple and served with a vibrant mango-apple salad", price: "$20" },
      { name: "Smoked Hamachi Carpaccio", description: "Smoked yellowtail, serrano and cilantro", price: "$20" },
      { name: "Chirasi", description: "Chef's choice of assorted fresh sashimi served over seasoned sushi rice", price: "$26" },
      { name: "Hawaiian Poke", description: "Tuna, avocado, fresh vegetables, cucumber, seaweed salad and masago on sushi rice", price: "$19" },
      { name: "Hwe Dupbap (Korean Sashimi Rice Bowl)", description: "Mixed sashimi over rice with fresh vegetables, served with Korean spicy gochujang sauce", price: "$23" },
      { name: "Kame Tower (Tuna or Salmon)", description: "Choice of tuna or salmon over sushi rice with avocado and crabmeat, topped with eel sauce, spicy mayo, and sweet mayo", price: "$19" },
      { name: "Flame Kissed Salmon", description: "Salmon sashimi strips with soy mustard and Kame signature sauce", price: "$16" },
      { name: "Flame Tuna Tataki", description: "Flash-seared tuna cubes topped with caviar, served with soy mustard and Kame signature sauce", price: "$18" },
    ],
  },
  "Sushi & Sashimi ( Sushi 1PC / Sashimi 3PCS )": {
    items: [
      { name: "O - Toro", description: "Fatty tuna belly", price: "$10 / $18" },
      { name: "Chu Toro", description: "Medium fatty tuna belly", price: "$8 / $23" },
      { name: "Akami", description: "Tuna loin", price: "$5 / $14" },
      { name: "Sake", description: "Salmon", price: "$4 / $14" },
      { name: "Sake Toro", description: "Salmon belly", price: "$5 / $14" },
      { name: "King Sake", description: "King salmon", price: "$5 / $14" },
      { name: "Hirame", description: "Flounder", price: "$5 / $14" },
      { name: "Torched Sake Toro", description: "Torched salmon belly *Kizami wasabi", price: "$5 / $14" },
      { name: "Hamachi", description: "Yellowtail", price: "$4 / $12" },
      { name: "Hamachi Toro", description: "Yellowtail belly", price: "$5 / $14" },
      { name: "Zuwaigani", description: "Snow crab", price: "$7 / --" },
      { name: "Foie Gras", description: "Fatty liver", price: "$12 / --" },
      { name: "Tako", description: "Octopus", price: "$4 / $11" },
      { name: "Saba", description: "Norwegian mackerel", price: "$3 / $8" },
      { name: "Smoked Sake", description: "Smoked salmon", price: "$5 / $14" },
      { name: "Ama Ebi", description: "Sweet shrimp", price: "$8 / $25" },
      { name: "Tamago Yaki", description: "Egg custard", price: "$3 / $9" },
      { name: "A5 Miyazaki", description: "A5 Wagyu", price: "$11 / --" },
      { name: "Torched Scallop + Hokkaido Uni", description: "Scallop + Sea urchin", price: "$10 / $28" },
      { name: "Maguro", description: "Bluefin tuna — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $12" },
      { name: "Tai", description: "Red snapper — 2 pcs sushi or 3 pcs sashimi", price: "$5 / $12" },
      { name: "Tamago Sushi Toro", description: "Egg custard with fatty tuna — 2 pcs sushi or 3 pcs sashimi", price: "$6 / $14" },
      { name: "Uni (Sea Urchin)", description: "Sea urchin — 2 pcs sushi or 3 pcs sashimi", price: "$8 / $24" },
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
          { name: "Chef choice Sushi - Classic (6pcs)", price: "$26" },
          { name: "Chef choice Sushi - Kame Premium (8pcs)", price: "$38" },
        ],
      },
      {
        title: "Chef choice Sashimi",
        items: [
          { name: "A (8 pcs 4 kinds)", price: "$32" },
          { name: "B (12 pcs 4 kinds)", price: "$48" },
          { name: "C (20 pcs 4 kinds)", price: "$80" },
        ],
      },
      {
        title: "Chef's Trust Me 49",
        description: "'Trust me' Inspired by the classic Nozawa style. Features premium sashimi, seasonal nigiri, and our signature hand rolls",
        items: [
          { name: "Salad & Miso / Salmon Sashimi / Tuna Sushi 1pc / Bluefin Tuna Sushi 1pc / Salmon Sushi 1pc / Salmon Belly Sushi 1pc / Yellowtail Sushi 1pc / Sea Bass Sushi 1pc / Aji Sushi 1pc / Shrimp Sushi 1pc / Spicy Tuna Hand Roll / Blue Crab Hand Roll", price: "$49" },
        ],
      },
      {
        title: "The Kame Trust Me 59",
        items: [
          { name: "Salad & Miso/Tuna & Salmon Sashimi/Bluefin Tuna Sushi 1pc/Chutoro Sushi 1pc/Salmon Sushi 1pc/Salmon Belly Sushi 1pc/Yellowtail Sushi 1pc/Yellowtail Belly Sushi 1pc/Sea Bass Sushi 1pc/Aji Sushi 1pc/Hirame Sushi 1pc/Shrimp Sushi 1pc/Tuna Hand Roll/Blue Crab Hand Roll", price: "$59" },
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
  "Korean & Japanese Cuisine": {
        items: [
          { 
            name: "Bulgogi", 
            description: "Thinly sliced beef ribeye marinated in traditional Korean-style onion and cabbage, served with steamed rice", 
            price: "$30" 
          },
          { 
            name: "Chicken Bulgogi", 
            description: "Thinly sliced chicken marinated in traditional Korean-style onion and cabbage, served with steamed rice", 
            price: "$23" 
          },
          { 
            name: "Hot Stone Bowl", 
            description: "Variety of vegetables and rice served in a hot stone bowl, topped with a fried egg with Korean spicy sauce. *Add Chicken 5/ Bulgogi (Beef) 7/ Spicy Pork Bulgogi 6/Shrimp 7/Tofu 5", 
            price: "$15" 
          },
          { 
            name: "Spicy Pork Bulgogi", 
            description: "Thinly sliced pork marinated in a traditional Korean spicy sauce with onion and cabbage, served with steamed rice", 
            price: "$27" 
          },
          { 
            name: "BBQ Short Ribs (Kalbi)", 
            description: "Perfectly marinated Korean-style cross-cut grilled beef short ribs with onion and cabbage, served with steamed rice", 
            price: "$36" 
          },
          { 
            name: "Kimchi Fried Rice", 
            description: "Stir-fried rice with spicy Korean kimchi, fresh vegetables, a fried egg and melted cheese. *Add Chicken 5/Beef 6/Shrimp 7/Tofu 5", 
            price: "$14" 
          },
          { 
            name: "Fried Rice", 
            description: "Stir-fried rice with fresh vegetables and egg. *Add Chicken 5/ Beef 6/Shrimp 7/Tofu 5", 
            price: "$11" 
          },
          { 
            name: "Tonkatsu", 
            description: "Crispy pork cutlet served with steamed rice, shredded cabbage, and tonkatsu sauce", 
            price: "$16" 
          },
          { 
            name: "Chicken Katsu", 
            description: "Crispy chicken cutlet served with steamed rice, shredded cabbage, and katsu sauce", 
            price: "$16" 
          },
          { 
            name: "Pork Cutlet Curry Rice", 
            description: "Crispy pork cutlet served with steamed rice and Japanese curry", 
            price: "$18" 
          },
          { 
            name: "Chicken Curry Rice", 
            description: "Crispy chicken cutlet served with steamed rice and Japanese curry", 
            price: "$18" 
          },
          { 
            name: "Jumbo Shrimp Katsu (Kame Signature)", 
            description: "Crispy cutlet made with 100% Black Tiger shrimp", 
            price: "$29" 
          }
        ],
      },
  "Kids Menu": {
        items: [
          { 
            name: "Chicken Teriyaki Don", 
            description: "Rice bowl topped with chicken teriyaki and teriyaki sauce.", 
            price: "$12" 
          },
          { 
            name: "Kara-A-Ge Don", 
            description: "Rice bowl topped with chicken kara-a-ge and kara-a-ge sauce.", 
            price: "$12" 
          }
        ],
  },
  "Lunch Special": {
    sections: [
      {
        title: "Mon ~ Fri, 11AM ~ 3PM",
        description: "Served with miso, california roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3",
        items: [
          {
            name: "Sushi Bento",
            description: "5pcs of Chef's choice sushi. Served with miso, california roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3",
            price: "$17"
          },
          {
            name: "Sashimi Bento",
            description: "5pcs of Chef's choice sashimi. Served with miso, california roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3",
            price: "$19"
          },
          {
            name: "Sushi & Sashimi Bento",
            description: "5 pcs Chef's choice sushi and 4 pcs sashimi. Served with miso, california roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3",
            price: "$23"
          },
          {
            name: "Unagi Bento",
            description: "5 pcs of eel. Served with miso, california roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3",
            price: "$23"
          },
          {
            name: "Chicken Teriyaki Bento (Spicy +1)",
            description: "Grilled chicken with teriyaki sauce and fresh vegetables. Served with miso, california roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3",
            price: "$16"
          },
          {
            name: "Salmon Teriyaki Bento",
            description: "Grilled salmon with teriyaki sauce and fresh vegetables. Served with miso, california roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3",
            price: "$18"
          },
          {
            name: "BBQ Short Ribs Bento",
            description: "Marinated short rib grilled with a flavorful Korean BBQ sauce. Served with miso, california roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3",
            price: "$23"
          },
          {
            name: "Bulgogi Bento",
            description: "Thinly sliced ribeye beef marinated in a savory Korean-style sauce. Served with miso, california roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3",
            price: "$18"
          },
          {
            name: "Spicy Pork Bulgogi Bento",
            description: "Thinly sliced pork marinated in a savory, spicy Korean-style sauce. Served with miso, california roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3",
            price: "$17"
          }
        ],
      },
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
        <a href="#" className="flex items-center">
          <img
            src={KAME_LOGO}
            alt="Kame Sushi Logo"
            className="h-12 w-auto"
          />
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
    "Starter",
    "Salad",
    "Hibachi & Hot Specialties",
    "Hand Roll, Regular Roll & Sides",
    "Bake Roll, Roll without Rice, Deep Fried Roll & Dessert",
    "Sushi Bar",
    "Sushi & Sashimi ( Sushi 1PC / Sashimi 3PCS )",
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
  const images = [SUSHI_PLATTER, SUSHI_TOWER, SASHIMI_PLATE, INTERIOR_DINING, SAKE_COCKTAILS, FOOD_7, FOOD_8, FOOD_9];

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
