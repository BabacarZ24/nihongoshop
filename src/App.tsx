/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { AboutModal } from './components/AboutModal';
import { ModeratorModal } from './components/ModeratorModal';
import { PetalFlightAnimation } from './components/PetalFlightAnimation';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { CategoriesOverviewPage } from './pages/CategoriesOverviewPage';

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { setIsAboutOpen, theme } = useShop();
  const location = useLocation();

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  // Track active section only on home page
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['hero', 'categories', 'popular', 'otaku-collection'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'dark bg-[#0B0D12] text-[#F3F4F6]'
          : 'bg-[#FAF8F5] text-[#111827]'
      } selection:bg-[#E88CA6]/30 relative`}
    >
      {/* Flight animation for cherry petals flying to cart on click */}
      <PetalFlightAnimation />

      {/* Global Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<HomePage onNavigateSection={handleNavigate} />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/universe/:id" element={<CategoryPage />} />
        <Route path="/categories" element={<CategoriesOverviewPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Interactive Overlays & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <QuickSearchModal />
      <AboutModal />
      <ModeratorModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ShopProvider>
  );
}
