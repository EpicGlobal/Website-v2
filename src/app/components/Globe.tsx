import { useEffect, useRef } from 'react';

const AUTO_ROTATION_SPEED = 0.09;
const DRAG_ROTATION_PER_PIXEL = 0.006;
const MOMENTUM_DECAY_SECONDS = 0.28;
const MAX_RELEASE_VELOCITY = 2.4;
const GLOBE_PARTICLE_COUNT = 420;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

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

    for (let i = 0; i < GLOBE_PARTICLE_COUNT; i++) {
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
        colorCache.fills.clear();
        colorCache.strokes.clear();
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
    let releaseVelocity = 0;
    let dragVelocity = 0;
    let isDragging = false;
    let activePointerId: number | null = null;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let lastFrameTime = performance.now();
    let previousBodyCursor = '';
    let previousBodyUserSelect = '';

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let shouldReduceMotion = reducedMotionQuery.matches;

    const updateMotionPreference = () => {
      shouldReduceMotion = reducedMotionQuery.matches;
    };

    const isInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;

      return Boolean(target.closest('a, button, input, select, textarea, label, [role="button"], [role="link"]'));
    };

    const isInsideCanvas = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();

      return (
        rect.width > 0 &&
        rect.height > 0 &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
    };

    const startDrag = (event: PointerEvent) => {
      if ((event.pointerType === 'mouse' && event.button !== 0) || isInteractiveTarget(event.target) || !isInsideCanvas(event)) {
        return;
      }

      isDragging = true;
      activePointerId = event.pointerId;
      lastPointerX = event.clientX;
      lastPointerTime = event.timeStamp || performance.now();
      dragVelocity = 0;
      releaseVelocity = 0;
      previousBodyCursor = document.body.style.cursor;
      previousBodyUserSelect = document.body.style.userSelect;
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';

      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture can fail if the browser has already released the pointer.
      }
    };

    const moveDrag = (event: PointerEvent) => {
      if (!isDragging || activePointerId !== event.pointerId) return;

      event.preventDefault();

      const now = event.timeStamp || performance.now();
      const elapsedSeconds = Math.max((now - lastPointerTime) / 1000, 0.001);
      const deltaX = event.clientX - lastPointerX;
      const deltaRotation = -deltaX * DRAG_ROTATION_PER_PIXEL;

      rotation += deltaRotation;
      dragVelocity = deltaRotation / elapsedSeconds;
      lastPointerX = event.clientX;
      lastPointerTime = now;
    };

    const endDrag = (event: PointerEvent) => {
      if (!isDragging || activePointerId !== event.pointerId) return;

      isDragging = false;
      activePointerId = null;
      releaseVelocity = shouldReduceMotion ? 0 : clamp(dragVelocity, -MAX_RELEASE_VELOCITY, MAX_RELEASE_VELOCITY);
      document.body.style.cursor = previousBodyCursor;
      document.body.style.userSelect = previousBodyUserSelect;

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const animate = () => {
      if (!syncCanvasSize()) {
        lastFrameTime = performance.now();
        animationId = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();
      const elapsedSeconds = Math.min((now - lastFrameTime) / 1000, 0.08);
      lastFrameTime = now;
      const currentColor = getGlobeColor();

      ctx.clearRect(0, 0, width, height);

      if (!isDragging) {
        const autoRotation = shouldReduceMotion ? 0 : AUTO_ROTATION_SPEED;
        rotation += (autoRotation + releaseVelocity) * elapsedSeconds;
        releaseVelocity *= Math.exp(-elapsedSeconds / MOMENTUM_DECAY_SECONDS);

        if (Math.abs(releaseVelocity) < 0.01) {
          releaseVelocity = 0;
        }
      }

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
        const size = 1.1 + scale * 2.15;
        const baseOpacity = darkerParticles ? 0.42 : 0.24;
        const maxOpacity = darkerParticles ? 0.92 : 0.66;
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
            const lineOpacity = (0.5 - dist) * opacity * (darkerParticles ? 0.46 : 0.34);

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

    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', updateMotionPreference);
    } else {
      reducedMotionQuery.addListener(updateMotionPreference);
    }

    resizeObserver.observe(canvas);
    window.addEventListener('resize', syncCanvasSize);
    document.addEventListener('pointerdown', startDrag, true);
    document.addEventListener('pointermove', moveDrag, true);
    document.addEventListener('pointerup', endDrag, true);
    document.addEventListener('pointercancel', endDrag, true);

    animationId = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', syncCanvasSize);
      document.removeEventListener('pointerdown', startDrag, true);
      document.removeEventListener('pointermove', moveDrag, true);
      document.removeEventListener('pointerup', endDrag, true);
      document.removeEventListener('pointercancel', endDrag, true);

      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener('change', updateMotionPreference);
      } else {
        reducedMotionQuery.removeListener(updateMotionPreference);
      }

      if (isDragging) {
        document.body.style.cursor = previousBodyCursor;
        document.body.style.userSelect = previousBodyUserSelect;
      }

      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Interactive globe"
      data-globe-canvas="true"
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ width: '100%', height: '100%', cursor: 'grab' }}
    />
  );
}
