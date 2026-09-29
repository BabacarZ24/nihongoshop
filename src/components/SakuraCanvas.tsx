import React, { useEffect, useRef, useCallback } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  color: string;
  depth: number; // 0 (far), 1 (mid), 2 (near)
  vx: number; // transient velocity from air displacement or burst
  vy: number;
  isBurst?: boolean;
  life?: number;
  maxLife?: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

interface SakuraCanvasProps {
  className?: string;
  isHeroOnly?: boolean;
}

export const SakuraCanvas: React.FC<SakuraCanvasProps> = ({ className = '', isHeroOnly = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const burstsRef = useRef<Petal[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef<{ x: number; y: number; prevX: number; prevY: number; active: boolean }>({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    active: false,
  });
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Petal color palette — Japanese Sakura gradations
  const petalColors = [
    'rgba(244, 166, 190, ', // Sakura Rose
    'rgba(255, 222, 233, ', // Pale Blossom
    'rgba(232, 140, 166, ', // Deep Sakura
    'rgba(255, 240, 245, ', // White Lavender Mist
    'rgba(248, 187, 208, ', // Soft Petal
  ];

  const createPetal = useCallback((width: number, height: number, spawnAtTop: boolean = false): Petal => {
    const depth = Math.random() < 0.25 ? 2 : Math.random() < 0.65 ? 1 : 0;
    const baseSize = depth === 2 ? 14 + Math.random() * 8 : depth === 1 ? 9 + Math.random() * 6 : 6 + Math.random() * 4;
    const baseSpeedY = depth === 2 ? 1.2 + Math.random() * 0.9 : depth === 1 ? 0.8 + Math.random() * 0.6 : 0.4 + Math.random() * 0.5;

    return {
      x: Math.random() * (width + 100) - 50,
      y: spawnAtTop ? -20 - Math.random() * 40 : Math.random() * height,
      size: baseSize,
      speedY: baseSpeedY,
      speedX: 0.3 + Math.random() * 0.7, // gentle eastward drift
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.02 + Math.random() * 0.03,
      opacity: depth === 2 ? 0.85 + Math.random() * 0.15 : depth === 1 ? 0.6 + Math.random() * 0.25 : 0.35 + Math.random() * 0.25,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      depth,
      vx: 0,
      vy: 0,
    };
  }, []);

  // Trigger Sakura click burst (25-35 petals radiating outward)
  const triggerBurst = useCallback((clickX: number, clickY: number) => {
    // Subtle ethereal ripple
    ripplesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 4,
      maxRadius: 75 + Math.random() * 25,
      opacity: 0.8,
    });

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 18 : 28 + Math.floor(Math.random() * 10);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 5.5;
      const size = 8 + Math.random() * 10;
      const life = 90 + Math.random() * 60;

      burstsRef.current.push({
        x: clickX + (Math.random() - 0.5) * 10,
        y: clickY + (Math.random() - 0.5) * 10,
        size,
        speedY: 0.8 + Math.random() * 0.8,
        speedX: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.05 + Math.random() * 0.06,
        opacity: 0.95,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        depth: 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        isBurst: true,
        life,
        maxLife: life,
      });
    }
  }, []);

  // Helper to draw a realistic curved sakura petal with notched tip
  const drawPetal = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number,
    flip: number,
    colorPrefix: string,
    opacity: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    // 3D perspective flip
    const scaleY = Math.sin(flip);
    ctx.scale(1, Math.abs(scaleY) < 0.1 ? 0.1 : scaleY);

    ctx.beginPath();
    // Petal heart/notch shape
    const w = size * 0.65;
    const h = size;

    ctx.moveTo(0, h * 0.5);
    ctx.bezierCurveTo(-w * 1.2, h * 0.1, -w * 0.9, -h * 0.4, -w * 0.25, -h * 0.5);
    // Subtle notch at the crown
    ctx.lineTo(0, -h * 0.38);
    ctx.lineTo(w * 0.25, -h * 0.5);
    ctx.bezierCurveTo(w * 0.9, -h * 0.4, w * 1.2, h * 0.1, 0, h * 0.5);
    ctx.closePath();

    // Radial gradient for delicate translucency
    const grad = ctx.createRadialGradient(0, -h * 0.1, size * 0.1, 0, 0, size);
    grad.addColorStop(0, `${colorPrefix}${opacity})`);
    grad.addColorStop(0.7, `${colorPrefix}${opacity * 0.85})`);
    grad.addColorStop(1, `${colorPrefix}${opacity * 0.6})`);

    ctx.fillStyle = grad;
    ctx.fill();

    // Subtle center vein
    ctx.beginPath();
    ctx.moveTo(0, h * 0.35);
    ctx.lineTo(0, -h * 0.2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
    ctx.lineWidth = 0.75;
    ctx.stroke();

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isMobile = width < 768;
    const petalCount = prefersReducedMotion ? 12 : isMobile ? 22 : 48;

    // Initialize regular falling petals
    petalsRef.current = [];
    for (let i = 0; i < petalCount; i++) {
      petalsRef.current.push(createPetal(width, height, false));
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      triggerBurst(clientX, clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const clientX = touch.clientX - rect.left;
        const clientY = touch.clientY - rect.top;
        mouseRef.current.x = clientX;
        mouseRef.current.y = clientY;
        mouseRef.current.active = true;
        triggerBurst(clientX, clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouseRef.current.x = touch.clientX - rect.left;
        mouseRef.current.y = touch.clientY - rect.top;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Expose global trigger for hero or components if needed
    (window as unknown as { __triggerSakuraBurst?: (x: number, y: number) => void }).__triggerSakuraBurst = triggerBurst;

    // Main animation loop
    let globalWindTime = 0;

    const render = (time: number) => {
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;
      globalWindTime += delta * 0.8;

      ctx.clearRect(0, 0, width, height);

      // 1. Render Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += delta * 90;
        rip.opacity -= delta * 0.9;

        if (rip.opacity <= 0 || rip.radius >= rip.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(244, 166, 190, ${rip.opacity * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 222, 233, ${rip.opacity * 0.3})`;
        ctx.fill();
        ctx.restore();
      }

      // Air displacement vector from cursor motion
      const mouse = mouseRef.current;
      const mouseSpeedX = mouse.active ? (mouse.x - mouse.prevX) * 0.1 : 0;
      const mouseSpeedY = mouse.active ? (mouse.y - mouse.prevY) * 0.1 : 0;

      // 2. Render and update regular falling petals
      const petals = petalsRef.current;
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Sinusoidal natural sway
        const sway = Math.sin(globalWindTime * 2 + p.y * 0.015 + p.rotation) * 0.8;
        const windX = p.speedX + sway;

        // Interactive cursor air displacement (subtle repulsion, not chasing)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pushRadius = 90; // smooth perimeter

          if (dist < pushRadius && dist > 0.1) {
            const force = (1 - dist / pushRadius) * 2.2;
            const nx = dx / dist;
            const ny = dy / dist;

            // Push outward smoothly
            p.vx += nx * force + mouseSpeedX * 0.2;
            p.vy += ny * force * 0.5 + mouseSpeedY * 0.2;
          }
        }

        // Apply friction to air displacement
        p.vx *= 0.94;
        p.vy *= 0.94;

        p.x += windX + p.vx;
        p.y += p.speedY + p.vy;

        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Wrap around borders
        if (p.y > height + 30) {
          p.y = -20;
          p.x = Math.random() * (width + 60) - 30;
          p.vx = 0;
          p.vy = 0;
        }
        if (p.x > width + 40) {
          p.x = -30;
        } else if (p.x < -40) {
          p.x = width + 30;
        }

        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.flip, p.color, p.opacity);
      }

      // 3. Render and update Burst Petals
      const bursts = burstsRef.current;
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        if (!b.life || !b.maxLife) continue;

        b.life -= delta * 60;

        // Natural drag deceleration
        b.vx *= 0.92;
        b.vy *= 0.92;

        // Gravity begins taking over as velocity slows
        const progress = 1 - b.life / b.maxLife;
        const gravity = progress * 1.5;

        b.x += b.vx + Math.sin(b.life * 0.1) * 0.5;
        b.y += b.vy + gravity;

        b.rotation += b.rotationSpeed;
        b.flip += b.flipSpeed;

        // Fade out near end of life
        const alpha = Math.min(1, b.life / 20) * b.opacity;

        if (b.life <= 0 || b.y > height + 40) {
          bursts.splice(i, 1);
          continue;
        }

        drawPetal(ctx, b.x, b.y, b.size, b.rotation, b.flip, b.color, alpha);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      delete (window as unknown as { __triggerSakuraBurst?: unknown }).__triggerSakuraBurst;
    };
  }, [createPetal, triggerBurst]);

  return (
    <canvas
      ref={canvasRef}
      id="sakura-interactive-canvas"
      className={`absolute inset-0 pointer-events-auto z-10 w-full h-full ${className}`}
      style={{ touchAction: 'pan-y' }}
      title="Interactive Sakura: Move cursor to sway petals, click anywhere to burst petals"
    />
  );
};
