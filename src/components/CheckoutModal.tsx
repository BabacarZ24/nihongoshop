import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Smartphone, ArrowLeft, Lock, MessageCircle, ExternalLink } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CheckoutForm } from '../types';

const WHATSAPP_PHONE = '221782468632'; // +221 78 246 86 32 / Support Nighongoshop
const WHATSAPP_DISPLAY = '+221 78 246 86 32';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    formatPrice,
    placeOrder,
    currentOrder,
    resetCurrentOrder
  } = useShop();

  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: 'Arata',
    lastName: 'Kuroda',
    email: 'arata.kuroda@sekai.jp',
    phone: '+221 78 246 86 32',
    address: '14 Boulevard de la République',
    city: 'Dakar',
    country: 'Sénégal',
    postalCode: '10200',
    paymentMethod: 'whatsapp',
    notes: 'Emballage soigné'
  });

  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const discount = cartSubtotal >= 50000 ? 5000 : 0;
  const total = Math.max(0, cartSubtotal - discount);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const buildWhatsAppMessage = (orderNum?: string) => {
    const itemsText = cart
      .map((item) => `• ${item.product.name} (x${item.quantity}) — ${formatPrice(item.product.price * item.quantity)}`)
      .join('\n');

    return `🌸 *COMMANDE NIGHONGOSHOP* 🌸
${orderNum ? `*N° Commande :* ${orderNum}\n` : ''}
*Articles commandés :*
${itemsText}

*Total :* ${formatPrice(total)}
*Livraison :* Offerte ✨

*Informations de livraison :*
• Client : ${formData.firstName} ${formData.lastName}
• Téléphone : ${formData.phone}
• Adresse : ${formData.address}, ${formData.city} (${formData.country})
${formData.notes ? `• Remarque : ${formData.notes}\n` : ''}
Je souhaite valider ma commande par WhatsApp. Merci !`;
  };

  const buildWhatsAppUrl = (orderNum?: string) => {
    const text = buildWhatsAppMessage(orderNum);
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  };

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder(formData);
      setIsSubmitting(false);

      if (formData.paymentMethod === 'whatsapp') {
        const link = document.createElement('a');
        link.href = buildWhatsAppUrl(order.orderNumber);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 1000);
  };

  const handleClose = () => {
    resetCurrentOrder();
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="checkout-modal-container"
        className="relative w-full max-w-4xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl text-slate-900 dark:text-[#FAF8F5] my-6 transition-colors duration-300"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-[#11141D] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6]" />
            <span className="font-display font-bold text-sm tracking-wider text-slate-900 dark:text-white">
              FINALISATION DE LA COMMANDE
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 hover:text-slate-800 dark:text-white/70 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Order Placed: Show Order Confirmation View */}
        {currentOrder ? (
          <div className="p-8 sm:p-12 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-[#10B981]/20 border border-emerald-300 dark:border-[#10B981]/40 text-emerald-600 dark:text-[#10B981] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#D46382] dark:text-[#E88CA6] tracking-widest uppercase">
                🌸 ARIGATO GOZAIMASU • 注文完了
              </div>
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-[#FAF8F5]">
                Commande Enregistrée !
              </h2>
              <p className="text-sm text-slate-600 dark:text-[#9CA3AF] max-w-md mx-auto">
                Votre commande <strong className="text-slate-900 dark:text-[#FAF8F5] font-mono">{currentOrder.orderNumber}</strong> est prête à être validée.
              </p>
            </div>

            {/* Direct WhatsApp Confirmation CTA */}
            <div className="max-w-md mx-auto">
              <a
                href={buildWhatsAppUrl(currentOrder.orderNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Confirmer sur WhatsApp ({WHATSAPP_DISPLAY})</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] mt-2">
                Un message prêt à l'envoi vous attend pour confirmation immédiate avec notre équipe.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 max-w-md mx-auto text-left border border-slate-200 dark:border-white/5 space-y-4">
              <div className="flex justify-between text-xs pb-3 border-b border-slate-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-[#9CA3AF]">Date</span>
                <span className="text-slate-900 dark:text-[#FAF8F5] font-mono">{currentOrder.date}</span>
              </div>
              <div className="flex justify-between text-xs pb-3 border-b border-slate-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-[#9CA3AF]">Destinataire</span>
                <span className="text-slate-900 dark:text-[#FAF8F5]">
                  {currentOrder.customer.firstName} {currentOrder.customer.lastName} ({currentOrder.customer.city})
                </span>
              </div>
              <div className="flex justify-between text-xs pb-3 border-b border-slate-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-[#9CA3AF]">Livraison</span>
                <span className="text-emerald-600 dark:text-[#10B981] font-semibold">Offerte</span>
              </div>
              <div className="flex justify-between text-xs pb-3 border-b border-slate-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-[#9CA3AF]">Mode choisi</span>
                <span className="text-slate-900 dark:text-[#FAF8F5] uppercase font-mono font-semibold">
                  {currentOrder.customer.paymentMethod === 'whatsapp' ? 'WhatsApp' : currentOrder.customer.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-1">
                <span>Montant Total</span>
                <span className="text-[#D46382] dark:text-[#E88CA6] font-mono">{formatPrice(currentOrder.total)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={handleClose}
                className="px-8 py-3.5 rounded-full bg-slate-900 text-white dark:bg-[#FAF8F5] dark:text-[#0B0D12] text-xs font-bold uppercase tracking-wider hover:bg-[#D46382] dark:hover:bg-[#E88CA6] transition-all cursor-pointer shadow-md"
              >
                RETOURNER À LA BOUTIQUE
              </button>
            </div>
          </div>
        ) : (
          /* Active Checkout Flow */
          <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {step === 'details' ? (
                  <form onSubmit={handleNextToPayment} className="space-y-6">
                    {/* Customer Information */}
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-[#D46382] dark:text-[#E88CA6] mb-3">
                        01. COORDONNÉES CLIENT // 顧客情報
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">Prénom</label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D46382] dark:focus:border-[#E88CA6] text-xs text-slate-900 dark:text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">Nom</label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D46382] dark:focus:border-[#E88CA6] text-xs text-slate-900 dark:text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">Adresse E-mail</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D46382] dark:focus:border-[#E88CA6] text-xs text-slate-900 dark:text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">Numéro de Téléphone (WhatsApp)</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D46382] dark:focus:border-[#E88CA6] text-xs text-slate-900 dark:text-white focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-[#D46382] dark:text-[#E88CA6] mb-3">
                        02. ADRESSE DE LIVRAISON // 配送先
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">Rue, Quartier ou Repère</label>
                          <input
                            type="text"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D46382] dark:focus:border-[#E88CA6] text-xs text-slate-900 dark:text-white focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">Ville</label>
                            <input
                              type="text"
                              name="city"
                              required
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D46382] dark:focus:border-[#E88CA6] text-xs text-slate-900 dark:text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">Pays</label>
                            <input
                              type="text"
                              name="country"
                              required
                              value={formData.country}
                              onChange={handleInputChange}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D46382] dark:focus:border-[#E88CA6] text-xs text-slate-900 dark:text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">Code Postal / Secteur</label>
                            <input
                              type="text"
                              name="postalCode"
                              required
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D46382] dark:focus:border-[#E88CA6] text-xs text-slate-900 dark:text-white focus:outline-none font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">Instructions spéciales (Optionnel)</label>
                          <input
                            type="text"
                            name="notes"
                            value={formData.notes || ''}
                            onChange={handleInputChange}
                            placeholder="Ex : Appeler à l'arrivée, livrer l'après-midi..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D46382] dark:focus:border-[#E88CA6] text-xs text-slate-900 dark:text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-slate-900 text-white hover:bg-[#D46382] dark:bg-[#FAF8F5] dark:text-[#0B0D12] dark:hover:bg-[#E88CA6] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                    >
                      CONTINUER VERS LE PAIEMENT →
                    </button>
                  </form>
                ) : (
                  /* Payment step */
                  <div className="space-y-6">
                    <button
                      onClick={() => setStep('details')}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-[#9CA3AF] dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Modifier les informations de livraison
                    </button>

                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-[#D46382] dark:text-[#E88CA6] mb-3">
                        03. CHOIX DU MODE DE RÈGLEMENT // 決済
                      </h3>

                      <div className="space-y-2.5">
                        {/* Option 1: Commander par WhatsApp */}
                        <label
                          className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                            formData.paymentMethod === 'whatsapp'
                              ? 'bg-emerald-50/70 border-emerald-500 dark:bg-emerald-950/20 dark:border-emerald-500/70 text-slate-900 dark:text-white shadow-sm'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-[#9CA3AF] hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="whatsapp"
                              checked={formData.paymentMethod === 'whatsapp'}
                              onChange={handleInputChange}
                              className="accent-emerald-600 mt-1"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-current" />
                                <span className="text-sm font-bold text-slate-900 dark:text-white">
                                  Commander par WhatsApp
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-[#9CA3AF] mt-1 leading-relaxed">
                                Confirmation directe et accompagnement par nos conseillers. Un récapitulatif complet de vos articles sera généré automatiquement.
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                            RECOMMANDÉ
                          </span>
                        </label>

                        {/* Option 2: Wave Mobile Money */}
                        <label
                          className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                            formData.paymentMethod === 'wave'
                              ? 'bg-blue-50/70 border-blue-500 dark:bg-blue-950/20 dark:border-blue-500/70 text-slate-900 dark:text-white shadow-sm'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-[#9CA3AF] hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="wave"
                              checked={formData.paymentMethod === 'wave'}
                              onChange={handleInputChange}
                              className="accent-blue-600 mt-1"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-[#3B82F6]" />
                                <span className="text-sm font-bold text-slate-900 dark:text-white">
                                  Wave Mobile Money
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-[#9CA3AF] mt-1">
                                Règlement rapide par QR code ou notification push sans frais.
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 text-[10px] text-[#3B82F6] font-mono font-bold">
                            SANS FRAIS
                          </span>
                        </label>

                        {/* Option 3: Orange Money */}
                        <label
                          className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                            formData.paymentMethod === 'orange_money'
                              ? 'bg-orange-50/70 border-orange-500 dark:bg-orange-950/20 dark:border-orange-500/70 text-slate-900 dark:text-white shadow-sm'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-[#9CA3AF] hover:border-orange-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="orange_money"
                              checked={formData.paymentMethod === 'orange_money'}
                              onChange={handleInputChange}
                              className="accent-orange-600 mt-1"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-[#F97316]" />
                                <span className="text-sm font-bold text-slate-900 dark:text-white">
                                  Orange Money / MTN
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-[#9CA3AF] mt-1">
                                Validation sécurisée avec votre code secret Mobile Money.
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      {formData.paymentMethod === 'whatsapp' && (
                        <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs space-y-1.5 text-emerald-900 dark:text-emerald-200">
                          <p className="font-semibold flex items-center gap-1.5">
                            <MessageCircle className="w-4 h-4 fill-current text-emerald-600 dark:text-emerald-400" />
                            Finalisation directe via WhatsApp ({WHATSAPP_DISPLAY})
                          </p>
                          <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300 leading-relaxed">
                            Votre commande sera envoyée instantanément sur notre WhatsApp officiel ({WHATSAPP_DISPLAY}). Notre équipe validera votre commande et préparera votre livraison dans les plus brefs délais.
                          </p>
                        </div>
                      )}

                      {formData.paymentMethod === 'wave' && (
                        <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-[#1E293B]/60 border border-blue-200 dark:border-[#3B82F6]/30 text-xs space-y-1 text-blue-900 dark:text-[#93C5FD]">
                          <p className="font-semibold">Paiement Mobile Wave</p>
                          <p className="text-[11px] text-blue-700 dark:text-[#BFDBFE]">
                            Une confirmation sécurisée sera envoyée au numéro {formData.phone}.
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleConfirmOrder}
                      disabled={isSubmitting}
                      className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl ${
                        formData.paymentMethod === 'whatsapp'
                          ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white'
                          : 'bg-[#D46382] text-white hover:bg-[#c24b6c] dark:bg-[#E88CA6] dark:text-[#0B0D12] dark:hover:bg-[#F4A6BE]'
                      }`}
                    >
                      {isSubmitting ? (
                        <span>ENREGISTREMENT DE LA COMMANDE...</span>
                      ) : formData.paymentMethod === 'whatsapp' ? (
                        <>
                          <MessageCircle className="w-4 h-4 fill-current" />
                          <span>COMMANDER PAR WHATSAPP • {formatPrice(total)}</span>
                        </>
                      ) : (
                        <span>CONFIRMER LA COMMANDE • {formatPrice(total)}</span>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Order Summary (5 cols) */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/5 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#D46382] dark:text-[#E88CA6] mb-4">
                    RÉSUMÉ DE COMMANDE // 内訳
                  </h3>

                  {/* Products overview */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-xs">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-14 rounded-lg object-cover bg-slate-200 dark:bg-black/40"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 dark:text-white truncate">{item.product.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">
                            Qté : {item.quantity} • {formatPrice(item.product.price)}
                          </p>
                        </div>
                        <span className="font-mono font-semibold text-slate-900 dark:text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="border-t border-slate-200 dark:border-white/10 mt-6 pt-4 space-y-2 text-xs text-slate-600 dark:text-[#9CA3AF]">
                    <div className="flex justify-between">
                      <span>Sous-total articles</span>
                      <span className="font-mono text-slate-900 dark:text-white">{formatPrice(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span className="font-semibold text-emerald-600 dark:text-[#10B981]">OFFERTE</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-[#10B981]">
                        <span>Avantage Privilège Otaku</span>
                        <span className="font-mono">-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-white/10">
                      <span>Montant Total</span>
                      <span className="text-[#D46382] dark:text-[#E88CA6] font-mono">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-500 dark:text-[#9CA3AF] flex items-center gap-2 border-t border-slate-200/60 dark:border-white/5">
                  <ShieldCheck className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6]" />
                  <span>Validation directe & assistance personnalisée par nos équipes.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
