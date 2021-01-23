<script lang="ts">
  import PageTransition from '../../components/PageTransition.svelte';

  // You may not want to use `segment`, but it is passed for the time being and will
  // create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
  // https://github.com/sveltejs/sapper/issues/824
  export let segment: string;

  const activeClass =
    'text-blue-1000 visited:text-blue-1000 bg-gray-100 transition-colors duration-500 rounded-sm';
  const inactiveClass = 'text-gray-500 visited:text-gray-500 hover:text-blue-700';
</script>

<svelte:head>
  <title>Komentáře | David Klimeš</title>
</svelte:head>

<PageTransition>
  <section class="mt-12 flex">
    <aside class="w-1/4 pr-8">
      <ul class="text-xl font-normal space-y-4 text-right">
        <li>
          <a
            href="/komentare"
            class="{segment
              ? inactiveClass
              : activeClass} inline-block transform -rotate-1 px-4 py-1 font-bold no-underline"
            >v médiích</a>
        </li>
        <li>
          <a
            href="/komentare/archiv-newsletteru"
            class="{!segment
              ? inactiveClass
              : activeClass} inline-block transform -rotate-1 px-4 py-1 font-bold no-underline"
            >archiv newsletterů</a>
        </li>
      </ul>
    </aside>
    <div class="w-3/4 pl-8 space-y-8">
      <slot />
    </div>
  </section>
</PageTransition>
