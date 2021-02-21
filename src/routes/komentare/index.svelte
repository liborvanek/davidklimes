<script context="module" lang="ts">
  import { fly } from 'svelte/transition';

  import { formatDate } from '../../utils';
  import type { IArticleWithType } from '../../server/dbApi';
  import Link from '../../components/Link.svelte';

  interface IArticleWithDate extends IArticleWithType {
    date: string;
  }

  export async function preload() {
    const res = await this.fetch('/api/articles.json');
    const rawArticles: IArticleWithType[] = await res.json();

    const articles = rawArticles.map((item) => ({ ...item, date: formatDate(item.isoDate) }));
    return { articles };
  }
</script>

<script lang="ts">
  export let articles: IArticleWithDate[];
</script>

<svelte:head>
  <title>Komentáře | David Klimeš</title>
</svelte:head>

<div class="xl:-mt-12 grid lg:grid-cols-2 gap-x-12 lg:gap-x-8 lg:gap-y-8">
  {#each articles as { link, title, content, date, type }, i}
    <article
      class="-ml-4 -mr-4 md:mx-0 p-4 md:px-12 md:py-10 bg-gray-50 {i % 2
        ? 'bg-gradient-to-br'
        : 'bg-gradient-to-tl'} from-white to-gray-50 mb-4 rounded-md transform hover:scale-105 transition-transform origin-center"
      in:fly={{ x: 20, delay: i < 4 ? i * 100 : 400 }}>
      <h2 class="pr-6 sm:pr-16 mb-4 text-xl font-bold text-gray-700">
        <Link href={link} target="_blank" class="dotted">{title}</Link>
      </h2>
      <p class="max-w-2xl text-sm">
        {content}
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
