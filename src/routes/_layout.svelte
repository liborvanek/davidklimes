<script context="module">
  export const preload = () => {};
</script>

<script>
  import { stores } from '@sapper/app';

  // You may not want to use `segment`, but it is passed for the time being and will
  // create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
  // https://github.com/sveltejs/sapper/issues/824
  const { page } = stores();
  export let segment;
  let activeMenuItem = 0;
  let hoveredMenuItem = null;
  let searchResult;

  const pages = [
    {
      slug: '/',
      name: 'úvod',
      heading: 'David<br>Klimeš',
      scale: '1',
      translate: 0,
    },
    {
      slug: 'media',
      name: 'komentáře',
      heading: 'Media',
      scale: '1.7',
      translate: 9.8,
    },
    {
      slug: 'knihy',
      name: 'knihy',
      heading: 'Knihy',
      scale: '1.05',
      translate: 19.8,
    },
    {
      slug: 'o-mne',
      name: 'o mně',
      heading: 'O mně',
      scale: '1.1',
      translate: 28.2,
    },
  ];
  let arrowRotate = pages[activeMenuItem].translate;

  function handleMouseOver(linkNr) {
    hoveredMenuItem = linkNr;
  }
  function handleMouseOut() {
    hoveredMenuItem = null;
    console.log(hoveredMenuItem);
  }
  $: {
    searchResult = pages.findIndex(({ slug }) => slug === segment);
    activeMenuItem = searchResult === -1 ? 0 : searchResult;
  }

  $: currentPage = pages[activeMenuItem];
  // const selectedStyle = "bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-black";
  $: console.log(hoveredMenuItem);
  const selectedStyle = '';
</script>

<div class="mx-auto max-w-screen-2xl px-12 pb-32">
  <section class="mt-8 flex justify-between">
    <div>
      <img src="/lion.png" alt="Lion" class="w-24 mb-12" />
      <h1
        class="origin-bottom-left transform -rotate-1 inline-block {activeMenuItem === 0
          ? 'text-8xl leading-none'
          : 'text-6xl leading-normal'}  font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-1000"
      >{@html currentPage.heading}</h1>
    </div>
    <nav class="relative mt-8 text-2xl text-right font-bold ">
      <!-- <svg width="69" height="28" viewBox="0 0 69 28" style="transform: translate({arrowRotate});" class="z-10 rotating-arrow absolute top-2 -left-16 transition-transform duration-500 text-gray-300">
        <path fill="currentColor" fill-rule="nonzero" d="M54.52 27.248l13.568-13.536L54.52.176l-2.976 2.976 8.448 8.448L0 11.776V16l59.992-.176-8.448 8.448z" />
      </svg> -->
      <div
        class="moving-box absolute bg-gray-100 transition-transform duration-500 rounded-sm"
        style="transform: translateX({hoveredMenuItem !== null
          ? pages[hoveredMenuItem].translate
          : pages[activeMenuItem].translate}rem) rotate({hoveredMenuItem % 2
          ? '-'
          : ''}0.5deg) scaleX({hoveredMenuItem !== null
          ? pages[hoveredMenuItem].scale
          : pages[activeMenuItem].scale});"
      />
      <ul class="pb-20 relative flex flex-row z-20">
        {#each pages as { slug, name }, i}
          <li class="transition-transform duration-500 origin-bottom-left">
            <!-- <a href="{slug}" class="{i === activeMenuItem ? selectedStyle : "text-gray-400"}" on:mouseover={() => handleMouseOver(i)} on:mouseout={handleMouseOut}>{name}</a> -->
            <a
              href={slug}
              class="menu-link px-8 transition-colors {i === activeMenuItem ? 'active' : ''}"
              on:mouseover={() => handleMouseOver(i)}
              on:mouseout={handleMouseOut}>{name}</a
            >
          </li>
        {/each}
      </ul>
    </nav>
  </section>

  <slot />
</div>

<style>
  .moving-box {
    width: 6rem;
    height: 2.4rem;
    left: 0.9rem;
    top: -0.1rem;
  }
  .menu-link {
    @apply text-gray-400;
  }
  .menu-link:hover {
    /* @apply text-gray-00; */
  }
  .menu-link.active {
    @apply text-gray-700;
  }
</style>
