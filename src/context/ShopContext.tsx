import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductCategory, CurrencyCode, CurrencyConfig, CheckoutForm, Order } from '../types';
import { PRODUCTS } from '../data/products';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  FCFA: {
    code: 'FCFA',
    symbol: 'FCFA',
    rateFromFCFA: 1,
    format: (amt) => `${Math.round(amt).toLocaleString('fr-FR')} FCFA`
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    rateFromFCFA: 0.25, // approx conversion
    format: (amt) => `¥${Math.round(amt * 0.25).toLocaleString('ja-JP')}`
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rateFromFCFA: 0.00165,
    format: (amt) => `$${(amt * 0.00165).toFixed(2)}`
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rateFromFCFA: 0.00152,
    format: (amt) => `€${(amt * 0.00152).toFixed(2)}`
  }
};

interface ShopContextType {
  products: Product[];
  addProduct: (product: Partial<Product>) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  cart: CartItem[];
  wishlist: string[];
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInFCFA: number) => string;
  addToCart: (product: Product, quantity?: number, selectedVariants?: Record<string, string>, e?: React.MouseEvent) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Navigation & Modals
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  isModeratorOpen: boolean;
  setIsModeratorOpen: (open: boolean) => void;

  // Search & Filtering
  selectedCategoryFilter: ProductCategory | 'all';
  setSelectedCategoryFilter: (cat: ProductCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Theme state: light (default) / dark
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Checkout & Orders
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (formData: CheckoutForm) => Order;
  resetCurrentOrder: () => void;

  // Flying petal micro-interaction
  flyingPetalTarget: { x: number; y: number } | null;
  setFlyingPetalTarget: (target: { x: number; y: number } | null) => void;
  activeFlyingPetals: Array<{ id: number; startX: number; startY: number }>;
  cartIconRef: React.RefObject<HTMLButtonElement | null>;
  cartBouncing: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('nighongo_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validCategories: ProductCategory[] = ['anime', 'manga', 'cosplay', 'accessories'];
          const cleaned = parsed
            .map((p: any) => {
              if (p.category === 'clothing') return { ...p, category: 'cosplay' };
              return p;
            })
            .filter((p: any) => validCategories.includes(p.category));

          if (cleaned.length > 0 && cleaned.some((p: Product) => p.category === 'cosplay')) {
            const list = cleaned.map((p: Product) => {
              const defaultItem = PRODUCTS.find((d) => d.id === p.id);
              if (defaultItem && (!p.images || p.images.length < 4)) {
                return { ...p, images: defaultItem.images };
              }
              return p;
            });
            PRODUCTS.forEach((dp) => {
              if (!list.some((item: Product) => item.id === dp.id)) {
                list.push(dp);
              }
            });
            return list;
          }
        }
      }
    } catch {
      // ignore
    }
    return PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nighongo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nighongo_wishlist');
      return saved ? JSON.parse(saved) : ['prod-002', 'prod-007'];
    } catch {
      return ['prod-002', 'prod-007'];
    }
  });

  const [currency, setCurrency] = useState<CurrencyCode>('FCFA');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isModeratorOpen, setIsModeratorOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Theme: default to 'light' as requested by user
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Animation states
  const [flyingPetalTarget, setFlyingPetalTarget] = useState<{ x: number; y: number } | null>(null);
  const [activeFlyingPetals, setActiveFlyingPetals] = useState<Array<{ id: number; startX: number; startY: number }>>([]);
  const cartIconRef = React.useRef<HTMLButtonElement | null>(null);
  const [cartBouncing, setCartBouncing] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('nighongo_products', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('nighongo_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nighongo_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const formatPrice = (amountInFCFA: number) => {
    const config = CURRENCIES[currency];
    return config.format(amountInFCFA);
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedVariants: Record<string, string> = {},
    e?: React.MouseEvent
  ) => {
    const defaultVariants: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach((v) => {
        defaultVariants[v.id] = selectedVariants[v.id] || v.options[0];
      });
    }

    const lineId = `${product.id}-${Object.values(defaultVariants).join('-') || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === lineId);
      if (existing) {
        return prev.map((item) =>
          item.id === lineId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: lineId,
          product,
          quantity,
          selectedVariants: defaultVariants,
          addedAt: Date.now()
        }
      ];
    });

    // Trigger subtle petal flight to cart
    if (e && e.clientX && e.clientY) {
      const petalId = Date.now() + Math.random();
      setActiveFlyingPetals((p) => [...p, { id: petalId, startX: e.clientX, startY: e.clientY }]);
      setTimeout(() => {
        setActiveFlyingPetals((p) => p.filter((item) => item.id !== petalId));
      }, 1000);
    }

    // Trigger cart badge bounce
    setCartBouncing(true);
    setTimeout(() => setCartBouncing(false), 600);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const placeOrder = (formData: CheckoutForm): Order => {
    const shippingCost = 0;
    const discount = cartSubtotal >= 50000 ? 5000 : 0;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: `NGS-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('fr-FR', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      items: [...cart],
      customer: formData,
      subtotal: cartSubtotal,
      shippingCost,
      discount,
      total: cartSubtotal + shippingCost - discount,
      status: 'confirmed'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const addProduct = (newProd: Partial<Product>): Product => {
    const id = newProd.id || `prod-${Date.now()}`;
    const slug = newProd.slug || (newProd.name ? newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `item-${Date.now()}`);
    const product: Product = {
      id,
      name: newProd.name || 'Nouvelle Création Otaku',
      japaneseName: newProd.japaneseName || '新着商品',
      slug,
      description: newProd.description || 'Pièce exclusive sélectionnée pour notre catalogue Nighongoshop.',
      detailedStory: newProd.detailedStory || '',
      price: Number(newProd.price) || 15000,
      originalPrice: newProd.originalPrice ? Number(newProd.originalPrice) : undefined,
      images: newProd.images && newProd.images.length > 0
        ? newProd.images
        : ['https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80'],
      category: newProd.category || 'anime',
      stock: typeof newProd.stock === 'number' ? newProd.stock : 12,
      variants: newProd.variants || [
        { id: 'v-standard', name: 'Édition', type: 'edition', options: ['Standard'] }
      ],
      rating: newProd.rating || 5.0,
      reviewCount: newProd.reviewCount || 1,
      tags: newProd.tags && newProd.tags.length > 0 ? newProd.tags : ['Nouveauté', 'Otaku'],
      isNew: newProd.isNew !== undefined ? newProd.isNew : true,
      isLimited: newProd.isLimited || false,
      isPopular: newProd.isPopular || false,
      dropBatch: newProd.dropBatch || 'Drop Récent 2026',
      specs: newProd.specs || [
        { label: 'Origine', value: 'Tokyo, Japon' },
        { label: 'Authenticité', value: '100% Officiel / Certifié' }
      ]
    };

    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, ...updatedFields };
        }
        return p;
      })
    );

    // Also update in cart if present
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === id) {
          return {
            ...item,
            product: { ...item.product, ...updatedFields }
          };
        }
        return item;
      })
    );

    // Also update selected product for detail modal if currently open
    setSelectedProductForDetail((prev) => {
      if (prev && prev.id === id) {
        return { ...prev, ...updatedFields };
      }
      return prev;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // Clean from cart
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    // Clean from wishlist
    setWishlist((prev) => prev.filter((wId) => wId !== id));
    // Close detail modal if currently viewing this product
    setSelectedProductForDetail((prev) => (prev && prev.id === id ? null : prev));
  };

  const resetProductsToDefault = () => {
    setProducts(PRODUCTS);
    try {
      localStorage.removeItem('nighongo_products');
    } catch {
      // ignore
    }
  };

  const resetCurrentOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        cart,
        wishlist,
        currency,
        setCurrency,
        formatPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        toggleWishlist,
        isInWishlist,
        selectedProductForDetail,
        setSelectedProductForDetail,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAboutOpen,
        setIsAboutOpen,
        isModeratorOpen,
        setIsModeratorOpen,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        theme,
        setTheme,
        toggleTheme,
        orders,
        currentOrder,
        placeOrder,
        resetCurrentOrder,
        flyingPetalTarget,
        setFlyingPetalTarget,
        activeFlyingPetals,
        cartIconRef,
        cartBouncing
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
