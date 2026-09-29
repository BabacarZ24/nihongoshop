import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Tag,
  Flame,
  CheckCircle2,
  Package,
  Layers,
  ChevronRight,
  Award
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { ProductCategory, Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, theme } = useShop();

  // Scroll to top whenever the category id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // Current category info
  const categoryInfo = useMemo(() => {
    return CATEGORIES.find(
      (c) => c.id.toLowerCase() === (id || '').toLowerCase()
    );
  }, [id]);

  // All products matching this category
  const categoryProducts = useMemo(() => {
    if (!categoryInfo) return [];
    return products.filter((p) => p.category === categoryInfo.id);
  }, [products, categoryInfo]);

  // Dynamic tags from category products
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => {
      p.tags.forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, [categoryProducts]);

  // Filter & Sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTag('all');
    setSortBy('featured');
    setInStockOnly(false);
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let list = [...categoryProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.japaneseName && p.japaneseName.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Tag filter
    if (selectedTag !== 'all') {
      list = list.filter((p) => p.tags.includes(selectedTag));
    }

    // In stock only
    if (inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // 'featured'
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });

    return list;
  }, [categoryProducts, searchQuery, selectedTag, inStockOnly, sortBy]);

  // Other categories for exploration
  const otherCategories = useMemo(() => {
    return CATEGORIES.filter((c) => c.id !== categoryInfo?.id);
  }, [categoryInfo]);

  // If category not found
  if (!categoryInfo) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-[#E88CA6]/20 text-[#D46382] dark:text-[#E88CA6] flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-slate-900 dark:text-[#FAF8F5]">
          Univers Introuvable
        </h1>
        <p className="text-slate-600 dark:text-[#9CA3AF] max-w-md mb-8">
          L'univers recherché n'existe pas ou a été déplacé dans nos archives.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] font-semibold text-sm shadow-md hover:scale-105 transition-transform"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/category/anime"
            className="px-6 py-3 rounded-full bg-slate-200 text-slate-800 dark:bg-white/10 dark:text-white font-medium text-sm hover:bg-slate-300 dark:hover:bg-white/15 transition-colors"
          >
            Explorer l'univers Anime
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Top Breadcrumb & Universe Switcher Bar */}
      <div className="border-b border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#0B0D12]/70 backdrop-blur-md sticky top-[65px] z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Breadcrumb path */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#9CA3AF]">
              <Link
                to="/"
                className="hover:text-[#D46382] dark:hover:text-[#E88CA6] flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Accueil</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              <span>Univers</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              <span className="font-semibold text-slate-900 dark:text-[#FAF8F5] uppercase">
                {categoryInfo.name}
              </span>
            </div>

            {/* Quick Universe Jump Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {CATEGORIES.map((cat) => {
                const isActive = cat.id === categoryInfo.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/category/${cat.id}`)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] font-semibold shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-[#D1D5DB]'
                    }`}
                  >
                    <span>{cat.name.split(' ')[0]}</span>
                    <span className="text-[10px] opacity-75 font-jp">{cat.japanese}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Grand Hero Universe Banner */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/10 bg-[#0B0D12]">
        {/* Background Image with Parallax Aesthetic */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={categoryInfo.bannerImage || categoryInfo.image}
            alt={categoryInfo.name}
            className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105 transition-transform duration-1000"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-[#E88CA6]/15 to-transparent" />
        </div>

        {/* Massive Japanese Kanji Watermark */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-7xl sm:text-9xl md:text-[12rem] font-jp font-bold text-white/5 pointer-events-none select-none">
          {categoryInfo.japanese}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10">
          <div className="max-w-3xl space-y-5">
            {/* Discipline Tag */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#E88CA6] uppercase">
              <span className="px-2.5 py-0.5 rounded-full bg-black/60 border border-[#E88CA6]/30">
                DISCIPLINE {categoryInfo.disciplineNumber || '01'} // {categoryInfo.disciplineKanji || '領域'}
              </span>
              <span>•</span>
              <span className="text-white/80">{categoryInfo.itemCount}+ PIÈCES SÉLECTIONNÉES</span>
            </div>

            {/* Main Universe Title */}
            <div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2">
                {categoryInfo.name}
              </h1>
              <p className="text-lg sm:text-xl font-light text-[#F4A6BE] italic">
                &ldquo;{categoryInfo.tagline}&rdquo;
              </p>
            </div>

            {/* Description */}
            {categoryInfo.description && (
              <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed font-light max-w-2xl">
                {categoryInfo.description}
              </p>
            )}

            {/* Key highlights pills */}
            {categoryInfo.loreHighlights && categoryInfo.loreHighlights.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2 sm:gap-3">
                {categoryInfo.loreHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-xs text-[#FAF8F5]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E88CA6]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls Bar: Search, Tags, Sort, Stock */}
        <div className="bg-white dark:bg-[#12151E] rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* In-Universe Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#9CA3AF]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Rechercher dans l'univers ${categoryInfo.name}...`}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D46382] dark:focus:border-[#E88CA6] text-slate-900 dark:text-white placeholder-slate-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Sort & Stock Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* In stock toggle */}
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-[#D1D5DB] cursor-pointer select-none px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#D46382] focus:ring-[#D46382] w-4 h-4"
                />
                <span>En stock uniquement</span>
              </label>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-[#FAF8F5] focus:outline-none focus:border-[#D46382] cursor-pointer"
                >
                  <option value="featured" className="bg-white dark:bg-[#12151E]">Trier : Populaires & En vedette</option>
                  <option value="newest" className="bg-white dark:bg-[#12151E]">Trier : Nouveautés</option>
                  <option value="price-asc" className="bg-white dark:bg-[#12151E]">Trier : Prix croissant</option>
                  <option value="price-desc" className="bg-white dark:bg-[#12151E]">Trier : Prix décroissant</option>
                  <option value="rating" className="bg-white dark:bg-[#12151E]">Trier : Mieux notés</option>
                </select>
              </div>

              {/* Reset if modified */}
              {(searchQuery || selectedTag !== 'all' || inStockOnly || sortBy !== 'featured') && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-[#D46382] dark:text-[#E88CA6] hover:bg-[#E88CA6]/10 transition-colors cursor-pointer"
                  title="Réinitialiser les filtres"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser</span>
                </button>
              )}
            </div>
          </div>

          {/* Sub-tags Pill Bar */}
          {availableTags.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-mono text-slate-400 dark:text-[#9CA3AF] flex items-center gap-1 shrink-0">
                <Tag className="w-3 h-3 text-[#D46382] dark:text-[#E88CA6]" />
                Filtres :
              </span>

              <button
                onClick={() => setSelectedTag('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                  selectedTag === 'all'
                    ? 'bg-slate-900 text-white dark:bg-[#FAF8F5] dark:text-[#0B0D12]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-[#9CA3AF] dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                Tous ({categoryProducts.length})
              </button>

              {availableTags.map((tag) => {
                const isSelected = selectedTag === tag;
                const count = categoryProducts.filter((p) => p.tags.includes(tag)).length;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isSelected ? 'all' : tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12]'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-[#9CA3AF] dark:hover:bg-white/10 dark:hover:text-white'
                    }`}
                  >
                    {tag} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Results Header Count */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200/80 dark:border-white/10">
          <div className="text-sm font-medium text-slate-700 dark:text-[#D1D5DB]">
            Affichage de <span className="font-bold text-slate-900 dark:text-white">{filteredProducts.length}</span> {filteredProducts.length <= 1 ? 'création' : 'créations'} dans cet univers
          </div>

          <div className="text-xs font-mono text-[#D46382] dark:text-[#E88CA6] tracking-wider uppercase">
            SÉLECTION OFFICIELLE • 厳選
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-white dark:bg-[#12151E] rounded-2xl border border-dashed border-slate-300 dark:border-white/10 p-8">
            <Package className="w-12 h-12 text-slate-400 mx-auto mb-4 opacity-60" />
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">
              Aucun produit ne correspond à ces critères
            </h3>
            <p className="text-sm text-slate-500 dark:text-[#9CA3AF] max-w-md mx-auto mb-6">
              Essayez de modifier votre recherche ou de réinitialiser les filtres pour afficher l'ensemble des créations de cet univers.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-full bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] font-semibold text-xs shadow-md hover:scale-105 transition-transform"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>

      {/* Universe Craftsmanship & Lore Editorial Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200/60 dark:from-[#131722] dark:to-[#0B0D12] border border-slate-200/80 dark:border-white/10 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute right-6 top-6 text-6xl sm:text-8xl font-jp font-bold text-slate-900/5 dark:text-white/5 select-none pointer-events-none">
            {categoryInfo.japanese}
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D46382] dark:text-[#E88CA6] tracking-widest uppercase">
              <Award className="w-4 h-4" />
              <span>ENGAGEMENT QUALITÉ & AUTHENTICITÉ // 品質保証</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#FAF8F5]">
              L'Excellence de l'Univers {categoryInfo.name}
            </h2>

            <p className="text-sm text-slate-600 dark:text-[#D1D5DB] leading-relaxed font-light">
              Toutes les créations de cet univers sont conçues ou sélectionnées selon les critères d'exigence les plus stricts de Nighongoshop : traçabilité des matériaux, respect des œuvres d'animation et de manga, et conditionnement haute protection.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 space-y-1">
                <div className="text-xs font-bold text-slate-900 dark:text-[#FAF8F5]">100% Officiel</div>
                <div className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">Licences certifiées & créateurs indépendants</div>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 space-y-1">
                <div className="text-xs font-bold text-slate-900 dark:text-[#FAF8F5]">Expédition Blindée</div>
                <div className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">Emballage anti-choc et boîte d'art protégée</div>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 space-y-1">
                <div className="text-xs font-bold text-slate-900 dark:text-[#FAF8F5]">Support Otaku</div>
                <div className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">Équipe passionnée disponible 7j/7</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explorer les Autres Univers Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200/80 dark:border-white/10 gap-2">
          <div>
            <div className="text-xs font-mono text-[#D46382] dark:text-[#E88CA6] uppercase tracking-widest mb-1">
              CONTINUER LE VOYAGE // 他の世界
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#FAF8F5]">
              EXPLORER LES AUTRES UNIVERS
            </h3>
          </div>
          <Link
            to="/"
            className="text-xs font-bold uppercase tracking-wider text-[#D46382] dark:text-[#E88CA6] hover:underline flex items-center gap-1"
          >
            Retourner à l'accueil <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherCategories.slice(0, 3).map((other) => (
            <div
              key={other.id}
              onClick={() => navigate(`/category/${other.id}`)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer min-h-[220px] bg-[#12151E] border border-slate-200/80 dark:border-white/10 hover:border-[#D46382] dark:hover:border-[#E88CA6]/60 transition-all duration-500 hover:-translate-y-1 shadow-md p-6 flex flex-col justify-between"
            >
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={other.image}
                  alt={other.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-[0.65] group-hover:brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/60 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-[#E88CA6] bg-black/50 px-2.5 py-1 rounded-full border border-white/5">
                  {other.itemCount}+ ARTICLES
                </span>
                <span className="text-2xl font-jp font-bold text-white/20 group-hover:text-[#E88CA6]/40 transition-colors">
                  {other.japanese}
                </span>
              </div>

              <div className="relative z-10 space-y-1">
                <h4 className="font-display text-xl font-bold text-white group-hover:text-[#F4A6BE] transition-colors">
                  {other.name}
                </h4>
                <p className="text-xs text-[#D1D5DB] line-clamp-1 font-light">
                  {other.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#E88CA6] uppercase tracking-wider">
                  <span>Découvrir l'univers</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
