<script lang="ts">
  import PageTransition from '../components/PageTransition.svelte';
  import { isOnline } from '../stores';

  export let status: number;
</script>

<PageTransition>
  <section
    class="mt-6 max-w-xl mx-auto p-12 bg-gray-50 bg-gradient-to-r from-gray-50 to-gray-100 rounded-md text-center">
    {#if $isOnline}
      <h1 class="mt-1 mb-4 text-2xl lg:text-3xl text-gray-800 font-bold">Stránka je nedostupná</h1>
      <h2 class="lg:text-lg">Bohužel, tato stránka není v offline režimu k dispozici.</h2>
      <p>Zkuste navázat spojení a stránku obnovit.</p>
    {:else}
      <h1 class="mt-1 mb-4 text-6xl text-gray-500 font-bold">{status}</h1>
      <h2 class="text-3xl">
        {status === 404 ? 'Stránka nebyla nalezena' : 'Bohužel, stránku se nepodařilo načíst'}
      </h2>
    {/if}
    {#if status !== 404}
      <button
        class="inline-flex mt-8 p-2 items-center border-1 border-blue-600 rounded-md text-xs text-blue-600 uppercase"
        on:click={() => location.reload()}
        ><svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>Obnovit stránku</button>
    {/if}
  </section>
</PageTransition>
