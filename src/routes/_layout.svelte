<script context="module" lang="ts">
  export const preload = () => {};
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  // import { stores } from '@sapper/app';
  import { fade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  import MenuIcon from '../components/MenuIcon.svelte';
  import { showNewsletterIntro } from '../stores';

  // You may not want to use `segment`, but it is passed for the time being and will
  // create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
  // https://github.com/sveltejs/sapper/issues/824

  // To see the loading status
  // const { preloading } = stores();

  export let segment: string;
  let activeMenuItem = 0;
  let hoveredMenuItem: number | null = null;
  let searchResult: number;
  let showMobileMenu = false;
  let isNarrowScreen = false;

  const pages = [
    {
      slug: '/',
      name: 'Úvod',
      scale: '1',
      translate: 0,
    },
    {
      slug: 'komentare',
      name: 'Komentáře',
      scale: '1.7',
      translate: 9.8,
    },
    {
      slug: 'knihy',
      name: 'Knihy',
      scale: '1.05',
      translate: 19.8,
    },
    {
      slug: 'o-mne',
      name: 'O mně',
      scale: '1.1',
      translate: 28.2,
    },
  ];

  function handleMouseOver(linkNr: number) {
    hoveredMenuItem = linkNr;
  }
  function handleMouseOut() {
    hoveredMenuItem = null;
  }

  const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);
  const mediaQueryHandler = (e) => {
    // Reset mobile state
    if (!e.matches) {
      showMobileMenu = false;
      isNarrowScreen = true;
    }
  };

  // Attach media query listener on mount hook
  onMount(() => {
    const mediaListener = window.matchMedia('(max-width: 767px)');

    mediaListener.addListener(mediaQueryHandler);
  });

  $: {
    searchResult = pages.findIndex(({ slug }) => slug === segment);
    if (segment === undefined) {
      activeMenuItem = 0;
    } else if (searchResult !== -1) {
      activeMenuItem = searchResult;
    } else {
      activeMenuItem = 0;
    }
  }
  $: currentPage = pages[activeMenuItem];
  $: hideStaticH1 = showNewsletterIntro || !activeMenuItem;
</script>

<style>
  .moving-box {
    width: 6rem;
    height: 2.4rem;
    left: 0.9rem;
    top: -0.1rem;
  }
  .menu-link {
    @apply text-gray-600 no-underline;
  }
  .showMobileMenu .menu-link {
    @apply text-white text-3xl;
  }
  .menu-link:hover {
    @apply text-blue-700;
  }
  .menu-link.active {
    @apply text-blue-900;
  }
  .reveal-text:before,
  .reveal-text:after {
    content: '';
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .reveal-text:before {
    background-color: #fff;
    opacity: 1;
    animation-name: uncover;
    animation-duration: 0ms;
    animation-fill-mode: forwards;
  }
  .reveal-text:after {
    @apply bg-gray-100;
    transform: scaleX(0);
    animation-name: overlay;
    animation-duration: 500ms;
  }
  .reveal-text.first:before {
    animation-delay: 350ms;
  }
  .reveal-text.first:after {
    animation-delay: 100ms;
  }
  .reveal-text.second:before {
    animation-delay: 550ms;
  }
  .reveal-text.second:after {
    animation-delay: 300ms;
  }

  @keyframes -global-overlay {
    0% {
      transform: scaleX(0);
      transform-origin: left;
    }
    50% {
      transform: scaleX(1);
      transform-origin: left;
    }
    51% {
      transform: scaleX(1);
      transform-origin: right;
    }
    100% {
      transform: scaleX(0);
      transform-origin: right;
    }
  }
  @keyframes -global-uncover {
    to {
      opacity: 0;
    }
  }
</style>

<div class="mx-auto max-w-screen-2xl px-6 md:px-12 pb-32">
  <header class="py-4 md:py-8 flex justify-between items-center">
    <div
      class="transform {activeMenuItem
        ? 'md:scale-75'
        : 'md:scale-100'} transition-transform duration-150">
      <a href="/">
        <picture>
          <source srcset="lion.webp" type="image/webp" />
          <source srcset="lion.png" type="image/png" />
          <img src="lion.png" alt="Logo" class="w-14 md:w-24" aria-label="Na úvod" />
        </picture>
      </a>
    </div>
    <nav class="lg:relative text-2xl text-right font-bold" role="navigation">
      <MenuIcon
        isOpen={showMobileMenu}
        on:menuClick={handleMobileIconClick}
        menuId="menu"
        classes="z-30 relative fixed" />
      <div
        class="moving-box absolute hidden lg:block bg-gray-100 dark:bg-gray-800 transition-transform duration-500 rounded-sm"
        style="transform: translateX({hoveredMenuItem !== null
          ? pages[hoveredMenuItem].translate
          : pages[activeMenuItem].translate}rem) rotate(-1deg) scaleX({hoveredMenuItem !== null
          ? pages[hoveredMenuItem].scale
          : pages[activeMenuItem].scale});" />
      <ul
        id="menu"
        class="{showMobileMenu
          ? 'opacity-100 showMobileMenu transition-opacity duration-300'
          : 'invisible lg:visible opacity-0 lg:opacity-100'} absolute left-0 top-0 w-full h-screen lg:w-auto lg:h-auto lg:relative lg:flex flex-col lg:flex-row pt-12 lg:pt-0 bg-blue-500 bg-opacity-97 lg:bg-transparent z-20 lowercase">
        {#each pages as { slug, name }, i}
          <li class="transition-transform duration-500 origin-bottom-left text-center py-2 lg:py-0">
            <a
              href={slug}
              class="menu-link px-8 transition-colors {i === activeMenuItem ? 'active' : ''}"
              on:mouseover={() => handleMouseOver(i)}
              on:mouseout={handleMouseOut}
              on:click={() => (showMobileMenu = false)}
              rel="prefetch">{name}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </header>
  <main aria-live="polite" class="mt-4 relative">
    {#if !$showNewsletterIntro}
      <h1
        class="mb-4 origin-bottom-left transform -rotate-1 inline-block {activeMenuItem === 0
          ? 'text-6xl md:text-8xl leading-none'
          : 'text-4xl md:text-6xl leading-normal'}  font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-1000"
        out:fade={{ duration: 300, easing: cubicInOut }}>
        {#if activeMenuItem === 0}
          <span
            class="relative reveal-text first block bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-1000 dark:from-gray-400 dark:to-gray-50"
            >David</span
          ><span
            class="relative reveal-text second block bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-1000 dark:from-gray-400 dark:to-gray-50 ml-8"
            >Klimeš</span>
        {:else}
          {currentPage.name}
        {/if}
      </h1>
    {/if}

    <slot />
  </main>
</div>
