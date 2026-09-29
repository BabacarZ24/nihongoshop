import React from 'react';
import { X, Sparkles, Shield, Compass, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen } = useShop();

  if (!isAboutOpen) return null;

  return (
    <div
      id="about-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={() => setIsAboutOpen(false)}
    >
      <div
        id="about-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl text-slate-900 dark:text-[#FAF8F5] p-6 sm:p-10 my-8 space-y-6 transition-colors duration-300"
      >
        <button
          onClick={() => setIsAboutOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-800 dark:text-white/70 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 text-center pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D46382]/10 dark:bg-[#E88CA6]/15 text-[#D46382] dark:text-[#E88CA6] border border-[#D46382]/30 dark:border-[#E88CA6]/30 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PHILOSOPHIE DE MARQUE • 哲学</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-[#FAF8F5]">
            NIGHONGOSHOP
          </h2>

          <div className="text-sm font-serif tracking-[0.25em] text-[#D46382] dark:text-[#E88CA6]">
            「OTAKU NO SEKAI」
          </div>

          <p className="text-base text-slate-700 dark:text-[#FAF8F5] font-light italic">
            &ldquo;Là où fleurit la culture Otaku.&rdquo;
          </p>
        </div>

        {/* The 3 Core Pillars */}
        <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-slate-200/80 dark:border-white/5 space-y-4 text-center">
          <div className="text-sm sm:text-base font-light text-slate-800 dark:text-[#FAF8F5] leading-relaxed">
            <p className="text-[#D46382] dark:text-[#E88CA6] font-medium">&ldquo;Le Sakura est l'âme.</p>
            <p>Les produits sont le centre.</p>
            <p className="text-[#D46382] dark:text-[#F4A6BE] font-medium">La culture Otaku est la personnalité.&rdquo;</p>
          </div>
        </div>

        {/* Narrative */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-[#D1D5DB] leading-relaxed font-light">
          <p>
            Nighongoshop n'a pas été conçu comme une simple boutique transactionnelle, mais comme le clubhouse d'une communauté Otaku enracinée dans l'héritage esthétique de Tokyo et les cultures alternatives mondiales.
          </p>
          <p>
            Nous sélectionnons et concevons des créations pour les passionnés d'épopées anime, de planches de mangas, d'incarnations cosplay d'exception et de bijoux d'artisanat japonais.
          </p>
          <p>
            Le cerisier Sakura en fleur est notre boussole perpétuelle : célébrer les instants précieux et éphémères de la créativité, la passion des fans et les récits partagés.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200/80 dark:border-white/5">
            <Shield className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6] mx-auto mb-1" />
            <div className="font-semibold text-slate-900 dark:text-white">Artisanat Authentique</div>
            <div className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">Zéro contrefaçon</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200/80 dark:border-white/5">
            <Compass className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6] mx-auto mb-1" />
            <div className="font-semibold text-slate-900 dark:text-white">Direct de Tokyo</div>
            <div className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">Akihabara & ateliers Kyoto</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200/80 dark:border-white/5">
            <Heart className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6] mx-auto mb-1" />
            <div className="font-semibold text-slate-900 dark:text-white">Otaku Avant Tout</div>
            <div className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">Votes des membres sur les drops</div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={() => setIsAboutOpen(false)}
            className="px-8 py-3 rounded-full bg-slate-900 text-white hover:bg-[#D46382] dark:bg-[#FAF8F5] dark:text-[#0B0D12] text-xs font-bold uppercase tracking-wider dark:hover:bg-[#E88CA6] transition-colors cursor-pointer shadow-md"
          >
            DÉCOUVRIR LA BOUTIQUE
          </button>
        </div>
      </div>
    </div>
  );
};
