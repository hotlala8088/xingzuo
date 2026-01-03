
import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 120;
    const mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; opacity: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.2 + 0.1;
        this.speedX = Math.random() * 0.15 - 0.075;
        this.speedY = Math.random() * 0.15 - 0.075;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          this.x -= dx * 0.005;
          this.y -= dy * 0.005;
        }
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#02040a]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f1e]/80 via-transparent to-[#02040a]" />
      
      {/* 动态星云色彩 */}
      <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-indigo-900/10 blur-[150px] animate-slow-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-amber-900/5 blur-[120px] animate-slow-pulse" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-[30%] right-[20%] w-[40vw] h-[40vw] bg-purple-900/10 blur-[140px] animate-slow-pulse" style={{ animationDelay: '-4s' }} />
    </div>
  );
};

export default StarBackground;
