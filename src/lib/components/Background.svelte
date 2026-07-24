<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  
  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    // Pick a random effect: 0 = Starfield, 1 = Matrix, 2 = Grid
    const effectType = Math.floor(Math.random() * 3);

    let animationFrameId: number;

    if (effectType === 0) {
      // Effect 0: Starfield / Particles
      const particles = Array.from({ length: 150 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      }));

      const render = () => {
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(230, 237, 243, 0.4)';

        particles.forEach(p => {
          p.x += p.dx;
          p.y += p.dy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
        animationFrameId = requestAnimationFrame(render);
      };
      render();

    } else if (effectType === 1) {
      // Effect 1: Matrix Rain
      const chars = '01'.split('');
      const fontSize = 14;
      const columns = width / fontSize;
      const drops: number[] = [];
      for (let x = 0; x < columns; x++) drops[x] = 1;

      const render = () => {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(245, 158, 11, 0.3)'; // Amber accent
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      // Slow down matrix rain slightly
      let lastTime = 0;
      const matrixLoop = (time: number) => {
        if (time - lastTime > 50) {
          render();
          lastTime = time;
        }
        animationFrameId = requestAnimationFrame(matrixLoop);
      };
      requestAnimationFrame(matrixLoop);

    } else {
      // Effect 2: Cyber Grid
      let offset = 0;
      const render = () => {
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.1)';
        ctx.lineWidth = 1;
        const gridSize = 40;

        offset = (offset + 0.5) % gridSize;

        ctx.beginPath();
        for (let x = offset; x < width; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = offset; y < height; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();

        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  });
</script>

<canvas bind:this={canvas} class="bg-canvas"></canvas>

<style>
  .bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
  }
</style>
