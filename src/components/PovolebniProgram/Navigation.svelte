<script lang="ts">
  import { fly } from 'svelte/transition';
  import { stores } from '@sapper/app';

  import { bindSingles } from '../../utils';
  import Link from '../../components/Link.svelte';

  const data = [
    {
      id: 1,
      slug: 'dane-se-zvysi',
      title: 'Daně se nevyhnutelně zvýší.',
      subtitle: 'Ale které a o kolik?',
    },
    {
      id: 2,
      slug: 'vydaje-musi-klesnout',
      title: 'Výdaje státu musí klesnout.',
      subtitle: 'Ale které, aby to nebyly jen halíře?',
    },
    {
      id: 3,
      slug: 'pandemicky-zakon',
      title: 'Pandemický zákon se musí změnit.',
      subtitle: 'Ale jak?',
    },
    {
      id: 4,
      slug: 'stop-stretu-zajmu',
      title: 'Musíme zabránit střetu zájmů všech příštích Babišů.',
      subtitle: 'Jinak to bude drahé.',
    },
    {
      id: 5,
      slug: 'narodni-plan-obnovy',
      title: 'Národní plán obnovy je Potěmkinova vesnice.',
      subtitle: 'Znovu a lépe.',
    },
    {
      id: 6,
      slug: 'tendr-na-dukovany',
      title: 'Nyní nelze vyhlásit tendr na Dukovany.',
      subtitle: 'Za jakých podmínek ano?',
    },
    {
      id: 7,
      slug: 'konec-dluhovych-pasti',
      title: 'Konec mnoha dluhových pastí je na dosah.',
      subtitle: 'Ale musí se o tom vědět.',
    },
    {
      id: 8,
      slug: 'a-co-pak',
      title: 'A co pak?',
      subtitle: 'Pak přijde spousta další práce.',
    },
  ];

  export let isSmall = false;
  const { page } = stores();

  $: path = $page.path.replace('/', '').split('/');
  $: activeId = data.findIndex(({ slug }) => slug === path[1]);
</script>

{#each data as { slug, title, subtitle, id }}
  <ul>
    <li
      in:fly={{ x: 20, delay: 0 }}
      class={`relative ${id === activeId + 1 && id !== data.length ? 'active-item' : ''}`}>
      <div
        class={`lg:flex lg:-mx-12 px-4 xl:px-16 py-4 lg:py-8 bg-gray-50 dark:bg-dark-gray-900 ${
          id % 2 ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
        } from-white dark:from-dark-gray-900 to-gray-50 dark:to-dark-gray-800 mb-4 rounded-md transform hover-hover:hover:scale-105 transition-transform origin-center ${
          id === activeId + 1 ? 'mb-24' : ''
        } ${id <= activeId + 1 ? 'opacity-75 darek:opacity-50 ' : ''}`}>
        <div
          class={`mr-12 mb-2 text-2xl ${
            !isSmall ? 'lg:text-9xl' : 'lg:text-6xl'
          } leading-none font-black bg-gray-300 dark:bg-dark-gray-700 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 dark:from-dark-gray-600 to-gray-200 dark:to-dark-gray-700`}
          aria-label={`Téma č. ${id}`}>
          {id}.
        </div>
        <div>
          <h2
            class={`max-w-xl mb-4 text-xl ${
              !isSmall ? 'lg:text-5xl' : 'lg:text-3xl'
            } text-gray-700`}>
            <Link href={`/povolebni-program/${slug}`} variant="heading" class="leading-tight"
              >{@html bindSingles(title)}<br /><span
                class={`${!isSmall ? 'lg:text-2xl' : 'lg:text-xl'} font-normal`}
                >{@html bindSingles(subtitle)}</span
              ></Link>
          </h2>
        </div>
      </div>
    </li>
  </ul>
{/each}

<style>
  .active-item::before {
    content: '↓';
    position: absolute;
    bottom: -4rem;
    left: 50%;
    width: 50px;
    margin-left: -25px;
    text-align: center;
    @apply text-5xl text-dark-gray-600;
  }
</style>
