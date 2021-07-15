<script context="module">
  export async function preload(page) {
    const { articleSlug } = page.params;

    const res = await this.fetch(`api/article/${articleSlug}`);

    if (res.status === 200) {
      const article = await res.json();
      return { article };
    }

    this.error(404, 'Not found');
  }
</script>

<script>
  import PageTransition from '../../components/PageTransition.svelte';
  import Meta from '../../components/Meta.svelte';

  export let article;

  const jsonldObject = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    datePublished: article.isoDate,
    dateModified: article.isoDate,
  };
  const jsonld = JSON.stringify(jsonldObject);
  let jsonldScript = `<script type="application/ld+json">${jsonld + '<'}/script>`;
</script>

<svelte:head>
  <title>{article.title} – David Klimeš</title>
  <Meta
    title={article.title}
    description={article.perex} />
  {@html jsonldScript}
</svelte:head>

<PageTransition>
  <article class="prose mt-0 xl:-mt-14 xl:ml-auto xl:mr-0">
    <h1>{article.title}</h1>
    {@html article.markup}
  </article>
</PageTransition>

<style>
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
