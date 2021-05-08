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

  interface IArticleExtended extends IArticle {
    date: string;
    subtitle: string;
    annotation?: string;
  }
  // This promise will never resolve
  let latestArticlePromise: Promise<IArticleExtended> = new Promise(() => {});

  // const mondayClubhouse = {
  //   subtitle: 'Pondělní vysílání na Twitter Spaces',
  //   title: 'Jak dohnat ztráty nejdéle zavřeného školství v Evropě?',
  //   annotation: 'Zvláštní host: Daniel Münich',
  //   link: 'https://twitter.com/david_klimes',
  //   isoDate: '2021-04-26T20:00:00.000Z',
  //   date: `<div class="flex items-center"><img width="24" height="24" class="mr-2 inline-block" src="icon/twitter.svg" alt="Twitter icon"/><span>3. 5. 2021, 20:00</span></div>`,
  // };
  onMount(() => {
    // This promise will replace the first one and will be resolved in the {#await} block
    // It will run on client only
    // latestArticlePromise = promiseMinDelay(
    //   new Date().getDay() < 2
    //     ? Promise.resolve(mondayClubhouse)
    //     : fetch('/api/latest-article').then((body) => body.json()),
    //   1000,
    // );
    latestArticlePromise = promiseMinDelay(
      fetch('/api/latest-article').then((body) => body.json()),
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
      class="hidden lg:block absolute w-80 xl:w-96 top-0 xl:top-16 right-0 xl:right-16 2xl:right-24  p-12 pt-10 transform -rotate-1 bg-gray-50 dark:bg-dark-gray-800"
      aria-live="off">
      <span class="uppercase text-xs text-gray-500 dark:text-dark-gray-400">{@html subtitle}</span>
      <h2 class="max-w-lg text-lg mt-2 mb-2">
        <Link href={link} variant="heading">{@html bindSingles(title)}</Link>
      </h2>
      {#if annotation}
        <p class="mt-4 text-sm text-gray-500 dark:text-dark-gray-400">{annotation}</p>
      {/if}
      {#if date}
        <p class="mt-4 text-xs text-gray-400 dark:text-dark-gray-200">{@html date}</p>
      {/if}
    </aside>
  {/await}
  <PageTransition outDuration={$showNewsletterIntro ? 300 : 0}>
    <section class="mt-8 mb-16 lg:ml-8 lg:mt-16  ">
      <Newsletter />
    </section>
  </PageTransition>
{/if}
