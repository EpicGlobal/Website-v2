import { useEffect, useRef } from 'react';

export function Globe({ colorOverride, darkerParticles }: { colorOverride?: { r: number; g: number; b: number }, darkerParticles?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect theme from root element
    const getGlobeColor = () => {
      // If color override is provided, use it
      if (colorOverride) {
        return colorOverride;
      }
      
      const rootClasses = document.documentElement.classList;
      if (rootClasses.contains('leaf')) {
        return { r: 14, g: 165, b: 233 }; // Sky-500 #0ea5e9 for leaf theme
      }
      if (rootClasses.contains('water')) {
        return { r: 63, g: 98, b: 18 }; // Lime-800 #3f6212 for water theme
      }
      if (rootClasses.contains('orange')) {
        return { r: 249, g: 115, b: 22 }; // Orange-500 #f97316 for fire/orange theme - warmer, more vibrant
      }
      // Default cyan-500 #06b6d4 for dark/moon theme
      return { r: 6, g: 182, b: 212 };
    };

    let animationId = 0;
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let radius = 0;

    const points: Array<{ x: number; y: number; z: number }> = [];
    const rotatedPoints: Array<{ x: number; y: number; z: number }> = [];

    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      points.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      });
      rotatedPoints.push({ x: 0, y: 0, z: 0 });
    }

    const colorCache = {
      lastColor: { r: 0, g: 0, b: 0 },
      fills: new Map<string, string>(),
      strokes: new Map<string, string>(),
    };

    const getColorString = (r: number, g: number, b: number, opacity: number, isStroke = false) => {
      const key = `${opacity.toFixed(2)}`;
      const cache = isStroke ? colorCache.strokes : colorCache.fills;

      if (r !== colorCache.lastColor.r || g !== colorCache.lastColor.g || b !== colorCache.lastColor.b) {
        cache.clear();
        colorCache.lastColor = { r, g, b };
      }

      if (!cache.has(key)) {
        cache.set(key, `rgba(${r}, ${g}, ${b}, ${opacity})`);
      }

      return cache.get(key)!;
    };

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return false;
      }

      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      centerX = width / 2;
      centerY = height / 2;
      radius = Math.min(width, height) / 2.5;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      return true;
    };

    let rotation = 0;

    const animate = () => {
      if (!syncCanvasSize()) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const currentColor = getGlobeColor();

      ctx.clearRect(0, 0, width, height);
      rotation += 0.0015;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const x = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
        const z = point.x * Math.sin(rotation) + point.z * Math.cos(rotation);
        rotatedPoints[i] = { x, y: point.y, z };
      }

      rotatedPoints.sort((a, b) => a.z - b.z);

      for (let i = 0; i < rotatedPoints.length; i++) {
        const point = rotatedPoints[i];
        const scale = (point.z + 1) / 2;
        const x2d = centerX + point.x * radius;
        const y2d = centerY + point.y * radius;
        const size = 1 + scale * 2;
        const baseOpacity = darkerParticles ? 0.35 : 0.2;
        const maxOpacity = darkerParticles ? 0.85 : 0.6;
        const opacity = baseOpacity + scale * maxOpacity;

        ctx.fillStyle = getColorString(currentColor.r, currentColor.g, currentColor.b, opacity);
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < rotatedPoints.length; j++) {
          const other = rotatedPoints[j];
          const dist = Math.sqrt(
            Math.pow(point.x - other.x, 2) +
            Math.pow(point.y - other.y, 2) +
            Math.pow(point.z - other.z, 2),
          );

          if (dist < 0.5) {
            const x2d2 = centerX + other.x * radius;
            const y2d2 = centerY + other.y * radius;
            const lineOpacity = (0.5 - dist) * opacity * (darkerParticles ? 0.4 : 0.3);

            ctx.strokeStyle = getColorString(currentColor.r, currentColor.g, currentColor.b, lineOpacity, true);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(x2d2, y2d2);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
    });

    resizeObserver.observe(canvas);
    window.addEventListener('resize', syncCanvasSize);

    animationId = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', syncCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
