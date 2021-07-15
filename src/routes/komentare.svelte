<script context="module" lang="ts">
  import { formatDate, getArticleDelay } from '../utils';
  import type { IArticle } from '../server/dbApi';

  interface IArticleWithDate extends IArticle {
    date: string;
  }
  interface IKomentareResult {
    articles: IArticle[];
    count: number;
  }

  const apiRoute = '/api/articles';

  export async function preload({ query }) {
    // In SSR query is a URLSearchParams, on clinet it is a plain object
    const pageNumber = ('get' in query ? parseInt(query.get('page')) : parseInt(query.page)) || 1;

    try {
      const res = await this.fetch(`${apiRoute}?page=${pageNumber}`);
      const { articles, count }: IKomentareResult = await res.json();

      const articlesDated = articles.map((item) => ({ ...item, date: formatDate(item.isoDate) }));
      return { articles: articlesDated, count };
    } catch {
      this.error(404, 'Not found');
    }
  }
</script>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { stores } from '@sapper/app';

  import Link from '../components/Link.svelte';
  import Meta from '../components/Meta.svelte';
  import Pagination from '../components/Pagination.svelte';

  import { bindSingles } from '../utils';

  export let articles: IArticleWithDate[];
  export let count: number;

  const { page } = stores();
  const articlesPerPage = 12;
  let pageToLoad = 1;
  $: currentPage = parseInt($page.query.page as string) || 1;
</script>

<svelte:head>
  <title>Komentáře – David Klimeš</title>
  <Meta
    title="Komentáře Davida Klimeše"
    description="Archiv komentářů ekonomického a politického dění. Publikuji na Aktuálně.cz a v Českém rozhlasu Plus." />
</svelte:head>

<div id="komentare" class="xl:-mt-12 grid lg:grid-cols-2 gap-x-12 lg:gap-x-4 gap-y-4 lg:gap-y-4">
  {#each articles as { link, title, perex, date, type }, i}
    <article
      class="md:p-6 md:px-8 2xl:px-12 md:py-6 lg:py-8 2xl:py-10 md:bg-gray-50 md:dark:bg-dark-gray-800 {i %
      2
        ? 'md:bg-gradient-to-br'
        : 'md:bg-gradient-to-tl'} from-white dark:from-dark-gray-900 to-gray-50 dark:to-dark-gray-800 mb-4 rounded-md transform hover-hover:hover:scale-105 transition-transform origin-center"
      in:fly={{ x: 20, delay: getArticleDelay(i, pageToLoad, articlesPerPage) }}>
      <h2 class="pr-6 sm:pr-16 mb-4 text-xl font-bold text-gray-700">
        {#if type === 'article'}
          <Link href={link} variant="heading">{@html bindSingles(title)}</Link>
        {:else}
          <Link href={link} target="_blank" variant="heading">{@html bindSingles(title)}</Link>
        {/if}
      </h2>
      <p class="max-w-2xl text-sm">
        {@html bindSingles(perex)}
      </p>
      <p class="mt-3 text-sm text-gray-500 flex items-center">
        <span class="font-bold text-gray-600 dark:text-dark-gray-300">{date}</span>,
        {#if type === 'komentarRozhlasPlus'}
          <img src="/cesky-rozhlas-plus.svg" class="svg ml-2 inline w-4" alt="Český rozhlas Plus" />
        {:else if type === 'komentarAktualne'}
          <img src="/aktualne.svg" class="svg ml-2 inline w-6" alt="Aktuálně.cz" />
        {/if}
      </p>
    </article>
  {/each}
</div>
<div class="text-center">
  <Pagination
    path="/komentare"
    {currentPage}
    itemsCount={count}
    perPage={articlesPerPage}
    on:navigate={() =>
      document.getElementById('komentare').scrollIntoView({ behavior: 'smooth' })} />
</div>
