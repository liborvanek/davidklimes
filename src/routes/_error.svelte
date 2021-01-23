<script lang="ts">
  import PageTransition from '../components/PageTransition.svelte';

  export let status: number;
  export let error: Error;

  const mode = process.env.NODE_ENV;
  const dev = mode === 'development';
</script>

<PageTransition>
  <section class="flex flex-1 flex-col items-center justify-center">
    <h1 class="mt-1 mb-4 text-red-700 text-8xl text-gray-300 font-bold">{status}</h1>
    <h2 class="text-red-700 text-5xl">{error.message}</h2>
  </section>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</PageTransition>
