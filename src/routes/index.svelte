<script lang="ts">
  import { onMount } from 'svelte';
  import promiseMinDelay from 'p-min-delay';

  import Link from '../components/Link.svelte';
  import PageTransition from '../components/PageTransition.svelte';
  import Newsletter from '../components/Newsletter.svelte';
  import NewsletterOutro from '../components/NewsletterOutro.svelte';
  import Meta from '../components/Meta.svelte';

  import { clipRect } from '../transitions';
  import { showNewsletterIntro } from '../stores';
  import { bindSingles } from '../utils';
  import type { IArticle } from '../server/dbApi';

  // This promise will never resolve
  let latestArticlePromise: Promise<IArticle> = new Promise(() => {});

  const mondayClubhouse = {
    subtitle: 'Pondělní clubhouse',
    title: 'Kam směřuje česká zahraniční politika?',
    annotation: 'Zvláštní host: šéfredaktorka českého Euractivu Aneta Zachová.',
    link: 'https://www.joinclubhouse.com/event/mJ6knwjV',
    isoDate: '2021-04-19T20:00:00.000Z',
    date: `<div class="flex items-center"><img class="w-6 mr-2 inline-block" src="icon/clubhouse-wave.png" alt="Clubhouse icon"/><span>19. 4. 2021, 20:00</span></div>`,
  };
  onMount(() => {
    // This promise will replace the first one and will be resolved in the {#await} block
    // It will run on client only
    latestArticlePromise = promiseMinDelay(
      new Date().getDay() < 2
        ? Promise.resolve(mondayClubhouse)
        : fetch('/api/latest-article').then((body) => body.json()),
      1000,
    );
  });
</script>

<svelte:head>
  <title>David Klimeš – novinář</title>
  <Meta
    title="David Klimeš – novinář"
    description="Komentátor ekonomického a politického dění. Přihlaste si k odběru můj pravidelný pondělní newsletter o všem podstatném v byznysu a politice." />
</svelte:head>

{#if $showNewsletterIntro}
  <NewsletterOutro />
{:else}
  {#await latestArticlePromise then { title, subtitle, annotation, link, date }}
    <aside
      in:clipRect={{ duration: 500, delay: 0 }}
      class="hidden lg:block absolute px-8 py-4 lg:pt-10 lg:pl-12 lg:pr-12 lg:pb-12 lg:w-96 lg:top-16 right-8 xl:right-16 2xl:right-24 transform -rotate-1 bg-gray-50 dark:bg-gray-800"
      aria-live="off">
      <span class="uppercase text-xs text-gray-500">{@html subtitle}</span>
      <h2 class="max-w-lg text-lg mt-2 mb-2">
        <Link
          href={link}
          class="dotted inline-block font-bold text-gray-600 visited:text-gray-600 dark:text-gray-300 dark:visited:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500 underline transition-colors"
          >{@html bindSingles(title)}</Link>
      </h2>
      {#if annotation}
        <p class="mt-4 text-sm text-gray-500">{annotation}</p>
      {/if}
      {#if date}
        <p class="mt-4 text-xs text-gray-400">{@html date}</p>
      {/if}
    </aside>
  {/await}
  <PageTransition outDuration={$showNewsletterIntro ? 300 : 0}>
    <section class="mt-8 mb-16 lg:ml-8 lg:mt-16  ">
      <Newsletter />
    </section>
  </PageTransition>
{/if}
