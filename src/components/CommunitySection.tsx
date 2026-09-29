import React, { useState } from 'react';
import { ArrowRight, Users, MessageSquare, Shield, CheckCircle2 } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const [joinedSuccess, setJoinedSuccess] = useState(false);
  const [handle, setHandle] = useState('');
  const [externalJoined, setExternalJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle) return;
    setJoinedSuccess(true);
    setTimeout(() => {
      setJoinedSuccess(false);
      setHandle('');
    }, 4000);
  };

  return (
    <section id="community" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-[#0D1018] border border-white/10 overflow-hidden shadow-2xl">
        {/* Background Atmosphere Image */}
        <div className="absolute inset-0 w-full h-full opacity-35">
          <img
            src="/images/community-club.jpg"
            alt="Club et rassemblement de la communauté Otaku à Tokyo"
            className="w-full h-full object-cover object-center filter saturate-120"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D12] via-[#0B0D12]/85 to-[#0B0D12]/70" />
        </div>

        <div className="relative z-10 p-8 sm:p-14 lg:p-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Brand Philosophy & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E88CA6]/15 text-[#E88CA6] border border-[#E88CA6]/30 text-xs font-mono tracking-widest uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>LE CLUBHOUSE OTAKU • 同好倶楽部</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF8F5] leading-tight">
                CRÉÉ PAR DES OTAKUS.
                <span className="block text-[#E88CA6]">POUR LES OTAKUS.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#D1D5DB] font-light leading-relaxed max-w-xl">
              &ldquo;Nighongoshop est un lieu où les Otakus peuvent découvrir des produits d'exception, partager leur passion et soutenir la communauté.&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-lg leading-relaxed">
              Nous refusons les marchandises de masse sans âme. Chaque pièce de cosplay, livre de manga et création anime est conceptualisé, testé et validé par les membres actifs du club à Tokyo, Paris, Dakar et Montréal.
            </p>

            {/* Club Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#FAF8F5] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#E88CA6]" /> Origine Authentique
                </div>
                <div className="text-[11px] text-[#9CA3AF]">Partenariats directs avec des artisans et licences officielles.</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#FAF8F5] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#E88CA6]" /> Votes des Membres
                </div>
                <div className="text-[11px] text-[#9CA3AF]">Le club Otaku choisit les silhouettes des prochains drops anime.</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#FAF8F5] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#E88CA6]" /> Discord Mondial
                </div>
                <div className="text-[11px] text-[#9CA3AF]">Plus de 18 000 créateurs et passionnés d'anime à travers le monde.</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Community Join Card */}
          <div className="lg:col-span-5 bg-white/95 dark:bg-[#121622]/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D46382] dark:text-[#E88CA6] block mb-1">
                PASSE D'INVITATION // 招待券
              </span>
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-[#FAF8F5]">
                Rejoindre le Club Otaku
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#9CA3AF] mt-1">
                Bénéficiez d'un accès prioritaire 24h avant chaque Drop Limité et aux salons privés de discussion.
              </p>
            </div>

            {joinedSuccess ? (
              <div className="p-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">Bienvenue dans Otaku no Sekai !</div>
                  <div>Votre code d'accès prioritaire aux drops a été enregistré.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleJoin} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-700 dark:text-[#D1D5DB] mb-1 font-medium">
                    Pseudo Discord ou Adresse E-mail
                  </label>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="ex. otaku_ronin#4092 ou nom@domaine.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-black/50 border border-slate-300 dark:border-white/10 focus:border-[#D46382] dark:focus:border-[#E88CA6] focus:outline-none text-sm text-slate-900 dark:text-[#FAF8F5] placeholder-slate-400 dark:placeholder-white/25 transition-colors font-mono"
                  />
                </div>

                <button
                  type="submit"
                  id="join-community-cta"
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 text-white hover:bg-[#D46382] dark:bg-[#FAF8F5] dark:text-[#0B0D12] dark:hover:bg-[#E88CA6] dark:hover:text-[#0B0D12] text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <span>REJOINDRE LA COMMUNAUTÉ →</span>
                </button>
              </form>
            )}

            <div className="pt-2">
              {externalJoined ? (
                <div className="text-center py-2 text-xs text-[#D46382] dark:text-[#E88CA6] font-medium">
                  Redirection vers l'espace communautaire Nighongoshop...
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setExternalJoined(true);
                    setTimeout(() => setExternalJoined(false), 3000);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 text-xs dark:text-[#D1D5DB] dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>SUIVRE LE CLUB SUR DISCORD / TIKTOK →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
