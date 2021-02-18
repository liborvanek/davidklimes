<script context="module" lang="ts">
  import PageTransition from '../../../components/PageTransition.svelte';
  import { formatDate } from '../../../utils';

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

<PageTransition>
  <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-20 gap-y-8">
    {#each newsletterArchive as { archiveUrl, title, date, id }}
      <article class="">
        <h2 class="mb-2 text-base font-bold text-gray-700">
          <a href={archiveUrl ? archiveUrl : `/newsletter/${id}`} class="no-underline">{title}</a>
        </h2>
        <p class="mt-3 text-sm text-gray-500 flex items-center">
          {date}
        </p>
      </article>
    {/each}
  </div>
</PageTransition>
