<script context="module">
  import PageTransition from '../../components/PageTransition.svelte';
  import { formatDate } from '../../utils';

  export async function preload() {
    const res = await this.fetch(`/newsletter-mailchimp-tmp.json`);
    const rawFeed = await res.json();

    const feed = rawFeed.map((item) => ({ ...item, date: formatDate(item.date) }));

    return { feed };
  }
</script>

<script>
  export let feed;
</script>

<svelte:head>
  <title>Komentáře | David Klimeš</title>
</svelte:head>

<PageTransition>
  <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-20 gap-y-8">
    {#each feed as newsletter}
      <article class="">
        <h2 class="mb-2 text-base font-bold text-gray-700">
          <a href={newsletter.link} target="_blank" class="no-underline">{newsletter.subject}</a>
        </h2>
        <p class="mt-3 text-sm text-gray-500 flex items-center">
          {newsletter.date}
        </p>
      </article>
    {/each}
  </div>
</PageTransition>
