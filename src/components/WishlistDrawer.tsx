import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
    setSelectedProductForDetail,
    products
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0D1017] border-l border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#FAF8F5] shadow-2xl flex flex-col justify-between transition-colors duration-300">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#D46382] dark:text-[#E88CA6] fill-[#D46382] dark:fill-[#E88CA6]" />
              <h2 className="font-display text-lg font-bold tracking-wider text-slate-900 dark:text-[#FAF8F5]">COUPS DE CŒUR</h2>
              <span className="text-xs font-mono text-slate-500 dark:text-[#9CA3AF]">({wishlistProducts.length})</span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 dark:text-white/60 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fermer la liste d'envies"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4 text-slate-400 dark:text-[#9CA3AF]">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#D46382] dark:text-[#E88CA6]">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-900 dark:text-[#FAF8F5]">Aucun article sauvegardé</p>
                  <p className="text-xs max-w-xs text-slate-500 dark:text-[#9CA3AF]">
                    Cliquez sur le cœur d'un produit pour composer vos coups de cœur.
                  </p>
                </div>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 transition-all"
                >
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setSelectedProductForDetail(product);
                    }}
                    className="w-20 h-24 rounded-xl overflow-hidden bg-slate-200 dark:bg-black/40 shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            setSelectedProductForDetail(product);
                          }}
                          className="text-xs font-semibold text-slate-900 dark:text-[#FAF8F5] line-clamp-1 hover:text-[#D46382] dark:hover:text-[#E88CA6] cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-slate-400 hover:text-rose-500 dark:text-[#9CA3AF] dark:hover:text-[#EF4444] transition-colors p-1 cursor-pointer"
                          title="Supprimer des favoris"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-mono font-bold text-[#D46382] dark:text-[#E88CA6] mt-1">
                        {formatPrice(product.price)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
                      <span className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">
                        {product.stock > 0 ? `${product.stock} en stock` : 'Rupture temporaire'}
                      </span>
                      <button
                        onClick={(e) => {
                          addToCart(product, 1, {}, e);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] text-[11px] font-bold uppercase tracking-wider hover:bg-[#c24b6c] dark:hover:bg-[#F4A6BE] transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>AJOUTER</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-slate-50 dark:bg-[#0B0D12] border-t border-slate-200 dark:border-white/10 text-center">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="text-xs text-slate-600 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Continuer à explorer les créations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
