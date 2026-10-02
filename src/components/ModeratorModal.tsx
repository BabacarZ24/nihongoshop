import React, { useState, useRef, useMemo } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Search,
  Check,
  Camera,
  Image as ImageIcon,
  Package,
  ShoppingBag,
  RotateCcw,
  Eye,
  Sparkles,
  Upload,
  Star,
  Layers,
  LogOut,
  KeyRound,
  ShieldCheck,
  Lock,
  UserCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory } from '../types';
import { ModeratorLogin } from './ModeratorLogin';

const CATEGORY_OPTIONS: { id: ProductCategory; label: string }[] = [
  { id: 'anime', label: 'Univers Anime' },
  { id: 'manga', label: 'Manga & Livres' },
  { id: 'cosplay', label: 'Cosplay & Costumes' },
  { id: 'accessories', label: 'Accessoires & Bijoux' }
];

const ANGLE_SLOT_DEFS = [
  { slot: 0, title: 'Angle 1 : Face', subtitle: 'Photo de couverture principale', hint: 'Face / Présentation globale', kanji: '正面' },
  { slot: 1, title: 'Angle 2 : Profil', subtitle: 'Perspective latérale', hint: 'Côté gauche ou droit / 3/4', kanji: '側面' },
  { slot: 2, title: 'Angle 3 : Dos', subtitle: 'Vue arrière', hint: 'Dos / Verso de l\'article', kanji: '背面' },
  { slot: 3, title: 'Angle 4 : Détail', subtitle: 'Gros plan / Finitions', hint: 'Zoom tissu, matière, gravure', kanji: '詳細' }
];

