import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  speed: number;
  angle: number;
  floatSpeed: number;
}

export const Surreal3DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.05;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.05;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate dreamy surreal particles: soft pink, magenta, warm gold, rose glass
    const colors = [
      'rgba(244, 114, 182, 0.45)', // pink
      'rgba(236, 72, 153, 0.35)',  // fuchsia
      'rgba(251, 207, 232, 0.55)', // light rose
      'rgba(216, 180, 254, 0.35)', // lavender
      'rgba(253, 164, 175, 0.4)',  // coral pink
    ];

    const count = window.innerWidth < 768 ? 22 : 45;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        z: Math.random() * 800 + 200,
        baseX: x,
        baseY: y,
        radius: Math.random() * 4.5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: (Math.random() - 0.5) * 0.4,
        angle: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.015 + 0.005,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Draw subtle ambient 3D glowing gradients
      const focalLength = 400;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.floatSpeed;
        const floatY = Math.sin(p.angle) * 20;
        const floatX = Math.cos(p.angle * 0.8) * 15;

        // Apply 3D perspective projection
        const currentX = p.baseX + floatX + mouseRef.current.x * (p.z / 300);
        const currentY = p.baseY + floatY + mouseRef.current.y * (p.z / 300);

        const scale = focalLength / (focalLength + p.z * 0.5);
        const projectedRadius = Math.max(1, p.radius * scale * 1.8);

        ctx.beginPath();
        ctx.arc(currentX, currentY, projectedRadius, 0, Math.PI * 2);

        // Glass sphere glow gradient
        const grad = ctx.createRadialGradient(
          currentX - projectedRadius * 0.3,
          currentY - projectedRadius * 0.3,
          projectedRadius * 0.1,
          currentX,
          currentY,
          projectedRadius
        );
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.3, p.color);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.fill();

        // Delicate connecting constellation lines for nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = currentX - (p2.baseX + mouseRef.current.x * (p2.z / 300));
          const dy = currentY - (p2.baseY + mouseRef.current.y * (p2.z / 300));
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(
              p2.baseX + mouseRef.current.x * (p2.z / 300),
              p2.baseY + mouseRef.current.y * (p2.z / 300)
            );
            ctx.strokeStyle = `rgba(244, 114, 182, ${0.15 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden="true"
    />
  );
};
