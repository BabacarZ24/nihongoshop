import React from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { SakuraCanvas } from './SakuraCanvas';

interface HeroProps {
  onExploreClick: () => void;
  onPopularClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onPopularClick }) => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-start overflow-hidden bg-[#FAF8F5] dark:bg-[#0B0D12] transition-colors duration-300"
    >
      {/* Background Cinematic Sakura Tree Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/hero-sakura.jpg"
          alt="Ancient Sakura tree blooming overlooking Mount Fuji at dawn"
          className="w-full h-full object-cover object-center scale-105 animate-fade-in transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
          loading="eager"
        />

        {/* Editorial gradients: Light mode luminous morning mist / Dark mode Tokyo twilight */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent dark:from-[#0B0D12]/90 dark:via-[#0B0D12]/60 dark:to-transparent max-w-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-black/10 dark:from-[#0B0D12] dark:to-black/30 h-full" />
        <div className="absolute inset-0 bg-radial-[circle_at_20%_50%] from-transparent via-black/5 to-black/20 dark:via-black/20 dark:to-black/50 pointer-events-none" />
      </div>

      {/* Interactive Falling Sakura Petals & Click Burst Canvas */}
      <SakuraCanvas className="z-10" />

      {/* Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16">
        <div className="max-w-2xl text-left space-y-6">
          {/* Authentic Japanese Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-[#E88CA6]/50 dark:border-[#E88CA6]/30 text-xs tracking-widest text-slate-800 dark:text-[#FAF8F5] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E88CA6] animate-ping" />
            <span className="font-semibold text-[#D46382] dark:text-[#F4A6BE]">桜の季節 2026</span>
            <span className="text-slate-300 dark:text-white/40">|</span>
            <span className="font-medium text-slate-700 dark:text-white/80">SAISON SAKURA EN COURS</span>
          </div>

          {/* Main Brand Title */}
          <div className="space-y-2">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-[#FAF8F5] drop-shadow-sm dark:drop-shadow-2xl">
              NIGHONGO
              <span className="text-[#D46382] dark:text-[#E88CA6] block sm:inline">SHOP</span>
            </h1>

            {/* Signature Japanese phrase */}
            <div className="flex items-center gap-3 text-lg sm:text-2xl font-serif text-slate-800 dark:text-[#F3F4F6] tracking-[0.2em]">
              <span className="text-[#D46382] dark:text-[#E88CA6] font-bold">「</span>
              <span className="font-semibold tracking-[0.25em] text-slate-900 dark:text-[#FAF8F5]">OTAKU NO SEKAI</span>
              <span className="text-[#D46382] dark:text-[#E88CA6] font-bold">」</span>
              <span className="text-xs sm:text-sm font-jp tracking-widest text-[#D46382] dark:text-[#E88CA6]/80 ml-1">
                オタクの世界
              </span>
            </div>
          </div>

          {/* Brand Philosophy / Tagline */}
          <p className="text-xl sm:text-2xl font-light tracking-wide text-slate-800 dark:text-[#FAF8F5] drop-shadow-xs">
            &ldquo;Là où fleurit la culture Otaku.&rdquo;
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#D1D5DB] leading-relaxed max-w-xl font-light">
            Un sanctuaire où l'héritage de l'animation japonaise, l'art du cosplay fidèle, les mangas légendaires et les bijoux d'orfèvrerie s'unissent en une expérience singulière.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              id="hero-primary-cta"
              onClick={onExploreClick}
              className="relative group px-8 py-4 bg-slate-900 text-white dark:bg-[#FAF8F5] dark:text-[#0B0D12] text-sm font-semibold tracking-wider uppercase rounded-full overflow-hidden transition-all duration-300 hover:bg-[#D46382] dark:hover:bg-[#E88CA6] hover:text-white dark:hover:text-[#0B0D12] hover:shadow-[0_0_24px_rgba(232,140,166,0.5)] active:scale-95 flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <span>EXPLORER LA BOUTIQUE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-secondary-cta"
              onClick={onPopularClick}
              className="px-7 py-4 bg-white/80 hover:bg-white dark:bg-black/40 dark:hover:bg-black/60 backdrop-blur-md text-slate-800 dark:text-[#FAF8F5] text-sm font-medium tracking-wider uppercase rounded-full border border-slate-300 hover:border-[#D46382] dark:border-white/20 dark:hover:border-[#E88CA6]/60 transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6]" />
              <span>PRODUITS POPULAIRES</span>
            </button>
          </div>

          {/* Micro interaction hint */}
          <div className="pt-8 flex items-center gap-2 text-xs text-slate-500 dark:text-[#9CA3AF]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E88CA6]" />
            <span>Cliquez ou déplacez le curseur pour animer les pétales de Sakura en suspension</span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-900 dark:text-white/50 dark:hover:text-white transition-colors cursor-pointer" onClick={onExploreClick}>
        <span className="text-[10px] tracking-[0.25em] uppercase font-mono">DÉFILER POUR DÉCOUVRIR</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#D46382] dark:text-[#E88CA6]" />
      </div>
    </section>
  );
};
