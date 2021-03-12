<script lang="ts">
  import PageTransition from '../components/PageTransition.svelte';
  import { isOnline } from '../stores';

  export let status: number;
  export let error: Error;

  const mode = process.env.NODE_ENV;
  const dev = mode === 'development';
</script>

<PageTransition>
  {#if !$isOnline}
    <section
      class="flex flex-1 flex-col max-w-xl mx-auto p-12 bg-gray-50 bg-gradient-to-r from-gray-50 to-gray-100 rounded-md">
      <h1 class="mt-1 mb-4 text-3xl text-gray-800 font-bold">Stránka je nedostupná</h1>
      <h2 class="text-lg">Bohužel, tato stránka není v offline režimu k dispozici.</h2>
    </section>
  {:else}
    <section
      class="mt-6 flex flex-1 flex-col max-w-xl mx-auto p-12 bg-gray-50 bg-gradient-to-r from-gray-50 to-gray-100 rounded-md">
      <h1 class="mt-1 mb-4 text-6xl text-gray-500 font-bold text-center">{status}</h1>
      <h2 class="text-3xl text-center">
        {status === 404 ? 'Stránka nebyla nalezena' : error.message}
      </h2>
    </section>
  {/if}
</PageTransition>
