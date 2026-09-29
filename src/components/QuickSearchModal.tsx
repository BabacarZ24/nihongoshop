import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { CATEGORIES } from '../data/categories';

export const QuickSearchModal: React.FC = () => {
  const navigate = useNavigate();
  const {
    isSearchOpen,
    setIsSearchOpen,
    setSelectedProductForDetail,
    formatPrice,
    products
  } = useShop();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularTags = [
    'Anime',
    'Manga',
    'Cosplay',
    'Sakura Season',
    'Naruto',
    'Argent 925',
    'Berserk',
    'Haori'
  ];

  const results = products.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      (p.japaneseName && p.japaneseName.toLowerCase().includes(q))
    );
  });

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    setSelectedProductForDetail(product);
  };

  const handleSelectCategory = (categoryId: string) => {
    setIsSearchOpen(false);
    navigate(`/category/${categoryId}`);
  };

  return (
    <div
      id="quick-search-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-20"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        id="quick-search-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl text-slate-900 dark:text-[#FAF8F5] animate-fade-in transition-colors duration-300"
      >
        {/* Search input bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D46382] dark:text-[#E88CA6] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher anime, cosplay, mangas, accessoires..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 dark:text-white/50 dark:hover:text-white cursor-pointer"
              aria-label="Effacer la recherche"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Tags Pills */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-slate-500 dark:text-[#9CA3AF] shrink-0 font-medium">Tendances :</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-slate-200/70 hover:bg-[#D46382] hover:text-white text-slate-700 dark:bg-black/40 dark:hover:bg-[#E88CA6] dark:hover:text-[#0B0D12] dark:text-[#D1D5DB] transition-colors border border-slate-300/50 dark:border-white/5 shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {!query ? (
            <div className="py-4 space-y-5">
              <div className="text-center text-xs text-slate-500 dark:text-[#9CA3AF] space-y-1">
                <Sparkles className="w-6 h-6 text-[#D46382] dark:text-[#E88CA6] mx-auto opacity-70" />
                <p>Saisissez un mot-clé ou accédez directement à un univers dédié :</p>
              </div>

              {/* Direct Universes Shortcuts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 hover:border-[#D46382] dark:hover:border-[#E88CA6] flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-[#FAF8F5] group-hover:text-[#D46382] dark:group-hover:text-[#F4A6BE]">
                        {cat.name.split(' ')[0]}
                      </div>
                      <div className="text-[10px] font-jp text-slate-400 dark:text-[#9CA3AF]">
                        {cat.japanese}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E88CA6] group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 dark:text-[#9CA3AF]">
              Aucune création trouvée pour &ldquo;{query}&rdquo;. Essayez un autre mot-clé ou parcourez nos univers.
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-[#D46382] dark:text-[#E88CA6] tracking-widest uppercase mb-2">
                {results.length} CRÉATION{results.length > 1 ? 'S' : ''} TROUVÉE{results.length > 1 ? 'S' : ''}
              </div>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 hover:border-[#D46382]/40 dark:border-white/5 dark:hover:border-[#E88CA6]/30 cursor-pointer transition-all group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-14 h-16 rounded-xl object-cover bg-slate-200 dark:bg-black/40 shrink-0 border border-slate-200 dark:border-transparent"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#D46382] dark:text-[#E88CA6] uppercase">
                        {product.category}
                      </span>
                      {product.isLimited && (
                        <span className="text-[9px] bg-[#D46382] dark:bg-[#E88CA6] text-white dark:text-[#0B0D12] font-bold px-1.5 py-0.2 rounded">
                          ÉDITION LIMITÉE
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-semibold text-slate-900 group-hover:text-[#D46382] dark:text-[#FAF8F5] dark:group-hover:text-[#F4A6BE] transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] truncate">
                      {product.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-[#FAF8F5]">
                      {formatPrice(product.price)}
                    </div>
                    <span className="text-[10px] text-[#D46382] dark:text-[#E88CA6] flex items-center justify-end gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Voir <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
