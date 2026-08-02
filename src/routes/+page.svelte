<script lang="ts">
  import info from '../../content/info.json';
  import skills from '../../content/skills.json';
  import educationData from '../../content/education.json';
  import experienceData from '../../content/experience.json';
  import projectsData from '../../content/projects.json';

  import BentoCard from '$lib/components/BentoCard.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import ExperienceItem from '$lib/components/ExperienceItem.svelte';

  // Destructure skills
  const languages = skills['Languages'];
  const cloudDevOps = skills['Cloud & DevOps'];
  const embeddedIot = skills['Embedded & IoT'];
  const backendDb = skills['Backend & Databases'];
  const mlData = skills['Data Science & ML'];

  // Destructure education & achievements
  const pdeuEdu = educationData.education[0];
  const schoolEdu = educationData.education[1];
  const scholarship = educationData.achievements[0];

  import CipherReveal from '$lib/components/CipherReveal.svelte';

  let emailCopied = $state(false);
  
  function copyEmail(e: Event) {
    e.preventDefault();
    navigator.clipboard.writeText(info.email);
    emailCopied = true;
    setTimeout(() => {
      emailCopied = false;
    }, 2000);
  }
</script>

<section
  id="hero"
  class="portfolio-section"
>
  <div class="bento-grid">
    <!-- HERO SECTION (spans 3 columns) -->
    <BentoCard prompt="~" span={3}>
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

    <!-- QUICK INFO (spans 1 column) -->
    <BentoCard prompt="~/info" span={1}>
      <div class="info-list">
        <div class="info-item">
          <span class="info-label">location</span>
          <span class="info-val">{info.location}</span>
        </div>
        <div class="info-item">
          <span class="info-label">email</span>
          <a href="#" on:click={copyEmail} class="info-val info-link" title="Copy to clipboard">
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

<section id="skills" class="portfolio-section">
  <div class="bento-grid">
    <!-- SKILLS SECTION -->
    <!-- Header Card (spans 4 columns) -->
    <BentoCard prompt="~/skills" title="Technical Skills" span={4}>
      <p class="skills-intro">Dynamic set of competencies spanning DevOps engineering, language design, IoT architectures, and backend frameworks.</p>
    </BentoCard>

    <!-- Skill Cards -->
    <BentoCard prompt="~/skills/languages" title="Languages" span={1}>
      <div class="skills-wrap">
        {#each languages as item}
          <span class="tag">{item}</span>
        {/each}
      </div>
    </BentoCard>

    <BentoCard prompt="~/skills/devops" title="Cloud & DevOps" span={1}>
      <div class="skills-wrap">
        {#each cloudDevOps as item}
          <span class="tag">{item}</span>
        {/each}
      </div>
    </BentoCard>

    <BentoCard prompt="~/skills/embedded-iot" title="Embedded & IoT" span={2}>
      <div class="skills-wrap">
        {#each embeddedIot as item}
          <span class="tag">{item}</span>
        {/each}
      </div>
    </BentoCard>

    <BentoCard prompt="~/skills/backend" title="Backend & Databases" span={2}>
      <div class="skills-wrap">
        {#each backendDb as item}
          <span class="tag">{item}</span>
        {/each}
      </div>
    </BentoCard>

    <BentoCard prompt="~/skills/data-science" title="Data Science & ML" span={2}>
      <div class="skills-wrap">
        {#each mlData as item}
          <span class="tag">{item}</span>
        {/each}
      </div>
    </BentoCard>
  </div>
</section>

<section id="experience" class="portfolio-section">
  <div class="bento-grid">
    <!-- EXPERIENCE SECTION -->
    <!-- Header Card (spans 4 columns) -->
    <BentoCard prompt="~/experience" title="Work Experience" span={4}></BentoCard>

    <!-- Experience Item 1 (Jupiter Softwares - spans 4 columns) -->
    <BentoCard prompt="~/experience/jupiter" span={4}>
      <ExperienceItem
        role={experienceData[0].role}
        company={experienceData[0].company}
        location={experienceData[0].location}
        period={experienceData[0].period}
        bullets={experienceData[0].bullets}
      />
    </BentoCard>

    <!-- Experience Item 2 (IEEE - spans 2 columns) -->
    <BentoCard prompt="~/experience/ieee" span={2}>
      <ExperienceItem
        role={experienceData[1].role}
        company={experienceData[1].company}
        location={experienceData[1].location}
        period={experienceData[1].period}
        bullets={experienceData[1].bullets}
      />
    </BentoCard>

    <!-- EDUCATION (spans 2 columns) -->
    <BentoCard prompt="~/education" title="Education" span={2}>
      <div class="edu-item-bento">
        <h3 class="edu-uni">{pdeuEdu.institution}</h3>
        <p class="edu-deg">{pdeuEdu.degree}</p>
        <div class="edu-meta">
          <span class="edu-gpa">{pdeuEdu.grade}</span>
          <span class="edu-date">{pdeuEdu.period}</span>
        </div>
      </div>
      <div class="edu-item-bento school-bento">
        <h3 class="edu-uni">{schoolEdu.institution}</h3>
        <p class="edu-deg">{schoolEdu.degree}</p>
        <div class="edu-meta">
          <span class="edu-date">{schoolEdu.period}</span>
        </div>
      </div>
    </BentoCard>
  </div>
</section>

<section id="projects" class="portfolio-section">
  <div class="bento-grid">
    <!-- PROJECTS SECTION -->
    <!-- Header Card (spans 4 columns) -->
    <BentoCard prompt="~/projects" title="Featured Projects" span={4}></BentoCard>

    <!-- Project 1 (IoT Desk - spans 4 columns) -->
    <BentoCard prompt="~/projects/iot-smart-desk" title={projectsData[0].title} span={4}>
      <ProjectCard
        tech={projectsData[0].tech}
        bullets={projectsData[0].bullets}
      />
    </BentoCard>

    <!-- Project 2 (CoreInventory - spans 2 columns) -->
    <BentoCard prompt="~/projects/core-inventory" title={projectsData[1].title} span={2}>
      <ProjectCard
        tech={projectsData[1].tech}
        bullets={projectsData[1].bullets}
      />
    </BentoCard>

    <!-- ACHIEVEMENTS (spans 2 columns) -->
    <BentoCard prompt="~/achievements" title="Scholarship" span={2}>
      <div class="achievement-content">
        <h3 class="ach-title">{scholarship.title}</h3>
        <p class="ach-desc">{scholarship.description}</p>
      </div>
    </BentoCard>
  </div>
</section>

<section id="contact" class="portfolio-section">
  <div class="bento-grid">
    <!-- CONTACT SECTION (spans 4 columns) -->
    <BentoCard prompt="~/contact" title="Get in Touch" span={4}>
      <div class="contact-card-content">
        <p class="contact-intro">
          Let's build together. I am currently open to internships and junior developer/DevOps roles.
        </p>
        <div class="contact-buttons">
          <a href="#" on:click={copyEmail} class="btn" style="min-width: 240px; text-align: left;">
            <span class="btn-prompt">$</span> {emailCopied ? 'echo "copied to clipboard!"' : `mail ${info.email}`}
          </a>
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
