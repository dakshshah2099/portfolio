<script lang="ts">
  let { tech, bullets }: { tech: string[]; bullets: string[] } = $props();
</script>

<div class="project-content">
  <div class="tech-tags">
    {#each tech as t}
      <span class="tag">{t}</span>
    {/each}
  </div>

  <ul>
    {#each bullets as bullet}
      <li>{bullet}</li>
    {/each}
  </ul>
</div>

<style>
  .project-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .tech-tags {
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  ul {
    margin-bottom: 0;
  }
</style>
