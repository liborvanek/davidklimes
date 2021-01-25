<script context="module">
  import PageTransition from '../../components/PageTransition.svelte';
  import { formatDate } from '../../utils';

  export async function preload() {
    const res = await this.fetch(`komentare/rssFeed.json`);
    const rawRssFeed = await res.json();

    const rssFeed = rawRssFeed.map((item) => ({ ...item, date: formatDate(item.isoDate) }));
    return { rssFeed };
  }
</script>

<script>
  export let rssFeed;
</script>

<svelte:head>
  <title>Komentáře | David Klimeš</title>
</svelte:head>

<PageTransition>
  <div class="grid md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-8">
    {#each rssFeed as rssItem}
      <article class="">
        <h2 class="max-w-lg mb-2 text-xl font-bold text-gray-700">
          <a href={rssItem.link} target="_blank">{rssItem.title}</a>
        </h2>
        <p class="max-w-2xl">
          {rssItem.content}
        </p>
        <p class="mt-3 text-sm text-gray-500 flex items-center">
          {rssItem.date},
          {#if rssItem.type === 'rozhlas'}
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
