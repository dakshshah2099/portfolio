<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import '@fontsource/poppins/300.css';
  import '@fontsource/poppins/400.css';
  import '@fontsource/poppins/500.css';
  import '@fontsource/poppins/600.css';
  import '@fontsource/poppins/700.css';
  import '@fontsource/jetbrains-mono/400.css';
  import '@fontsource/jetbrains-mono/500.css';
  import '@fontsource/jetbrains-mono/700.css';
  import '$lib/styles/global.css';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Daksh Shah — Portfolio</title>
  <meta name="description" content="Personal portfolio of Daksh Ketankumar Shah. DevOps intern, Computer Engineering student." />
</svelte:head>

<Header />

<main class="container">
  {@render children()}
</main>

