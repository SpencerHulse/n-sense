const db = require("./connection");
const { User, Category, Product } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.create({
    username: "User1",
    email: "user1@testmail.com",
    password: "password12345",
  });

  await User.create({
    username: "User2",
    email: "user2@testmail.com",
    password: "password12345",
  });

  await User.create({
    username: "User3",
    email: "user3@testmail.com",
    password: "password12345",
  });

  await User.create({
    username: "admin",
    email: "admin@admin.com",
    password: "admin",
    admin: true,
  });

  console.log("users seeded");

  await Category.deleteMany();

  const categories = await Category.insertMany([
    { categoryName: "Candles" },
    { categoryName: "Incense" },
    { categoryName: "Essential Oils" },
    { categoryName: "Soaps" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Citrus Seagrass",
      description:
        "This soothing fragrance combines the light citrus scents of mandarin and grapefruit with sweet mint, cedarwood, and musk. ",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/citrus-seagrass.jpg",
      category: categories[0]._id,
    },
    {
      name: "Coffee Shop",
      description:
        " It smells like fresh brewed coffee, before the sugar, cream, hazelnut... It's not heavy.  Just a soft scent of morning brew",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      primaryImage: "https://nsense-images.s3.amazonaws.com/coffee-shop.jpg",
      category: categories[0]._id,
    },
    {
      name: "Cozy Cabin",
      description:
        "Cozy Cabin is a soy based candle that combines sweet tobacco and leather. One of our softer scents, Cozy Cabin is a warm yet masculine scent. Often referred to as a perfect mandle! When you light this candle a fire automatically starts, shoes come off and (faux) rugs appear out of nowhere.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      primaryImage: "https://nsense-images.s3.amazonaws.com/cozy-cabin.jpg",
      category: categories[0]._id,
    },
    {
      name: "Honey Vanilla",
      description:
        "Featuring floral notes of wildflower honey accented by coconut milk and vanilla, this fragrance is wonderfully sweet, rich and layered. Create a warm, welcoming atmosphere by adding one of these candles to any room in your home. Fragrance Notes: Top: Coconut Milk, Fruity.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      primaryImage: "https://nsense-images.s3.amazonaws.com/honey-vanilla.jpg",
      category: categories[0]._id,
    },
    {
      name: "Lavender",
      description:
        "Beyond its appealing aroma, lavender has been shown to help relieve insomnia, stress, and anxiety.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      primaryImage: "https://nsense-images.s3.amazonaws.com/lavender.jpg",
      category: categories[0]._id,
    },
    {
      name: "Lemon",
      description:
        "Offers both a clean lemon scent and just a touch of fresh green lemon leaves.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      primaryImage: "https://nsense-images.s3.amazonaws.com/lemon.jpg",
      category: categories[0]._id,
    },
    {
      name: "Orange Cassia",
      description:
        "Cassia essential oil is made from the leaves of a Chinese evergreen tree. It has a spicy, slightly woody scent that is similar to cinnamon. It smells delicious in fall or holiday blends with orange essential oil",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      primaryImage: "https://nsense-images.s3.amazonaws.com/orange-cassia.jpg",
      category: categories[0]._id,
    },
    {
      name: "Sugar Cookies",
      description:
        "Buttery caramel, cinnamon, maple and cream with a sugary vanilla and baked cookie note combines with white musk.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      primaryImage: "https://nsense-images.s3.amazonaws.com/sugar-cookies.jpg",
      category: categories[0]._id,
    },
    {
      name: "Apple Pie",
      description:
        "Delicious and impossible to resist, our just baked apple pie scent replicates the temptation of this forever favorite. All the classic ingredients are here – sweet apples, rich vanilla and warm cinnamon spice. A nod to tradition and the cozy comforts we can't live without",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      primaryImage: "https://nsense-images.s3.amazonaws.com/apple-pie.jpg",
      category: categories[0]._id,
    },
    {
      name: "Chocolate Brownie",
      description:
        "Our Chocolate Fudge Brownie candles are hand poured with a soft food grade paraffin wax blend for great scent throw.",
      details: [
        "Wow, a detail...",
        "Stop asking.",
        "Okay, it's a candle. You got me.",
      ],
      price: 8.99,
      stock: 20,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/chocolate-brownie.jpg",
      category: categories[0]._id,
    },
    {
      name: "Amber and Moss",
      description:
        "A weekend in the mountains, sun gleaming through the canopy. Sage, moss, and lavender. If you like Amber & Moss, we think you'd also like spicy Black Fig",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      primaryImage: "https://nsense-images.s3.amazonaws.com/amber-and-moss.jpg",
      category: categories[1]._id,
    },
    {
      name: "Black Fig",
      description:
        "Backyard fruit trees, something baking in the oven. A little spicy and just sweet enough. Notes of evergreen, mission fig, and spice.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      primaryImage: "https://nsense-images.s3.amazonaws.com/black-fig.jpg",
      category: categories[1]._id,
    },
    {
      name: "Patchouli Sweetgrass",
      description:
        "Patchouli is not at the forefront of this candle scent. Good for people who hate it, maybe bad for those who do. This is more of a creamy tobacco scent with grassy notes coming through as you burn it. It's a really gorgeous scent that I'm loving more with every burn.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/patchouli-sweetgrass.jpg",
      category: categories[1]._id,
    },
    {
      name: "Sandlewood and Rose",
      description:
        "Roses & Sandalwood perfume is blended with essential notes of roses, sandalwood, and a bit more: The floral scent of a fresh, classic, red rose, spicy, warm scent of cinnamon, the woodsy, earthy scent of Sandalwood, intoxicating, slightly sweet, dark, the musky-earthy aroma of Patchouli, church-like resinous and much more",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/sandlewood-and-rose.jpg",
      category: categories[1]._id,
    },
    {
      name: "Teakwood and Tobacco",
      description:
        "Some call it the boyfriend scent, we call it the O.G. Leather, teak, and orange. If you like Teakwood & Tobacco, we think you'd also like creamy Patchouli Sweetgrass or woodsy Moonrise.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/teakwood-and-tobacco.jpg",
      category: categories[1]._id,
    },
    {
      name: "Cedarwood Amber",
      description:
        "Cedarwood Amber - A fresh scent with a sensation of texture, warmth, and sensuality. Top notes of bergamot, lavender, and coriander. Bottom notes of sandalwood, cedarwood, amber and musk.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/cedarwood-amber.jpg",
      category: categories[1]._id,
    },
    {
      name: "White Sage",
      description:
        "Salvia apiana, the white sage, bee sage, or sacred sage is an evergreen perennial shrub that is native to the southwestern United States and northwestern Mexico, found mainly in the coastal sage scrub habitat of Southern California and Baja California, on the western edges of the Mojave and Sonoran deserts.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      primaryImage: "https://nsense-images.s3.amazonaws.com/white-sage.jpg",
      category: categories[1]._id,
    },
    {
      name: "Incubation Incense",
      description: "Hand Rolled Artisan Sticks",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/incubation-incense.jpg",
      category: categories[1]._id,
    },
    {
      name: "Abarghatti",
      description:
        "A traditional incense from India, the word is actually a compound of agar (as in the wood) and batti (meaning stick). These cored incense sticks are also sometimes made of aloeswood instead of agar and remain one of the most popular types of incense in their homeland.",
      details: [
        "It comes in packs of nine!",
        "Wow, a detail...",
        "Gasp! It smells amazing.",
      ],
      price: 6.99,
      stock: 100,
      primaryImage: "https://nsense-images.s3.amazonaws.com/abarghatti.jpg",
      category: categories[1]._id,
    },
    {
      name: "Citrus Fresh",
      description:
        "Citrus Fresh™ essential oil blend combines Orange, Grapefruit, Mandarin, Tangerine, Lemon, and Spearmint essential oils to cleanse the air with an uplifting and refreshing aroma when diffused. It contains antioxidants and has cleansing properties when taken internally.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      primaryImage: "https://nsense-images.s3.amazonaws.com/citrus-fresh.jpg",
      category: categories[2]._id,
    },
    {
      name: "Tea Tree",
      description: "Scent is herbaceous, and leathery with a green back note.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      primaryImage: "https://nsense-images.s3.amazonaws.com/tea-tree.jpg",
      category: categories[2]._id,
    },
    {
      name: "Australian Sandalwood",
      description:
        "Revered for centuries in India and other parts of the Far East, Sandalwood is a wonderfully calming oil which helps reduce nervous tension and agitated emotions. It is considered one of the premier oils for use in meditation by helping to quiet mental chatter. In skin applications, it may help reduce oiliness and blemishes. Sandalwood also can feel soothing and cooling to the skin when added to a carrier oil.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      primaryImage: "https://nsense-images.s3.amazonaws.com/sharp-thought.jpg",
      category: categories[2]._id,
    },
    {
      name: "Black Pepper",
      description:
        "Its spicy and warm aroma is the perfect addition to other essential oils. Adding Black Pepper with other essential oils enhances any blend with a touch of heat and spice, turning it into something beautifully complex. Using Black Pepper can help you stay alert and stimulate the senses. Black Pepper can also be therapeutic, helping ease pain of aching muscles as well as improve circulation. For those who are trying to quit smoking, this essential oil is useful for helping reduce cravings.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      primaryImage: "https://nsense-images.s3.amazonaws.com/citrus-fresh.jpg",
      category: categories[2]._id,
    },
    {
      name: "Cypress",
      description:
        "Cypress Essential Oil is the strong and distinctly aromatic essence obtained by steam distillation from the needles and leaves or wood and bark of select Cypress tree species. A botanical that sparked ancient imagination, Cypress is imbued with the longstanding cultural symbolism of spirituality and immortality.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      primaryImage: "https://nsense-images.s3.amazonaws.com/cypress.jpg",
      category: categories[2]._id,
    },
    {
      name: "Lemon Myrtle",
      description:
        "Lemon Myrtle essential oil has a bright, clean, citrus aroma that is uplifting and refreshing when diffused or applied topically.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      primaryImage: "https://nsense-images.s3.amazonaws.com/lemon-myrtle.jpg",
      category: categories[2]._id,
    },
    {
      name: "Orange",
      description:
        "Orange essential oil can be used for a variety of applications that range from lifting mood and reducing stress to adding a fresh, citrusy aroma to a room.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      primaryImage: "https://nsense-images.s3.amazonaws.com/orange.jpg",
      category: categories[2]._id,
    },
    {
      name: "Peppermint",
      description:
        "Peppermint essential oil can be extracted from the leaves of the peppermint plant and is used for a variety of purposes. It has a sharp odor that's cool and refreshing, and the taste is similar. You may be familiar with the coolness in your mouth after you consume something with a peppermint flavor.",
      details: ["Wow, a detail... and essential oil."],
      price: 15.99,
      stock: 50,
      primaryImage: "https://nsense-images.s3.amazonaws.com/peppermint.jpg",
      category: categories[2]._id,
    },
    {
      name: "Christmas Wish",
      description:
        "The most magical time of year deserves some special soaps. Inspired by Xmas trees, this soap is spicy with hints of cranberries, cinnamon and orange zest.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      primaryImage: "https://nsense-images.s3.amazonaws.com/christmas-wish.jpg",
      category: categories[3]._id,
    },
    {
      name: "Honeysuckle and Orange",
      description:
        "The fragrant zing of bright citrus meets the delicate sweetness of honeysuckle flowers. Real extracts of orange peel help cleanse and condition while moisture beads pop and shower skin with incredible softness.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/honeysuckle-and-orange.jpg",
      category: categories[3]._id,
    },
    {
      name: "Morning Dew",
      description:
        "Handcrafted soap that features a fresh and crisp aroma of bergamot, orange, hyacinth, lilies, lemon zest, and patchouli.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      primaryImage: "https://nsense-images.s3.amazonaws.com/morning-dew.jpg",
      category: categories[3]._id,
    },
    {
      name: "Peppermint and Eucalyptus",
      description:
        "Peppermint has a minty aroma while eucalyptus has a earthy aroma - combining the two oils produces a wonderful fresh scent. This is an excellent bar for using in the shower as eucalyptus oil helps support the respiratory system.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/peppermint-and-eucalyptus.jpg",
      category: categories[3]._id,
    },
    {
      name: "Tea Tree and Charcoal",
      description:
        "This is a deep-cleansing powerhouse and a mild exfoliator. Infused with tea tree essential oil. Excellent for acne prone & oily skin, works great as a facial soap too. Tea tree oil is known to combat acne, athlete's foot, eczema & psoriasis.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/tea-tree-and-charcoal.jpg",
      category: categories[3]._id,
    },
    {
      name: "Lavender Lemon",
      description:
        "Crafted to be fair, wholesome, and good for all, our scented bar soaps cleanse your body and restore your hope in community. Carefully crafted in small batches through one of our sister organizations, let our nourishing soap uplift your body and mind.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      primaryImage: "https://nsense-images.s3.amazonaws.com/lavender-lemon.jpg",
      category: categories[3]._id,
    },
    {
      name: "Clementine Dream",
      description:
        "This soap is a wonderful citrus arrangement including top notes of clementine, tangerine, orange, grapefruit, and lime. With middle notes of ginger, and lime blossoms, and a fresh base note of vanilla bean. This soap is a must have for anyone who loves a citrus scent.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/clementine-dream.jpg",
      category: categories[3]._id,
    },
    {
      name: "Manderin Mermaid",
      description:
        "This mermaid inspired soap will have you feeling like you are in a tropical paradise right in your shower. Manderin Mermaid begins with top notes of mandarin, Mexican lime, tangerine, and kumquat. Middle and base notes of watermelon. tart green apples, cantaloupe. and honeydew melon. This soap is a mos have for anyone that loves a very fruity scent.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/manderin-mermaid.jpg",
      category: categories[3]._id,
    },
    {
      name: "Hidden Fantasy",
      description:
        "This soaps scent has a very sensual scent with hints of fresh citrus and hints of wild cherry interwine with fresh notes to scent the floral heart of this soap fragrance. Tropical ylang ylang balance with sensual jasmine and hints of rose to form a rich floral accord which is surrounded with green leafy accents. Cashmere musk undertones are sweetened with vanilla amber to create a dramatic finish for this soap fragrance.",
      details: ["Wow, a detail...", "Stop asking.", "Soap."],
      price: 4.99,
      stock: 75,
      primaryImage:
        "https://nsense-images.s3.amazonaws.com/tea-tree-and-charcoal.jpg",
      category: categories[3]._id,
    },
  ]);

  console.log("products seeded");

  process.exit();
});
