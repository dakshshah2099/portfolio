<script lang="ts">
  let { role, company, location, period, bullets }: { 
    role: string; 
    company: string; 
    location: string; 
    period: string; 
    bullets: string[] 
  } = $props();
</script>

<div class="experience-item">
  <div class="exp-header">
    <div>
      <h3 class="role-title">{role}</h3>
      <div class="company-info">
        <span class="company">{company}</span>
        <span class="divider">·</span>
        <span class="location">{location}</span>
      </div>
    </div>
    <span class="period">{period}</span>
  </div>

  <ul>
    {#each bullets as bullet}
      <li>{bullet}</li>
    {/each}
  </ul>
</div>

<style>
  .experience-item {
    width: 100%;
  }

  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .role-title {
    font-size: 1.15rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .company-info {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-family: var(--font-mono);
  }

  .company {
    font-weight: 500;
    color: var(--text-primary);
  }

  .divider {
    margin: 0 0.25rem;
    color: var(--border);
  }

  .period {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--accent);
    background-color: var(--tag-bg);
    padding: 0.2rem 0.5rem;
    border: 1px solid var(--border);
  }

  ul {
    margin-bottom: 0;
  }

  @media (max-width: 640px) {
    .exp-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
</style>
