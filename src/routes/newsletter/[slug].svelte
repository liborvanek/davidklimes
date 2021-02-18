<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;

    const res = await this.fetch(`api/newsletter/${slug}.json`);

    if (res.status === 200) {
      const article = await res.json();
      return { article };
    }

    this.error(404, 'Not found');
  }
</script>

<script>
  import PageTransition from '../../components/PageTransition.svelte';
  export let article;
</script>

<style>
  article {
    margin-left: auto;
    margin-right: 0;
  }
  :global {
  }
</style>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<PageTransition>
  <article class="prose">
    {@html article.markup}
  </article>
</PageTransition>
