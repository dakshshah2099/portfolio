<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer>
  <div class="container footer-container">
    <div class="copyright">
      © {currentYear} daksh@portfolio:~#
    </div>
    <div class="footer-links">
      <a href="mailto:dakshshah2099@gmail.com">email</a>
      <span>·</span>
      <a href="https://linkedin.com/in/dakshshah2099" target="_blank" rel="noopener noreferrer">linkedin</a>
      <span>·</span>
      <a href="https://github.com/dakshshah2099" target="_blank" rel="noopener noreferrer">github</a>
    </div>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border);
    background-color: var(--bg);
    padding: 2rem 0;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-links {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .footer-links a {
    color: var(--text-secondary);
  }

  .footer-links a:hover {
    color: var(--accent);
  }

  span {
    color: var(--border);
  }

  @media (max-width: 640px) {
    .footer-container {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
