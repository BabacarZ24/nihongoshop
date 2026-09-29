export type ProductCategory = 
  | 'anime'
  | 'manga'
  | 'cosplay'
  | 'accessories';

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'edition' | 'color';
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  japaneseName?: string;
  slug: string;
  description: string;
  detailedStory?: string;
  price: number; // in FCFA base
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  stock: number;
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  tags: string[];
  isNew?: boolean;
  isLimited?: boolean;
  isPopular?: boolean;
  dropBatch?: string;
  specs?: { label: string; value: string }[];
}

export interface CartItem {
  id: string; // unique cart line id (productId + variant selection)
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
  addedAt: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export type CurrencyCode = 'FCFA' | 'JPY' | 'USD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromFCFA: number;
  format: (amount: number) => string;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  japanese: string;
  tagline: string;
  image: string;
  bannerImage?: string;
  itemCount: number;
  description?: string;
  loreHighlights?: string[];
  disciplineNumber?: string;
  disciplineKanji?: string;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  shippingMethod?: string;
  paymentMethod: 'whatsapp' | 'wave' | 'orange_money' | 'card';
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  customer: CheckoutForm;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped';
}
