<script context="module" lang="ts">
  import PageTransition from '../../../components/PageTransition.svelte';
  import { formatDate } from '../../../utils';

  interface NewsletterItem {
    date: string;
    subject: string;
    link: string;
  }

  export async function preload() {
    const res = await this.fetch('/api/newsletter-archive.json');
    const rawNewsletterArchive: NewsletterItem[] = await res.json();

    rawNewsletterArchive.unshift({
      subject: 'Rekonstrukce volebního dramatu u Ústavního soudu i miliarda z EBRD',
      link:
        '/komentare/archiv-newsletteru/54-rekonstrukce-volebniho-dramatu-u-ustavniho-soudu-i-miliarda-z-ebrd',
      date: '2020-02-08',
    });

    const newsletterArchive = rawNewsletterArchive.map((item) => ({
      ...item,
      date: formatDate(item.date),
    }));

    return { newsletterArchive };
  }
</script>

<script lang="ts">
  export let newsletterArchive: NewsletterItem[];
</script>

<svelte:head>
  <title>Komentáře | David Klimeš</title>
</svelte:head>

<PageTransition>
  <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-20 gap-y-8">
    {#each newsletterArchive as { link, subject, date }}
      <article class="">
        <h2 class="mb-2 text-base font-bold text-gray-700">
          <a href={link} class="no-underline">{subject}</a>
        </h2>
        <p class="mt-3 text-sm text-gray-500 flex items-center">
          {date}
        </p>
      </article>
    {/each}
  </div>
</PageTransition>
