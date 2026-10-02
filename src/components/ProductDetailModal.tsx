import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
  ArrowRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

const ANGLE_METAS = [
  { id: 0, name: 'Face', full: 'Angle 1 — Face (Vue principale)', kanji: '正面' },
  { id: 1, name: 'Profil', full: 'Angle 2 — Profil (Vue 3/4 & côté)', kanji: '側面' },
  { id: 2, name: 'Dos', full: 'Angle 3 — Dos (Vue arrière)', kanji: '背面' },
  { id: 3, name: 'Détail', full: 'Angle 4 — Détail (Zoom matière & finitions)', kanji: '詳細' }
];

export const ProductDetailModal: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    products
  } = useShop();

  const product = selectedProductForDetail;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
    setIsZoomed(false);
    setQuantity(1);
  }, [product?.id]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  // Initialize variants if needed
  const activeVariants = { ...selectedVariants };
  if (product.variants) {
    product.variants.forEach((v) => {
      if (!activeVariants[v.id]) {
        activeVariants[v.id] = v.options[0];
      }
    });
  }

  const handleVariantSelect = (variantId: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantId]: option }));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    addToCart(product, quantity, activeVariants, e);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in"
      onClick={() => setSelectedProductForDetail(null)}
    >
      <div
        id="product-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-white dark:bg-[#0F121A] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl my-auto text-slate-900 dark:text-[#FAF8F5] transition-colors duration-300"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForDetail(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100/90 dark:bg-black/60 hover:bg-[#D46382] hover:text-white dark:hover:bg-[#E88CA6] dark:hover:text-[#0B0D12] text-slate-700 dark:text-white/80 transition-all cursor-pointer backdrop-blur-md shadow-sm"
          aria-label="Fermer la fenêtre"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
          {/* Main Grid: Gallery on Left, Details on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-slate-200 dark:border-white/10">
            {/* LEFT: Product Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Quick 4 Angles Switch Tabs */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  {product.images.slice(0, 4).map((_, idx) => {
                    const meta = ANGLE_METAS[idx] || { name: `Vue ${idx + 1}`, kanji: '' };
                    const isActive = selectedImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedImageIndex(idx);
                          setIsZoomed(false);
                        }}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] shadow-sm'
                            : 'text-slate-600 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                        }`}
                      >
                        <span className="font-mono text-[11px] opacity-80">{idx + 1}.</span>
                        <span>{meta.name}</span>
                        {meta.kanji && (
                          <span className="text-[10px] font-jp opacity-60 hidden sm:inline">
                            {meta.kanji}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Main Visual Frame */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#161B26] border border-slate-200 dark:border-white/5 shadow-inner group">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={`${product.name} - ${ANGLE_METAS[selectedImageIndex]?.full || `Angle ${selectedImageIndex + 1}`}`}
                  className={`w-full h-full object-cover object-center transition-all duration-300 ${
                    isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  referrerPolicy="no-referrer"
                />

                {product.isLimited && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] text-xs font-bold tracking-wider uppercase shadow-md pointer-events-none">
                    限定 LIMITÉ
                  </span>
                )}

                {/* Angle descriptor & zoom badge */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-mono tracking-wider shadow-md border border-white/10 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E88CA6] animate-pulse" />
                    <span>
                      Angle {selectedImageIndex + 1}/{product.images.length} : {ANGLE_METAS[selectedImageIndex]?.name || `Vue ${selectedImageIndex + 1}`}
                    </span>
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-mono shadow-md hidden sm:inline">
                    {isZoomed ? 'Cliquez pour réduire' : 'Cliquez pour zoomer'}
                  </span>
                </div>

                {/* Left / Right Previous / Next Angle Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
                        setIsZoomed(false);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white dark:bg-black/80 dark:hover:bg-black text-slate-800 dark:text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
                      aria-label="Angle précédent"
                      title="Angle précédent"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
                        setIsZoomed(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white dark:bg-black/80 dark:hover:bg-black text-slate-800 dark:text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
                      aria-label="Angle suivant"
                      title="Angle suivant"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* 4 Angle Thumbnails Reel */}
              {product.images.length > 1 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-[#9CA3AF] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D46382] dark:text-[#E88CA6]" />
                      <span>Galerie 4 angles du produit</span>
                    </span>
                    <span className="text-[#D46382] dark:text-[#E88CA6] font-semibold text-[10px]">
                      Cliquer sur une photo pour changer d'angle
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2.5">
                    {product.images.slice(0, 4).map((img, idx) => {
                      const meta = ANGLE_METAS[idx] || { id: idx, name: `Vue ${idx + 1}`, full: `Angle ${idx + 1}`, kanji: '' };
                      const isCurrent = selectedImageIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedImageIndex(idx);
                            setIsZoomed(false);
                          }}
                          className={`group/thumb relative rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer flex flex-col aspect-[4/3] sm:aspect-square ${
                            isCurrent
                              ? 'border-[#D46382] dark:border-[#E88CA6] ring-2 ring-[#D46382]/30 dark:ring-[#E88CA6]/40 scale-[1.03] shadow-md'
                              : 'border-slate-200 dark:border-white/10 opacity-75 hover:opacity-100 hover:border-slate-300'
                          }`}
                          title={meta.full}
                        >
                          <img
                            src={img}
                            alt={`Vue angle ${idx + 1}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className={`absolute bottom-0 inset-x-0 py-1 text-center transition-colors ${
                            isCurrent
                              ? 'bg-slate-900/90 text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] font-bold'
                              : 'bg-black/75 text-white/90 group-hover/thumb:bg-black/90'
                          }`}>
                            <div className="text-[10px] font-mono leading-none">
                              {idx + 1}. {meta.name}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Product Information & Purchasing Controls (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Kanji Tag */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedProductForDetail(null);
                      navigate(`/category/${product.category}`);
                    }}
                    className="text-xs font-mono tracking-widest text-[#D46382] dark:text-[#E88CA6] uppercase hover:underline flex items-center gap-1 cursor-pointer"
                    title={`Voir tous les articles de l'univers ${product.category}`}
                  >
                    <span>{product.category}</span>
                    <span className="opacity-60">// VOIR L'UNIVERS DÉDIÉ →</span>
                  </button>
                  <div className="flex items-center gap-1.5 text-xs text-slate-800 dark:text-white/90">
                    <Star className="w-4 h-4 fill-[#D46382] dark:fill-[#E88CA6] text-[#D46382] dark:text-[#E88CA6]" />
                    <span className="font-bold">{product.rating.toFixed(1)}</span>
                    <span className="text-slate-500 dark:text-[#9CA3AF]">({product.reviewCount} avis)</span>
                  </div>
                </div>

                {/* Title & Japanese name */}
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#FAF8F5]">
                    {product.name}
                  </h1>
                  {product.japaneseName && (
                    <p className="text-sm font-jp text-[#D46382] dark:text-[#E88CA6] tracking-widest mt-1">
                      {product.japaneseName}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-bold font-mono text-slate-900 dark:text-[#FAF8F5]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base font-mono text-slate-400 dark:text-[#6B7280] line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Description & Detailed Story */}
                <div className="space-y-2 text-sm text-slate-600 dark:text-[#D1D5DB] font-light leading-relaxed">
                  <p>{product.description}</p>
                  {product.detailedStory && (
                    <p className="text-xs text-slate-500 dark:text-[#9CA3AF] border-l-2 border-[#D46382]/40 dark:border-[#E88CA6]/40 pl-3 italic">
                      &ldquo;{product.detailedStory}&rdquo;
                    </p>
                  )}
                </div>

                {/* Variants Selection */}
                {product.variants && product.variants.map((v) => (
                  <div key={v.id} className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-[#9CA3AF] font-medium">{v.name}:</span>
                      <span className="text-slate-900 dark:text-[#FAF8F5] font-semibold">{activeVariants[v.id]}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {v.options.map((opt) => {
                        const isSelected = activeVariants[v.id] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleVariantSelect(v.id, opt)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] font-bold shadow-md scale-105'
                                : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-[#D1D5DB] hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Quantity & Stock */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-[#9CA3AF] font-medium">Quantité</span>
                    <span className="text-[#D46382] dark:text-[#E88CA6] font-mono">
                      {product.stock > 0 ? `En stock (${product.stock} exemplaires)` : 'Épuisé'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 dark:text-[#FAF8F5] hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-mono text-sm font-semibold text-slate-900 dark:text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 dark:text-[#FAF8F5] hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        disabled={quantity >= product.stock}
                      >
                        +
                      </button>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isFavorited
                          ? 'bg-[#D46382] border-[#D46382] text-white dark:bg-[#E88CA6] dark:border-[#E88CA6] dark:text-[#0B0D12]'
                          : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10'
                      }`}
                      title={isFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Primary Add to Cart Button & WhatsApp Order */}
                <div className="pt-4 space-y-2">
                  <button
                    id="product-detail-add-to-cart"
                    onClick={handleAddToCart}
                    className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-[#D46382] text-white dark:bg-[#FAF8F5] dark:hover:bg-[#E88CA6] dark:text-[#0B0D12] text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95 group"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>AJOUTER AU PANIER • {formatPrice(product.price * quantity)}</span>
                  </button>

                  <a
                    href={`https://wa.me/221782468632?text=${encodeURIComponent(
                      `🌸 *COMMANDE RAPIDE WHATSAPP* 🌸\nJe souhaite commander cet article :\n• ${product.name} (${product.japaneseName || ''})\n• Prix : ${formatPrice(product.price * quantity)} (Quantité: ${quantity})\n${Object.entries(activeVariants).length > 0 ? `• Options : ${Object.values(activeVariants).join(' / ')}\n` : ''}\nMerci de me confirmer la livraison !`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>COMMANDER PAR WHATSAPP (+221 78 246 86 32)</span>
                  </a>

                  {addedToast && (
                    <div className="mt-2 text-center text-xs text-emerald-600 dark:text-[#10B981] font-medium flex items-center justify-center gap-1.5 animate-fade-in">
                      <Check className="w-4 h-4" /> Ajouté à votre panier sous la bienveillance du Sakura !
                    </div>
                  )}
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 dark:text-[#9CA3AF]">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6]" />
                  <span>Vol Express Tokyo</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6]" />
                  <span>100% Authentique</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6]" />
                  <span>Retours 30 Jours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Specifications Table */}
          {product.specs && (
            <div className="py-8 border-b border-slate-200 dark:border-white/10">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-[#FAF8F5] mb-4">
                CARACTÉRISTIQUES & ARTISANAT // 仕様
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {product.specs.map((spec, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 border border-slate-200/80 dark:border-white/5">
                    <span className="text-[11px] text-slate-500 dark:text-[#9CA3AF] block font-mono uppercase">
                      {spec.label}
                    </span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-[#FAF8F5] mt-0.5 block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products: YOU MAY ALSO LIKE */}
          {relatedProducts.length > 0 && (
            <div className="pt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-[#FAF8F5]">
                  VOUS AIMEREZ AUSSI // 関連商品
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
