<script lang="ts">
  import PageTransition from '../PageTransition.svelte';
  import Navigation from '../PovolebniProgram/Navigation.svelte';
  import Newsletter from '../Newsletter.svelte';

  export let isLastTopic = false;
</script>

<PageTransition classes="max-w-screen-lg mx-auto ">
  <article
    data-content="1."
    class="before:absolute before:left-0 before:top-0 before:content-[attr(data-content)] before:text-gray-200 dark:before:text-dark-gray-500 before:text-9xl sm:px-4 xl:px-16 py-4 lg:py-8 mb-8 ">
    <h1
      class="mb-8 text-4xl md:text-6xl leading-tight font-extrabold bg-black bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-dark-gray-100 to-blue-1000 dark:to-dark-gray-300 ">
      <slot name="h1" />
    </h1>
    <h2
      class="mb-12 text-xl md:text-4xl leading-tight font-extrabold text-dark-gray-600 dark:text-gray-400">
      <slot name="h2" />
    </h2>
    <div class="prose prose-lg">
      <slot />
      <div class="mt-8">
        <div class="w-24 h-1 bg-gray-300 dark:bg-gray-700" />
        <p class="font-bold text-xl leading-relaxed"><slot name="cta" /></p>
        {#if !isLastTopic}
          <p>
            Napište mi svůj názor na <a href="mailto:info@davidklimes.cz">info@davidklimes.cz</a>,
            následně ho sem vložím i pro ostatní. Všechny vaše nápady probereme i v newsletteru, tak
            ho
            <a href="/">nezapomeňte začít odbírat</a>.
          </p>
        {:else}
          <Newsletter isFullWidth />{/if}
      </div>
    </div>
  </article>
  <div class="max-w-2xl mx-auto">
    <Navigation isSmall />
  </div>
  <slot name="footer" />
</PageTransition>

<style>
  .povolebni-program-article:before {
    /* content: '1.';
    font-size: 240px;
    position: absolute;
    left: 0;
    top: 0;
    @apply text-gray-200;
    @apply dark:text-dark-gray-800;
    font-weight: 800;
    z-index: -1; */
  }
</style>
