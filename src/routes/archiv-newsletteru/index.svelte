<script context="module" lang="ts">
  import { fly } from 'svelte/transition';
  import { formatDate } from '../../utils';

  interface NewsletterItem {
    id: number;
    title: string;
    date: string;
    archiveUrl?: string;
  }

  export async function preload() {
    const res = await this.fetch('/api/newsletter-archive.json');
    const rawNewsletterArchive = await res.json();

    const newsletterArchive: NewsletterItem[] = rawNewsletterArchive.map((item) => ({
      ...item,
      date: formatDate(item.isoDate),
    }));

    return { newsletterArchive };
  }
</script>

<script lang="ts">
  export let newsletterArchive: NewsletterItem[];
</script>

<svelte:head>
  <title>Achiv newsletterů | David Klimeš</title>
</svelte:head>

<div class="mx-auto -mt-8">
  {#each newsletterArchive as { archiveUrl, title, date, id }, i}
    <article
      class="px-16 py-8 bg-gray-50 bg-gradient-to-r from-white to-gray-50 mb-4 rounded-md transform hover:scale-105 transition-transform origin-center"
      in:fly={{ y: 20, delay: i * 100 }}>
      <h2 class="max-w-xl mb-4 text-2xl leading-normal font-bold text-gray-700 ">
        <a href={archiveUrl ? archiveUrl : `/newsletter/${id}`} class="">{title}</a>
      </h2>
      <p class="text-gray-500 ">
        {date}
      </p>
    </article>
  {/each}
</div>
