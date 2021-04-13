<script lang="ts">
  import PageTransition from '../components/PageTransition.svelte';
  import LinkButton from '../components/LinkButton.svelte';

  const books = [
    {
      title: 'Česko versus budoucnost:',
      subtitle: 'Naše dnešní krize a&nbsp;jak z ní ven',
      short: 'Česko versus budoucnost',
      description:
        'Přehled některých z těch nejakutnějších problémů, jimž dnes čelí Česká republika. Situaci přirovnávám k předčasné krizi středního věku, která se projevuje nespokojeností, nejistotou a neřešením příčin problémů. Výsledkem je „zaseklý stát“ bez silných sdílených hodnot, který nedokáže řešit některé nejnaléhavější úkoly.',
      image: 'cesko-vs-budoucnost',
      link: 'https://www.ivysehrad.cz/tituly/64694486/cesko-versus-budoucnost/',
      publisher: 'Vyšehrad',
      year: 2020,
    },
    {
      title: 'Jak probudit Česko',
      subtitle: 'Recept na úspěšnou republiku',
      short: 'Jak probudit Česko',
      description:
        'Česká společnost zažívá od roku 1989 nejúspěšnější a nejsvobodnější období své historie. Ale dosavadní sociální a ekonomický model nevyhnutelně krachuje. Mylně si namlouváme, že za vše mohou neschopní politici a snažíme se je nahradit novými a neokoukanými. Ale za politickými krizemi číhá čím dál jasnější úpadek dosavadního polistopadového konsenzu. Jak ale probudit Česko, aby přestalo jen přešlapovat na místě a vykročilo k dalšímu čtvrtstoletí prosperity a úspěchů?',
      image: 'jak-probudit-cesko',
      link: 'http://www.albatrosmedia.cz/tituly/38978104/jak-probudit-cesko/',
      publisher: 'BizBooks',
      year: 2017,
    },
    {
      title: 'Jak zábavné je informovat',
      subtitle: 'Infotainment čili infozábava v teorii, praxi a českém kontextu',
      short: 'Jak zábavné je informovat',
      description:
        'Publikace shrnuje teoretické uvažování o pronikání zábavy do zpravodajství a předkládá odpovídající koncept infotainmentu (infozábavy), skrze který je užitečné jednotlivé infozábavní jevy analyzovat. Přináší také nový pohled na to, jak k šíření infozábavy do médií přistupovat. ',
      image: 'jak-zabavne-je-informovat',
      link: 'http://www.cupress.cuni.cz/ink2_ext/index.jsp?include=podrobnosti&id=257866',
      publisher: 'Karolinum',
      year: 2015,
    },
    {
      title: 'Šimon Pánek',
      subtitle: 'Aby dobro neškodilo',
      short: 'Aby dobro neškodilo',
      description:
        'Šimon Pánek je výrazná osobnost veřejného života a humanitární manažer. Knižní rozhovor představuje obě roviny jeho celoživotní práce a od konkrétních životních situací se dostává k obecnějším, nadčasovým problémům.',
      image: 'aby-dobro-neskodilo',
      link: 'http://obchod.portal.cz/panek-simon--aby-dobro-neskodilo/',
      publisher: 'Portál',
      year: 2015,
    },
  ];
</script>

<svelte:head>
  <title>Knihy – David Klimeš</title>
  <meta
    name="description"
    content="Pokud si chcete přečíst něco delšího o české společnosti, ekonomice, politice či médiích, zkuste některou z mých knih." />
</svelte:head>

<PageTransition classes="max-w-screen-lg mx-auto mt-8 lg:mt-16 space-y-24 lg:space-y-32">
  {#each books as { title, subtitle, short, description, image, link, publisher, year }, i}
    <article class="book-grid">
      <h2
        class="info max-w-xs mt-4 heading text-2xl lg:text-3xl font-bold text-gray-800 leading-snug">
        {@html title}
        <span class="block mt-2 font-normal">{@html subtitle}</span>
      </h2>
      <figure class="image my-8 sm:my-0">
        <picture>
          <source srcset="/{image}.webp" type="image/webp" />
          <img
            src="/{image}.jpg"
            alt={`Přebal knihy ${short}`}
            width="384"
            height="543"
            class="block w-32 sm:w-auto shadow-3xl transform {i % 2 === 0
              ? '-'
              : ''}rotate-1 border-8 border-gray-100 bg-gradient-to-r from-gray-200 to-gray-100"
            loading={i === 0 ? 'eager' : 'lazy'} />
        </picture>
        <figcaption class="mt-8 space-y-1 sm:text-center text-gray-500 text-sm">
          <p>
            <span class="text-xs">Nakladatel:</span>
            <span class="text-gray-600 font-bold">{publisher}</span>
          </p>
          <p>
            <span class="text-xs">Datum vydání:</span>
            <span class="text-gray-600 font-bold">{year}</span>
          </p>
        </figcaption>
      </figure>
      <p class="info sm:mt-8 text-sm leading-7">
        {description}
      </p>
      <div class="info mt-8"><LinkButton href={link}>Koupit</LinkButton></div>
    </article>
  {/each}
</PageTransition>

<style>
  @screen sm {
    .book-grid {
      display: grid;
      grid-template-columns: 1fr 3rem 3rem 1fr;
    }

    .book-grid:nth-of-type(odd) > .image {
      grid-column: 1;
      grid-row: 1 / 5;
      justify-self: end;
    }
    .book-grid:nth-of-type(odd) > .info {
      grid-column: 3 / 5;
    }
    .book-grid:nth-of-type(even) > .image {
      grid-column: 4;
      grid-row: 1 / 5;
    }
    .book-grid:nth-of-type(even) > .info {
      grid-column: 1 / 3;
      text-align: right;
      justify-self: end;
    }
  }
  @screen lg {
    .book-grid {
      grid-template-columns: 1fr 6rem 6rem 1fr;
    }
  }
</style>
