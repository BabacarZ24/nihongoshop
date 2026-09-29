import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    formatPrice,
    setIsCheckoutOpen
  } = useShop();

  if (!isCartOpen) return null;

  const estimatedShipping = 0;
  const finalTotal = cartSubtotal;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0D1017] border-l border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#FAF8F5] shadow-2xl flex flex-col justify-between transition-colors duration-300">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D46382] dark:text-[#E88CA6]" />
              <h2 className="font-display text-lg font-bold tracking-wider text-slate-900 dark:text-[#FAF8F5]">VOTRE PANIER</h2>
              <span className="text-xs font-mono text-slate-500 dark:text-[#9CA3AF]">({cart.length} {cart.length > 1 ? 'articles' : 'article'})</span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 dark:text-white/60 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Indicator */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/20 px-6 py-2.5 border-b border-emerald-100 dark:border-white/5 text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center justify-between">
            <span>✨ Livraison offerte sur votre commande</span>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">OFFERTE</span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4 text-slate-400 dark:text-[#9CA3AF]">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#D46382] dark:text-[#E88CA6]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-900 dark:text-[#FAF8F5]">Votre panier est vide</p>
                  <p className="text-xs max-w-xs text-slate-500 dark:text-[#9CA3AF]">
                    Explorez nos univers et nos pièces populaires pour débuter votre sélection.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] text-xs font-bold uppercase tracking-wider hover:bg-[#c24b6c] dark:hover:bg-[#F4A6BE] transition-all cursor-pointer shadow-md"
                >
                  COMMENCER VOS ACHATS
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-200 dark:bg-black/40 shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-[#FAF8F5] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-500 dark:text-[#9CA3AF] dark:hover:text-[#EF4444] transition-colors p-1 cursor-pointer"
                          aria-label="Supprimer l'article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected Variants */}
                      {Object.entries(item.selectedVariants).length > 0 && (
                        <div className="text-[10px] text-slate-500 dark:text-[#9CA3AF] mt-0.5 font-mono">
                          {Object.entries(item.selectedVariants)
                            .map(([, v]) => `${v}`)
                            .join(' / ')}
                        </div>
                      )}

                      <div className="text-xs font-mono font-bold text-[#D46382] dark:text-[#E88CA6] mt-1">
                        {formatPrice(item.product.price)}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center rounded-lg bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 px-1 py-0.5 shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-mono font-semibold text-slate-900 dark:text-white/90">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 dark:bg-[#0B0D12] border-t border-slate-200 dark:border-white/10 space-y-4">
              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-[#9CA3AF]">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="text-slate-900 dark:text-[#FAF8F5] font-mono">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-emerald-600 dark:text-[#10B981] font-semibold">OFFERTE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 dark:text-[#FAF8F5] pt-2 border-t border-slate-200 dark:border-white/10">
                  <span>Total</span>
                  <span className="text-[#D46382] dark:text-[#E88CA6] font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {/* Direct WhatsApp Ordering */}
                <a
                  href={`https://wa.me/221771234567?text=${encodeURIComponent(
                    `🌸 *NOUVELLE COMMANDE NIGHONGOSHOP* 🌸\nJe souhaite commander directement les articles suivants :\n${cart
                      .map((item) => `• ${item.product.name} (x${item.quantity}) — ${formatPrice(item.product.price * item.quantity)}`)
                      .join('\n')}\n\n*Total :* ${formatPrice(finalTotal)}\n*Livraison :* Offerte\n\nMerci de m'indiquer la disponibilité pour finaliser.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>COMMANDER PAR WHATSAPP</span>
                </a>

                {/* Standard Modal Checkout */}
                <button
                  id="cart-proceed-checkout"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-[#D46382] text-white dark:bg-[#FAF8F5] dark:hover:bg-[#E88CA6] dark:text-[#0B0D12] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <span>RENSEIGNER L'ADRESSE SUR LE SITE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 dark:text-[#9CA3AF] text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D46382] dark:text-[#E88CA6]" />
                <span>Paiement sécurisé 256-bit • Envoi assuré dans le monde entier</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
