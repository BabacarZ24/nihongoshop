import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '221782468632';
  const displayPhone = '+221 78 246 86 32';

  const defaultMessage = encodeURIComponent(
    'Bonjour Nighongoshop ! J\'ai une question concernant un article de la boutique.'
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Tooltip Popup */}
      {isOpen && (
        <div className="bg-white dark:bg-[#121622] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 w-72 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Service Client Nighongo</p>
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  En ligne • {displayPhone}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 py-3 leading-relaxed">
            Besoin d'aide pour une taille, une disponibilité ou pour commander directement ? Discutons sur WhatsApp !
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Démarrer la discussion</span>
          </a>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#121622] border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-200 shadow-lg cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>WhatsApp : <strong className="font-semibold text-slate-900 dark:text-white">{displayPhone}</strong></span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative"
          aria-label="Contacter sur WhatsApp"
          title={`WhatsApp: ${displayPhone}`}
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-300 border-2 border-white dark:border-[#0B0D12] rounded-full" />
        </button>
      </div>
    </div>
  );
};
