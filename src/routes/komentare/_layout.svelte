<script>
  import PageTransition from '../../components/PageTransition.svelte';

  // You may not want to use `segment`, but it is passed for the time being and will
  // create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
  // https://github.com/sveltejs/sapper/issues/824
  export let segment;
</script>

<svelte:head>
  <title>Komentáře | David Klimeš</title>
</svelte:head>

<PageTransition>
  <section class="mt-12 flex">
    <aside class="w-1/4">
      <ul class="text-xl font-normal space-y-4 text-right">
        <li><a href="" class="text-blue-1000 font-bold">v médiích</a></li>
        <li><span class="text-gray-400 font-bold">archiv newsletterů</span></li>
      </ul>
    </aside>
    <div class="px-32 space-y-8">
      <slot />
    </div>
  </section>
</PageTransition>
