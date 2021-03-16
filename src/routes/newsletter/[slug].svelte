<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;

    const res = await this.fetch(`api/newsletter/${slug}`);

    if (res.status === 200) {
      const article = await res.json();
      return { article };
    }

    this.error(404, 'Not found');
  }
</script>

<script>
  import PageTransition from '../../components/PageTransition.svelte';
  import BackToTop from '../../components/BackToTop.svelte';

  export let article;
</script>

<style>
  article {
    margin-left: auto;
    margin-right: 0;
  }
  article a.back {
    @apply inline-block mb-4 no-underline text-sm transform -rotate-1;
  }
  article a.back .arrow {
    @apply inline-block transition-transform;
  }
  article a.back:hover .arrow {
    @apply transform -translate-x-3;
  }
</style>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<PageTransition>
  <article class="prose mt-0 lg:-mt-14">
    <a class="back" href="/archiv-newsletteru"><span class="arrow">&larr;</span> zpět na archiv</a>
    <h1>{article.title}</h1>
    {@html article.markup}
  </article>
  <BackToTop elementSelector="a.back" />
</PageTransition>
