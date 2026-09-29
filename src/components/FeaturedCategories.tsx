import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { ProductCategory } from '../types';

interface FeaturedCategoriesProps {
  onSelectCategory?: (category: ProductCategory) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  const handleCardClick = (categoryId: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    navigate(`/category/${categoryId}`);
  };
  return (
    <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-200 dark:border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D46382] dark:text-[#E88CA6] tracking-widest uppercase mb-2">
            <span>02</span>
            <span>/</span>
            <span>UNIVERS SÉLECTIONNÉS</span>
            <span className="text-[#D46382]/60 dark:text-[#E88CA6]/50">オタク領域</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#FAF8F5]">
            EXPLORER PAR UNIVERS
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-[#9CA3AF] max-w-md font-light">
          Les 4 univers d'exception de la culture Otaku : Anime, Manga, Cosplay et Accessoires d'artisanat.
        </p>
      </div>

      {/* Grid of 4 Large Editorial Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => {
          return (
            <div
              key={cat.id}
              id={`category-card-${cat.id}`}
              onClick={() => handleCardClick(cat.id)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-slate-200/80 dark:border-white/10 hover:border-[#D46382] dark:hover:border-[#E88CA6]/60 transition-all duration-700 hover:-translate-y-1.5 shadow-md dark:shadow-xl min-h-[340px] flex flex-col justify-between"
            >
              {/* Background Image with Zoom */}
              <div className="absolute inset-0 w-full h-full bg-[#161A24]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-108 filter brightness-[0.75] group-hover:brightness-[0.9]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Editorial Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />
                <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-[#E88CA6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Japanese Kanji Watermark */}
              <div className="absolute top-4 right-5 text-4xl sm:text-5xl font-jp font-bold text-white/10 group-hover:text-[#E88CA6]/20 transition-colors select-none">
                {cat.japanese}
              </div>

              {/* Card Content */}
              <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest text-[#E88CA6] bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/5">
                    {cat.itemCount}+ PIÈCES
                  </span>

                  <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#E88CA6] text-white group-hover:text-[#0B0D12] flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FAF8F5] tracking-wide mb-1 group-hover:text-[#F4A6BE] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D1D5DB] font-light max-w-sm line-clamp-2">
                    &ldquo;{cat.tagline}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
