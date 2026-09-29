import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

export const PopularProducts: React.FC = () => {
  const { products } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | ProductCategory>('all');

  const tabs: { id: 'all' | ProductCategory; label: string; kanji: string }[] = [
    { id: 'all', label: 'Toutes les créations', kanji: 'すべて' },
    { id: 'anime', label: 'Anime', kanji: 'アニメ' },
    { id: 'cosplay', label: 'Cosplay', kanji: 'コスプレ' },
    { id: 'manga', label: 'Manga', kanji: '漫画' },
    { id: 'accessories', label: 'Bijoux & Accessoires', kanji: '装身具' }
  ];

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter((p) => p.category === activeTab);

  return (
    <section id="popular" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-slate-200 dark:border-white/10 pb-6 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D46382] dark:text-[#E88CA6] tracking-widest uppercase mb-2">
            <span>04</span>
            <span>/</span>
            <span>SIGNATURES DE LA COMMUNAUTÉ</span>
            <span className="text-[#D46382]/60 dark:text-[#E88CA6]/50">人気アイテム</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#FAF8F5]">
            PRODUITS POPULAIRES
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-popular-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] font-semibold shadow-sm dark:shadow-[0_0_16px_rgba(232,140,166,0.3)]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80 dark:bg-white/5 dark:text-[#D1D5DB] dark:hover:bg-white/10 dark:hover:text-white dark:border-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] ${isActive ? 'opacity-80' : 'text-slate-400 dark:text-[#9CA3AF]/60'}`}>
                  {tab.kanji}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
