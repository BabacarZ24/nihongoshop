import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export const CategoriesOverviewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#9CA3AF]">
        <Link
          to="/"
          className="hover:text-[#D46382] dark:hover:text-[#E88CA6] flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Accueil</span>
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-900 dark:text-[#FAF8F5] uppercase">
          Tous les Univers Otaku
        </span>
      </div>

      {/* Header */}
      <div className="mb-14 border-b border-slate-200 dark:border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D46382] dark:text-[#E88CA6] tracking-widest uppercase mb-2">
            <Compass className="w-4 h-4" />
            <span>LES 4 DOMAINES DE LA MAÎTRISE OTAKU</span>
            <span className="text-[#D46382]/60 dark:text-[#E88CA6]/50">全領域一覧</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#FAF8F5]">
            TOUS NOS UNIVERS
          </h1>
        </div>
        <p className="text-sm text-slate-600 dark:text-[#9CA3AF] max-w-md font-light">
          Chaque univers dispose de sa propre sélection rigoureuse, de ses pièces d'artisans certifiées et de son identité visuelle propre.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat, idx) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-slate-200/80 dark:border-white/10 hover:border-[#D46382] dark:hover:border-[#E88CA6]/60 transition-all duration-700 hover:-translate-y-2 shadow-lg min-h-[380px] flex flex-col justify-between p-8 bg-[#10131A]"
          >
            {/* Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out filter brightness-[0.65] group-hover:brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/50 to-transparent" />
            </div>

            {/* Kanji */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full bg-black/60 text-[#E88CA6] border border-[#E88CA6]/30">
                DISCIPLINE 0{idx + 1}
              </span>
              <span className="text-4xl font-jp font-bold text-white/20 group-hover:text-[#E88CA6]/40 transition-colors">
                {cat.japanese}
              </span>
            </div>

            {/* Text details */}
            <div className="relative z-10 space-y-3">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FAF8F5] group-hover:text-[#F4A6BE] transition-colors">
                {cat.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#D1D5DB] font-light leading-relaxed">
                {cat.tagline}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-[#E88CA6]">
                  {cat.itemCount}+ PIÈCES SÉLECTIONNÉES
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#E88CA6]">
                  Ouvrir la page <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
