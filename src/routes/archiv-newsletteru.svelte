<script context="module" lang="ts">
  import { fly } from 'svelte/transition';

  import { formatDate } from '../utils';
  import Link from '../components/Link.svelte';

  interface NewsletterItem {
    id: number;
    title: string;
    date: string;
    archiveUrl?: string;
    isoDate: string;
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
  <title>Archiv newsletterů | David Klimeš</title>
</svelte:head>

<div class="xl:-mt-12">
  {#each newsletterArchive as { archiveUrl, title, date, id, isoDate }, i}
    <article
      class="px-4 lg:px-16 py-4 lg:py-8 bg-gray-50 bg-gradient-to-r from-white to-gray-50 mb-4 rounded-md transform hover:scale-105 transition-transform origin-center"
      in:fly={{ x: 20, delay: i < 4 ? i * 100 : 400 }}>
      <div class="lg:flex">
        <div
          class="mr-16 mb-2 text-2xl lg:text-6xl leading-none font-black bg-gray-300 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-200">
          {id}
        </div>
        <div>
          <h2 class="max-w-xl mb-4 text-xl lg:text-2xl leading-normal font-bold text-gray-700 ">
            <Link href={archiveUrl ? archiveUrl : `/newsletter/${id}`} class="dotted">{title}</Link>
          </h2>
          <time datetime={isoDate.split('T')[0]} class="font-bold text-gray-600">
            {date}
          </time>
        </div>
      </div>
    </article>
  {/each}
</div>
