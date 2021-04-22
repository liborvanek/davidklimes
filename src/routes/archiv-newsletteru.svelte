<script context="module" lang="ts">
  import { formatDate, bindSingles, getArticleDelay } from '../utils';

  interface INewsletterItem {
    id: number;
    title: string;
    date: string;
    archiveUrl?: string;
    isoDate: string;
  }
  interface INewslettersResult {
    newsletterArchive: INewsletterItem[];
    count: number;
  }

  const apiRoute = '/api/newsletter-archive';

  export async function preload({ query }) {
    // In SSR query is a URLSearchParams, on clinet it is a plain object
    const pageNumber = ('get' in query ? parseInt(query.get('page')) : parseInt(query.page)) || 1;

    try {
      const res = await this.fetch(`${apiRoute}?page=${pageNumber}`);
      const { newsletterArchive, count }: INewslettersResult = await res.json();

      const newslettersDated = newsletterArchive.map((item) => ({
        ...item,
        date: formatDate(item.isoDate),
      }));
      return { newsletterArchive: newslettersDated, count };
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

  export let newsletterArchive: INewsletterItem[];
  export let count: number;

  const { page } = stores();
  const articlesPerPage = 12;
  let pageToLoad = 1;

  $: currentPage = parseInt($page.query.page as string) || 1;
</script>

<svelte:head>
  <title>Archiv newsletterů – David Klimeš</title>
  <Meta
    title="Archiv newsletterů – David Klimeš"
    description="Všechna čísla newsletteru o podstatných souvislostech v byznysu a politice." />
</svelte:head>

<div class="xl:px-4 xl:-mt-12" id="archivNewsletteru">
  {#each newsletterArchive as { archiveUrl, title, date, id, isoDate }, i}
    <article
      class="sm:px-4 xl:px-16 py-4 lg:py-8 bg-gray-50 dark:bg-dark-gray-900 bg-gradient-to-r from-white dark:from-dark-gray-900  to-gray-50 dark:to-dark-gray-800 mb-4 rounded-md transform hover-hover:hover:scale-105 transition-transform origin-center"
      in:fly={{ x: 20, delay: getArticleDelay(i, pageToLoad, articlesPerPage) }}>
      <div class="lg:flex">
        <div
          class="mr-12 mb-2 text-2xl lg:text-6xl leading-none font-black bg-gray-300 dark:bg-dark-gray-700 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 dark:from-dark-gray-600 to-gray-200 dark:to-dark-gray-700"
          aria-label={`Newsletter číslo ${id}`}>
          {id}.
        </div>
        <div>
          <h2 class="max-w-xl mb-4 text-xl lg:text-2xl leading-normal font-bold text-gray-700 ">
            <Link href={archiveUrl ? archiveUrl : `/newsletter/${id}`} variant="heading"
              >{@html bindSingles(title)}</Link>
          </h2>
          <time
            datetime={isoDate.split('T')[0]}
            class="font-bold text-gray-600 dark:text-dark-gray-400">
            {date}
          </time>
        </div>
      </div>
    </article>
  {/each}
</div>
<div class="text-center">
  <Pagination
    path="/archiv-newsletteru"
    {currentPage}
    itemsCount={count}
    perPage={articlesPerPage}
    on:navigate={() =>
      document.getElementById('archivNewsletteru').scrollIntoView({ behavior: 'smooth' })} />
</div>
