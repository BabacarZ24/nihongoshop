import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SakuraSeason: React.FC = () => {
  const { setSelectedProductForDetail, formatPrice, products } = useShop();

  const sakuraProducts = products.filter((p) =>
    p.tags.some((t) => t.toLowerCase().includes('sakura')) || p.id === 'prod-002' || p.id === 'prod-007' || p.id === 'prod-012'
  );

  const heroItem = sakuraProducts[0] || products[0];

  return (
    <section id="sakura-season" className="py-28 relative overflow-hidden bg-rose-50/40 dark:bg-[#0A0D14] border-y border-rose-100/60 dark:border-white/5 transition-colors duration-300">
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E88CA6]/15 dark:bg-[#E88CA6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Collection Launch Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E88CA6]/15 border border-[#E88CA6]/40 text-xs font-mono tracking-widest text-[#D46382] dark:text-[#F4A6BE] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SORTIE COUTURE ANNUELLE • 桜季限定</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-[#FAF8F5]">
            SAISON SAKURA
          </h2>

          <div className="text-xl sm:text-2xl font-serif tracking-[0.2em] text-[#D46382] dark:text-[#E88CA6]">
            SÉLECTION LIMITÉE 2026
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#D1D5DB] max-w-xl mx-auto font-light leading-relaxed">
            Inspirée par la beauté éphémère de la pleine floraison des cerisiers. Façonnée dans des satins de soie double face, de l'argent massif 925 et des céramiques Mino de grands maîtres.
          </p>
        </div>

        {/* Feature Spotlight: Asymmetric Fashion Editorial Lookbook Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#11141D] rounded-3xl border border-rose-200 dark:border-[#E88CA6]/30 p-6 sm:p-10 shadow-lg dark:shadow-2xl relative overflow-hidden mb-16">
          <div className="lg:col-span-7 relative h-[420px] sm:h-[520px] rounded-2xl overflow-hidden group">
            <img
              src="/images/sakura-drop.jpg"
              alt="Lookbook Veste Couture Saison Sakura"
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-mono tracking-widest text-[#E88CA6] uppercase block mb-1">
                LOOKBOOK 01 // DÉFILÉ TOKYO KYOTO
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {heroItem.name}
              </h3>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] text-xs font-bold uppercase tracking-wider">
                150 PIÈCES DANS LE MONDE
              </span>
              <span className="text-xs text-slate-500 dark:text-[#9CA3AF] font-mono">NUMÉROTÉ</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#FAF8F5] leading-snug">
              Broderie florale en rayonne haute densité à 140 000 points
            </h3>

            <p className="text-sm text-slate-600 dark:text-[#9CA3AF] leading-relaxed font-light">
              {heroItem.description}
            </p>

            {/* Quality specs */}
            <div className="space-y-2 border-y border-slate-200 dark:border-white/10 py-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-[#9CA3AF]">Confection</span>
                <span className="font-medium text-slate-800 dark:text-[#FAF8F5]">Satin Duchesse Mat + Cupro</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-[#9CA3AF]">Réversible</span>
                <span className="font-medium text-slate-800 dark:text-[#FAF8F5]">Bleu Nuit / Noir Encre Profond</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-[#9CA3AF]">Certification</span>
                <span className="font-medium text-slate-800 dark:text-[#FAF8F5]">Coffret en Bois de Paulownia Inclus</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs text-slate-500 dark:text-[#9CA3AF] uppercase tracking-wider block">PRIX DE L'ÉDITION</span>
                <span className="text-2xl font-bold font-mono text-slate-900 dark:text-[#FAF8F5]">
                  {formatPrice(heroItem.price)}
                </span>
              </div>

              <button
                id="sakura-hero-inspect-btn"
                onClick={() => setSelectedProductForDetail(heroItem)}
                className="px-6 py-3.5 rounded-full bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] text-xs font-bold tracking-wider uppercase hover:bg-[#c24b6c] dark:hover:bg-[#F4A6BE] hover:shadow-[0_0_20px_rgba(232,140,166,0.6)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>EXAMINER LA PIÈCE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sakura Season Complementary Artifacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {sakuraProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProductForDetail(product)}
              className="bg-white dark:bg-[#12151F] border border-slate-200/80 dark:border-white/5 hover:border-[#D46382] dark:hover:border-[#E88CA6]/40 rounded-2xl p-5 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-black/40">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#E88CA6]">
                  {product.category.toUpperCase()}
                </span>
              </div>

              <div>
                <h4 className="font-medium text-sm text-slate-900 dark:text-[#FAF8F5] group-hover:text-[#D46382] dark:group-hover:text-[#F4A6BE] transition-colors line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-[#9CA3AF] line-clamp-2 mt-1 font-light">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                <span className="text-sm font-bold font-mono text-slate-900 dark:text-[#FAF8F5]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-[#D46382] dark:text-[#E88CA6] font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Voir <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
