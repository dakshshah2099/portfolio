<script lang="ts">
  import layout from '../../../content/layout.json';

  let isMenuOpen = $state(false);
  let activeSection = $state('hero');
  let isScrolling = false;
  let isHeaderVisible = $state(true);
  let lastScrollY = 0;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function handleNavClick(id: string, event: MouseEvent) {
    event.preventDefault();
    isMenuOpen = false;
    activeSection = id;
    isScrolling = true;

    const el = document.getElementById(id);
    if (el) {
      const yOffset = -72; // header height is 4.5rem (72px)
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }

  // Active section tracker using Svelte 5 $effect with scroll handler
  $effect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const delta = currentScrollY - lastScrollY;

      // Handle header visibility: only appear when scrolling up or at top of page
      if (!isScrolling) {
        if (currentScrollY <= 72) {
          isHeaderVisible = true;
        } else if (delta > 8) {
          isHeaderVisible = false;
          if (isMenuOpen) isMenuOpen = false;
        } else if (delta < -8) {
          isHeaderVisible = true;
        }
      }
      lastScrollY = Math.max(0, currentScrollY);

      if (isScrolling) return;

      const sectionIds: string[] = (layout.sections as Array<{ id: string }>).map((s: { id: string }) => s.id);
      // Check if user is scrolled to the very bottom of the page
      const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 15;
      if (isAtBottom) {
        activeSection = sectionIds[sectionIds.length - 1];
        return;
      }
      let currentSection = sectionIds[0] || 'hero';
      let minDistance = Infinity;

      sectionIds.forEach((id: string) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const topAdjusted = rect.top - 80;
          const bottomAdjusted = rect.bottom - 80;

          if (topAdjusted < window.innerHeight * 0.4 && bottomAdjusted > 0) {
            const distance = Math.abs(topAdjusted);
            if (distance < minDistance) {
              minDistance = distance;
              currentSection = id;
            }
          }
        }
      });
      activeSection = currentSection;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<header class:hidden={!isHeaderVisible}>
  <div class="container header-container">
    <a href="#hero" class="logo" onclick={(e) => handleNavClick('hero', e)}>
      daksh@portfolio<span class="cursor blink">_</span>
    </a>
    
    <button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle Menu">
      {isMenuOpen ? '✕' : '☰'}
    </button>

    <nav class:open={isMenuOpen}>
      {#each layout.sections as section}
        <a
          href="#{section.id}"
          class:active={activeSection === section.id}
          onclick={(e) => handleNavClick(section.id, e)}
        >
          {section.name}
        </a>
      {/each}
    </nav>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid var(--border);
    background-color: rgba(13, 17, 23, 0.9);
    backdrop-filter: blur(4px); /* subtle layout transparency, clean */
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  header.hidden {
    transform: translateY(-100%);
    pointer-events: none;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.5rem;
  }

  .logo {
    font-family: var(--font-mono);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .logo:hover {
    text-decoration: none;
  }

  .cursor {
    color: var(--accent);
  }

  nav {
    display: flex;
    gap: 1.75rem;
  }

  nav a {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
    font-family: var(--font-mono);
  }

  nav a:hover {
    color: var(--text-primary);
    text-decoration: none;
  }

  nav a.active {
    color: var(--accent);
    font-weight: 700;
  }

  nav a.active::before {
    content: "> ";
    color: var(--accent);
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-primary);
    cursor: pointer;
    padding: 0.5rem;
  }

  @media (max-width: 640px) {
    .menu-toggle {
      display: block;
    }

    nav {
      display: none;
      position: absolute;
      top: 4.5rem;
      left: 0;
      width: 100%;
      background-color: var(--bg);
      flex-direction: column;
      padding: 1.5rem;
      border-bottom: 1px solid var(--border);
      gap: 1.25rem;
      z-index: 100;
    }

    nav.open {
      display: flex;
    }

    nav a.active {
      border-left: 2px solid var(--accent);
      padding-left: 0.5rem;
    }
    
    nav a.active::before {
      content: "";
    }
  }
</style>
