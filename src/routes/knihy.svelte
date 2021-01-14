<script>
  import PageTransition from '../components/PageTransition.svelte';
</script>

<svelte:head>
  <title>Knihy | David Klimeš</title>
</svelte:head>

<PageTransition>
  <article class="mt-8 ">
    <div class="w-3/12">
      <span
        class="inline-block ml-64 transform -rotate-2 origin-bottom text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-50"
        >2020</span
      >
    </div>
    <div class="flex">
      <div class="mt-12 ml-40 mr-20 w-5/12">
        <picture
          class="inline-block shadow-3xl transform -rotate-1 border-8 border-gray-100 bg-gradient-to-r from-gray-200 to-gray-100">
          <!-- <source media="(min-width: 600px)" srcset="image_100x100.jpg">
          <source media="(min-width: 1024px)" srcset="image_300x300.jpg"> -->
          <img
            src="/cesko-vs-budoucnost.jpg"
            alt="Kniha Česko vs. budoucnost"
            class=""
            with="384"
            height="543"
          />
        </picture>
      </div>
      <div class="w-7/12">
        <h2 class="max-w-xs text-3xl font-bold text-gray-800 leading-snug">
          Česko versus budoucnost:<br /><span class="font-normal"
            >Naše dnešní krize a jak z ní ven</span
          >
        </h2>
        <p class="mt-8 text-sm text-gray-700 leading-7">
          Přehled některých z těch nejakutnějších problémů, jimž dnes čelí Česká republika. Situaci
          přirovnává k předčasné krizi středního věku, která se projevuje nespokojeností, nejistotou
          a neřešením příčin problémů. Výsledkem je „zaseklý stát“ bez silných sdílených hodnot,
          který nedokáže řešit některé nejnaléhavější úkoly.
        </p>
        <a
          href=""
          class="inline-block mt-8 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-bold uppercase focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-md"
          >Koupit</a
        >
        <p class="mt-8 text-gray-500 text-sm">
          <span class="">Nakladatel:</span>
          <a href="" class="font-bold">Vyšehrad</a>
        </p>
        <p class="mt-1 text-gray-500 text-sm">
          <span class="">Datum vydání:</span>
          <span href="" class="font-bold">2020</span>
        </p>
      </div>
    </div>
  </article>
  <article class="mt-24 ">
    <div class="text-right mr-64">
      <span
        class="inline-block transform origin-bottom text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-50"
        >2017</span
      >
    </div>
    <div class="flex">
      <div class="w-7/12 pl-16 mt-20 text-right">
        <h2 class="text-3xl font-bold text-gray-800 leading-snug">
          Jak probudit Česko
          <br /><span class="font-normal">Recept na úspěšnou republiku</span>
        </h2>
        <p class="mt-8 text-sm text-gray-700 leading-7 pl-32">
          Česká společnost zažívá od roku 1989 nejúspěšnější a nejsvobodnější období své historie.
          Ale dosavadní sociální a ekonomický model nevyhnutelně krachuje. Mylně si namlouváme, že
          za vše mohou neschopní politici a snažíme se je nahradit novými a neokoukanými. Ale za
          politickými krizemi číhá čím dál jasnější úpadek dosavadního polistopadového konsenzu. Jak
          ale probudit Česko, aby přestalo jen přešlapovat na místě a vykročilo k dalšímu
          čtvrtstoletí prosperity a úspěchů?
        </p>
      </div>

      <div class="mt-8 ml-20 mr-20 w-5/12">
        <picture
          class="inline-block shadow-3xl rounded-md transform rotate-1 border-8 border-gray-100">
          <!-- <source media="(min-width: 600px)" srcset="image_100x100.jpg">
          <source media="(min-width: 1024px)" srcset="image_300x300.jpg"> -->
          <img src="/jak-probudit-cesko.jpg" alt="Kniha Česko vs. budoucnost" class="" />
        </picture>
      </div>
    </div>
  </article>
</PageTransition>
