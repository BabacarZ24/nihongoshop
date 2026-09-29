import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Flame, ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

interface LatestDropsProps {
  onViewAllClick: () => void;
}

export const LatestDrops: React.FC<LatestDropsProps> = ({ onViewAllClick }) => {
  const { products } = useShop();
  // Real-time drop countdown timer to add urgency & authentic exclusivity
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products that are in the latest drop batch or marked new/limited
  const dropProducts = products.filter((p) => p.isNew || p.isLimited).slice(0, 4);

  return (
    <section id="drops" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Drop Header & Exclusivity Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-rose-50/90 via-white to-pink-50/80 dark:from-[#141824] dark:via-[#10131B] dark:to-[#171119] border border-rose-200/80 dark:border-[#E88CA6]/20 p-8 sm:p-12 mb-12 overflow-hidden shadow-md dark:shadow-2xl">
        {/* Background Japanese Watermark */}
        <div className="absolute -right-8 -bottom-10 text-8xl sm:text-9xl font-jp font-extrabold text-black/[0.04] dark:text-white/[0.03] select-none pointer-events-none">
          新着限定
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E88CA6]/15 text-[#D46382] dark:text-[#E88CA6] border border-[#E88CA6]/30 text-xs font-mono tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5 text-[#D46382] dark:text-[#E88CA6]" />
              <span>DROP 04 — ÉDITIONS KAGE & SAKURA</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#FAF8F5]">
              DERNIER DROP
            </h2>

            <div className="text-lg sm:text-xl font-light text-slate-700 dark:text-[#E5E7EB] space-y-1">
              <p>&ldquo;Nouvelles pièces.</p>
              <p>Quantités limitées.</p>
              <p className="text-[#D46382] dark:text-[#F4A6BE] font-medium">Créé pour les Otakus.&rdquo;</p>
            </div>
          </div>

          {/* Countdown Clock Box */}
          <div className="bg-white/80 dark:bg-[#0B0D12]/70 backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 flex flex-col items-center lg:items-end gap-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-500 dark:text-[#9CA3AF]">
              <Clock className="w-3.5 h-3.5 text-[#D46382] dark:text-[#E88CA6]" />
              <span>FIN DE L'ATTRIBUTION DU DROP DANS</span>
            </div>

            <div className="flex items-center gap-3 text-center font-mono">
              <div className="bg-slate-100 dark:bg-white/5 rounded-xl px-3 py-2 border border-slate-200 dark:border-white/10 min-w-[54px]">
                <span className="text-2xl font-bold text-slate-900 dark:text-[#FAF8F5] block">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-[#9CA3AF]">JOURS</span>
              </div>
              <span className="text-xl text-[#D46382] dark:text-[#E88CA6] font-bold">:</span>
              <div className="bg-slate-100 dark:bg-white/5 rounded-xl px-3 py-2 border border-slate-200 dark:border-white/10 min-w-[54px]">
                <span className="text-2xl font-bold text-slate-900 dark:text-[#FAF8F5] block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-[#9CA3AF]">HEURES</span>
              </div>
              <span className="text-xl text-[#D46382] dark:text-[#E88CA6] font-bold">:</span>
              <div className="bg-slate-100 dark:bg-white/5 rounded-xl px-3 py-2 border border-slate-200 dark:border-white/10 min-w-[54px]">
                <span className="text-2xl font-bold text-slate-900 dark:text-[#FAF8F5] block">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-[#9CA3AF]">MIN</span>
              </div>
              <span className="text-xl text-[#D46382] dark:text-[#E88CA6] font-bold">:</span>
              <div className="bg-slate-100 dark:bg-white/5 rounded-xl px-3 py-2 border border-slate-200 dark:border-white/10 min-w-[54px]">
                <span className="text-2xl font-bold text-[#D46382] dark:text-[#E88CA6] block">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-[#9CA3AF]">SEC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Drop Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dropProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Explore Full Drop Catalog */}
      <div className="mt-12 text-center">
        <button
          onClick={onViewAllClick}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 border-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-sm font-semibold tracking-wider dark:text-[#FAF8F5] border dark:border-white/15 hover:border-[#D46382] dark:hover:border-[#E88CA6]/50 transition-all duration-300 group cursor-pointer shadow-xs"
        >
          <span>VOIR TOUS LES DROPS EN COURS & ARCHIVES</span>
          <ArrowRight className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
