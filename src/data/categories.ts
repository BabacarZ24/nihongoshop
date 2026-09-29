import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'anime',
    name: 'ANIME',
    japanese: 'アニメ',
    tagline: 'Emportez vos récits d\'animation mythiques et visuels iconiques.',
    image: '/images/anime_jump_heroes.jpg',
    bannerImage: '/images/anime_jump_heroes.jpg',
    itemCount: 42,
    disciplineNumber: '01',
    disciplineKanji: '映像',
    description: 'Une plongée au cœur des créations iconiques de l\'animation tokyoïte : les héros légendaires réunis (Luffy, Deku, Tanjiro, Goku, Naruto, Asta), vinyles de bandes-originales remasterisées en studio analogique, cellulos de production d\'époque certifiés et néons d\'ambiance cinématique.',
    loreHighlights: [
      'Fresque commémorative des plus grands héros d\'anime et du Shonen Jump',
      'Bandes-originales pressées sur vinyles audiophiles d\'exception',
      'Cellulos d\'animation originaux sous passe-partout de musée',
      'Répliques de lames forgées avec trempe traditionnelle'
    ]
  },
  {
    id: 'manga',
    name: 'MANGA',
    japanese: '漫画',
    tagline: 'L\'encre et les récits qui ont façonné la légende.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1800&q=85',
    itemCount: 36,
    disciplineNumber: '02',
    disciplineKanji: '原作',
    description: 'L\'hommage au trait brut des maîtres mangakas : éditions reliées similicuir omnibus, artbooks aux planches haute définition et tirages d\'art sur papier d\'archivage non acide.',
    loreHighlights: [
      'Reliures d\'art grand format 7x10" avec gaufrage or et argent',
      'Papier vélin mat 150g/m² garantissant un noir d\'encre profond',
      'Storyboards et esquisses préparatoires d\'auteurs renommés'
    ]
  },
  {
    id: 'cosplay',
    name: 'COSPLAY',
    japanese: 'コスプレ',
    tagline: 'Costumes fidèles, haoris légendaires, tenues de combat et capes d\'apparat.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85',
    itemCount: 38,
    disciplineNumber: '03',
    disciplineKanji: '変身',
    description: 'Incarnez vos héros et héroïnes préférés : haoris de pourfendeurs brodés, manteaux d\'organisations secrètes Akatsuki, vestes sukajan en satin duchesse et tenues emblématiques aux finitions d\'orfèvre pour vos sorties et conventions.',
    loreHighlights: [
      'Coupes fidèles aux chara-designs originaux des mangas et animes',
      'Broderies haute densité japonaises et tissus nobles',
      'Confort optimal et allure saisissante pour conventions et shootings'
    ]
  },
  {
    id: 'accessories',
    name: 'BIJOUX & ACCESSOIRES',
    japanese: '装飾品',
    tagline: 'Pièces de caractère en argent massif 925 et talismans protecteurs.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1800&q=85',
    itemCount: 31,
    disciplineNumber: '04',
    disciplineKanji: '装身具',
    description: 'Bijoux sculptés à la cire perdue dans les ateliers de Kyoto : bagues florales Sakura en argent 925, pendentifs Hannya oxydés à l\'ancienne et cordons tressés Kumihimo de cérémonie.',
    loreHighlights: [
      'Argent massif 925 poinçonné et garanti sans nickel',
      'Pierres fines naturelles (quartz rose, onyx noir profond)',
      'Finitions patinées à la main révélant chaque micro-détail'
    ]
  }
];
