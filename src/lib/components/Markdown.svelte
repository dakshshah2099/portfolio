<script lang="ts">
  import { renderMarkdown } from '$lib/utils/markdown';

  let { 
    content = '', 
    inline = true 
  }: { 
    content: string; 
    inline?: boolean; 
  } = $props();

  let renderedHtml = $derived(renderMarkdown(content, inline));
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html renderedHtml}