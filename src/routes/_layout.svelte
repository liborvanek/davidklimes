<script context="module" lang="ts">
  export const preload = () => {};
</script>

<script lang="ts">
  import { stores } from '@sapper/app';
  import { fade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  import { showNewsletterIntro } from '../stores';

  // You may not want to use `segment`, but it is passed for the time being and will
  // create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
  // https://github.com/sveltejs/sapper/issues/824
  const { preloading } = stores();
  export let segment: string;
  let activeMenuItem = 0;
  let hoveredMenuItem: number | null = null;
  let searchResult: number;

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
  $: {
    searchResult = pages.findIndex(({ slug }) => slug === segment);
    activeMenuItem = searchResult === -1 ? 0 : searchResult;
  }
  $: currentPage = pages[activeMenuItem];
</script>

<style>
  .moving-box {
    width: 6rem;
    height: 2.4rem;
    left: 0.9rem;
    top: -0.1rem;
  }
  .menu-link {
    @apply text-gray-500 no-underline;
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

<div class="mx-auto max-w-screen-2xl px-12 pb-32">
  <section class="mt-8 flex justify-between">
    <div
      class="transform {activeMenuItem
        ? 'scale-75'
        : 'scale-100'} transition-transform duration-150">
      <a href="/">
        <picture>
          <source srcset="lion.webp" type="image/webp" />
          <source srcset="lion.png" type="image/png" />
          <img src="lion.png" alt="Ilustrace lva" class="w-24 mb-12" />
        </picture>
      </a>
    </div>
    <nav class="relative mt-8 text-2xl text-right font-bold ">
      <!-- <svg width="69" height="28" viewBox="0 0 69 28" style="transform: translate({arrowRotate});" class="z-10 rotating-arrow absolute top-2 -left-16 transition-transform duration-500 text-gray-300">
        <path fill="currentColor" fill-rule="nonzero" d="M54.52 27.248l13.568-13.536L54.52.176l-2.976 2.976 8.448 8.448L0 11.776V16l59.992-.176-8.448 8.448z" />
      </svg> -->
      <div
        class="moving-box absolute bg-gray-100 transition-transform duration-500 rounded-sm"
        style="transform: translateX({hoveredMenuItem !== null
          ? pages[hoveredMenuItem].translate
          : pages[activeMenuItem].translate}rem) rotate(-1deg) scaleX({hoveredMenuItem !== null
          ? pages[hoveredMenuItem].scale
          : pages[activeMenuItem].scale});" />
      <ul class="pb-20 relative flex flex-row z-20 lowercase">
        {#each pages as { slug, name }, i}
          <li class="transition-transform duration-500 origin-bottom-left">
            <a
              href={slug}
              class="menu-link px-8 transition-colors {i === activeMenuItem ? 'active' : ''}"
              on:mouseover={() => handleMouseOver(i)}
              on:mouseout={handleMouseOut}
              rel="prefetch">{name}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </section>
  <main>
    {#if !$showNewsletterIntro}
      <h1
        class="origin-bottom-left transform -rotate-1 inline-block {activeMenuItem === 0
          ? 'text-8xl leading-none'
          : 'text-6xl leading-normal'}  font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-1000"
        out:fade={{ duration: 300, easing: cubicInOut }}>
        {#if activeMenuItem === 0}
          <span
            class="relative reveal-text first block bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-1000"
            >David</span
          ><span
            class="relative reveal-text second block bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-1000"
            >Klimeš</span>
        {:else}
          {currentPage.name}
        {/if}
      </h1>
    {/if}

    <slot />
  </main>
</div>
