import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, Globe, Sparkles, Shield, ShieldCheck, Lock, Sun, Moon, ChevronDown } from 'lucide-react';
import { useShop, CURRENCIES } from '../context/ShopContext';
import { CurrencyCode } from '../types';
import { CATEGORIES } from '../data/categories';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAboutOpen,
    setIsModeratorOpen,
    isModeratorAuthenticated,
    moderatorUser,
    currency,
    setCurrency,
    cartIconRef,
    cartBouncing,
    theme,
    toggleTheme
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [universesDropdownOpen, setUniversesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Accueil', kanji: 'ホーム' },
    { id: 'categories', label: 'Catégories', kanji: '分類', hasDropdown: true },
    { id: 'popular', label: 'Populaires', kanji: '人気' }
  ];

  const handleBrandClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        onNavigate(id);
      }, 150);
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
    setUniversesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleMouseEnterUniverses = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setUniversesDropdownOpen(true);
  };

  const handleMouseLeaveUniverses = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setUniversesDropdownOpen(false);
    }, 200);
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#0B0D12]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-2xl py-3.5'
          : 'bg-white/70 dark:bg-gradient-to-b dark:from-black/60 dark:via-black/20 dark:to-transparent backdrop-blur-xs border-b border-slate-200/40 dark:border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand signature */}
        <div className="flex items-center gap-3">
          <button
            id="nav-brand-logo"
            onClick={handleBrandClick}
            className="group flex flex-col text-left focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E88CA6] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_#E88CA6]" />
              <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.18em] text-slate-900 group-hover:text-[#D46382] dark:text-[#FAF8F5] dark:group-hover:text-[#F4A6BE] transition-colors">
                NIGHONGOSHOP
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 text-[10px] tracking-[0.25em] text-slate-500 dark:text-[#9CA3AF] uppercase">
              <span>OTAKU NO SEKAI</span>
              <span className="text-[#D46382] dark:text-[#E88CA6]/70">オタクの世界</span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.id;
            
            if (item.hasDropdown) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={handleMouseEnterUniverses}
                  onMouseLeave={handleMouseLeaveUniverses}
                >
                  <button
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className="relative py-2 text-sm font-medium tracking-wider text-slate-600 hover:text-slate-900 dark:text-[#D1D5DB] dark:hover:text-[#FAF8F5] transition-colors group focus:outline-none flex flex-col items-center cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      <span>{item.label}</span>
                      <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180 opacity-60" />
                    </div>
                    <span className="text-[9px] text-slate-400 dark:text-[#9CA3AF]/60 tracking-widest -mt-0.5 group-hover:text-[#D46382] dark:group-hover:text-[#E88CA6]/80 transition-colors">
                      {item.kanji}
                    </span>

                    {isActive && (
                      <span className="absolute -bottom-1 w-5 h-0.5 bg-gradient-to-r from-transparent via-[#E88CA6] to-transparent rounded-full animate-pulse shadow-[0_0_6px_#E88CA6]" />
                    )}
                  </button>

                  {/* Universes Dropdown */}
                  {universesDropdownOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-72 bg-white dark:bg-[#12151E] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-1.5 border-b border-slate-100 dark:border-white/5 text-[10px] font-mono text-slate-400 dark:text-[#9CA3AF] uppercase tracking-wider flex items-center justify-between">
                        <span>PAGES DES UNIVERS DÉDIÉS</span>
                        <span className="text-[#E88CA6]">4 UNIVERS</span>
                      </div>
                      <div className="py-1">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat.id)}
                            className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between transition-colors group/item cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover/item:bg-[#E88CA6] group-hover/item:scale-125 transition-all" />
                              <span className="text-xs font-medium text-slate-700 dark:text-[#E5E7EB] group-hover/item:text-[#D46382] dark:group-hover/item:text-[#F4A6BE]">
                                {cat.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-jp text-slate-400 dark:text-[#9CA3AF]/60 group-hover/item:text-[#E88CA6]">
                              {cat.japanese}
                            </span>
                          </button>
                        ))}
                      </div>
                      <div className="pt-1 px-3 border-t border-slate-100 dark:border-white/5">
                        <button
                          onClick={() => {
                            navigate('/categories');
                            setUniversesDropdownOpen(false);
                          }}
                          className="w-full text-center py-1.5 text-[11px] font-semibold text-[#D46382] dark:text-[#E88CA6] hover:underline"
                        >
                          Voir la vue d'ensemble des 4 univers →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className="relative py-2 text-sm font-medium tracking-wider text-slate-600 hover:text-slate-900 dark:text-[#D1D5DB] dark:hover:text-[#FAF8F5] transition-colors group focus:outline-none flex flex-col items-center cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="text-[9px] text-slate-400 dark:text-[#9CA3AF]/60 tracking-widest -mt-0.5 group-hover:text-[#D46382] dark:group-hover:text-[#E88CA6]/80 transition-colors">
                  {item.kanji}
                </span>

                {isActive && (
                  <span
                    className="absolute -bottom-1 w-5 h-0.5 bg-gradient-to-r from-transparent via-[#E88CA6] to-transparent rounded-full animate-pulse shadow-[0_0_6px_#E88CA6]"
                  />
                )}
                {!isActive && (
                  <span className="absolute -bottom-1 w-0 h-0.5 bg-[#E88CA6] transition-all duration-300 group-hover:w-4 rounded-full opacity-60" />
                )}
              </button>
            );
          })}
          <button
            id="nav-link-about"
            onClick={() => setIsAboutOpen(true)}
            className="py-2 text-sm font-medium tracking-wider text-slate-600 hover:text-slate-900 dark:text-[#D1D5DB] dark:hover:text-[#FAF8F5] transition-colors focus:outline-none flex flex-col items-center group cursor-pointer"
          >
            <span>À propos</span>
            <span className="text-[9px] text-slate-400 dark:text-[#9CA3AF]/60 tracking-widest -mt-0.5 group-hover:text-[#D46382] dark:group-hover:text-[#E88CA6]/80">
              概要
            </span>
          </button>
        </nav>

        {/* Right utility actions: Currency switcher, Theme Toggle, Moderator, Search, Wishlist, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Currency selector (hidden on small mobile to give priority to Moderator button, available in mobile drawer) */}
          <div className="relative hidden md:block">
            <button
              id="currency-selector-btn"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 dark:bg-white/5 dark:hover:bg-white/10 dark:text-[#E5E7EB] dark:border-white/10 transition-colors cursor-pointer"
              title="Changer de devise"
            >
              <Globe className="w-3.5 h-3.5 text-[#D46382] dark:text-[#E88CA6]" />
              <span className="font-mono">{currency}</span>
            </button>

            {currencyDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#12151E] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl py-1 z-50 backdrop-blur-xl"
                onMouseLeave={() => setCurrencyDropdownOpen(false)}
              >
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currency === c
                        ? 'bg-[#E88CA6]/20 text-[#D46382] dark:text-[#FAF8F5] font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:bg-white/5 dark:hover:text-[#FAF8F5]'
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-[10px] opacity-60">{CURRENCIES[c].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Light/Dark mode) */}
          <button
            id="nav-theme-toggle-btn"
            onClick={toggleTheme}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-amber-200 border border-slate-200/80 dark:border-white/15 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
            title={theme === 'dark' ? 'Basculer vers le mode clair (par défaut)' : 'Basculer vers le mode sombre'}
            aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                <span className="hidden md:inline font-semibold text-amber-200">Clair</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span className="hidden md:inline font-semibold text-slate-800">Sombre</span>
              </>
            )}
          </button>

          {/* Moderator Dashboard trigger: ALWAYS VISIBLE ON MOBILE AND DESKTOP */}
          <button
            id="nav-moderator-button"
            onClick={() => setIsModeratorOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isModeratorAuthenticated
                ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)] hover:scale-105'
                : 'bg-[#E88CA6]/20 hover:bg-[#E88CA6]/30 text-[#B83E63] dark:text-[#F4A6BE] border border-[#E88CA6]/50 shadow-[0_0_12px_rgba(232,140,166,0.2)] hover:scale-105'
            }`}
            title={
              isModeratorAuthenticated
                ? `Espace Modérateur (Connecté : ${moderatorUser?.displayName || 'Admin'})`
                : 'Connexion Espace Modérateur (Réservé aux modérateurs)'
            }
          >
            {isModeratorAuthenticated ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="inline font-bold">Modérateur</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#D46382] dark:text-[#E88CA6]" />
                <span className="inline font-bold">Modérateur</span>
              </>
            )}
          </button>

          {/* Search trigger */}
          <button
            id="nav-search-button"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-[#D1D5DB] dark:hover:text-[#FAF8F5] dark:hover:bg-white/10 rounded-full transition-all focus:outline-none cursor-pointer"
            aria-label="Rechercher dans la boutique"
            title="Recherche rapide"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist trigger */}
          <button
            id="nav-wishlist-button"
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-[#D1D5DB] dark:hover:text-[#FAF8F5] dark:hover:bg-white/10 rounded-full transition-all focus:outline-none cursor-pointer"
            aria-label="Favoris"
            title="Liste d'envies"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#E88CA6] text-[#0B0D12] text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_#E88CA6]">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart trigger */}
          <button
            ref={cartIconRef}
            id="nav-cart-button"
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-[#D1D5DB] dark:hover:text-[#FAF8F5] dark:hover:bg-white/10 rounded-full transition-all focus:outline-none cursor-pointer ${
              cartBouncing ? 'scale-125 text-[#D46382] dark:text-[#F4A6BE]' : ''
            }`}
            aria-label="Panier d'achats"
            title="Votre panier"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-[#E88CA6] text-[#0B0D12] text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_#E88CA6]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-[#D1D5DB] dark:hover:text-[#FAF8F5] lg:hidden focus:outline-none cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-[#0B0D12]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 px-5 py-5 transition-all shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {/* PROMINENT TOP MODERATOR CARD ON MOBILE */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                isModeratorAuthenticated
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-gradient-to-r from-[#E88CA6]/15 via-[#D46382]/10 to-purple-500/10 border-[#E88CA6]/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono tracking-wider uppercase font-bold text-[#B83E63] dark:text-[#F4A6BE] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#D46382] dark:text-[#E88CA6]" />
                  <span>{isModeratorAuthenticated ? 'Session Modérateur Active' : 'Espace Modérateur Réservé'}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">管理者</span>
              </div>
              <button
                id="mobile-drawer-top-moderator-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsModeratorOpen(true);
                }}
                className={`w-full py-2.5 px-3.5 rounded-xl font-bold text-xs flex items-center justify-between shadow-xs transition-all cursor-pointer ${
                  isModeratorAuthenticated
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gradient-to-r from-[#B83E63] to-[#D46382] text-white hover:opacity-95'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isModeratorAuthenticated ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <ShieldCheck className="w-4 h-4" />
                      <span>Gérer les articles & stocks</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Connexion Modérateur (Accéder)</span>
                    </>
                  )}
                </div>
                <span className="text-[10px] font-mono opacity-90 underline">Ouvrir &rarr;</span>
              </button>
            </div>

            {/* Mobile Currency & Theme Controls */}
            <div className="grid grid-cols-2 gap-2 mb-1">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                <span className="text-xs text-slate-500 dark:text-[#9CA3AF] flex items-center gap-1 font-medium">
                  <Globe className="w-3.5 h-3.5 text-[#D46382]" /> Devise
                </span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="bg-transparent text-xs font-mono font-bold text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                >
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                    <option key={c} value={c} className="bg-white dark:bg-[#12151E] text-slate-900 dark:text-white">
                      {c} ({CURRENCIES[c].symbol})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs text-slate-800 dark:text-white cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
                  <span className="font-medium">Thème</span>
                </div>
                <span className="font-bold text-[11px] text-[#D46382] dark:text-[#E88CA6]">
                  {theme === 'dark' ? 'Sombre' : 'Clair'}
                </span>
              </button>
            </div>

            {/* Standard Nav items */}
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center justify-between text-left py-2.5 text-base font-medium text-slate-800 hover:text-[#D46382] dark:text-[#E5E7EB] dark:hover:text-[#F4A6BE] border-b border-slate-100 dark:border-white/5 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E88CA6]" />
                  <span>{item.label}</span>
                </div>
                <span className="text-xs text-slate-400 dark:text-[#9CA3AF] tracking-widest">{item.kanji}</span>
              </button>
            ))}

            {/* Mobile Dedicated Universes Section */}
            <div className="pt-2 pb-1">
              <div className="text-[11px] font-mono text-[#D46382] dark:text-[#E88CA6] tracking-wider uppercase mb-2 flex items-center gap-1.5">
                <span>PAGES PAR UNIVERS // 各世界専用</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-left flex flex-col justify-between hover:border-[#D46382] dark:hover:border-[#E88CA6] transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-800 dark:text-[#FAF8F5] truncate">
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-jp text-slate-400 dark:text-[#9CA3AF]">
                      {cat.japanese}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              id="mobile-nav-about"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAboutOpen(true);
              }}
              className="flex items-center justify-between text-left py-2.5 text-base font-medium text-slate-800 hover:text-[#D46382] dark:text-[#E5E7EB] dark:hover:text-[#F4A6BE] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6]" />
                <span>À propos de Nighongoshop</span>
              </div>
              <span className="text-xs text-slate-400 dark:text-[#9CA3AF]">概要</span>
            </button>

            <button
              id="mobile-nav-moderator"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsModeratorOpen(true);
              }}
              className={`flex items-center justify-between text-left py-2.5 px-3 rounded-xl border text-base font-semibold mt-2 cursor-pointer transition-colors ${
                isModeratorAuthenticated
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/25'
                  : 'bg-[#E88CA6]/15 border-[#E88CA6]/40 text-[#B83E63] dark:text-[#F4A6BE] hover:bg-[#E88CA6]/25'
              }`}
            >
              <div className="flex items-center gap-2">
                {isModeratorAuthenticated ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Espace Modérateur (Connecté)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6]" />
                    <span>Connexion Modérateur</span>
                  </>
                )}
              </div>
              <span className="text-xs font-mono text-[#D46382] dark:text-[#E88CA6]">
                {isModeratorAuthenticated ? '認証済' : '管理者'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
