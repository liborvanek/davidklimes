<script context="module" lang="ts">
  import PageTransition from '../../components/PageTransition.svelte';
  import { formatDate } from '../../utils';
  import type { IArticleWithType } from '../../server/dbApi';

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

<PageTransition>
  <div class="grid md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-8">
    {#each articles as { link, title, content, date, type }}
      <article class="">
        <h2 class="max-w-lg mb-2 text-xl font-bold text-gray-700">
          <a href={link} target="_blank">{title}</a>
        </h2>
        <p class="max-w-2xl">
          {content}
        </p>
        <p class="mt-3 text-sm text-gray-500 flex items-center">
          {date},
          {#if type === 'komentarRozhlasPlus'}
            <img
              src="/cesky-rozhlas-plus.svg"
              class="svg ml-2 inline w-4"
              alt="Český rozhlas Plus" />
          {:else}
            <img src="/aktualne.svg" class="svg ml-2 inline w-6" alt="Aktuálně.cz" />
          {/if}
        </p>
      </article>
    {/each}
  </div>
</PageTransition>
