<script lang="ts">
  import { onMount } from 'svelte';

  let { 
    text = '', 
    duration = 1000, 
    delay = 0 
  }: {
    text: string;
    duration?: number;
    delay?: number;
  } = $props();

  let displayedText = $state('');
  let isAnimating = $state(false);
  let isDone = $state(false);

  const chars = '!<>-_\\/[]{}—=+*^?#_01';

  onMount(() => {
    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;
    
    const timeout = setTimeout(() => {
      isAnimating = true;
      interval = setInterval(() => {
        displayedText = text
          .split('')
          .map((letter, index) => {
            if (index < Math.floor(iteration)) {
              return text[index];
            }
            if (letter === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= text.length) {
          clearInterval(interval);
          displayedText = text;
          isDone = true;
        }

        iteration += text.length / (duration / 30);
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  });
</script>

<span class="cipher-reveal" class:done={isDone}>
  {#if !isAnimating && !isDone}
    <span style="opacity: 0;">{text}</span>
  {:else}
    {displayedText}
  {/if}
</span>

<style>
  .cipher-reveal {
    display: inline-block;
    white-space: pre-wrap;
  }
</style>