const SAMPLE_PRESETS = [
  {
    name: 'Fresque Murale Héros Anime Shonen Jump',
    category: 'anime' as ProductCategory,
    images: [
      '/images/anime_jump_heroes.jpg',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    name: 'Manteau Cape Cosplay Akatsuki Nuage Rouge',
    category: 'cosplay' as ProductCategory,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    name: 'Artbook Édition Limitée Berserk & Manga',
    category: 'manga' as ProductCategory,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    name: 'Pendentif Masque Hannya Argent Massif',
    category: 'accessories' as ProductCategory,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

// Helper to compress camera/gallery images before storing in base64
const compressImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('Erreur lors du chargement de l\'image'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
    reader.readAsDataURL(file);
  });
};

export const ModeratorModal: React.FC = () => {
  const {
    isModeratorOpen,
    setIsModeratorOpen,
    isModeratorAuthenticated,
    moderatorUser,
    logoutModerator,
    changeModeratorPassword,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    formatPrice,
    orders,
    setSelectedProductForDetail
  } = useShop();

  const [activeTab, setActiveTab] = useState<'list' | 'form' | 'orders' | 'security'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Password change state in security tab
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Hidden file inputs for Camera & Gallery
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);

  // Form data state with 4 VISUAL ANGLES
  const [formData, setFormData] = useState<{
    name: string;
    category: ProductCategory;
    price: string;
    stock: string;
    images: string[];
    description: string;
    isPopular: boolean;
    isNew: boolean;
  }>({
    name: '',
    category: 'anime',
    price: '',
    stock: '10',
    images: [],
    description: '',
    isPopular: false,
    isNew: true
  });

  const [newImageUrl, setNewImageUrl] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = filterCategory === 'all' || p.category === filterCategory;
      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, filterCategory]);

  if (!isModeratorOpen) return null;

  // STRICT ACCESS CONTROL: Only authenticated moderators can access the management section
  if (!isModeratorAuthenticated) {
    return <ModeratorLogin onClose={() => setIsModeratorOpen(false)} />;
  }

  const openCameraForSlot = (slot: number) => {
    setTargetSlot(slot);
    cameraInputRef.current?.click();
  };

  const openGalleryForSlot = (slot: number) => {
    setTargetSlot(slot);
    galleryInputRef.current?.click();
  };

  const handleClearSlot = (slotIndex: number) => {
    setFormData((prev) => {
      const updated = [...prev.images];
      updated.splice(slotIndex, 1);
      return { ...prev, images: updated };
    });
    showToast(`Angle ${slotIndex + 1} retiré.`);
  };

  // Handle image upload from camera or gallery (supports slot target or batch)
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      showToast(`Compression de ${files.length} photo(s)...`);
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressedBase64 = await compressImageFile(files[i]);
        newImages.push(compressedBase64);
      }

      setFormData((prev) => {
        let updated = [...prev.images];
        if (targetSlot !== null) {
          // Replace or set targeted angle slot
          updated[targetSlot] = newImages[0];
          // If multiple images were chosen, fill subsequent slots
          for (let k = 1; k < newImages.length; k++) {
            const nextSlot = targetSlot + k;
            if (nextSlot < 4) {
              updated[nextSlot] = newImages[k];
            }
          }
        } else {
          // Batch append up to 4 angles
          updated = [...updated, ...newImages].slice(0, 4);
        }
        return {
          ...prev,
          images: updated
        };
      });

      showToast(`${newImages.length} photo(s) intégrée(s) aux angles du produit !`);
    } catch {
      alert('Impossible de charger une ou plusieurs images. Veuillez réessayer.');
    } finally {
      e.target.value = '';
      setTargetSlot(null);
    }
  };

  // Add an image from URL input
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImageUrl.trim()]
    }));
    setNewImageUrl('');
    showToast('Nouvel angle photo ajouté via URL !');
  };

  // Remove a specific angle
  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
    showToast('Photo supprimée de la sélection.');
  };

  // Set an angle as main image (index 0)
  const handleSetMainImage = (indexToPromote: number) => {
    setFormData((prev) => {
      const target = prev.images[indexToPromote];
      const remaining = prev.images.filter((_, idx) => idx !== indexToPromote);
      return {
        ...prev,
        images: [target, ...remaining]
      };
    });
    showToast('Défini comme photo principale (Angle 1).');
  };

  // Start edit
  const handleStartEdit = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      images: product.images && product.images.length > 0 ? [...product.images] : [],
      description: product.description || '',
      isPopular: Boolean(product.isPopular),
      isNew: Boolean(product.isNew)
    });
    setActiveTab('form');
  };

  // Reset form
  const handleResetForm = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      category: 'clothing',
      price: '',
      stock: '10',
      images: [],
      description: '',
      isPopular: false,
      isNew: true
    });
    setNewImageUrl('');
  };

  // Quick stock change
  const handleStockDelta = (productId: string, delta: number) => {
    const p = products.find((item) => item.id === productId);
    if (!p) return;
    const newStock = Math.max(0, p.stock + delta);
    updateProduct(productId, { stock: newStock });
  };

  // Submit product
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Veuillez saisir un nom pour le produit.');
      return;
    }

    const priceNum = parseFloat(formData.price);
    if (!priceNum || priceNum <= 0) {
      alert('Veuillez saisir un prix valide.');
      return;
    }

    const stockNum = parseInt(formData.stock, 10) || 0;
    const finalImages =
      formData.images.length > 0
        ? formData.images
        : [
            'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=800&q=80'
          ];

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: formData.name.trim(),
        category: formData.category,
        price: priceNum,
        stock: stockNum,
        images: finalImages,
        description: formData.description.trim() || 'Article officiel disponible dans la boutique.',
        isPopular: formData.isPopular,
        isNew: formData.isNew
      });
      showToast(`Produit "${formData.name}" mis à jour (${finalImages.length} angles) !`);
    } else {
      addProduct({
        name: formData.name.trim(),
        category: formData.category,
        price: priceNum,
        stock: stockNum,
        images: finalImages,
        description: formData.description.trim() || 'Nouvel article ajouté au catalogue.',
        isPopular: formData.isPopular,
        isNew: formData.isNew
      });
      showToast(`Produit "${formData.name}" créé avec ${finalImages.length} angle(s) visuel(s) !`);
    }

    handleResetForm();
    setActiveTab('list');
  };

  // Delete product
  const handleDeleteProduct = (productId: string, name: string) => {
    if (window.confirm(`Supprimer le produit "${name}" ?`)) {
      deleteProduct(productId);
      showToast(`"${name}" supprimé.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleImageFileChange}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageFileChange}
      />

      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900 dark:text-[#FAF8F5]">
        {/* Toast */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#D46382] dark:bg-[#E88CA6] text-white dark:text-[#0B0D12] text-xs font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-[#121622] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#D46382]/15 dark:bg-[#E88CA6]/20 text-[#D46382] dark:text-[#E88CA6] flex items-center justify-center font-bold">
              📸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold tracking-wide text-slate-900 dark:text-white">
                  Espace Modérateur
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {moderatorUser?.displayName || 'Modérateur'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">
                Gestion des articles, stock, galerie multi-angles & commandes
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-black/50 p-1 rounded-xl">
            <button
              onClick={() => {
                setActiveTab('list');
                handleResetForm();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-slate-900 text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:text-white'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Articles ({products.length})</span>
            </button>

            <button
              onClick={() => {
                handleResetForm();
                setActiveTab('form');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-slate-900 text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{editingProductId ? 'Modifier l\'article' : 'Ajouter un article'}</span>
            </button>

            {orders.length > 0 && (
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-slate-900 text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Commandes ({orders.length})</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('security')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-slate-900 text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:text-white'
              }`}
              title="Sécurité & mot de passe"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Sécurité</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Voulez-vous vous déconnecter de votre session modérateur ?')) {
                  logoutModerator();
                  showToast('Déconnexion effectuée.');
                }
              }}
              className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Déconnexion de la modération"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Déconnexion</span>
            </button>

            <button
              onClick={() => setIsModeratorOpen(false)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TAB 1: Products List */}
        {activeTab === 'list' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un article..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D46382] dark:focus:border-[#E88CA6]"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="all">Toutes les catégories</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    if (window.confirm('Réinitialiser le catalogue avec les articles par défaut ?')) {
                      resetProductsToDefault();
                      showToast('Catalogue réinitialisé.');
                    }
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-[#9CA3AF] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Restaurer la liste par défaut"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Réinitialiser</span>
                </button>
              </div>
            </div>

            {/* List of Products */}
            <div className="divide-y divide-slate-100 dark:divide-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-black/20">
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  Aucun produit ne correspond à votre recherche.
                </div>
              ) : (
                filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                  >
                    {/* Thumbnail, Name & 4 Angles Preview */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center gap-1 shrink-0">
                        {p.images.slice(0, 4).map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${p.name} angle ${idx + 1}`}
                            className={`rounded-lg object-cover bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${
                              idx === 0
                                ? 'w-11 h-14 ring-1 ring-[#D46382] dark:ring-[#E88CA6]'
                                : 'w-7 h-10 hidden sm:block opacity-80'
                            }`}
                            referrerPolicy="no-referrer"
                            title={`Angle ${idx + 1} (${['Face', 'Profil', 'Dos', 'Détail'][idx] || ''})`}
                          />
                        ))}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {p.name}
                          </h4>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                            {p.images.length >= 4 ? '4/4 angles' : `${p.images.length}/4 angles`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-[#9CA3AF]">
                            {p.category}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#D46382] dark:text-[#E88CA6]">
                            {formatPrice(p.price)}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                            • Face, Profil, Dos & Zoom
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stock Controls & Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      {/* Stock +/- */}
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-black/40 px-2 py-1 rounded-xl border border-slate-200 dark:border-white/5">
                        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline mr-1">
                          Stock:
                        </span>
                        <button
                          onClick={() => handleStockDelta(p.id, -1)}
                          className="w-5 h-5 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-mono font-bold text-xs text-slate-900 dark:text-white">
                          {p.stock}
                        </span>
                        <button
                          onClick={() => handleStockDelta(p.id, +1)}
                          className="w-5 h-5 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* View on shop */}
                      <button
                        onClick={() => {
                          setSelectedProductForDetail(p);
                          setIsModeratorOpen(false);
                        }}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/15 text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white transition-colors cursor-pointer"
                        title="Voir la fiche produit et ses angles"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleStartEdit(p)}
                        className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors cursor-pointer"
                        title="Modifier l'article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Simple Add/Edit Form with Multi-Angle Photo Studio */}
        {activeTab === 'form' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6]" />
                  <span>{editingProductId ? `Modifier : ${formData.name}` : 'Ajouter un Nouvel Article'}</span>
                </h3>

                {editingProductId && (
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-xs text-[#D46382] dark:text-[#E88CA6] hover:underline cursor-pointer"
                  >
                    Réinitialiser le formulaire
                  </button>
                )}
              </div>

              {/* 📸 4-ANGLE VISUAL STUDIO: Camera / Gallery / 4 Dedicated Slots */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#D46382] dark:text-[#E88CA6] flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      <span>1. LES 4 ANGLES DU PRODUIT ({formData.images.filter(Boolean).length}/4 configurés)</span>
                    </label>
                    <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">
                      Chaque produit dispose de 4 vues : Face, Profil, Dos et Gros plan.
                    </p>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white shrink-0">
                    Format : 4 angles standards
                  </span>
                </div>

                {/* Quick Batch Actions & URL Bar */}
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Batch Camera */}
                    <button
                      type="button"
                      onClick={() => {
                        setTargetSlot(null);
                        cameraInputRef.current?.click();
                      }}
                      className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Photographier (Appareil photo)</span>
                    </button>

                    {/* Batch Gallery */}
                    <button
                      type="button"
                      onClick={() => {
                        setTargetSlot(null);
                        galleryInputRef.current?.click();
                      }}
                      className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Sélectionner 4 photos de la galerie</span>
                    </button>
                  </div>

                  {/* URL Input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddImageUrl();
                        }
                      }}
                      placeholder="Ou collez l'URL d'une image pour ajouter un angle (https://...)"
                      className="flex-1 px-3 py-2 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#D46382]"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      disabled={!newImageUrl.trim() || formData.images.length >= 4}
                      className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                {/* 4 Dedicated Visual Angle Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  {ANGLE_SLOT_DEFS.map((def) => {
                    const imgUrl = formData.images[def.slot];
                    return (
                      <div
                        key={def.slot}
                        className={`rounded-2xl p-3 border transition-all flex flex-col justify-between ${
                          imgUrl
                            ? 'bg-white dark:bg-[#121622] border-slate-200 dark:border-white/15 shadow-sm'
                            : 'bg-white/40 dark:bg-black/20 border-dashed border-slate-300 dark:border-white/10'
                        }`}
                      >
                        <div>
                          {/* Slot Header */}
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{def.title}</span>
                                {def.kanji && (
                                  <span className="text-[10px] font-jp opacity-60">
                                    {def.kanji}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-[#9CA3AF] line-clamp-1">
                                {def.hint}
                              </p>
                            </div>
                            {imgUrl ? (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                                Prêt ✓
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-400 dark:text-slate-500">
                                Vide
                              </span>
                            )}
                          </div>

                          {/* Visual Frame */}
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 flex items-center justify-center mb-2.5">
                            {imgUrl ? (
                              <img
                                src={imgUrl}
                                alt={def.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center p-3">
                                <ImageIcon className="w-7 h-7 mx-auto mb-1 text-slate-300 dark:text-white/20" />
                                <span className="text-[10px] text-slate-400 dark:text-[#9CA3AF] font-mono">
                                  Angle manquant
                                </span>
                              </div>
                            )}

                            {/* Slot Badge */}
                            <div className="absolute top-1.5 left-1.5 pointer-events-none">
                              <span className="px-1.5 py-0.5 rounded bg-black/75 text-white text-[9px] font-mono font-bold">
                                #{def.slot + 1}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Slot Buttons */}
                        <div className="space-y-1.5">
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              type="button"
                              onClick={() => openCameraForSlot(def.slot)}
                              className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-[#D46382] text-white dark:bg-[#E88CA6] dark:text-[#0B0D12] text-[11px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
                              title={`Prendre une photo pour ${def.title}`}
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <span>{imgUrl ? 'Changer' : 'Photo'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => openGalleryForSlot(def.slot)}
                              className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
                              title={`Choisir depuis la galerie pour ${def.title}`}
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Galerie</span>
                            </button>
                          </div>

                          {imgUrl && (
                            <button
                              type="button"
                              onClick={() => handleClearSlot(def.slot)}
                              className="w-full py-1 text-[10px] text-rose-500 hover:text-rose-600 dark:text-rose-400 hover:underline flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Effacer cet angle</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick 4-angle presets */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-200 dark:border-white/5">
                  <span className="text-[10px] text-slate-400 shrink-0 font-mono">Packs Démo 4 angles :</span>
                  {SAMPLE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          images: [...preset.images],
                          category: preset.category,
                          name: prev.name || preset.name
                        }));
                        showToast(`Pack "${preset.name}" (4 angles) chargé !`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-[10px] text-slate-700 dark:text-white whitespace-nowrap transition-colors cursor-pointer"
                    >
                      {preset.name.split(' ')[0]} {preset.name.split(' ')[1]} (4 angles)
                    </button>
                  ))}
                </div>
              </div>

              {/* 🏷️ ARTICLE DETAILS */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase font-bold text-[#D46382] dark:text-[#E88CA6]">
                  2. INFORMATIONS DE L'ARTICLE
                </label>

                {/* Nom */}
                <div>
                  <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">
                    Nom de l'article *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Haori Cosplay Pourfendeur Grue Céleste"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D46382] dark:focus:border-[#E88CA6]"
                  />
                </div>

                {/* Catégorie, Prix, Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">
                      Catégorie *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as ProductCategory })
                      }
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D46382]"
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">
                      Prix (FCFA) *
                    </label>
                    <input
                      type="number"
                      required
                      min={100}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="15000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#D46382]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">
                      Stock initial *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="10"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#D46382]"
                    />
                  </div>
                </div>

                {/* Description simple */}
                <div>
                  <label className="block text-xs text-slate-600 dark:text-[#9CA3AF] mb-1">
                    Description de l'article (Optionnel)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Courte description, matière ou détails particuliers..."
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D46382]"
                  />
                </div>

                {/* Options d'affichage */}
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                      className="accent-[#D46382] w-4 h-4 rounded"
                    />
                    <span className="text-xs text-slate-700 dark:text-[#D1D5DB]">Marquer comme Nouveau</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="accent-[#D46382] w-4 h-4 rounded"
                    />
                    <span className="text-xs text-slate-700 dark:text-[#D1D5DB]">Afficher dans Populaires</span>
                  </label>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('list');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-[#D46382] hover:bg-[#B83E63] dark:bg-[#E88CA6] dark:hover:bg-[#F4A6BE] text-white dark:text-[#0B0D12] text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {editingProductId
                      ? `Mettre à jour (${formData.images.length} angle${formData.images.length > 1 ? 's' : ''})`
                      : `Enregistrer (${formData.images.length} angle${formData.images.length > 1 ? 's' : ''})`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: Recent Orders */}
        {activeTab === 'orders' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            <h3 className="text-xs font-mono uppercase font-bold text-[#D46382] dark:text-[#E88CA6]">
              Commandes enregistrées ({orders.length})
            </h3>
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold font-mono text-[#D46382] dark:text-[#E88CA6]">
                    {ord.orderNumber}
                  </div>
                  <div className="text-slate-800 dark:text-white font-medium mt-0.5">
                    {ord.customer.firstName} {ord.customer.lastName} • {ord.customer.phone}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">
                    {ord.items.length} article(s) • {ord.customer.city}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                    {formatPrice(ord.total)}
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-mono uppercase font-bold">
                    {ord.customer.paymentMethod}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Security & Moderator Account Management */}
        {activeTab === 'security' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Active Moderator Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-[#E88CA6]/5 dark:from-white/5 dark:to-[#E88CA6]/10 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {moderatorUser?.displayName || 'Modérateur Nighongo'}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                      Actif
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-[#9CA3AF] mt-0.5">
                    Identifiant : <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{moderatorUser?.username || 'admin'}</span> • Email : {moderatorUser?.email || 'moderateur@nighongoshop.com'}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Connecté depuis : {moderatorUser?.lastLogin || 'Session courante'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Voulez-vous vous déconnecter de l\'espace modérateur ?')) {
                    logoutModerator();
                    showToast('Déconnexion effectuée.');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter</span>
              </button>
            </div>

            {/* Access control reminder */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-900 dark:text-blue-200 text-xs flex items-start gap-3">
              <Lock className="w-4 h-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-300">
                  Principe de Sécurité & Rôles
                </p>
                <p className="text-[11px] mt-0.5 text-blue-700/80 dark:text-blue-200/80 leading-relaxed">
                  Cette interface de gestion (création, modification, stock, photos 4 angles et suppression de produits) est strictement protégée par mot de passe.
                  Les acheteurs et visiteurs de la boutique n'ont pas besoin de se connecter et profitent d'un parcours de commande fluide sans friction.
                </p>
              </div>
            </div>

            {/* Change Password Form */}
            <div className="p-5 rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
                <KeyRound className="w-4 h-4 text-[#D46382] dark:text-[#E88CA6]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                  Changer le mot de passe de modération
                </h4>
              </div>

              {passwordChangeStatus && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    passwordChangeStatus.success
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20'
                  }`}
                >
                  <span>{passwordChangeStatus.message}</span>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPasswordChangeStatus(null);
                  if (newPassword !== confirmNewPassword) {
                    setPasswordChangeStatus({
                      success: false,
                      message: 'Les nouveaux mots de passe ne correspondent pas.'
                    });
                    return;
                  }
                  const res = changeModeratorPassword(oldPassword, newPassword);
                  if (res.success) {
                    setPasswordChangeStatus({
                      success: true,
                      message: 'Mot de passe modérateur mis à jour avec succès !'
                    });
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    showToast('Mot de passe modérateur mis à jour.');
                  } else {
                    setPasswordChangeStatus({
                      success: false,
                      message: res.error || 'Erreur lors de la modification.'
                    });
                  }
                }}
                className="space-y-3.5 max-w-md"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ancien mot de passe
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D46382] dark:focus:border-[#E88CA6]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min. 6 caractères"
                      required
                      minLength={6}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D46382] dark:focus:border-[#E88CA6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Confirmer le nouveau
                    </label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Répéter le mot de passe"
                      required
                      minLength={6}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D46382] dark:focus:border-[#E88CA6]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-[#E88CA6] text-white dark:text-[#0B0D12] text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Enregistrer le nouveau mot de passe</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
