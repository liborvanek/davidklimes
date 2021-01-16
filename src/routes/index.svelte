<script>
  import { showNewsletterIntro } from '../stores';

  import PageTransition from '../components/PageTransition.svelte';
  import Newsletter from '../components/Newsletter.svelte';
  import NewsletterOutro from '../components/NewsletterOutro.svelte';
</script>

<svelte:head>
  <title>David Klimeš</title>
</svelte:head>

{#if $showNewsletterIntro}
  <NewsletterOutro />
{:else}
  <PageTransition outDuration={$showNewsletterIntro ? 300 : 0}>
    <section class="mt-24 mb-16">
      <Newsletter />
    </section>
    <hr class="w-2/3 h-0.5 bg-gradient-to-r from-gray-300 to-gray-100" />
    <section class="w-1/2 mt-10 mb-12 ml-4">
      <blockquote class="mb-6 text-sm text-gray-500 text italic">
        „Čtu pravidelně a podporuji“
        <footer class="inline-block">
          — <cite class="author not-italic font-bold">Tomáš Němeček</cite>
        </footer>
      </blockquote>
      <blockquote class="mb-6 text-sm text-gray-500 text italic">
        „Doporučuju ke stabilnímu sledování – přijde mi, že jako jeden z mála začíná práci na
        komentářích spíš otázkou ‚co o tom vlastně víme’ než ‚co chci, aby si o tom lidi mysleli’“
        <footer class="inline-block">
          — <cite class="author not-italic font-bold">Michal Kašpárek</cite>
        </footer>
      </blockquote>
    </section>
  </PageTransition>
{/if}
