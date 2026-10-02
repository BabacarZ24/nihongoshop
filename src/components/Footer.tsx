import React from 'react';
import { ArrowUp, Instagram, MessageCircle, Twitter, Shield, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAbout }) => {
  const { setIsModeratorOpen } = useShop();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sectionId: string) => {
    if (window.location.hash !== '#/' && window.location.hash !== '') {
      navigate('/');
      setTimeout(() => onNavigate(sectionId), 150);
    } else {
      onNavigate(sectionId);
    }
  };

  return (
    <footer id="sakura-footer" className="relative bg-slate-100 dark:bg-[#07090E] text-slate-600 dark:text-[#9CA3AF] border-t border-slate-200 dark:border-white/10 overflow-hidden pt-16 pb-12 transition-colors duration-300">
      {/* Subtle Sakura branch / silhouette watermark */}
      <div className="absolute right-0 bottom-0 w-96 h-96 opacity-[0.04] pointer-events-none select-none">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#E88CA6]" fill="currentColor">
          <path d="M10,200 Q150,150 250,220 T400,180" stroke="currentColor" strokeWidth="8" fill="none" />
          <circle cx="200" cy="180" r="14" />
          <circle cx="280" cy="210" r="18" />
          <circle cx="140" cy="160" r="12" />
          <circle cx="340" cy="190" r="16" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-white/10">
          {/* Main Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E88CA6] shadow-[0_0_10px_#E88CA6]" />
              <span className="font-display text-2xl font-bold tracking-[0.2em] text-slate-900 dark:text-[#FAF8F5]">
                NIGHONGOSHOP
              </span>
            </div>

            <div className="text-xs font-mono tracking-[0.25em] text-[#D46382] dark:text-[#E88CA6] uppercase">
              OTAKU NO SEKAI • オタクの世界
            </div>

            <p className="text-base font-light text-slate-800 dark:text-[#FAF8F5] italic">
              &ldquo;Là où fleurit la culture Otaku.&rdquo;
            </p>

            <p className="text-xs text-slate-600 dark:text-[#9CA3AF] leading-relaxed max-w-sm font-light">
              Le Sakura est l'âme. Les produits sont le centre. La culture Otaku est la personnalité. Un pont moderne reliant l'héritage de l'animation tokyoïte aux esthétiques contemporaines mondiales.
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-200 hover:bg-[#D46382] hover:text-white text-slate-700 dark:bg-white/5 dark:hover:bg-[#E88CA6] dark:hover:text-[#0B0D12] dark:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-200 hover:bg-[#D46382] hover:text-white text-slate-700 dark:bg-white/5 dark:hover:bg-[#E88CA6] dark:hover:text-[#0B0D12] dark:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.49 6.3 6.3 0 0 0 1.83-4.5V8.9a8.28 8.28 0 0 0 4.85 1.56V7a4.88 4.88 0 0 1-.95-.31z" />
                </svg>
              </a>
              <a
                href="https://wa.me/221782468632"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-200 hover:bg-[#25D366] hover:text-white text-slate-700 dark:bg-white/5 dark:hover:bg-[#25D366] dark:hover:text-white dark:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="WhatsApp (+221 78 246 86 32)"
                title="WhatsApp: +221 78 246 86 32"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-[#FAF8F5]">
              EXPLORER // ナビ
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleSectionClick('hero')}
                  className="text-slate-600 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('categories')}
                  className="text-slate-600 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Catégories en vedette
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('popular')}
                  className="text-slate-600 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Articles Populaires
                </button>
              </li>
              <li>
                <button onClick={onOpenAbout} className="text-slate-600 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Philosophie & À Propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsModeratorOpen(true)}
                  className="text-[#D46382] dark:text-[#E88CA6] hover:underline transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
                >
                  <Shield className="w-3 h-3 text-[#D46382] dark:text-[#E88CA6]" />
                  <span>Espace Modérateur // 管理者</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Dedicated Universes Pages Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#D46382] dark:text-[#E88CA6]">
              PAGES PAR UNIVERS // 各世界
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="text-slate-600 dark:text-[#9CA3AF] hover:text-[#D46382] dark:hover:text-[#E88CA6] transition-colors flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-jp opacity-50 group-hover:opacity-100">{cat.japanese}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/categories"
                  className="text-[11px] font-semibold text-[#D46382] dark:text-[#E88CA6] hover:underline"
                >
                  Tous les univers →
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-[#FAF8F5]">
              ASSISTANCE // サポート
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-600 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-[#FAF8F5] cursor-pointer">Garantie d'Authenticité & Qualité</span>
              </li>
              <li>
                <span className="text-slate-600 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-[#FAF8F5] cursor-pointer">Livraison Express Internationale</span>
              </li>
              <li>
                <span className="text-slate-600 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-[#FAF8F5] cursor-pointer">Retours & Échanges (30 Jours)</span>
              </li>
              <li>
                <span className="text-slate-600 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-[#FAF8F5] cursor-pointer">Guide des Tailles & Mesures</span>
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/221782468632"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline font-medium text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp : +221 78 246 86 32</span>
                </a>
              </li>
              <li className="pt-2">
                <div className="text-[11px] font-mono text-[#D46382] dark:text-[#E88CA6]">
                  HUB OTAKU TOKYO & INTERNAT.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 dark:text-[#6B7280]">
            © 2026 NIGHONGOSHOP. Conçu par des Otakus, pour les Otakus. Tous droits réservés.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-500 hover:text-slate-900 dark:text-[#6B7280] dark:hover:text-[#FAF8F5] cursor-pointer">Politique de Confidentialité</span>
            <span className="text-slate-500 hover:text-slate-900 dark:text-[#6B7280] dark:hover:text-[#FAF8F5] cursor-pointer">Conditions Générales</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#D46382] hover:text-[#c24b6c] dark:text-[#E88CA6] dark:hover:text-[#F4A6BE] transition-colors font-mono cursor-pointer"
            >
              <span>HAUT DE PAGE</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
