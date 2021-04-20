<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  export let classes = '';
  let darkMode = false;
  let show = false;

  onMount(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      darkMode = true;
    }
    show = true;
  });

  function toggle() {
    darkMode = !darkMode;
    localStorage.theme = darkMode ? 'dark' : 'light';
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<button
  on:click={toggle}
  class="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-dark-gray-700 rounded-full dark:text-dark-gray-300 hover-hover:hover:text-amber-400 text-dark-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 {classes} {darkMode
    ? 'hover-hover:hover:text-yellow-200'
    : 'hover-hover:hover:text-blue-800'} ">
  {#if show && darkMode}
    <svg
      in:fly={{ y: -10 }}
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    <span class="sr-only">Přepnout na světlý vzhled</span>
  {:else if show && !darkMode}
    <svg
      in:fly={{ y: -10 }}
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    <span class="sr-only">Přepnout na tmavý vzhled</span>
  {/if}
</button>
