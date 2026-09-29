import React, { useState } from 'react';
import { Send, Check, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <div className="relative rounded-3xl bg-gradient-to-b from-rose-50/80 to-pink-50/50 dark:from-[#12151E] dark:to-[#0A0C12] border border-rose-200/80 dark:border-white/10 p-8 sm:p-14 overflow-hidden shadow-md dark:shadow-2xl">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#E88CA6]/15 dark:bg-[#E88CA6]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-white/5 border border-rose-200/80 dark:border-white/10 text-xs font-mono text-[#D46382] dark:text-[#E88CA6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALERTES DROPS & DÉPÊCHES OTAKU</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-[#FAF8F5]">
            Ne Manquez Aucun Tirage Limité
          </h2>

          <p className="text-sm text-slate-600 dark:text-[#9CA3AF] font-light leading-relaxed">
            Inscrivez-vous pour recevoir les notifications de réassort secret, les carnets de conception et les sorties exclusives de vos univers favoris.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center gap-2 text-xs font-medium animate-fade-in">
              <Check className="w-4 h-4" />
              <span>Arigato ! Consultez votre boîte mail pour confirmer votre inscription.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email pour les alertes de drops..."
                className="w-full px-5 py-3.5 rounded-full bg-white dark:bg-black/60 border border-slate-300 dark:border-white/15 focus:border-[#D46382] dark:focus:border-[#E88CA6] focus:outline-none text-sm text-slate-900 dark:text-[#FAF8F5] placeholder-slate-400 dark:placeholder-white/30 transition-colors shadow-xs"
              />
              <button
                type="submit"
                id="newsletter-subscribe-btn"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D46382] text-white hover:bg-[#c24b6c] dark:bg-[#E88CA6] dark:text-[#0B0D12] dark:hover:bg-[#F4A6BE] text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg active:scale-95"
              >
                <span>S'INSCRIRE</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="text-[11px] text-[#6B7280] pt-2">
            Confidentialité absolue garantie. Nous n'écrivons que lors de l'éclosion de drops majeurs.
          </div>
        </div>
      </div>
    </section>
  );
};
