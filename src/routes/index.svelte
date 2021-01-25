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
    <section class="mt-8 lg:mt-24 mb-16">
      <Newsletter />
    </section>
    <hr class="h-1 bg-gradient-to-r from-brown-50 to-brown-100 border-transparent" />
    <section class="lg:w-2/3 mt-10 mb-12 ml-4">
      <blockquote class="mb-8 text-gray-500 text italic leading-relaxed">
        „Davida Klimeše považuji za vzácný druh racionálního komentátora, který pečlivě pracuje se
        zdroji, má historickou paměť a píše tak, aby se podle toho dalo vládnout.“
        <footer class="inline-block">
          — <cite class="author not-italic font-bold">Tomáš Němeček</cite>
        </footer>
      </blockquote>
      <blockquote class="mb-8 text-gray-500 text italic leading-relaxed">
        „Doporučuju ke stabilnímu sledování – přijde mi, že jako jeden z mála začíná práci na
        komentářích spíš otázkou ‚co o tom vlastně víme’ než ‚co chci, aby si o tom lidi mysleli’.“
        <footer class="inline-block">
          — <cite class="author not-italic font-bold">Michal Kašpárek</cite>
        </footer>
      </blockquote>
    </section>
  </PageTransition>
{/if}
