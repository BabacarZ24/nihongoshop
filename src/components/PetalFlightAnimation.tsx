import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';

export const PetalFlightAnimation: React.FC = () => {
  const { activeFlyingPetals, cartIconRef } = useShop();
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: window.innerWidth - 60, y: 30 });

  useEffect(() => {
    if (cartIconRef.current) {
      const rect = cartIconRef.current.getBoundingClientRect();
      setTargetPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }, [activeFlyingPetals, cartIconRef]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {activeFlyingPetals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{
              x: petal.startX,
              y: petal.startY,
              scale: 1,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              x: [petal.startX, (petal.startX + targetPos.x) / 2 + (Math.random() - 0.5) * 80, targetPos.x],
              y: [petal.startY, (petal.startY + targetPos.y) / 2 - 60, targetPos.y],
              scale: [1, 1.25, 0.4],
              rotate: [0, 180, 360],
              opacity: [1, 0.9, 0]
            }}
            transition={{
              duration: 0.85,
              ease: [0.25, 0.8, 0.25, 1]
            }}
            className="absolute -top-3 -left-3 w-6 h-6 flex items-center justify-center pointer-events-none"
          >
            {/* Delicate SVG sakura petal */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-md">
              <path
                d="M12 2C14.5 4 19 8 19 13C19 17.5 15.5 21 12 21C8.5 21 5 17.5 5 13C5 8 9.5 4 12 2Z"
                fill="#F4A6BE"
                fillOpacity="0.95"
              />
              <path
                d="M12 21L12 14"
                stroke="#FFF"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
