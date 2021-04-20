<script context="module" lang="ts">
  import { formatDate, bindSingles, getArticleDelay } from '../utils';

  interface NewsletterItem {
    id: number;
    title: string;
    date: string;
    archiveUrl?: string;
    isoDate: string;
  }

  const apiRoute = '/api/newsletter-archive';

  export async function preload() {
    const res = await this.fetch(apiRoute);
    const rawNewsletterArchive = await res.json();

    const newsletterArchive: NewsletterItem[] = rawNewsletterArchive.map((item) => ({
      ...item,
      date: formatDate(item.isoDate),
    }));

    return { newsletterArchive };
  }
</script>

<script lang="ts">
  import { fly } from 'svelte/transition';

  import Button from '../components/Button.svelte';
  import ErrorMessage from '../components/ErrorMessage.svelte';
  import Link from '../components/Link.svelte';
  import Meta from '../components/Meta.svelte';

  export let newsletterArchive: NewsletterItem[];
  const articlesPerPage = 12;
  let pageToLoad = 1;
  let loadingMore = false;
  let loadingError: string;

  async function getMoreArticles() {
    loadingMore = true;
    loadingError = undefined;
    try {
      const res = await fetch(`${apiRoute}?page=${pageToLoad}`);
      const rawArticles: NewsletterItem[] = await res.json();
      const newArticles = rawArticles.map((item) => ({ ...item, date: formatDate(item.isoDate) }));
      newsletterArchive = [...newsletterArchive, ...newArticles];
      pageToLoad = pageToLoad + 1;
    } catch (e) {
      loadingError = 'Nepodařilo se načíst další newslettery.';
    } finally {
      loadingMore = false;
    }
  }
</script>

<svelte:head>
  <title>Archiv newsletterů – David Klimeš</title>
  <Meta
    title="Archiv newsletterů – David Klimeš"
    description="Všechna čísla newsletteru o podstatných souvislostech v byznysu a politice." />
</svelte:head>

<div class="xl:px-4 xl:-mt-12">
  {#each newsletterArchive as { archiveUrl, title, date, id, isoDate }, i}
    <article
      class="sm:px-4 xl:px-16 py-4 lg:py-8 bg-gray-50 dark:bg-dark-gray-900 bg-gradient-to-r from-white dark:from-dark-gray-900  to-gray-50 dark:to-dark-gray-800 mb-4 rounded-md transform hover-hover:hover:scale-105 transition-transform origin-center"
      in:fly={{ x: 20, delay: getArticleDelay(i, pageToLoad, articlesPerPage) }}>
      <div class="lg:flex">
        <div
          class="mr-16 mb-2 text-2xl lg:text-6xl leading-none font-black bg-gray-300 dark:bg-dark-gray-700 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 dark:from-dark-gray-600 to-gray-200 dark:to-dark-gray-700"
          aria-label={`Newsletter číslo ${id}`}>
          {id}
        </div>
        <div>
          <h2 class="max-w-xl mb-4 text-xl lg:text-2xl leading-normal font-bold text-gray-700 ">
            <Link href={archiveUrl ? archiveUrl : `/newsletter/${id}`} variant="heading"
              >{@html bindSingles(title)}</Link>
          </h2>
          <time datetime={isoDate.split('T')[0]} class="font-bold text-gray-600">
            {date}
          </time>
        </div>
      </div>
    </article>
  {/each}
  <div class="text-center lg:mt-12">
    {#if loadingError !== undefined}
      <ErrorMessage classes="mx-auto text-center">
        {loadingError}
      </ErrorMessage>
    {/if}
    <Button on:click={getMoreArticles} isSubmitting={loadingMore}>Načíst starší</Button>
  </div>
</div>
