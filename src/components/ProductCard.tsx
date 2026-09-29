import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProductForDetail
  } = useShop();

  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const isFavorited = isInWishlist(product.id);

  const angleNames = ['Face', 'Profil', 'Dos', 'Détail'];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, {}, e);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCardClick = () => {
    setSelectedProductForDetail(product);
  };

  // Safe image display based on active angle
  const currentImage = product.images[activeAngleIndex] || product.images[0];

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseLeave={() => setActiveAngleIndex(0)}
      className="group relative flex flex-col bg-white dark:bg-[#10131A] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/5 hover:border-[#D46382] dark:hover:border-[#E88CA6]/40 transition-all duration-500 hover:-translate-y-1.5 shadow-sm hover:shadow-xl dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-[#161A24]">
        <img
          src={currentImage}
          alt={`${product.name} - Angle ${activeAngleIndex + 1}`}
          className="h-full w-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Multi-angle indicator tag */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none group-hover:opacity-0 transition-opacity">
            <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[9px] font-mono tracking-wider shadow-sm flex items-center gap-1">
              <span>{product.images.length} angles</span>
            </span>
          </div>
        )}

        {/* Interactive 4-Angle Navigation Bars on Hover */}
        {product.images.length > 1 && (
          <div
            className="absolute bottom-2.5 inset-x-3 z-20 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            {product.images.slice(0, 4).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => setActiveAngleIndex(idx)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveAngleIndex(idx);
                }}
                className={`flex-1 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeAngleIndex === idx
                    ? 'bg-[#D46382] dark:bg-[#E88CA6] ring-1 ring-white/50 scale-y-125'
                    : 'bg-black/50 hover:bg-white/80 dark:bg-white/30 dark:hover:bg-white/70'
                }`}
                title={`Angle ${idx + 1} (${angleNames[idx] || `Angle ${idx + 1}`})`}
                aria-label={`Angle ${idx + 1} - ${angleNames[idx] || ''}`}
              />
            ))}
          </div>
        )}

        {/* Current Active Angle Floating Tag on Hover */}
        {product.images.length > 1 && (
          <div className="absolute top-12 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[#FAF8F5] text-[9px] font-mono tracking-wide shadow-sm border border-white/10">
              Angle {activeAngleIndex + 1}/4 : {angleNames[activeAngleIndex] || `Vue ${activeAngleIndex + 1}`}
            </span>
          </div>
        )}

        {/* Subtle vignette on top/bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-[#10131A] via-transparent to-black/20 dark:to-black/30 opacity-40 dark:opacity-60 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isLimited && (
            <span className="inline-flex items-center px-2.5 py-0.8 rounded-md bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] text-[10px] font-bold tracking-wider uppercase shadow-md">
              限定 LIMITÉ
            </span>
          )}
          {product.isNew && !product.isLimited && (
            <span className="inline-flex items-center px-2.5 py-0.8 rounded-md bg-slate-900 text-white dark:bg-[#FAF8F5] dark:text-[#0B0D12] text-[10px] font-bold tracking-wider uppercase shadow-md">
              新着 NOUVEAU
            </span>
          )}
          {product.isPopular && (
            <span className="inline-flex items-center px-2 py-0.8 rounded-md bg-white/90 dark:bg-[#1F2937]/90 backdrop-blur-md text-slate-800 dark:text-[#E5E7EB] text-[9px] font-semibold tracking-wider uppercase border border-slate-200 dark:border-white/10 shadow-xs">
              人気 POPULAIRE
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            isFavorited
              ? 'bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] shadow-[0_0_12px_#E88CA6]'
              : 'bg-white/80 dark:bg-black/40 text-slate-700 dark:text-[#FAF8F5] hover:bg-white dark:hover:bg-black/70 hover:text-[#D46382] dark:hover:text-[#F4A6BE] border border-slate-200/60 dark:border-transparent'
          }`}
          aria-label={isFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Stock / Batch hint */}
        {product.stock <= 5 && (
          <div className="absolute bottom-2 left-3 text-[10px] font-medium text-white bg-slate-900/80 dark:text-[#E88CA6] dark:bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
            Plus que {product.stock} en stock
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-slate-900/80 dark:bg-black/60 backdrop-blur-md text-xs text-white border border-white/20 flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5 text-[#E88CA6]" /> Aperçu rapide
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#9CA3AF] mb-1.5">
            <span className="uppercase tracking-widest text-[10px] font-mono text-[#D46382] dark:text-[#E88CA6]/90 font-medium">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-700 dark:text-white/80">
              <Star className="w-3 h-3 fill-[#D46382] text-[#D46382] dark:fill-[#E88CA6] dark:text-[#E88CA6]" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 dark:text-white/40">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-sm sm:text-base text-slate-900 dark:text-[#FAF8F5] line-clamp-1 group-hover:text-[#D46382] dark:group-hover:text-[#F4A6BE] transition-colors">
            {product.name}
          </h3>

          {/* Japanese Name subtitle if available */}
          {product.japaneseName && (
            <p className="text-[11px] font-jp text-slate-400 dark:text-[#9CA3AF]/60 tracking-wider mt-0.5 truncate">
              {product.japaneseName}
            </p>
          )}
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#FAF8F5] font-mono">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-slate-400 dark:text-[#6B7280] line-through -mt-1 font-mono">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          {/* Clean Add to Cart action */}
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            className="group/btn relative px-3 py-2 bg-slate-100 hover:bg-[#D46382] text-slate-800 hover:text-white dark:bg-white/10 dark:hover:bg-[#E88CA6] dark:text-[#FAF8F5] dark:hover:text-[#0B0D12] text-xs font-semibold rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            title="Ajouter au panier"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider">AJOUTER</span>
          </button>
        </div>
      </div>
    </div>
  );
};
