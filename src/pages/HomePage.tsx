import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { FeaturedCategories } from '../components/FeaturedCategories';
import { PopularProducts } from '../components/PopularProducts';
import { OtakuCollection } from '../components/OtakuCollection';
import { Newsletter } from '../components/Newsletter';
import { ProductCategory } from '../types';

interface HomePageProps {
  onNavigateSection: (sectionId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateSection }) => {
  const navigate = useNavigate();

  const handleSelectCategory = (category: ProductCategory) => {
    navigate(`/category/${category}`);
  };

  return (
    <main id="main-content" className="relative">
      <Hero
        onExploreClick={() => onNavigateSection('categories')}
        onPopularClick={() => onNavigateSection('popular')}
      />

      <FeaturedCategories onSelectCategory={handleSelectCategory} />

      <PopularProducts />

      <OtakuCollection onSelectWorld={handleSelectCategory} />

      <Newsletter />
    </main>
  );
};
