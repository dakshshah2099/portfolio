<script lang="ts">
  import type { Snippet } from 'svelte';

  // Svelte 5 Props using $props rune
  let { 
    prompt = '~', 
    title = '', 
    span = 1, 
    id = '', 
    children 
  }: { 
    prompt?: string; 
    title?: string; 
    span?: number; 
    id?: string; 
    children?: Snippet 
  } = $props();

  // 3D tilt state
  let tiltX = $state(0);
  let tiltY = $state(0);
  let isHovered = $state(false);

  function handleMouseMove(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt: 6 degrees. Negative X for natural "lean into" feel.
    tiltX = -((y - centerY) / centerY) * 6;
    tiltY = ((x - centerX) / centerX) * 6;
  }

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
    tiltX = 0;
    tiltY = 0;
  }
</script>

<div
  {id}
  class="bento-card span-{span}"
  class:tilted={isHovered}
  style="--tilt-x: {tiltX}deg; --tilt-y: {tiltY}deg;"
  onmousemove={handleMouseMove}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="presentation"
>
  <div class="terminal-prompt">{prompt} $<span class="hover-cursor">█</span></div>
  {#if title}
    <h2 class="card-title">{title}</h2>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
    letter-spacing: -0.025em;
  }

  .hover-cursor {
    display: none;
    color: var(--accent);
    margin-left: 0.25rem;
    font-size: 0.85rem;
  }

  :global(.bento-card:hover) .hover-cursor {
    display: inline;
    animation: blink 0.8s step-end infinite;
  }
</style>
