<script lang="ts">
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
      const currentScrollY = window.pageYOffset;
      
      // Handle header visibility
      if (!isScrolling) {
        if (currentScrollY > lastScrollY && currentScrollY > 72) {
          isHeaderVisible = false;
          // Close menu if scrolling down
          if (isMenuOpen) isMenuOpen = false;
        } else {
          isHeaderVisible = true;
        }
      }
      lastScrollY = currentScrollY;

      if (isScrolling) return;

      const sectionIds = ['hero', 'skills', 'experience', 'projects', 'contact'];
      // Check if user is scrolled to the very bottom of the page
      const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 15;
      if (isAtBottom) {
        activeSection = 'contact';
        return;
      }
      let currentSection = 'hero';
      let minDistance = Infinity;

      sectionIds.forEach((id) => {
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
      <a href="#hero" class:active={activeSection === 'hero'} onclick={(e) => handleNavClick('hero', e)}>Home</a>
      <a href="#skills" class:active={activeSection === 'skills'} onclick={(e) => handleNavClick('skills', e)}>Skills</a>
      <a href="#experience" class:active={activeSection === 'experience'} onclick={(e) => handleNavClick('experience', e)}>Experience</a>
      <a href="#projects" class:active={activeSection === 'projects'} onclick={(e) => handleNavClick('projects', e)}>Projects</a>
      <a href="#contact" class:active={activeSection === 'contact'} onclick={(e) => handleNavClick('contact', e)}>Contact</a>
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
