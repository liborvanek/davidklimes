<script context="module" lang="ts">
  import { formatDate, getArticleDelay } from '../utils';
  import type { IArticle } from '../server/dbApi';

  interface IArticleWithDate extends IArticle {
    date: string;
  }

  const apiRoute = '/api/articles';

  export async function preload() {
    const res = await this.fetch(apiRoute);
    const rawArticles: IArticle[] = await res.json();

    const articles = rawArticles.map((item) => ({ ...item, date: formatDate(item.isoDate) }));
    return { articles };
  }
</script>

<script lang="ts">
  import { fly } from 'svelte/transition';

  import Button from '../components/Button.svelte';
  import Link from '../components/Link.svelte';
  import ErrorMessage from '../components/ErrorMessage.svelte';
  import { bindSingles } from '../utils';

  export let articles: IArticleWithDate[];
  const articlesPerPage = 12;
  let pageToLoad = 1;
  let loadingMore = false;
  let loadingError: string;

  async function getMoreArticles() {
    loadingMore = true;
    loadingError = undefined;
    try {
      const res = await fetch(`${apiRoute}?page=${pageToLoad}`);
      const rawArticles: IArticle[] = await res.json();
      const newArticles = rawArticles.map((item) => ({ ...item, date: formatDate(item.isoDate) }));
      articles = [...articles, ...newArticles];
      pageToLoad = pageToLoad + 1;
    } catch (e) {
      loadingError = 'Nepodařilo se načíst další články.';
    } finally {
      loadingMore = false;
    }
  }
</script>

<svelte:head>
  <title>Komentáře – David Klimeš</title>
  <meta
    name="description"
    content="Přihlaste si k odběru můj pravidelný pondělní newsletter o všem podstatném v byznysu a politice." />
</svelte:head>

<div class="xl:-mt-12 grid lg:grid-cols-2 gap-x-12 lg:gap-x-8 gap-y-4 lg:gap-y-8">
  {#each articles as { link, title, perex, date, type }, i}
    <article
      class="md:p-6 md:px-8 2xl:px-12 md:py-6 lg:py-8 2xl:py-10 md:bg-gray-50 {i % 2
        ? 'md:bg-gradient-to-br'
        : 'md:bg-gradient-to-tl'} from-white to-gray-50 mb-4 rounded-md transform md:hover:scale-105 transition-transform origin-center"
      in:fly={{ x: 20, delay: getArticleDelay(i, pageToLoad, articlesPerPage) }}>
      <h2 class="pr-6 sm:pr-16 mb-4 text-xl font-bold text-gray-700">
        <Link href={link} target="_blank" class="dotted">{@html bindSingles(title)}</Link>
      </h2>
      <p class="max-w-2xl text-sm">
        {@html bindSingles(perex)}
      </p>
      <p class="mt-3 text-sm text-gray-500 flex items-center">
        <span class="font-bold text-gray-600">{date}</span>,
        {#if type === 'komentarRozhlasPlus'}
          <img src="/cesky-rozhlas-plus.svg" class="svg ml-2 inline w-4" alt="Český rozhlas Plus" />
        {:else}
          <img src="/aktualne.svg" class="svg ml-2 inline w-6" alt="Aktuálně.cz" />
        {/if}
      </p>
    </article>
  {/each}
</div>
<div class="text-center">
  {#if loadingError !== undefined}
    <ErrorMessage classes="mx-auto text-center">
      {loadingError}
    </ErrorMessage>
  {/if}
  <Button on:click={getMoreArticles} isSubmitting={loadingMore}>Načíst starší</Button>
</div>
