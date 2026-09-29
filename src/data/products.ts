import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ================= ANIME =================
  {
    id: 'prod-027',
    name: 'Fresque Murale Collector Héros Anime Shonen Jump',
    japaneseName: '週刊少年ジャンプ 歴代ヒーロー記念大判特装アート',
    slug: 'shonen-jump-heroes-collector-wall-art',
    description: 'Tirage d\'art grand format haute définition réunissant les héros légendaires de l\'animation japonaise : Luffy, Deku, Tanjiro, Goku, Naruto, Asta et les icônes du Shonen Jump sur toile canevas tendue avec cadre en aluminium noir mat.',
    detailedStory: 'Édition commémorative exclusive reproduisant la célèbre fresque historique célébrant 50 ans d\'aventures, de courage et de dépassement de soi. Encres pigmentaires garanties inaltérables pendant plus de 75 ans.',
    price: 35000,
    originalPrice: 42000,
    images: [
      '/images/anime_jump_heroes.jpg',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'anime',
    stock: 14,
    rating: 5.0,
    reviewCount: 88,
    tags: ['Anime', 'Héros', 'Shonen Jump', 'One Piece', 'Tableau Collector', 'Populaire'],
    isPopular: true,
    isNew: true,
    dropBatch: 'Anime Masterworks Vol. 1',
    specs: [
      { label: 'Support', value: 'Toile Canevas Coton 380g/m² monté sur châssis' },
      { label: 'Impression', value: 'Encres Minérales 12 Couleurs Giclée' },
      { label: 'Dimensions', value: 'Format Panoramique 90 cm × 50 cm' },
      { label: 'Finition', value: 'Cadre Caisse Américaine en Aluminium Anodisé Noir' }
    ]
  },
  {
    id: 'prod-013',
    name: 'Coffret Vinyle 3LP Samurai Champloo "Way of the Samurai"',
    japaneseName: 'サムライチャンプルー 記念限定アナログLP盤',
    slug: 'samurai-champloo-vinyl-boxset',
    description: 'Coffret vinyle collector 3LP marbré rose poudré et noir obsidienne. Remasterisation analogique directe des bandes originales master de Nujabes et Fat Jon avec pochette gaufrée feuille d\'or.',
    detailedStory: 'Édition commémorative officielle sous licence exclusive Victor Entertainment Japan. Inclut un livret de 24 pages avec commentaires des producteurs, paroles calligraphiées et 3 lithographies inédites.',
    price: 45000,
    originalPrice: 52000,
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'anime',
    stock: 10,
    rating: 5.0,
    reviewCount: 76,
    tags: ['Anime', 'Vinyle 3LP', 'Nujabes', 'Édition Limitée', 'Musique Officielle'],
    isLimited: true,
    isPopular: true,
    dropBatch: 'Anime Masterworks Vol. 1',
    specs: [
      { label: 'Pressage', value: 'Vinyle Audiophile 180g Marbré' },
      { label: 'Pochette', value: 'Fourreau Rigide Triple Volet avec Dorure' },
      { label: 'Audio', value: 'Mastering Analogique Haute Résolution' },
      { label: 'Bonus', value: 'Livret 24 Pages + 3 Lithographies 30x30cm' }
    ]
  },
  {
    id: 'prod-014',
    name: 'Cellulo d\'Animation Original Ghibli Princesse Mononoké',
    japaneseName: 'スタジオジブリ 原画 セル画 保証書付',
    slug: 'studio-ghibli-original-animation-cel',
    description: 'Véritable cellulo d\'animation peint à la main sur feuille d\'acétate avec son dessin préparatoire à la mine de plomb d\'origine (Douga). Encadré sous verre musée antireflet anti-UV avec passe-partout sans acide.',
    detailedStory: 'Pièce historique certifiée issue des archives de production d\'animation japonaise traditionnelle peinte à la main avant le passage au numérique. Chaque cellulo est unique au monde et porte le tampon officiel du studio.',
    price: 110000,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'anime',
    stock: 3,
    rating: 5.0,
    reviewCount: 14,
    tags: ['Anime', 'Cellulo Original', 'Studio Ghibli', 'Musée', 'Pièce Unique'],
    isLimited: true,
    isPopular: true,
    dropBatch: 'Archives Cinématographiques',
    specs: [
      { label: 'Support', value: 'Feuille d\'Acétate Peinte à la Main + Croquis Douga' },
      { label: 'Encadrement', value: 'Cadre Chêne Massif Noirci + Verre Musée Anti-UV 99%' },
      { label: 'Dimensions', value: '35 cm × 28 cm' },
      { label: 'Certificat', value: 'Certificat d\'Authenticité Numéroté et Scellé à la Cire' }
    ]
  },
  {
    id: 'prod-015',
    name: 'Enseigne Néon LED Verre Soufflé Kanji Neo-Akira',
    japaneseName: 'ネオ東京 カンジ ネオンサイン',
    slug: 'neo-akira-kanji-neon-sign',
    description: 'Enseigne lumineuse néon artisanale en tube silicone haute fidélité monté sur acrylique transparent découpé au laser. Reproduit les idéogrammes cyberpunk de Neo-Tokyo avec variateur d\'ambiance et télécommande sans fil.',
    detailedStory: 'Crée instantanément une atmosphère nocturne digne des ruelles pluvieuses de Shinjuku dans votre espace. Basse consommation, sans chauffe et garantie 50 000 heures d\'illumination continue.',
    price: 32000,
    originalPrice: 38000,
    images: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'anime',
    stock: 12,
    variants: [
      { id: 'v-color', name: 'Lueur Néon', type: 'color', options: ['Rose Sakura & Rouge Cyber', 'Bleu Électrique & Violet'] }
    ],
    rating: 4.89,
    reviewCount: 38,
    tags: ['Anime', 'Néon LED', 'Cyberpunk', 'Déco Bureau', 'Ambiance'],
    isNew: true,
    dropBatch: 'Neo-Tokyo Tech',
    specs: [
      { label: 'Technologie', value: 'Néon Flex LED Basse Tension 12V Sécurisé' },
      { label: 'Dimensions', value: '45 cm × 30 cm' },
      { label: 'Contrôle', value: 'Télécommande RF 10 Niveaux de Luminosité' }
    ]
  },
  {
    id: 'prod-016',
    name: 'Katana Nichirin Tanjiro Kamado Forgé à la Main',
    japaneseName: '日輪刀 炭治郎 手打ち鍛造 炭素鋼',
    slug: 'tanjiro-kamado-hand-forged-nichirin-sword',
    description: 'Réplique d\'artisan forgée en acier carbone 1060 poli à la pierre avec lame noire profonde trempée à l\'argile. Garde Tsuba en roue ajourée coulée en laiton et fourreau Saya laqué noir mat avec corde Sageo en soie.',
    detailedStory: 'Véritable pièce de ferronnerie d\'art réalisée selon les préceptes de la forge japonaise traditionnelle. Livré avec son support de présentation en bois de rose laqué et son coffret en soie brodée.',
    price: 58000,
    originalPrice: 65000,
    images: [
      'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'anime',
    stock: 7,
    rating: 4.96,
    reviewCount: 52,
    tags: ['Anime', 'Demon Slayer', 'Katana Forgé', 'Acier Carbone', 'Édition Limitée'],
    isLimited: true,
    dropBatch: 'Otaku Masters Vol. 2',
    specs: [
      { label: 'Lame', value: 'Acier Carbone 1060 Trempé Traditionnel' },
      { label: 'Longueur Totale', value: '103 cm (Lame : 71 cm, Tsuka : 27 cm)' },
      { label: 'Tsuka (Manche)', value: 'Peau de Raie Véritable (Samegawa) + Cordon Coton Tressé' },
      { label: 'Accessoires', value: 'Support bois laqué + Housse en brocart de soie' }
    ]
  },

  // ================= COSPLAY =================
  {
    id: 'prod-006',
    name: 'Manteau Cape Cosplay Akatsuki Nuage Rouge',
    japaneseName: '暁 組織 完全再現 コスプレ外套',
    slug: 'akatsuki-cloud-cosplay-cloak',
    description: 'Manteau long d\'apparat de l\'organisation Akatsuki en tissu lourd doublé de satin cramoisi. Arbore les nuages rouges brodés au point de bourdon avec col montant rigide et zip métallique robuste.',
    detailedStory: 'Réplique de costume haute fidélité conçue pour conventions et rassemblements cosplayers. Coupe ample et tombé majestueux pour reproduire fidèlement l\'allure imposante d\'Itachi et Pain.',
    price: 36000,
    originalPrice: 42000,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'cosplay',
    stock: 18,
    variants: [
      { id: 'v-size', name: 'Taille', type: 'size', options: ['S', 'M', 'L', 'XL', 'XXL'] }
    ],
    rating: 4.95,
    reviewCount: 64,
    tags: ['Cosplay', 'Naruto', 'Akatsuki', 'Cape', 'Convention', 'Costume'],
    isNew: true,
    isPopular: true,
    dropBatch: 'Série Cosplay Kage',
    specs: [
      { label: 'Matière', value: 'Twill de Coton Peigné Épais & Doublure Satinée Rouge' },
      { label: 'Col', value: 'Col Montant Structuré 12 cm thermo-renforcé' },
      { label: 'Fermeture', value: 'Zip métallique discret dissimulé sous parement' },
      { label: 'Broderie', value: 'Nuages Rouges en Relief Haute Définition' }
    ]
  },
  {
    id: 'prod-020',
    name: 'Haori Cosplay Pourfendeur Grue Céleste & Sakura',
    japaneseName: '鬼殺の羽織 鶴桜 豪華刺繍 コスプレ衣装',
    slug: 'demon-slayer-haori-crane-sakura-cosplay',
    description: 'Veste Haori traditionnelle de combat ample avec manches pagodes, broderie fil d\'or et motifs géométriques japonais. Tissu fluide et soyeux infroissable, idéal pour shootings et conventions.',
    detailedStory: 'Conçue selon les coupes authentiques des maîtres artisans de Kyoto. La coupe permet une liberté de mouvement totale pour les poses dynamiques et le port du katana à la ceinture.',
    price: 29500,
    originalPrice: 34000,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'cosplay',
    stock: 15,
    variants: [
      { id: 'v-size', name: 'Taille', type: 'size', options: ['M (Oversize)', 'L (Oversize)', 'XL (Oversize)'] }
    ],
    rating: 4.93,
    reviewCount: 27,
    tags: ['Cosplay', 'Haori', 'Demon Slayer', 'Pourfendeur', 'Broderie Or'],
    isPopular: true,
    dropBatch: 'Ligne Cosplay 2026',
    specs: [
      { label: 'Matière', value: 'Sergé de Rayonne & Viscose Soyeuse Respirante' },
      { label: 'Finition', value: 'Broderie Grue Japonaise Fil Or Métallisé' },
      { label: 'Coupe', value: 'Coupe Traditionnelle Haori Japonaise Authentique' }
    ]
  },
  {
    id: 'prod-002',
    name: 'Veste Sukajan Réversible "Mankai" Cosplay Sukajan',
    japaneseName: '満開 桜 刺繡スカジャン 本格コスプレ衣装',
    slug: 'sakura-mankai-sukajan-jacket-cosplay',
    description: 'Veste souvenir traditionnelle japonaise réversible avec broderie haute densité de branches de cerisiers en fleurs à 140 000 points sur satin duchesse mat double face et doublure en cupro.',
    detailedStory: 'Pièce emblématique du style sukajan japonais portée dans les animes de voyous et yakuzas légendaires (Tokyo Revengers, GTO). Design réversible ultra-polyvalent.',
    price: 68000,
    originalPrice: 75000,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'cosplay',
    stock: 9,
    variants: [
      { id: 'v-size', name: 'Taille', type: 'size', options: ['M', 'L', 'XL'] }
    ],
    rating: 5.0,
    reviewCount: 34,
    tags: ['Cosplay', 'Sukajan', 'Satin de Soie', 'Tokyo Revengers', 'Édition Limitée'],
    isLimited: true,
    isPopular: true,
    dropBatch: 'Ligne Cosplay 2026',
    specs: [
      { label: 'Tissu', value: 'Satin Duchesse Mat avec intérieur Cupro' },
      { label: 'Broderie', value: '140 000 points en fil de rayonne japonaise' },
      { label: 'Fermeture', value: 'Zip YKK double curseur en canon de fusil' }
    ]
  },
  {
    id: 'prod-001',
    name: 'Tunique Cosplay Mode Ermite Naruto Uzumaki',
    japaneseName: '仙人モード 完全再現 コスプレ衣装',
    slug: 'naruto-sage-mode-cosplay-tunic',
    description: 'Tunique cosplay oversize à épaules tombantes inspirée de la tenue légendaire de Naruto lors de son duel contre Pain. Arbore le sceau Mode Ermite brodé au dos et manches ourlées.',
    detailedStory: 'Conçue pour un tombé lourd et un confort irréprochable en convention. Tissu 280 GSM prélavé pour une résistance parfaite à l\'usure et aux froissements.',
    price: 18500,
    originalPrice: 22000,
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'cosplay',
    stock: 24,
    variants: [
      { id: 'v-size', name: 'Taille', type: 'size', options: ['S', 'M', 'L', 'XL', 'XXL'] }
    ],
    rating: 4.9,
    reviewCount: 48,
    tags: ['Cosplay', 'Naruto', 'Mode Ermite', 'Costume', 'Nouveauté'],
    isNew: true,
    isPopular: true,
    dropBatch: 'Série Cosplay Kage',
    specs: [
      { label: 'Matière', value: '100% Coton Biologique Peigné Épais (280 GSM)' },
      { label: 'Coupe', value: 'Coupe Boxy Kimono Épaules Tombantes' },
      { label: 'Entretien', value: 'Lavage délicat à froid, séchage à l\'ombre' }
    ]
  },

  // ================= MANGA =================
  {
    id: 'prod-005',
    name: 'Coffret Collector Berserk Deluxe Intégrale',
    japaneseName: 'ベルセルク 豪華装丁愛蔵版 全集',
    slug: 'berserk-deluxe-collector-set',
    description: 'Volumes omnibus grand format 7x10 pouces reliés en similicuir noir gaufré avec sceau rouge métallisé, signet textile bordeaux et tranche ébène.',
    detailedStory: 'Le chef-d\'œuvre monumental de dark fantasy de Kentaro Miura, imprimé sur papier d\'art mat sans acide de 150 g/m² pour sublimer chaque coup d\'encre, hachure sombre et double-page d\'anthologie.',
    price: 38000,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'manga',
    stock: 11,
    rating: 5.0,
    reviewCount: 91,
    tags: ['Manga', 'Relié Deluxe', 'Berserk', 'Dark Fantasy', 'Chef-d\'œuvre'],
    isPopular: true,
    dropBatch: 'Bibliothèque des Archives',
    specs: [
      { label: 'Format', value: 'Reliure Luxe 7x10" Similicuir Gaufré' },
      { label: 'Pages', value: '704 Pages Papier d\'Archivage Lourd' },
      { label: 'Langue', value: 'Édition française avec glossaire des termes d\'origine' }
    ]
  },
  {
    id: 'prod-010',
    name: 'Artbook Coffret Collector Chainsaw Man Bloodline',
    japaneseName: 'チェンソーマン 原画集 特装版',
    slug: 'chainsaw-man-bloodline-artbook',
    description: 'Archive artistique exclusive de 320 pages haute résolution réunissant esquisses de personnages, illustrations de couvertures, carnets de notes de l\'auteur et 5 tirages d\'art holographiques argentés.',
    detailedStory: 'Publication officielle japonaise sous licence incluant storyboards inédits et ébauches préparatoires. Confectionnée avec reliure japonaise au fil visible et étui fourreau orange sanguin.',
    price: 24500,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'manga',
    stock: 16,
    rating: 4.88,
    reviewCount: 45,
    tags: ['Manga', 'Chainsaw Man', 'Artbook', 'Édition Limitée', 'Artbooks & Livres Rares'],
    isNew: true,
    dropBatch: 'Bibliothèque des Archives',
    specs: [
      { label: 'Pagination', value: '320 Pages Couleur Papier Couché Glacé' },
      { label: 'Bonus', value: '5 Tirages d\'Art Holographiques Argentés' },
      { label: 'Reliure', value: 'Reliure Cousue Layflat Traditionnelle' }
    ]
  },
  {
    id: 'prod-019',
    name: 'Coffret Collector L\'Attaque des Titans Édition Colossale',
    japaneseName: '進撃の巨人 巨大愛蔵版 全巻特装箱',
    slug: 'shingeki-no-kyojin-colossal-edition',
    description: 'Édition monumentale format XXL à dos toilé rigide orné de dorures à chaud et tranches teintées noir cendre. Regroupe les arcs narratifs majeurs avec planches de croquis inédites de Hajime Isayama.',
    detailedStory: 'Un format spectaculaire permettant de saisir toute la frénésie du vol tridimensionnel et le gigantisme des remparts de Paradis sur papier d\'art satiné.',
    price: 42000,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'manga',
    stock: 8,
    rating: 4.97,
    reviewCount: 53,
    tags: ['Manga', 'Shingeki no Kyojin', 'Édition Colossale', 'Luxe'],
    isLimited: true,
    dropBatch: 'Bibliothèque des Archives',
    specs: [
      { label: 'Dimensions', value: 'Grand Format Prestige 21 × 30 cm' },
      { label: 'Dos', value: 'Toile Tissée Noire avec Marquage Titane' },
      { label: 'Poids', value: '3,2 kg' }
    ]
  },

  // ================= ACCESSORIES =================
  {
    id: 'prod-007',
    name: 'Bague Pétale de Sakura en Argent Massif 925',
    japaneseName: '桜花弁 純銀925リング',
    slug: 'sterling-silver-sakura-petal-ring',
    description: 'Bague artisanale en argent massif 925 figurant des pétales de cerisiers délicatement enroulés avec micro-incrustation d\'un quartz rose naturel.',
    detailedStory: 'Fondue et polie à la main dans le quartier historique des joailliers de Kyoto. Ses courbes organiques épousent le mouvement naturel d\'un pétale de sakura flottant dans l\'air printanier.',
    price: 18500,
    originalPrice: 22000,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'accessories',
    stock: 15,
    variants: [
      { id: 'v-size', name: 'Taille Bague (US)', type: 'size', options: ['6', '7', '8', '9', '10'] }
    ],
    rating: 4.92,
    reviewCount: 41,
    tags: ['Saison Sakura', 'Argent 925', 'Bijou', 'Artisanal', 'Fait Main'],
    isLimited: true,
    isPopular: true,
    dropBatch: 'Saison Sakura 2026',
    specs: [
      { label: 'Pureté', value: 'Poinçon Argent Massif 925 Authentique' },
      { label: 'Pierre', value: 'Quartz Rose Naturel de Madagascar' },
      { label: 'Finition', value: 'Rhodium Vieilli Haut Brillant' }
    ]
  },
  {
    id: 'prod-011',
    name: 'Pendentif Masque Hannya en Argent Massif Oxydé',
    japaneseName: '般若 燻し銀 ペンダントネックレス',
    slug: 'hannya-mask-silver-pendant',
    description: 'Pendentif imposant en argent massif 925 sculpté au visage expressif du masque de théâtre Hannya, oxydé pour un contraste dramatique des ombres. Chaîne maille épi de 60 cm incluse.',
    detailedStory: 'Symbole de protection contre le mauvais sort et les forces obscures. Taillé avec des crocs hyper-détaillés et des orbites ajourées qui projettent des reflets évocateurs au gré de la lumière.',
    price: 26000,
    originalPrice: 30000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'accessories',
    stock: 12,
    rating: 4.96,
    reviewCount: 38,
    tags: ['Accessoires', 'Bijou', 'Hannya', 'Argent 925', 'Amulette'],
    isPopular: true,
    dropBatch: 'Trésors de Kyoto',
    specs: [
      { label: 'Matière', value: 'Argent Massif 925 (28 grammes)' },
      { label: 'Chaîne', value: 'Chaîne Maille Épi Oxydée 60 cm (3 mm)' },
      { label: 'Dimensions', value: '38 mm × 24 mm' }
    ]
  },
  {
    id: 'prod-025',
    name: 'Bracelet Tressé Kumihimo Traditionnel & Fermoir Argent Sakura',
    japaneseName: '組紐 伝統工芸 純銀留め具ブレスレット',
    slug: 'kumihimo-braided-bracelet-silver-sakura',
    description: 'Cordon de soie naturelle tressé selon l\'art séculaire du Kumihimo sur disque Marudai. Teintes dégradées indigo profond et rose cerisier, fermoir magnétique usiné en argent 925 gravé.',
    detailedStory: 'Popularisé mondialement par les récits de Makoto Shinkai comme symbole du fil invisible reliant les destins. Livré dans un coffret en papier washi fait main.',
    price: 16500,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'accessories',
    stock: 18,
    rating: 4.91,
    reviewCount: 26,
    tags: ['Kumihimo', 'Soie Japonaise', 'Argent 925', 'Sakura', 'Fait Main'],
    isNew: true,
    dropBatch: 'Saison Sakura 2026',
    specs: [
      { label: 'Tressage', value: '16 Fuseaux de Soie Naturelle Japonaise' },
      { label: 'Fermoir', value: 'Aimant Néodyme Blindé en Argent Massif 925' },
      { label: 'Longueur', value: 'Ajustable 17 cm - 21 cm' }
    ]
  }
];
