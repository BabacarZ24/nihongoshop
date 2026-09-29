import React from 'react';
import { ArrowRight, Compass, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductCategory } from '../types';

interface OtakuCollectionProps {
  onSelectWorld?: (category: ProductCategory) => void;
}

export const OtakuCollection: React.FC<OtakuCollectionProps> = ({ onSelectWorld }) => {
  const navigate = useNavigate();

  const handleWorldClick = (category: ProductCategory) => {
    if (onSelectWorld) {
      onSelectWorld(category);
    }
    navigate(`/category/${category}`);
  };
  return (
    <section id="otaku-collection" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Editorial Header */}
      <div className="mb-14 border-b border-slate-200 dark:border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D46382] dark:text-[#E88CA6] tracking-widest uppercase mb-2">
            <span>06</span>
            <span>/</span>
            <span>LES DOMAINES SÉLECTIONNÉS</span>
            <span className="text-[#D46382]/60 dark:text-[#E88CA6]/50">世界を見つける</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#FAF8F5]">
            TROUVEZ VOTRE UNIVERS
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-[#9CA3AF] max-w-md font-light">
          Un voyage au cœur des piliers du mode de vie et de la maîtrise artistique Otaku contemporaine.
        </p>
      </div>

      {/* Asymmetric Editorial Storytelling Showcase */}
      <div className="space-y-8">
        {/* Row 1: Anime & Manga Realm (Left-weighted large card + Right detail card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card A: Anime Heroes Dominion (7 cols) */}
          <div
            onClick={() => handleWorldClick('anime')}
            className="lg:col-span-7 group relative rounded-3xl overflow-hidden min-h-[420px] bg-[#141823] border border-slate-200/80 dark:border-white/10 hover:border-[#D46382] dark:hover:border-[#E88CA6]/60 transition-all duration-700 cursor-pointer shadow-xl p-8 sm:p-12 flex flex-col justify-between"
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/images/anime_jump_heroes.jpg"
                alt="Domaine Anime & Héros Mythiques"
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-1000 ease-out filter brightness-[0.75] group-hover:brightness-[0.9]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/40 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full bg-black/60 text-[#E88CA6] border border-[#E88CA6]/30">
                DISCIPLINE 01 // アニメ
              </span>
              <span className="text-3xl font-jp font-bold text-white/30 group-hover:text-[#E88CA6]/60 transition-colors">
                英雄集結
              </span>
            </div>

            <div className="relative z-10 max-w-lg space-y-3">
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#FAF8F5] group-hover:text-[#F4A6BE] transition-colors">
                L'Univers Anime & les Héros Légendaires
              </h3>
              <p className="text-sm text-[#D1D5DB] font-light leading-relaxed">
                Les récits d'animation japonais cultes réunis : vinyles audiophiles d'anthologie, cellulos peints à la main et objets commémoratifs des plus grands héros.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FAF8F5] group-hover:text-[#E88CA6]">
                  Explorer l'univers Anime <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>

          {/* Card B: Manga Archives (5 cols) */}
          <div
            onClick={() => handleWorldClick('manga')}
            className="lg:col-span-5 group relative rounded-3xl overflow-hidden min-h-[420px] bg-[#11141D] border border-slate-200/80 dark:border-white/10 hover:border-[#D46382] dark:hover:border-[#E88CA6]/60 transition-all duration-700 cursor-pointer shadow-xl p-8 sm:p-10 flex flex-col justify-between"
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80"
                alt="Archives Manga"
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-1000 ease-out filter brightness-[0.65]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/60 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full bg-black/60 text-[#E88CA6] border border-[#E88CA6]/30">
                DISCIPLINE 02 // 原作
              </span>
              <span className="text-3xl font-jp font-bold text-white/20 group-hover:text-[#E88CA6]/40 transition-colors">
                漫画原画
              </span>
            </div>

            <div className="relative z-10 space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FAF8F5] group-hover:text-[#F4A6BE] transition-colors">
                Archives Manga & Livres d'Art Rares
              </h3>
              <p className="text-xs sm:text-sm text-[#D1D5DB] font-light leading-relaxed">
                Éditions intégrales de luxe reliées similicuir, artbooks officiels et manuscrits imprimés sur papier d'archivage sans acide.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FAF8F5] group-hover:text-[#E88CA6]">
                  Explorer les Archives <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Cosplay & Accessories (Asymmetric Flip: 5 cols + 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card C: Cosplay & Costumes (5 cols) */}
          <div
            onClick={() => handleWorldClick('cosplay')}
            className="lg:col-span-5 group relative rounded-3xl overflow-hidden min-h-[400px] bg-[#11141D] border border-slate-200/80 dark:border-white/10 hover:border-[#D46382] dark:hover:border-[#E88CA6]/60 transition-all duration-700 cursor-pointer shadow-xl p-8 sm:p-10 flex flex-col justify-between"
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80"
                alt="Costumes et Cosplay"
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-1000 ease-out filter brightness-[0.7]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/60 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full bg-black/60 text-[#E88CA6] border border-[#E88CA6]/30">
                DISCIPLINE 03 // 変身
              </span>
              <span className="text-3xl font-jp font-bold text-white/20 group-hover:text-[#E88CA6]/40 transition-colors">
                仮装演舞
              </span>
            </div>

            <div className="relative z-10 space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FAF8F5] group-hover:text-[#F4A6BE] transition-colors">
                Costumes Cosplay & Capes d'Apparat
              </h3>
              <p className="text-xs sm:text-sm text-[#D1D5DB] font-light leading-relaxed">
                Manteaux Akatsuki brodés, haoris fluides de pourfendeurs et vestes sukajan d'exception pour incarner vos héros en conventions.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FAF8F5] group-hover:text-[#E88CA6]">
                  Découvrir le Cosplay <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>

          {/* Card D: Accessories & Fine Jewelry (7 cols) */}
          <div
            onClick={() => handleWorldClick('accessories')}
            className="lg:col-span-7 group relative rounded-3xl overflow-hidden min-h-[400px] bg-[#141823] border border-slate-200/80 dark:border-white/10 hover:border-[#D46382] dark:hover:border-[#E88CA6]/60 transition-all duration-700 cursor-pointer shadow-xl p-8 sm:p-12 flex flex-col justify-between"
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80"
                alt="Bijoux et Accessoires en Argent"
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-1000 ease-out filter brightness-[0.7]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/50 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full bg-black/60 text-[#E88CA6] border border-[#E88CA6]/30">
                DISCIPLINE 04 // 装身具
              </span>
              <span className="text-3xl font-jp font-bold text-white/20 group-hover:text-[#E88CA6]/40 transition-colors">
                伝統装飾
              </span>
            </div>

            <div className="relative z-10 max-w-lg space-y-3">
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#FAF8F5] group-hover:text-[#F4A6BE] transition-colors">
                Bijoux en Argent Massif & Talismans
              </h3>
              <p className="text-sm text-[#D1D5DB] font-light leading-relaxed">
                Bagues florales Sakura en argent 925, pendentifs de masques Hannya sculptés et cordons de soie Kumihimo traditionnels façonnés à Kyoto.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FAF8F5] group-hover:text-[#E88CA6]">
                  Entrer dans les Accessoires <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
