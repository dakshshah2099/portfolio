<script lang="ts">
  import info from '../../content/info.json';
  import skills from '../../content/skills.json';
  import educationData from '../../content/education.json';
  import experienceData from '../../content/experience.json';
  import projectsData from '../../content/projects.json';
  import layout from '../../content/layout.json';

  import BentoCard from '$lib/components/BentoCard.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import ExperienceItem from '$lib/components/ExperienceItem.svelte';
  import CipherReveal from '$lib/components/CipherReveal.svelte';
  import Markdown from '$lib/components/Markdown.svelte';

  let emailCopied = $state(false);
  
  function copyEmail(e: Event) {
    e.preventDefault();
    navigator.clipboard.writeText(info.email);
    emailCopied = true;
    setTimeout(() => {
      emailCopied = false;
    }, 2000);
  }

  function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
</script>

{#snippet heroSection()}
  <section id="hero" class="portfolio-section">
    <div class="bento-grid">
      <!-- HERO CARD -->
      <BentoCard prompt={layout.hero?.heroCard?.prompt ?? "~"} span={layout.hero?.heroCard?.span ?? 3}>
        <h1 class="hero-title">
          <CipherReveal text={info.name} duration={800} delay={100} />
        </h1>
        <p class="hero-subtitle">
          <CipherReveal text={info.title} duration={1000} delay={600} /><span class="cursor blink">_</span>
        </p>
        <p class="bio">
          <CipherReveal text={info.bio} duration={1200} delay={1200} />
        </p>
        <div class="hero-actions">
          <a href="/resume.pdf" class="btn" download>
            <span class="btn-prompt">$</span> download resume.pdf
          </a>
        </div>
      </BentoCard>

      <!-- QUICK INFO -->
      <BentoCard prompt={layout.hero?.infoCard?.prompt ?? "~/info"} span={layout.hero?.infoCard?.span ?? 1}>
        <div class="info-list">
          <div class="info-item">
            <span class="info-label">location</span>
            <span class="info-val">{info.location}</span>
          </div>
          <div class="info-item">
            <span class="info-label">email</span>
            <a href="mailto:{info.email}" onclick={copyEmail} class="info-val info-link" title="Click to copy email">
              {emailCopied ? 'copied!' : info.email}
            </a>
          </div>
          <div class="info-item">
            <span class="info-label">linkedin</span>
            <a href={info.linkedin} target="_blank" rel="noopener noreferrer" class="info-val info-link">
              {info.linkedin.replace('https://', '')}
            </a>
          </div>
          <div class="info-item">
            <span class="info-label">github</span>
            <a href={info.github} target="_blank" rel="noopener noreferrer" class="info-val info-link">
              {info.github.replace('https://', '')}
            </a>
          </div>
        </div>
      </BentoCard>
    </div>
  </section>
{/snippet}

{#snippet skillsSection()}
  <section id="skills" class="portfolio-section">
    <div class="bento-grid">
      <!-- Header Card -->
      <BentoCard
        prompt={layout.skills?.headerCard?.prompt ?? "~/skills"}
        title={layout.skills?.headerCard?.title ?? "Technical Skills"}
        span={layout.skills?.headerCard?.span ?? 4}
      >
        <p class="skills-intro">
          {layout.skills?.intro ?? "Dynamic set of competencies spanning DevOps engineering, language design, IoT architectures, and backend frameworks."}
        </p>
      </BentoCard>

      <!-- Skill Cards -->
      {#each Object.entries(skills) as [category, items]}
        {@const catLayout = (layout.skills?.categories as Record<string, { span?: number; prompt?: string }> | undefined)?.[category]}
        <BentoCard
          prompt={catLayout?.prompt ?? `~/skills/${slugify(category)}`}
          title={category}
          span={catLayout?.span ?? layout.skills?.defaultSpan ?? 2}
        >
          <div class="skills-wrap">
            {#each items as item}
              <span class="tag">{item}</span>
            {/each}
          </div>
        </BentoCard>
      {/each}
    </div>
  </section>
{/snippet}

{#snippet experienceSection()}
  <section id="experience" class="portfolio-section">
    <div class="bento-grid">
      <!-- Header Card -->
      <BentoCard
        prompt={layout.experience?.headerCard?.prompt ?? "~/experience"}
        title={layout.experience?.headerCard?.title ?? "Work Experience"}
        span={layout.experience?.headerCard?.span ?? 4}
      />

      <!-- Experience Items -->
      {#each experienceData as exp}
        {@const expMap = layout.experience?.items as Record<string, { span?: number; prompt?: string }> | undefined}
        {@const expLayout = expMap?.[exp.company] || (exp.id ? expMap?.[exp.id] : undefined)}
        <BentoCard
          prompt={exp.prompt ?? expLayout?.prompt ?? `~/experience/${slugify(exp.company)}`}
          span={exp.span ?? expLayout?.span ?? layout.experience?.defaultItemSpan ?? 2}
        >
          <ExperienceItem
            role={exp.role}
            company={exp.company}
            location={exp.location}
            period={exp.period}
            bullets={exp.bullets}
          />
        </BentoCard>
      {/each}

      <!-- EDUCATION -->
      <BentoCard
        prompt={layout.experience?.educationCard?.prompt ?? "~/education"}
        title={layout.experience?.educationCard?.title ?? "Education"}
        span={layout.experience?.educationCard?.span ?? 2}
      >
        {#each educationData.education as edu, i}
          <div class="edu-item-bento" class:school-bento={i > 0}>
            <h3 class="edu-uni">{edu.institution}</h3>
            <p class="edu-deg">{edu.degree}</p>
            <div class="edu-meta">
              {#if edu.grade}
                <span class="edu-gpa">{edu.grade}</span>
              {/if}
              <span class="edu-date">{edu.period}</span>
            </div>
          </div>
        {/each}
      </BentoCard>
    </div>
  </section>
{/snippet}

{#snippet projectsSection()}
  <section id="projects" class="portfolio-section">
    <div class="bento-grid">
      <!-- Header Card -->
      <BentoCard
        prompt={layout.projects?.headerCard?.prompt ?? "~/projects"}
        title={layout.projects?.headerCard?.title ?? "Featured Projects"}
        span={layout.projects?.headerCard?.span ?? 4}
      />

      <!-- Project Items -->
      {#each projectsData as proj}
        {@const projMap = layout.projects?.items as Record<string, { span?: number; prompt?: string }> | undefined}
        {@const projLayout = projMap?.[proj.title] || (proj.id ? projMap?.[proj.id] : undefined)}
        <BentoCard
          prompt={proj.prompt ?? projLayout?.prompt ?? `~/projects/${slugify(proj.title)}`}
          title={proj.title}
          span={proj.span ?? projLayout?.span ?? layout.projects?.defaultItemSpan ?? 2}
        >
          <ProjectCard
            tech={proj.tech}
            bullets={proj.bullets}
          />
        </BentoCard>
      {/each}

      <!-- ACHIEVEMENTS -->
      {#if educationData.achievements && educationData.achievements.length > 0}
        <BentoCard
          prompt={layout.projects?.achievementsCard?.prompt ?? "~/achievements"}
          title={layout.projects?.achievementsCard?.title ?? "Scholarship"}
          span={layout.projects?.achievementsCard?.span ?? 2}
        >
          {#each educationData.achievements as scholarship}
            <div class="achievement-content">
              <h3 class="ach-title">{scholarship.title}</h3>
              <p class="ach-desc"><Markdown content={scholarship.description} inline={true} /></p>
            </div>
          {/each}
        </BentoCard>
      {/if}
    </div>
  </section>
{/snippet}

{#snippet contactSection()}
  <section id="contact" class="portfolio-section">
    <div class="bento-grid">
      <BentoCard
        prompt={layout.contact?.headerCard?.prompt ?? "~/contact"}
        title={layout.contact?.headerCard?.title ?? "Get in Touch"}
        span={layout.contact?.headerCard?.span ?? 4}
      >
        <div class="contact-card-content">
          <p class="contact-intro">
            {layout.contact?.intro ?? "Let's build together. I am currently open to internships and junior developer/DevOps roles."}
          </p>
          <div class="contact-buttons">
            <button type="button" onclick={copyEmail} class="btn" style="min-width: 240px; text-align: left; cursor: pointer;">
              <span class="btn-prompt">$</span> {emailCopied ? 'echo "copied to clipboard!"' : `mail ${info.email}`}
            </button>
            <a href={info.linkedin} target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              <span class="btn-prompt">$</span> view linkedin
            </a>
            <a href={info.github} target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              <span class="btn-prompt">$</span> view github
            </a>
          </div>
        </div>
      </BentoCard>
    </div>
  </section>
{/snippet}

{#each layout.sections as section}
  {#if section.id === 'hero'}
    {@render heroSection()}
  {:else if section.id === 'skills'}
    {@render skillsSection()}
  {:else if section.id === 'experience'}
    {@render experienceSection()}
  {:else if section.id === 'projects'}
    {@render projectsSection()}
  {:else if section.id === 'contact'}
    {@render contactSection()}
  {/if}
{/each}

<style>
  /* Hero Styles */
  .hero-title {
    font-size: 2.75rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin-bottom: 0.5rem;
  }

  .hero-subtitle {
    font-family: var(--font-mono);
    font-size: 0.95rem;
    color: var(--accent);
    margin-bottom: 1.5rem;
  }

  .bio {
    font-size: 1.05rem;
    color: var(--text-secondary);
    max-width: 65ch;
    margin-bottom: 2rem;
  }

  .hero-actions {
    margin-top: auto;
  }


  /* Button Styles */
  .btn {
    display: inline-block;
    background-color: var(--text-primary);
    color: var(--bg);
    padding: 0.65rem 1.25rem;
    font-weight: 600;
    font-size: 0.9rem;
    font-family: var(--font-mono);
    border: 1px solid var(--text-primary);
    text-align: center;
  }

  .btn:hover {
    text-decoration: none;
    background-color: #e6edf3bb;
    border-color: #e6edf3bb;
  }

  .btn-outline {
    background-color: transparent;
    color: var(--text-primary);
    border-color: var(--border);
  }

  .btn-outline:hover {
    background-color: var(--surface-raised);
    border-color: var(--text-secondary);
    text-decoration: none;
  }

  .btn-prompt {
    color: var(--accent);
    margin-right: 0.25rem;
  }

  /* Info List */
  .info-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    border-bottom: 1px dashed var(--border);
    padding-bottom: 0.5rem;
  }

  .info-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .info-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    margin-bottom: 0.15rem;
  }

  .info-val {
    font-size: 0.95rem;
    color: var(--text-primary);
    font-weight: 500;
    word-break: break-all;
  }

  .info-link {
    font-family: var(--font-sans);
  }

  .info-link:hover {
    color: var(--accent);
    text-decoration: underline;
  }

  /* Skills Styles */
  .skills-intro {
    font-size: 1.05rem;
    color: var(--text-secondary);
    max-width: 75ch;
  }

  .skills-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 0.1rem;
    margin-top: 0.5rem;
  }

  /* Education Bento */
  .edu-item-bento {
    margin-bottom: 1.5rem;
  }

  .school-bento {
    margin-bottom: 0;
    border-top: 1px dashed var(--border);
    padding-top: 1.5rem;
  }

  .edu-uni {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .edu-deg {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  .edu-meta {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }

  .edu-gpa {
    color: var(--accent);
  }

  .edu-date {
    color: var(--text-secondary);
  }

  /* Achievements */
  .achievement-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
  }

  .ach-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .ach-desc {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  /* Contact Section */
  .contact-card-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .contact-intro {
    font-size: 1.05rem;
    color: var(--text-secondary);
    max-width: 60ch;
  }

  .contact-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  @media (max-width: 640px) {
    .hero-title {
      font-size: 2.25rem;
    }

    .contact-buttons {
      flex-direction: column;
      gap: 0.75rem;
    }

    .contact-buttons .btn {
      width: 100%;
    }
  }
</style>
