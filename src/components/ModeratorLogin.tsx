import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, X, KeyRound, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ModeratorLoginProps {
  onClose: () => void;
}

export const ModeratorLogin: React.FC<ModeratorLoginProps> = ({ onClose }) => {
  const { loginModerator } = useShop();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage('Veuillez saisir votre identifiant ou adresse email modérateur.');
      return;
    }
    if (!password) {
      setErrorMessage('Veuillez renseigner votre mot de passe modérateur.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = loginModerator(identifier.trim(), password, rememberMe);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Identifiant ou mot de passe incorrect.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-md bg-white dark:bg-[#11131A] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top decorative accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D46382] via-[#E88CA6] to-[#9333EA]" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between relative border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D46382]/20 to-[#E88CA6]/10 dark:from-[#D46382]/30 dark:to-[#E88CA6]/15 border border-[#E88CA6]/40 flex items-center justify-center shadow-inner text-[#D46382] dark:text-[#E88CA6]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest font-mono uppercase px-2 py-0.5 rounded-full bg-[#E88CA6]/15 text-[#B83E63] dark:text-[#F4A6BE] font-bold border border-[#E88CA6]/30">
                  Accès Restreint
                </span>
                <span className="text-[11px] font-mono text-slate-400 dark:text-[#9CA3AF]">
                  管理者認証
                </span>
              </div>
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-1">
                Portail Modérateur
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational banner: Only for moderators, visitors do not need an account */}
        <div className="px-5 sm:px-6 pt-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200/90 text-xs leading-relaxed flex items-start gap-2.5">
            <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-300">
                Accès exclusivement réservé aux modérateurs
              </p>
              <p className="text-[11px] mt-0.5 text-amber-700/80 dark:text-amber-300/80">
                Seule l'équipe autorisée peut se connecter pour ajouter ou modifier des articles. Les visiteurs et acheteurs peuvent commander directement sans compte.
              </p>
            </div>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="px-5 sm:px-6 pt-3">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              Identifiant ou Email Modérateur
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ex: admin ou moderateur@nighongoshop.com"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#D46382] dark:focus:border-[#E88CA6] transition-colors"
                autoComplete="username"
                autoFocus
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Mot de passe secret
              </label>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#D46382] dark:focus:border-[#E88CA6] transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer p-1"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#D46382] focus:ring-[#D46382] border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-black/40 cursor-pointer"
              />
              <span>Maintenir la session connectée</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#B83E63] via-[#D46382] to-[#E88CA6] hover:opacity-95 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Déverrouiller l'Espace Modérateur</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

