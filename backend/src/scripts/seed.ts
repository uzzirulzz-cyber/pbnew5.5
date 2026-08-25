import { PrismaClient, UserRole, UserStatus, DeliveryType, LicenseType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create Super Admin
  const adminPassword = await bcrypt.hash("admin123", 12);
  const superadmin = await prisma.user.upsert({
    where: { email: "superadmin@playbeat.digital" },
    update: {},
    create: {
      email: "superadmin@playbeat.digital",
      password: adminPassword,
      name: "Super Admin",
      role: UserRole.SUPERADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      referralCode: "SUPERADMIN",
    },
  });
  console.log("✅ Super Admin created:", superadmin.email);

  // Create Categories
  const categories = [
    { name: "Gaming", slug: "gaming", description: "Game keys, in-game currency, subscriptions", color: "#8B5CF6", icon: "Gamepad2" },
    { name: "Software", slug: "software", description: "OS, Office, Antivirus, VPN, Design Tools", color: "#06B6D4", icon: "Monitor" },
    { name: "Streaming", slug: "streaming", description: "Netflix, Disney+, Spotify, YouTube Premium", color: "#EF4444", icon: "Wifi" },
    { name: "AI Services", slug: "ai-services", description: "ChatGPT, Claude, Gemini, Midjourney", color: "#10B981", icon: "Bot" },
    { name: "IPTV", slug: "iptv", description: "Sports, Movies, Live TV, Documentaries", color: "#3B82F6", icon: "Tv" },
    { name: "Gift Cards", slug: "gift-cards", description: "Steam, Google Play, Apple, Xbox, PlayStation", color: "#F59E0B", icon: "Gift" },
    { name: "Digital Marketing", slug: "digital-marketing", description: "SEO, Web Design, Hosting, Social Media", color: "#F97316", icon: "TrendingUp" },
    { name: "Cloud & Servers", slug: "cloud-servers", description: "VPS, Dedicated, CDN, Storage", color: "#6366F1", icon: "Server" },
    { name: "Education", slug: "education", description: "Courses, Templates, Ebooks, Tutorials", color: "#EC4899", icon: "GraduationCap" },
    { name: "Crypto", slug: "crypto", description: "Wallets, Exchange, Mining, Staking", color: "#EAB308", icon: "Bitcoin" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Categories seeded:", categories.length);

  // Create Subcategories
  const subcategories = [
    { name: "Steam", slug: "steam", categorySlug: "gaming" },
    { name: "Xbox", slug: "xbox", categorySlug: "gaming" },
    { name: "PlayStation", slug: "playstation", categorySlug: "gaming" },
    { name: "Windows", slug: "windows", categorySlug: "software" },
    { name: "Office", slug: "office", categorySlug: "software" },
    { name: "Antivirus", slug: "antivirus", categorySlug: "software" },
    { name: "Netflix", slug: "netflix", categorySlug: "streaming" },
    { name: "Disney+", slug: "disney-plus", categorySlug: "streaming" },
    { name: "Spotify", slug: "spotify", categorySlug: "streaming" },
    { name: "ChatGPT", slug: "chatgpt", categorySlug: "ai-services" },
    { name: "Sports", slug: "sports", categorySlug: "iptv" },
    { name: "Movies", slug: "movies", categorySlug: "iptv" },
  ];

  for (const sub of subcategories) {
    const category = await prisma.category.findUnique({ where: { slug: sub.categorySlug } });
    if (category) {
      await prisma.subcategory.upsert({
        where: { categoryId_slug: { categoryId: category.id, slug: sub.slug } },
        update: {},
        create: {
          name: sub.name,
          slug: sub.slug,
          categoryId: category.id,
        },
      });
    }
  }
  console.log("✅ Subcategories seeded:", subcategories.length);

  // Create Sample Products
  const gamingCategory = await prisma.category.findUnique({ where: { slug: "gaming" } });
  const streamingCategory = await prisma.category.findUnique({ where: { slug: "streaming" } });
  const softwareCategory = await prisma.category.findUnique({ where: { slug: "software" } });
  const aiCategory = await prisma.category.findUnique({ where: { slug: "ai-services" } });

  const products = [
    {
      name: "Netflix Premium 4K",
      slug: "netflix-premium-4k",
      description: "4K Ultra HD streaming with 4 simultaneous screens. Instant activation worldwide.",
      price: 15.99,
      originalPrice: 22.99,
      stock: 156,
      categoryId: streamingCategory?.id,
      deliveryType: DeliveryType.INSTANT,
      licenseType: LicenseType.SUBSCRIPTION,
      tags: ["streaming", "netflix", "4k"],
      features: ["4K Ultra HD", "4 Screens", "Dolby Atmos", "No Ads"],
      specifications: { duration: "1 Month", region: "Global", type: "Shared" },
      isTrending: true,
      isOnSale: true,
    },
    {
      name: "Windows 11 Pro License",
      slug: "windows-11-pro",
      description: "Genuine Windows 11 Pro activation key. Lifetime license. Instant delivery.",
      price: 29.99,
      originalPrice: 199.99,
      stock: 89,
      categoryId: softwareCategory?.id,
      deliveryType: DeliveryType.INSTANT,
      licenseType: LicenseType.LIFETIME,
      tags: ["windows", "os", "microsoft"],
      features: ["Lifetime", "Genuine Key", "Instant Delivery", "All Languages"],
      specifications: { version: "Pro", architecture: "64-bit", activation: "Online" },
      isTrending: true,
      isOnSale: true,
    },
    {
      name: "ChatGPT Plus Subscription",
      slug: "chatgpt-plus",
      description: "Full access to GPT-4, DALL-E, and advanced features. 1-month subscription.",
      price: 19.99,
      originalPrice: 25.99,
      stock: 234,
      categoryId: aiCategory?.id,
      deliveryType: DeliveryType.INSTANT,
      licenseType: LicenseType.SUBSCRIPTION,
      tags: ["ai", "chatgpt", "gpt-4"],
      features: ["GPT-4 Access", "DALL-E", "Plugins", "Priority Access"],
      specifications: { duration: "1 Month", model: "GPT-4", api: "Included" },
      isTrending: true,
      isOnSale: true,
    },
    {
      name: "Steam $50 Gift Card",
      slug: "steam-50-gift-card",
      description: "Instant digital delivery. Redeem on Steam for games, software, and hardware.",
      price: 45.99,
      originalPrice: 50.00,
      stock: 445,
      categoryId: gamingCategory?.id,
      deliveryType: DeliveryType.INSTANT,
      licenseType: LicenseType.ONE_TIME,
      tags: ["gaming", "steam", "gift-card"],
      features: ["Instant Delivery", "Global", "No Expiry", "Digital Code"],
      specifications: { value: "$50", region: "Global", format: "Digital" },
      isTrending: true,
      isOnSale: true,
    },
  ];

  for (const prod of products) {
    if (prod.categoryId) {
      await prisma.product.upsert({
        where: { slug: prod.slug },
        update: {},
        create: {
          ...prod,
          vendorId: superadmin.id,
          price: prod.price,
          originalPrice: prod.originalPrice,
        } as any,
      });
    }
  }
  console.log("✅ Products seeded:", products.length);

  // Create Coupons
  const coupons = [
    { code: "WELCOME20", description: "20% off your first order", discountType: "PERCENTAGE" as const, discountValue: 20, usageLimit: 1000 },
    { code: "FLASH50", description: "50% off flash sale items", discountType: "PERCENTAGE" as const, discountValue: 50, usageLimit: 500 },
    { code: "SAVE10", description: "$10 off orders over $50", discountType: "FIXED_AMOUNT" as const, discountValue: 10, minOrderAmount: 50 },
  ];

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: coupon,
    });
  }
  console.log("✅ Coupons seeded:", coupons.length);

  // Create CMS Pages
  const pages = [
    { slug: "about", title: "About Us", content: "PlayBeat Digital is the world's premier digital marketplace...", isPublished: true },
    { slug: "privacy", title: "Privacy Policy", content: "Your privacy is important to us...", isPublished: true },
    { slug: "terms", title: "Terms of Service", content: "By using PlayBeat Digital, you agree to...", isPublished: true },
    { slug: "refund", title: "Refund Policy", content: "We offer a 7-day money-back guarantee...", isPublished: true },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }
  console.log("✅ CMS Pages seeded:", pages.length);

  console.log("\n🎉 Database seed completed successfully!");
  console.log("\nDefault credentials:");
  console.log("  Email: superadmin@playbeat.digital");
  console.log("  Password: admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
