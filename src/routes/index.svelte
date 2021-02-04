<script lang="ts">
  import { onMount } from 'svelte';
  import promiseMinDelay from 'p-min-delay';

  import type { IArticle } from '../server/dbApi';
  import { showNewsletterIntro, latestArticle } from '../stores';
  import { clipRect } from '../transitions';
  import PageTransition from '../components/PageTransition.svelte';
  import Newsletter from '../components/Newsletter.svelte';
  import NewsletterOutro from '../components/NewsletterOutro.svelte';

  // This promise will never resolve
  let latestArticlePromise: Promise<IArticle> = new Promise(() => {});

  onMount(() => {
    // This promise will replace the first one and will be resolved in the {#await} block
    // It will run on client only
    latestArticlePromise = promiseMinDelay(
      fetch('/api/latest-article.json').then((body) => body.json()),
      800,
    );
  });
</script>

<svelte:head>
  <title>David Klimeš</title>
</svelte:head>

{#if $showNewsletterIntro}
  <NewsletterOutro />
{:else}
  <PageTransition outDuration={$showNewsletterIntro ? 300 : 0}>
    {#await latestArticlePromise then { title, link }}
      <aside
        in:clipRect={{ duration: 500, delay: 0 }}
        class="absolute top-16 right-16 transform -rotate-1 bg-gray-50 pt-10 pl-12 pr-12 pb-12 w-1/3">
        <span class="uppercase text-xs text-gray-500">poslední komentář</span>
        <h2 class="max-w-lg mt-2 mb-2">
          <a
            href={link}
            class="inline-block text-lg font-bold text-gray-600 visited:text-gray-600 hover:text-blue-800 underline"
            >{title}</a>
        </h2>
      </aside>
    {/await}

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
