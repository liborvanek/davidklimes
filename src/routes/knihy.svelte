<script lang="ts">
  import PageTransition from '../components/PageTransition.svelte';
  import LinkButton from '../components/LinkButton.svelte';

  const books = [
    {
      title:
        'Česko versus budoucnost:<br /><span class="font-normal ">Naše dnešní krize a&nbsp;jak z ní ven</span>',
      description:
        'Přehled některých z těch nejakutnějších problémů, jimž dnes čelí Česká republika. Situaci přirovnává k předčasné krizi středního věku, která se projevuje nespokojeností, nejistotou a neřešením příčin problémů. Výsledkem je „zaseklý stát“ bez silných sdílených hodnot, který nedokáže řešit některé nejnaléhavější úkoly.',
      image: 'cesko-vs-budoucnost',
      link: 'https://www.cz',
      publisher: 'Vyšehrad',
      year: 2020,
    },
    {
      title:
        'Jak probudit Česko<br /><span class="font-normal ">Recept na úspěšnou republiku</span>',
      description:
        'Česká společnost zažívá od roku 1989 nejúspěšnější a nejsvobodnější období své historie. Ale dosavadní sociální a ekonomický model nevyhnutelně krachuje. Mylně si namlouváme, že za vše mohou neschopní politici a snažíme se je nahradit novými a neokoukanými. Ale za politickými krizemi číhá čím dál jasnější úpadek dosavadního polistopadového konsenzu. Jak ale probudit Česko, aby přestalo jen přešlapovat na místě a vykročilo k dalšímu čtvrtstoletí prosperity a úspěchů?',
      image: 'jak-probudit-cesko',
      link: 'https://www.cz',
      publisher: 'BizBooks',
      year: 2017,
    },
    {
      title:
        'Jak zábavné je informovat<br /><span class="font-normal ">Infotainment čili infozábava v teorii, praxi a českém kontextu</span>',
      description:
        'Publikace shrnuje teoretické uvažování o pronikání zábavy do zpravodajství a předkládá odpovídající koncept infotainmentu (infozábavy), skrze který je užitečné jednotlivé infozábavní jevy analyzovat. Přináší také nový pohled na to, jak k šíření infozábavy do médií přistupovat. ',
      image: 'jak-zabavne-je-informovat',
      link: 'https://www.cz',
      publisher: 'Karolinum',
      year: 2015,
    },
    {
      title: 'Šimon Pánek<br /><span class="font-normal ">Aby dobro neškodilo</span>',
      description:
        'Šimon Pánek je výrazná osobnost veřejného života a humanitární manažer. Knižní rozhovor představuje obě roviny jeho celoživotní práce a od konkrétních životních situací se dostává k obecnějším, nadčasovým problémům.',
      image: 'aby-dobro-neskodilo',
      link: 'https://www.cz',
      publisher: 'Portál',
      year: 2015,
    },
  ];
</script>

<style>
  .book-grid {
    display: grid;
    grid-template-columns: 1fr 6rem 6rem 1fr;
  }

  .book-grid:nth-of-type(odd) > .image {
    grid-column: 1;
    grid-row: 1;
    justify-self: end;
  }
  .book-grid:nth-of-type(odd) > .text {
    grid-column: 3 / 5;
  }
  .book-grid:nth-of-type(even) > .image {
    grid-column: 4;
    grid-row: 1;
  }
  .book-grid:nth-of-type(even) > .text {
    grid-column: 1 / 3;
    text-align: right;
  }
</style>

<svelte:head>
  <title>Knihy | David Klimeš</title>
</svelte:head>

<PageTransition classes="max-w-screen-lg mx-auto mt-16 space-y-32">
  {#each books as { title, description, image, link, publisher, year }, i}
    <article class="book-grid">
      <div class="text flex flex-col {i % 2 === 0 ? '' : 'items-end'}">
        <h2 class="max-w-xs mt-4 heading text-3xl font-bold text-gray-800 leading-snug">
          {@html title}
        </h2>
        <p class="mt-8 text-sm leading-7">
          {description}
        </p>
        <p class="mt-10"><LinkButton>Koupit</LinkButton></p>
      </div>
      <div class="image">
        <figure>
          <picture>
            <source srcset="/{image}.webp" type="image/webp" />
            <img
              src="/{image}.jpg"
              alt="Kniha Česko vs. budoucnost"
              width="384"
              height="543"
              class="block shadow-3xl transform {i % 2 === 0
                ? '-'
                : ''}rotate-1 border-8 border-gray-100 bg-gradient-to-r from-gray-200 to-gray-100"
              loading={i === 0 ? 'eager' : 'lazy'} />
          </picture>
          <figcaption class="mt-8 space-y-1 text-center text-gray-500 text-sm">
            <p>
              <span class="text-xs">Nakladatel:</span>
              <a href="" class="font-bold">{publisher}</a>
            </p>
            <p>
              <span class="text-xs">Datum vydání:</span>
              <span href="" class="text-gray-600 font-bold">{year}</span>
            </p>
          </figcaption>
        </figure>
      </div>
    </article>
  {/each}
</PageTransition>
