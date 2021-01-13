<script>
  import PageTransition from '../components/PageTransition.svelte';

  export let status;
  export let error;

  const mode = process.env.NODE_ENV;
  const dev = mode === 'development';
</script>

<PageTransition>
  <section class="flex flex-1 flex-col items-center justify-center">
    <h1 class="text-red-700 text-5xl">{error.message}</h1>
    <h2 class="mt-1 text-red-700 text-xl">{status}</h2>
  </section>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</PageTransition>
