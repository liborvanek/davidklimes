<script context="module" lang="ts">
  import { formatDate, bindSingles } from '../utils';

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

  function getDelay(i: number, page: number) {
    if (i < 4) {
      return i * 100;
    }
    if (page > 1) {
      const y = i % articlesPerPage;
      if (y < 4) {
        return y * 100;
      }
    }
    return 400;
  }
</script>

<svelte:head>
  <title>Archiv newsletterů | David Klimeš</title>
</svelte:head>

<div class="xl:-mt-12">
  {#each newsletterArchive as { archiveUrl, title, date, id, isoDate }, i}
    <article
      class="px-4 lg:px-16 py-4 lg:py-8 bg-gray-50 bg-gradient-to-r from-white to-gray-50 mb-4 rounded-md transform hover:scale-105 transition-transform origin-center"
      in:fly={{ x: 20, delay: getDelay(i, pageToLoad) }}>
      <div class="lg:flex">
        <div
          class="mr-16 mb-2 text-2xl lg:text-6xl leading-none font-black bg-gray-300 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-200">
          {id}
        </div>
        <div>
          <h2 class="max-w-xl mb-4 text-xl lg:text-2xl leading-normal font-bold text-gray-700 ">
            <Link href={archiveUrl ? archiveUrl : `/newsletter/${id}`} class="dotted"
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
