export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  isFeatured?: boolean;
  isTrending?: boolean;
  isOnSale?: boolean;
  discount?: number;
  deliveryType: "instant" | "manual" | "subscription";
  licenseType?: "lifetime" | "subscription" | "one-time";
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  productCount: number;
  subcategories: Subcategory[];
  color: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "paid" | "processing" | "completed" | "cancelled" | "refunded";
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "customer" | "vendor" | "agent" | "admin" | "superadmin";
  wallet: Wallet;
  createdAt: string;
}

export interface Wallet {
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "purchase" | "refund" | "bonus" | "cashback";
  amount: number;
  description: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  status: "active" | "expired" | "cancelled" | "pending";
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

export interface Analytics {
  revenue: number;
  orders: number;
  customers: number;
  visitors: number;
  conversionRate: number;
  salesData: { date: string; revenue: number; orders: number }[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "order" | "system" | "promo" | "wallet" | "ticket";
  read: boolean;
  createdAt: string;
}
