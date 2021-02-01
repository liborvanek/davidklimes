<script lang="ts">
  import { onMount } from 'svelte';

  import { showNewsletterIntro, lastArticle } from '../stores';
  import { clipRect } from '../transitions';
  import PageTransition from '../components/PageTransition.svelte';
  import Newsletter from '../components/Newsletter.svelte';
  import NewsletterOutro from '../components/NewsletterOutro.svelte';

  let isMounted = false;

  onMount(() => {
    isMounted = true;
  });
</script>

<svelte:head>
  <title>David Klimeš</title>
</svelte:head>

{#if $showNewsletterIntro}
  <NewsletterOutro />
{:else}
  <PageTransition outDuration={$showNewsletterIntro ? 300 : 0}>
    {#if isMounted}
      <aside
        in:clipRect={{ duration: 500, delay: 800 }}
        class="absolute top-16 right-16 transform -rotate-1 bg-gray-50 p-12 w-1/3">
        <span class="uppercase text-xs text-gray-500">poslední komentář</span>
        <h2 class="max-w-lg mt-2 mb-2 text-lg font-bold text-gray-600 underline">
          Žijeme ve státě, který nám umírá před očima. Tentokrát bohužel doslovně.
        </h2>
      </aside>
    {/if}
    <section class="mt-8 ml-8 lg:mt-16 mb-16 ">
      <Newsletter />
    </section>
    <hr class="h-1 w-2/3 mx-auto bg-gradient-to-r from-brown-50 to-brown-100 border-transparent" />
    <section class="lg:w-2/3 mx-auto mt-10 mb-12 text-lg">
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
