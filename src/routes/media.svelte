<script>
  import PageTransition from '../components/PageTransition.svelte';
</script>

<svelte:head>
  <title>Media | David Klimeš</title>
</svelte:head>

<PageTransition>
  <section class="mt-12 flex">
    <aside class="w-1/4">
      <ul class="text-xl font-normal space-y-4 text-blue-600 underline">
        <li>komentáře</li>
        <li>newslettery</li>
      </ul>
    </aside>
    <div class="px-32 space-y-8 text-gray-800">
      <article class="">
        <h2 class="max-w-lg mb-2 text-xl font-bold text-gray-700">
          Česko se pod náporem viru rozpadá. Deset kroků by ho mohlo zase spojit
        </h2>
        <p class="max-w-2xl">
          Zkrachovala pozitivní motivace. Zkrachovala represe. Zůstal jen rozkládající se stát, kde
          se šíří nákaza a lidé čekají, kolik jich přežije.
        </p>
        <p class="mt-3 text-sm text-gray-500">11. 1. 2020</p>
      </article>
      <article class="">
        <h2 class="max-w-lg mb-2 text-xl font-bold text-gray-700">
          Každý Evropan by chtěl s Čínou lepší dohodu. Ale i tato může zkrotit unijní Zemany
        </h2>
        <p class="max-w-2xl">
          Investiční smlouva mezi EU a Čínou nemusí dopadnout špatně. Záleží, jak se bude v reálu
          dodržovat a zda Evropa vedle cukru taky občas vezme do ruky bič.
        </p>
        <p class="mt-3 text-sm text-gray-500">10. 1. 2020</p>
      </article>
    </div>
  </section>
</PageTransition>
