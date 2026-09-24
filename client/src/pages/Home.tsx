/**
 * Kame Sushi — Home Page
 * Design: Japanese Omakase + Luxury Dining Aesthetic
 * Colors: Charcoal Black (#0a0a0a) + Amber Gold (#d4a843) + Cream White (#f0ebe3)
 * Fonts: Playfair Display (headings) + Lato (body) + Noto Serif JP (accent)
 */

import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Clock, ChevronDown, Menu, X, Instagram } from "lucide-react";

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
type MenuCategory =
  | "Starter"
  | "Salad"
  | "Hibachi & Hot Specialties"
  | "Hand Roll, Regular Roll & Sides"
  | "Bake Roll, Roll without Rice, Deep Fried Roll & Dessert"
  | "Sushi Bar"
  | "Sushi & Sashimi ( Sushi 1PC / Sashimi 3PCS )"
  | "Moriawase & Chef's Trust Me"
  | "Special Roll"
  | "Korean & Japanese Cuisine"
  | "Kids Menu"
  | "Lunch Special"
  | "Happy Hour"
  | "Beverages & Bar";

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

const menuItems = (rows: string[]): MenuItem[] => rows.map((row) => {
  const [name, price, ...description] = row.split('|');
  return { name, price, ...(description.length ? { description: description.join('|') } : {}) };
});

const section = (title: string, rows: string[], description?: string): MenuSection => ({
  title,
  ...(description ? { description } : {}),
  items: menuItems(rows),
});

