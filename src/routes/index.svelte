<script lang="ts">
  import { onMount } from 'svelte';
  import promiseMinDelay from 'p-min-delay';

  import type { IArticle } from '../server/dbApi';
  import { showNewsletterIntro } from '../stores';
  import { clipRect } from '../transitions';
  import Link from '../components/Link.svelte';
  import PageTransition from '../components/PageTransition.svelte';
  import Newsletter from '../components/Newsletter.svelte';
  import NewsletterOutro from '../components/NewsletterOutro.svelte';

  // This promise will never resolve
  let latestArticlePromise: Promise<IArticle> = new Promise(() => {});

  onMount(() => {
    // This promise will replace the first one and will be resolved in the {#await} block
    // It will run on client only
    latestArticlePromise = promiseMinDelay(
      fetch('/api/latest-article').then((body) => body.json()),
      1000,
    );
  });
</script>

<svelte:head>
  <title>David Klimeš</title>
  <meta
    name="description"
    content="Přihlaste si k odběru můj pravidelný pondělní newsletter o všem podstatném v byznysu a politice." />
</svelte:head>

{#if $showNewsletterIntro}
  <NewsletterOutro />
{:else}
  {#await latestArticlePromise then { title, link }}
    <aside
      in:clipRect={{ duration: 500, delay: 0 }}
      class="hidden lg:block absolute px-8 py-4 lg:pt-10 lg:pl-12 lg:pr-12 lg:pb-12 lg:w-1/3 lg:top-16 right-8 xl:right-16 2xl:right-24 transform -rotate-1 bg-gray-50 dark:bg-gray-800 ">
      <span class="uppercase text-xs text-gray-500">poslední komentář</span>
      <h2 class="max-w-lg mt-2 mb-2">
        <Link
          href={link}
          class="dotted inline-block text-lg font-bold text-gray-600 visited:text-gray-600 dark:text-gray-300 dark:visited:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500 underline transition-colors"
          >{title}</Link>
      </h2>
    </aside>
  {/await}
  <PageTransition outDuration={$showNewsletterIntro ? 300 : 0}>
    <section class="mt-8 mb-16 lg:ml-8 lg:mt-16  ">
      <Newsletter />
    </section>
  </PageTransition>
{/if}
