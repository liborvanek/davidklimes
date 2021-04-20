<script lang="ts">
  import PageTransition from '../components/PageTransition.svelte';
  import { isOnline } from '../stores';

  export let status: number;
</script>

<PageTransition>
  <section
    class="mt-6 max-w-xl mx-auto p-12 bg-gray-50 dark:bg-dark-gray-800 rounded-md text-center">
    {#if $isOnline}
      <h1 class="mt-1 mb-4 text-2xl lg:text-3xl text-gray-800 dark:text-dark-gray-300 font-bold">
        Stránka je nedostupná
      </h1>
      <h2 class="lg:text-lg">Bohužel, tato stránka není v offline režimu k dispozici.</h2>
      <p>Zkuste navázat spojení a stránku obnovit.</p>
    {:else}
      <h1 class="mt-1 mb-4 text-6xl text-gray-500 font-bold">{status}</h1>
      <h2 class="text-3xl">
        {status === 404 ? 'Stránka nebyla nalezena' : 'Bohužel, stránku se nepodařilo načíst'}
      </h2>
    {/if}
  </section>
</PageTransition>