const menuData: Record<MenuCategory, MenuCategoryData> = {
  "Starter": { sections: [section("Starter", [
    "Ika Geso (Fried Squid Leg)|$12|Grilled squid legs with a delicate smoky flavor, finished with our signature sauce.",
    "Okonomiyaki|$16|Japanese-style pancake with seafood and shaved bonito.",
    "Kara-A-GE Chicken|$12|Japanese-style marinated deep-fried chicken.",
    "Edamame|$6", "Garlic Butter / Spicy Garlic Edamame|$8",
    "Shrimp Tempura (5 pc)|$12|Crispy lightly battered shrimp with tempura dipping sauce.",
    "Gyoza Pork or Vegetable (5 pc)|$12|Steamed, pan fried +1, or deep fried +1.",
    "Vegetable Tempura|$14|Kakiage with mixed vegetable tempura.",
    "Egg Roll (Pork, Veggie) (2 pc)|$7",
    "Horenso Gomae|$6|Blanched spinach in savory Japanese sesame sauce.",
    "Red Snapper Tempura|$12|Crispy battered red snapper with micro cilantro and house sauce.",
    "Takoyaki|$13|Japanese-style octopus balls, lightly grilled with savory sauce.",
    "Fried Wonton Poke Nachos|$18|Bluefin tuna, avocado, jalapeño, and house poke sauce.",
    "Fried Calamari|$13|Crispy battered squid with dipping sauce.",
    "Wagyu|$24|Tender marbled beef, lightly seared on a hot stone with ponzu sauce.",
    "Avocado Bomb|$13|Spicy tuna and crabmeat topped with eel sauce and spicy mayo.",
    "Heart Attack|$13|Crabmeat and cream cheese topped with eel sauce and spicy mayo.",
    "Shishito Peppers|$10|Blistered peppers with bonito, ponzu, and yuzu.",
    "Soft Shell Crab Tempura|$13|Crispy battered soft-shell crab with ponzu sauce.",
    "Panko Oyster|$16|Bread-crusted and deep-fried with cilantro aioli.",
    "Grilled Kama|$16|Grilled yellowtail collar with ponzu.",
    "Brussel Sprout|$10|Lightly fried Brussels sprouts with house sweet chili sauce.",
    "Crab Rangoon|$11|Crispy wontons filled with crab and cream cheese, served with sweet chili sauce."
  ])] },
  "Salad": { sections: [section("Salad", [
    "Ika (Fried Squid Leg) Tomato Salad|$16|Mixed greens, cherry tomatoes, blueberry, squid, sliced almonds, beetroot, and ginger or sesame dressing.",
    "Spicy Sashimi Salad|$22|Assorted sashimi with avocado, spicy sauce, and mixed greens.",
    "Squid Salad|$9", "Seaweed Salad|$7",
    "Grilled Chicken Salad|$16|Mixed greens, chicken breast, cherry tomatoes, blueberry, almonds, beetroot, and ginger or sesame dressing.",
    "Green Salad|$9|Mixed greens, tomatoes, avocado, cucumber, carrot, and ginger dressing.",
    "Cucumber Salad|$8"
  ])] },
  "Hibachi & Hot Specialties": { sections: [
    section("Hibachi", ["New York|$35", "Chicken|$24", "Shrimp|$33", "Salmon|$31", "New York & Chicken|$36", "New York & Shrimp|$38", "Veggies|$21"], "Includes miso or clear soup, hibachi vegetables, and steamed rice. Fried rice substitute +3."),
    section("Hot Specialties", [
      "Blue Crab Fried-Rice|$29|Real crab, fresh vegetables, and egg; includes miso or clear soup.",
      "Saba Shioyaki|$25|Grilled Norwegian mackerel with house ponzu, rice, and miso or clear soup. Fried rice substitute +3.",
      "Black Cod|$32|Broiled black cod with Saikyo miso and tempura enoki, served with rice and soup.",
      "Medley Tempura Dinner|$21|Shrimp tempura (5 pc) and kakiage, served with rice and soup.",
      "Salmon Yuzu-Yaki|$26|Yuzu-marinated salmon with seasonal vegetables, rice, and soup."
    ], "Hot specialties include steamed rice and miso or clear soup unless noted."),
    section("Ramen & Udon", [
      "Tonkatsu Ramen|$13|Pork broth, pork chashu, menma, egg, bean sprouts, green onion, black mushrooms, nori, and naruto. Add spicy +1.",
      "Nagasaki Seafood Ramen|$18|Pork broth, mixed seafood and vegetables, nori, and boiled egg.",
      "Miso Ramen|$14|Pork broth, miso chashu, egg, green onion, bean sprouts, menma, black mushroom, and naruto. Add spicy +1.",
      "Udon|$13|Udon noodles with fish cake, nori, and green onions.",
      "Tempura Udon|$16|Udon noodles with fried tempura, fish cake, nori, and green onion.",
      "Yaki Udon or Yaki Soba|$12|Stir-fried Japanese noodles with vegetables and house-made sauce. Add chicken 5, beef 6, or shrimp 8.",
      "Udon Carbonara|$16|Creamy carbonara sauce with bacon, mushrooms, cheese, and green onions.",
      "Miso Soup / Clear Soup|$4"
    ])
  ] },
  "Hand Roll, Regular Roll & Sides": { sections: [
    section("Hand Roll", ["Salmon|$5", "Spicy Salmon|$6", "Tuna|$6", "Spicy Tuna|$7", "Real Crabmeat|$7", "Chutoro (when available)|$9", "Eel (Unagi)|$7", "Scallop (Hotate)|$7", "Spicy Scallop (Hotate)|$8", "Yellowtail (Hamachi)|$7", "Spicy Yellowtail|$8"]),
    section("Regular Roll", [
      "Real Crab Roll|$14|Snow crab, cucumber, avocado, and masago.",
      "Basic Roll (Tuna, Salmon, or Yellowtail)|$9",
      "Shrimp Tempura Roll|$11|Shrimp tempura, crabmeat, cucumber, avocado, fried potatoes, and eel sauce.",
      "California Roll|$9|Crabmeat, avocado, and cucumber.",
      "Eel Roll|$11|Eel, avocado, cucumber, and eel sauce.",
      "Philadelphia Roll|$11|Smoked salmon, cream cheese, and avocado.",
      "Spicy Salmon Roll|$10|Spicy salmon and cucumber.",
      "Salmon Skin Roll|$13|Salmon skin, avocado, cucumber, yamagobo, masago, and eel sauce.",
      "Spicy California Roll|$10|Spicy crabmeat, avocado, and cucumber.",
      "Spicy Tuna Roll|$10|Spicy tuna and cucumber.",
      "Spicy Yellowtail Roll|$11|Spicy yellowtail and cucumber.",
      "Spider Roll|$15|Soft-shell crab tempura, crabmeat, avocado, cucumber, masago, and eel sauce.",
      "Veggie Roll|$10|Asparagus, avocado, cucumber, yamagobo, and spring mix.",
      "Salmon Avocado Roll|$10", "Avocado Roll|$7", "Cucumber Roll|$7"
    ]),
    section("Sides", ["Sushi Rice|$4", "Steamed Rice|$3", "Fresh Wasabi|$3", "Kizami Wasabi|$3"])
  ] },
  "Bake Roll, Roll without Rice, Deep Fried Roll & Dessert": { sections: [
    section("Bake Roll", [
      "Volcano Roll|$19|Crabmeat and avocado topped with baked crawfish, crabmeat, scallop, masago, green onion, eel sauce, and spicy mayo.",
      "Ida Roll|$17|Crabmeat, avocado, and cream cheese topped with salmon and eel sauce.",
      "Baked Shrimp Roll|$17|Crabmeat, avocado, and cream cheese topped with shrimp and eel sauce."
    ]),
    section("Roll without Rice", [
      "Cherry Blossom Roll|$20|Salmon, cucumber, avocado, and crabmeat wrapped in soy paper, topped with tuna, tobiko, and ponzu.",
      "Ultimate Shrimp Roll|$24|Shrimp tempura, spicy crab, avocado, tuna, salmon, yellowtail, butter shrimp, onion, jalapeño, eel sauce, and sriracha.",
      "Aurora Roll|$20|Shrimp tempura, spicy tuna, and crabmeat wrapped in soy paper, topped with tuna, salmon, tobiko, and spicy ponzu.",
      "Pure Sashimi Roll|$20|Salmon, tuna, yellowtail, spicy tuna, spring mix, and avocado wrapped in rice paper with spicy ponzu and sweet chili sauce.",
      "Tropical Roll|$18|Tuna, salmon, yellowtail, white fish, crab stick, and avocado wrapped in cucumber with tobiko and ponzu.",
      "Universal Roll|$18|Shrimp tempura, spicy crab, and spring mix wrapped in rice paper, topped with salmon, mango, tobiko, and spicy ponzu.",
      "Valentine Roll|$21|Salmon, avocado, and mango wrapped in soy paper, topped with crabmeat, spicy mayo, and eel sauce."
    ]),
    section("Deep Fried Roll", [
      "Crazy Boy Roll|$18|Crabmeat and cream cheese, deep fried, topped with spicy tuna, jalapeño, eel sauce, spicy mayo, and sriracha.",
      "Fields West Roll (6 pc)|$15|Smoked salmon, crabmeat, avocado, and cream cheese, deep fried with spicy mayo, wasabi sauce, and eel sauce.",
      "Crispy California Roll|$14|Deep-fried California roll with cream cheese, spicy mayo, and eel sauce."
    ]),
    section("Dessert", ["Ice Cream (vanilla, green tea)|$7", "Deep Fried Banana Ice Cream|$14", "Mochi Ice Cream (green tea, strawberry, vanilla)|$7", "Cheesecake|$7", "Sugar Glass Tomatoes|$8"])
  ] },
  "Sushi Bar": { items: menuItems([
    "Toro Tartar Don|$34|Minced fatty tuna and ikura with takuan, wrapped in nori over sushi rice; served with soup.",
    "Orange Sake|$19|Salmon, orange, yuzu tobiko, serrano, micro cilantro, orange oil, ponzu, and sanbaizu.",
    "Yuca Hamachi|$20|Yellowtail, crispy yuca, yuzu tobiko, micro cilantro, nuts, ponzu, and sanbaizu.",
    "Spicy Seared Tuna|$18|Seared tuna with serrano, micro cilantro, signature spicy sauce, and daikon.",
    "Hamachi with Jalapeño|$18|Yellowtail with jalapeño, yuzu, ponzu, and micro cilantro.",
    "Butterfly Kiss|$18|Spicy crabmeat and avocado wrapped in salmon with ponzu and hot sauce.",
    "Yuzu Kanpachi|$20|Kanpachi, apple, yuzu tobiko, micro cilantro, sanbaizu, and yuzu oil.",
    "Asian Mango Seafood Ceviche|$19|Tuna, salmon, hamachi, white fish, shrimp, masago, mango, yuzu, and sanbaizu.",
    "Tuna Tartar|$18|Fresh tuna with lemon salt, scallions, sesame, truffle oil, yuzu, and ponzu.",
    "Suzuki Ceviche|$20|Suzuki, avocado, yuzu tobiko, tomato, shallot, radish, micro cilantro, arare, and sanbaizu.",
    "Madai Carpaccio|$22|Madai, yuzu tobiko, shallot, lemon zest, micro cilantro, ponzu, yuzu oil, and sanbaizu.",
    "Crispy Rice Bites (Tuna or Salmon)|$18|Crispy rice with spicy tuna or salmon, avocado, micro cilantro, eel sauce, and spicy mayo.",
    "Smoked Hamachi Carpaccio|$20|Smoked yellowtail, serrano, cilantro, and Kame signature sauce.",
    "Chirasi|$27|Chef's choice sashimi over seasoned sushi rice; served with soup.",
    "Hawaiian Poke|$22|Tuna, avocado, vegetables, cucumber, seaweed salad, masago, and furikake over sushi rice.",
    "Hwe Dupbap (Korean Sashimi Rice Bowl)|$24|Mixed sashimi over rice with vegetables and Korean spicy gochujang sauce.",
    "Kame Tower (Tuna or Salmon)|$19|Tuna or salmon over sushi rice with avocado and crabmeat, eel sauce, spicy mayo, and wasabi sauce.",
    "Flame Kissed Salmon|$16|Salmon sashimi strips with soy mustard and Kame signature sauce.",
    "Flame Tuna Tataki|$18|Flash-seared tuna cubes with soy mustard and Kame signature sauce."
  ]) },
  "Sushi & Sashimi ( Sushi 1PC / Sashimi 3PCS )": { items: menuItems([
    "O-Toro|$10 / $28|Fatty tuna belly.", "Chu Toro|$8 / $23|Medium fatty tuna belly.", "Akami|$5 / $14|Tuna loin.",
    "Sake|$5 / $14|Salmon.", "Sake Toro|$5 / $14|Salmon belly.", "Inari|$4 / —|Bean curd.",
    "Hirame|$6 / $17|Flounder.", "Torched Sake Toro|$6 / $17|Torched salmon belly.",
    "Hamachi|$5 / $14|Yellowtail.", "Hamachi Toro|$5 / $14|Yellowtail belly.",
    "Zuwaigani|$5 / $14|Snow crab.", "Tako|$4 / $11|Octopus.", "Saba|$4 / $11|Norwegian mackerel.",
    "Smoked Sake|$5 / $14|Smoked salmon.", "Ama Ebi|$8 / $23|Sweet shrimp.", "Tamago Yaki|$3 / $8|Egg custard.",
    "A5 Miyazaki|$11 / —|A5 Wagyu.", "Torched Scallop + Hokkaido Uni|$10 / $28|Scallop and sea urchin.",
    "Torched Hotate + Yuzu Salt|$7 / $20|Torched scallop with yuzu salt.", "Madai|$5 / $14|Sea bream.",
    "Kanpachi|$5 / $14|Amberjack.", "Ebi|$4 / $11|Black tiger shrimp.", "Unagi|$4 / $11|Freshwater eel.",
    "Kinmedai|$7 / $20|Golden eye snapper.", "Anago|$5 / $14|Saltwater eel.", "Hotate|$6 / $17|Scallop.",
    "Hokkaido Uni|$8 / $23|Sea urchin.", "Tobiko|$3 / $8|Flying fish roe.", "Mongo Ika|$4 / $12|Cuttlefish.",
    "Shima Aji|$6 / $17|Striped jack mackerel.", "Ikura|$4 / $12|Salmon roe.",
    "Ama Ebi + Hokkaido Uni|$12 / —|Sweet shrimp and sea urchin.", "Shima Suzuki|$5 / $14|Sea bass.",
    "Black Cod|$6 / $17|Bureiku kodo.", "Hokkigai|$4 / $11|Surf clam."
  ]) },
  "Moriawase & Chef's Trust Me": { sections: [
    section("Moriawase — Chef Choice Sushi", ["Classic (6 pcs)|$26", "Kame Premium (8 pcs)|$38"]),
    section("Chef Choice Sashimi", ["A (8 pcs, 4 kinds)|$32", "B (12 pcs, 4 kinds)|$48", "C (20 pcs, 4 kinds)|$80"]),
    section("Chef's Trust Me", ["Chef's Trust Me|$49|Salad and miso, salmon sashimi, salmon sushi, bluefin tuna sushi, salmon belly, kanpachi, yellowtail, sea bass, shimaaji, and shrimp sushi, plus spicy tuna and real crab hand rolls."]),
    section("The Kame Trust Me", ["The Kame Trust Me|$59|Salad and miso, tuna and salmon sashimi, bluefin tuna, chutoro, salmon, salmon belly, yellowtail, kanpachi, sea bass, shimaaji, hirame, and shrimp sushi, plus spicy tuna and real crab hand rolls."])
  ] },
  "Special Roll": { items: menuItems([
    "Kame Roll|$22|Soft-shell crab tempura, cucumber, crabmeat, and avocado, topped with tuna, baked spicy crab and scallop, fried potatoes, eel sauce, and spicy mayo.",
    "Sexy Maguro Roll|$20|Spicy crab, cucumber, and avocado topped with spicy tuna and fresh tuna, micro cilantro, spicy mayo, and spicy ponzu.",
    "Bluefin Lover Roll|$22|Assorted fish with masago, green onion, cucumber, and micro cilantro, topped with bluefin tuna, spicy ponzu, and goat cheese.",
    "Rainbow Roll|$17|Crabmeat, cucumber, and avocado topped with assorted fresh fish and ponzu.",
    "Boy Friend Roll|$18|Shrimp tempura, cream cheese, and avocado topped with crabmeat, crunch, spicy mayo, and eel sauce.",
    "Wagyu Surf and Turf Roll|$21|Spicy crab, masago, cooked shrimp, cucumber, and seared wagyu with micro cilantro and spicy ponzu.",
    "Shrimp Lover Roll|$18|Shrimp tempura and spicy crab topped with avocado, cooked shrimp, eel sauce, and spicy mayo.",
    "Salmon Fire Roll|$18|Spicy salmon, cucumber, asparagus, seared salmon, micro cilantro, ponzu, and wasabi mayo.",
    "Paradise Roll|$20|Spicy tuna, spicy crab, avocado, shrimp tempura, salmon, lemon, ponzu, and wasabi mayo.",
    "Moonlight Roll|$19|Crabmeat, cream cheese, and avocado topped with yellowtail, serrano, spicy mayo, Kame sauce, sriracha, and furikake.",
    "Mango Akami Roll|$20|Spicy tuna, cucumber, and avocado topped with tuna tataki, mango salsa, micro cilantro, and Kame sauce.",
    "Temptation Roll|$18|Shrimp tempura, crabmeat, cream cheese, and avocado topped with crab stick, fried potato, spicy mayo, and eel sauce.",
    "Lobster Roll|$26|Real crab, cucumber, and avocado topped with lobster tempura, spicy mayo, eel sauce, and shichimi.",
    "Truffle Toro Roll|$26|Spicy tuna, cucumber, and toro with green onion, kizami wasabi, and Kame sauce.",
    "PGA Dragon Roll|$20|Shrimp tempura, asparagus, crabmeat, and avocado topped with eel, spicy crab, eel sauce, spicy mayo, and shichimi.",
    "Angry Wife Roll|$17|Yellowtail, avocado, yuzu tobiko, micro cilantro, jalapeño, and spicy ponzu.",
    "Mango Tango Roll|$18|Salmon, avocado, jalapeño, asparagus, and smelt roe, topped with mango, spicy mayo, mango sauce, and sriracha.",
    "Alaskan Roll|$17|Spicy crab and cucumber topped with salmon, avocado, tobiko, and ponzu.",
    "Monster Roll|$21|Spicy tuna, spicy crab, and avocado topped with deep-fried crawfish and baby shrimp, green onion, masago, eel sauce, and spicy mayo.",
    "Crispy Scallop Roll|$18|Crabmeat, cucumber, and avocado topped with deep-fried scallops, crunch, masago, and eel sauce.",
    "Kame Crispy Salmon Roll|$18|Crabmeat, cucumber, and avocado topped with salmon tempura, green onion, masago, and eel sauce."
  ]) },
  "Korean & Japanese Cuisine": { items: menuItems([
    "Bulgogi|$30|Thinly sliced ribeye marinated Korean-style with onion and cabbage, served with steamed rice.",
    "Chicken Teriyaki|$23|Grilled chicken with onion and cabbage, served with steamed rice.",
    "Hot Stone Bowl|$15|Vegetables and rice topped with fried egg and Korean spicy sauce. Add chicken 5, beef 7, spicy pork 6, shrimp 8, or tofu 5.",
    "Spicy Pork Bulgogi|$27|Thinly sliced pork in Korean spicy sauce with onion and cabbage, served with rice.",
    "BBQ Short Ribs (Kalbi)|$36|Korean-style grilled beef short ribs with onion and cabbage, served with rice.",
    "Kimchi Fried Rice|$14|Kimchi, vegetables, fried egg, and melted cheese. Add chicken 5, beef 6, shrimp 8, or tofu 5.",
    "Fried Rice|$11|Fresh vegetables and egg. Add chicken 5, beef 6, shrimp 8, or tofu 5.",
    "Tonkatsu (Pork) / Chicken Katsu|$17|Crispy cutlet with rice, shredded cabbage, and tonkatsu sauce.",
    "Pork Cutlet Curry Rice / Chicken Cutlet Curry Rice|$19|Crispy pork or chicken cutlet with steamed rice and Japanese curry.",
    "Korean Spicy Chicken|$19|Crispy chicken in Korean spicy sauce with cabbage and crushed nuts, served with rice."
  ]) },
  "Kids Menu": { sections: [section("Ages 12 & under", [
    "Chicken Teriyaki Don|$13|Rice bowl with chicken teriyaki and sautéed seasonal vegetables.",
    "Kara-A-GE Don|$13|Rice bowl with chicken kara-a-ge and sautéed seasonal vegetables."
  ])] },
  "Lunch Special": { sections: [section("Mon–Fri, 11 AM–3 PM", [
    "Sushi Bento|$17|5 pieces chef's choice sushi.", "Sashimi Bento|$20|6 pieces chef's choice sashimi.",
    "Sushi & Sashimi Bento|$24|5 pieces chef's choice sushi and 4 pieces sashimi.",
    "Unagi Bento|$17|5 pieces eel.", "Salmon Teriyaki Bento|$19|Grilled salmon with teriyaki sauce and fresh vegetables.",
    "Saba (Grilled Mackerel) Bento|$18|Grilled mackerel with house ponzu and fresh vegetables.",
    "Chicken Teriyaki Bento (Spicy +1)|$16|Grilled chicken with teriyaki sauce and fresh vegetables.",
    "BBQ Short Ribs Bento|$23|Marinated short rib grilled with Korean BBQ sauce.",
    "Bulgogi Bento|$18|Thinly sliced ribeye beef in Korean-style marinade.",
    "Spicy Pork Bulgogi Bento|$17|Thinly sliced pork in savory spicy Korean-style marinade.",
    "Tonkatsu Bento|$16|Crispy pork cutlet with tonkatsu sauce.",
    "Chicken Katsu Bento|$16|Crispy chicken cutlet with katsu sauce."
  ], "Served with miso, California roll (4 pcs), fried dumplings (2 pcs), steamed rice, and salad with ginger dressing. Fried rice substitute +3.")] },
  "Happy Hour": { sections: [
    section("Mon–Sun, 3 PM–6 PM · Dine-in only", [
      "Soju|$9", "Highball|$9", "Gekkeikan Hot Sake (S/L)|$3 / $5",
      "House Wine (Cabernet / Chardonnay)|$4", "Draft & Bottled Beer|$2 off",
      "Select Craft Cocktails|$9|Lychee Cloud, Pink Tokyo, Vanilla Sky, Lemon Glow, Midnight Olive, or Yuzu Margarita."
    ]),
    section("Happy Hour Regular Rolls", ["Regular Rolls|$2 off"]),
    section("Happy Hour Small Bites", [
      "Edamame|$4", "Spicy Garlic Edamame|$6", "Horenso Gomae|$4", "Egg Roll (Pork, Veggie) (2 pc)|$5",
      "Shishito Peppers|$7", "Brussel Sprout|$7", "Takoyaki|$8", "Kara-A-GE Chicken|$8",
      "Crab Rangoon|$8", "Shrimp Tempura (5 pc)|$9"
    ])
  ] },
  "Beverages & Bar": { sections: [
    section("Soft Drinks & Non-Alcoholic", [
      "Coke, Diet Coke, Coke Zero, Sprite, Dr Pepper, Dr Pepper Zero, Ginger Ale, Lemonade|$3.50",
      "Ramune (Strawberry, Original, Lychee)|$5", "Green Tea (Hot / Cold)|$5", "Matcha Latte Salted Cream|$8",
      "Apple Juice, Orange Juice, Milk|$4", "Red Bull|$4", "Iced Tea (Unsweet / Sweet)|$3.50",
      "San Pellegrino Sparkling Water (500 ml)|$6", "Shirley Temple|$5", "Acqua Panna Still Water (750 ml)|$6", "Strawberry Lemonade|$5"
    ]),
    section("Sake", [
      "Hot Sake (S/L)|$6 / $9", "Premium Sake Flight (3 selections, 2 oz each)|$26",
      "Dewazakura ‘Oka’ Ginjo (300 ml)|$18", "Kubota ‘Senju’ (5 oz / 300 ml)|$17 / $32",
      "Shimizu No Mai ‘Pure Snow’ Nigori (300 ml)|$25", "Ozeki Nigori (375 ml)|$19", "Hana Sake Lychee or Apple (375 ml)|$20",
      "Yuki Nigori White Peach (375 ml)|$20", "Shimizu No Mai ‘Pure Dawn’ (300 ml)|$25",
      "Heaven Sake Azur Katsuyama (5 oz / 720 ml)|$15 / $70", "Hakutsuru Superior Junmai Ginjo (300 ml)|$23",
      "Suigei Tokubetsu Drunken Whale (300 ml)|$24", "Dassai 45 Junmai Daiginjo (300 ml)|$30",
      "Dassai 23 Junmai Daiginjo (300 ml)|$68", "Wakatake ‘Demon Slayer’ (5 oz / 300 ml)|$18 / $34", "Kubota ‘Manjyu’ (300 ml)|$60"
    ]),
    section("Beer", [
      "Sapporo Premium (Draft)|$7", "Asahi Super Dry (Draft)|$7", "Kirin Ichiban (Draft)|$7", "Manhattan IPA (Draft)|$7", "Michelob Ultra (Draft)|$6", "Miller Lite (Draft)|$6",
      "Sapporo Black (22 oz)|$13", "Sapporo Premium (Bottle)|$6", "Kirin Light|$6", "Asahi Super Dry (Bottle)|$6",
      "Michelob Ultra (Bottle)|$5", "Modelo|$5", "Miller Lite (Bottle)|$5", "Topo Chico Strawberry Hard Seltzer|$5", "Heineken 0.0 (Non-alcoholic)|$5"
    ]),
    section("Cocktails & Highballs", [
      "Aperol Yuzu Spritz|$13", "Lychee Cloud|$13", "Pink Tokyo|$13", "Vanilla Sky|$13", "Yuzu Margarita|$14",
      "Spicy Yuzu Margarita|$15", "Lemon Glow|$13", "Blueberry Mule|$13", "Kame’s Old Fashioned|$14", "Pear & Lychee Sake-tini|$15",
      "Matcha Mojito|$13", "Midnight Olive|$13", "Hendrick’s Garden Gimlet|$14", "Raspberry Blush|$14", "Kame Sunset|$14",
      "Classic Japanese Highball|$13", "Yuzu Highball|$13", "Earl Grey Highball|$13", "Hibiscus Highball|$13", "Matcha Highball Salted Cream|$14"
    ]),
    section("Mocktails", ["Peach Earl Grey Blossom|$9", "Matcha Yuzu Lemonade|$8", "Blueberry Smash|$9"]),
    section("Spirits", [
      "Suntory Toki|$12", "Hibiki Harmony|$23", "Nikka Coffey Grain|$16", "Nikka Coffey Malt|$20", "Yamazaki 12YR|$32", "Balvenie 14YR Caribbean Cask|$20", "Buffalo Trace Bourbon|$12", "Eagle Rare|$16", "Jack Daniel’s Black|$9", "Jameson|$9", "Knob Creek|$14", "Macallan 12YR|$21", "Maker’s Mark|$12", "Woodford Reserve|$15",
      "Chamisul Soju (Fresh / Original)|$15", "Flavored Soju (Peach, Strawberry, Grapefruit, Green Grape, Apple)|$15",
      "Hendrick’s Gin|$13", "Suntory Roku Gin|$13", "Bacardi Superior Rum|$9", "Hennessy VS Cognac|$12",
      "Don Julio 1942|$30", "Don Julio Blanco|$15", "Casamigos Blanco|$16", "Clase Azul Reposado|$40",
      "Deep Eddy Lemon Vodka|$9", "Grey Goose Vodka|$13", "Suntory Haku Vodka|$13", "Tito’s Vodka|$9"
    ]),
    section("Wine", [
      "DAOU Cabernet Sauvignon (Paso Robles, CA)|$14 / $52", "Text Book Cabernet Sauvignon (Napa Valley, CA)|$16 / $65", "Austin Hope Cabernet Sauvignon (Paso Robles, CA)|$18 / $90", "Caymus Cabernet Sauvignon (Napa Valley, CA)|$120", "Silver Oak Cabernet Sauvignon (Alexander Valley, CA)|$140", "The Prisoner Red Blend (CA)|$55", "Meiomi Pinot Noir (Coastal, CA)|$12 / $45", "Belle Glos Pinot Noir (Santa Maria Valley, CA)|$60", "Catena Malbec (Mendoza, Argentina)|$14 / $52", "Duckhorn Vineyards Merlot (Napa Valley, CA)|$85",
      "Barone Fini Pinot Grigio (Valdadige, Italy)|$11 / $42", "Santa Margherita Pinot Grigio (Alto Adige, Italy)|$15 / $55", "La Crema Chardonnay (Sonoma Coast, CA)|$13 / $48", "Kim Crawford Sauvignon Blanc (Marlborough, New Zealand)|$13 / $48", "Cloudy Bay Sauvignon Blanc (Marlborough, New Zealand)|$15 / $55", "Rombauer Vineyards Chardonnay (Carneros, CA)|$16 / $65", "Cakebread Chardonnay (Napa Valley, CA)|$85",
      "Whispering Angel Rosé (Provence, France)|$14 / $52", "La Marca Prosecco (Veneto, Italy)|$11 / $42", "Moët & Chandon Imperial Brut (750 ml)|$98", "Veuve Clicquot Yellow Label Brut (750 ml)|$98", "Dom Pérignon (750 ml)|$350"
    ])
  ] }
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
        img[src="/images/kame_logo.jpg"] {
          width: 6rem;
          height: 6rem;
          object-fit: contain;
        }
        @media (min-width: 768px) {
          img[src="/images/kame_logo.jpg"] {
            width: 8rem;
            height: 8rem;
          }
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
    "Korean & Japanese Cuisine",
    "Kids Menu",
    "Lunch Special",
    "Happy Hour",
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
  const images = [
    SUSHI_PLATTER,
    SUSHI_TOWER,
    SASHIMI_PLATE,
    INTERIOR_DINING,
    SAKE_COCKTAILS,
    FOOD_7,
    FOOD_8,
    FOOD_9,
    HERO_IMG,
  ];

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

          {/* Desktop Map */}
          <div
            className="hidden md:block rounded-lg overflow-hidden"
            style={{
              border: "1px solid oklch(1 0 0 / 10%)",
              height: "400px",
            }}
          >
            <iframe
              src="https://www.google.com/maps?q=5251+Panther+Creek+Pkwy+400+Frisco+TX+75033&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
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
