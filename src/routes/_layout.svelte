<script context="module" lang="ts">
  export const preload = () => {};
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { fade, fly } from 'svelte/transition';
  import { cubicInOut, backInOut } from 'svelte/easing';

  import DetectOffline from '../components/DetectOffline.svelte';
  import MenuIcon from '../components/MenuIcon.svelte';
  import Link from '../components/Link.svelte';
  import { menu, headings, submenuPages } from '../pageData';
  import { trapFocus } from '../trapFocus';
  import { waitForServiceWorker } from '../utils';
  import { showNewsletterIntro } from '../stores';

  async function notifyServiceWorker() {
    if ('serviceWorker' in navigator) {
      waitForServiceWorker().then(async () => {
        const res = await fetch(`/api/newsletter/ids`);
        const ids: number[] = await res.json();

        const paths: string[] = ids.map((id) => `/api/newsletter/${id}`);
        navigator.serviceWorker.controller.postMessage({
          command: 'PRECACHE_API_CALLS',
          paths,
        });
      });
    }
  }

  // You may not want to use `segment`, but it is passed for the time being and will
  // create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
  // https://github.com/sveltejs/sapper/issues/824

  const { page } = stores();
  $: path = $page.path.replace('/', '').split('/');

  export let segment: string;
  let activeMenuItem = 0;
  let hoveredMenuItem: number | null = null;
  let searchResult: number;
  let showMobileMenu = false;

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
    }
  };

  // Attach media query listener on mount hook
  onMount(() => {
    const mediaListener = window.matchMedia('(max-width: 767px)');
    mediaListener.addListener(mediaQueryHandler);
  });

  $: {
    searchResult = menu.findIndex(({ activePaths }) => activePaths.includes(segment));
    if (segment === undefined) {
      activeMenuItem = 0;
    } else if (searchResult !== -1) {
      activeMenuItem = searchResult;
    } else {
      activeMenuItem = null;
    }
  }
  $: currentPage = activeMenuItem !== null ? menu[activeMenuItem] : null;
  $: hideStaticH1 = $showNewsletterIntro;
  $: isHomePage = path.length === 1 && path[0] === '';
  $: headingIsSpan = path[0] === 'newsletter';

  const activeClass =
    'text-blue-1000 visited:text-blue-1000 bg-gray-100 transition-colors duration-500 rounded-sm';
  const inactiveClass = 'text-gray-500 visited:text-gray-500 hover-hover:hover:text-blue-700';
</script>

<svelte:head>
  {#if showMobileMenu}<style>
      body {
        overflow: hidden;
      }
    </style>{/if}
</svelte:head>

<svelte:window on:load={notifyServiceWorker} />

<DetectOffline />
<div class="mx-auto max-w-screen-2xl px-6 md:px-12 pb-32">
  <header class="site-header pt-4 md:pt-6 pb-6 flex justify-between items-center">
    <div
      class="transform {!isHomePage
        ? 'scale-75'
        : 'scale-100'} transition-transform duration-150 origin-left">
      <a href="/" tabindex="-1" aria-hidden="true" class="focus:outline-none">
        <picture>
          <source srcset="lion.webp" type="image/webp" />
          <source srcset="lion.png" type="image/png" />
          <img
            src="lion.png"
            alt="Logo"
            class="w-14 md:w-24"
            aria-label="Na úvod"
            width="120"
            height="120" />
        </picture>
      </a>
    </div>
    <nav class="main-nav lg:relative text-2xl text-right font-bold" role="navigation">
      {#if currentPage}
        <div
          class="moving-box absolute hidden lg:block bg-gray-100 dark:bg-gray-800 transition-transform duration-500 rounded-sm"
          style="transform: translateX({hoveredMenuItem !== null
            ? menu[hoveredMenuItem].translate
            : menu[activeMenuItem].translate}rem) rotate(-1deg) scaleX({hoveredMenuItem !== null
            ? menu[hoveredMenuItem].scale
            : menu[activeMenuItem].scale});" />
      {/if}
      <!-- Main menu -->
      <ul id="menu" class="hidden lg:flex justify-center lg:flex-row lowercase">
        {#each menu as { slug, name }, i}
          <li
            class="transition-transform transform -rotate-1 duration-500 origin-bottom-left text-center py-2 lg:py-0">
            <a
              href={slug}
              class="menu-link px-8 transition-colors hover-hover:hover:text-blue-700 {i ===
              activeMenuItem
                ? 'active'
                : ''}"
              on:mouseover={() => handleMouseOver(i)}
              on:mouseout={handleMouseOut}
              on:click={() => (showMobileMenu = false)}
              sapper:prefetch>{name}</a>
          </li>
        {/each}
      </ul>
      <!-- Mobile menu -->
      <MenuIcon
        isOpen={showMobileMenu}
        on:menuClick={handleMobileIconClick}
        menuId="menu-mobile"
        classes="z-30 relative fixed" />
      {#if showMobileMenu}
        <div
          class="lg:hidden absolute left-0 top-0 w-full h-screen bg-brown-400 bg-opacity-97 z-20 flex items-center justify-center"
          in:fly={{ y: -300, duration: 150 }}>
          <ul
            id="menu-mobile"
            class="flex flex-col justify-center lowercase transform -translate-y-1/4"
            aria-live="assertive"
            use:trapFocus>
            {#each menu as { slug, name }, i}
              <li
                class:showMobileMenu
                class="text-center py-2 lg:py-0 transform -rotate-1"
                in:fly={{ y: -15, delay: i * 60, easing: backInOut, duration: 350 }}>
                <a
                  href={slug}
                  class="menu-link-mobile px-8 {i === activeMenuItem ? 'active' : ''}"
                  on:mouseover={() => handleMouseOver(i)}
                  on:mouseout={handleMouseOut}
                  on:click={() => (showMobileMenu = false)}
                  sapper:prefetch>{name}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </nav>
  </header>
  <main aria-live="polite" class="relative">
    <div
      out:fade={{ duration: 300, easing: cubicInOut }}
      class="flex items-baseline justify-between md:justify-start flex-wrap sm:space-x-2 md:space-x-12">
      {#if !hideStaticH1 && (headings[path[0]] || isHomePage)}
        {#if isHomePage}
          <h1
            class="mt-4 lg:mt-8 mb-2 lg:mb-0 origin-bottom-left transform -rotate-1 inline-block text-6xl sm:text-7xl md:text-8xl leading-none font-extrabold bg-black bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-1000">
            <span
              class="relative reveal-text first block bg-clip-text text-transparent bg-black bg-gradient-to-r from-black to-blue-1000 dark:from-gray-400 dark:to-gray-50"
              >David</span
            ><span
              class="relative reveal-text second block bg-clip-text text-transparent bg-black bg-gradient-to-r from-black to-blue-1000 dark:from-gray-400 dark:to-gray-50 ml-8"
              >Klimeš</span>
          </h1>
        {:else if headingIsSpan}
          <span
            class="mb-4 lg:mb-0 origin-bottom-left transform -rotate-1 inline-block text-4xl md:text-6xl leading-tight font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-300">
            {headings[path[0]]}
          </span>
        {:else}
          <h1
            class="mb-4 lg:mb-0 origin-bottom-left transform -rotate-1 inline-block text-4xl md:text-6xl leading-tight font-extrabold bg-black bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-1000">
            {headings[path[0]]}
          </h1>
          {#if path[0] === 'komentare'}
            <a
              href="/feeds/komentare.rss"
              class="inline-flex group p-2 space-x-1 transform -translate-y-2 items-center no-underline text-xs text-blue-600 hover:text-white bg-gray-100 hover:bg-blue-600 rounded-md"
              ><svg
                class="w-4 h-4 text-blue-300 transform group-hover:scale-125 group-hover:rotate-12 transition duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg
              ><span>RSS feed</span></a>
          {/if}
        {/if}
      {/if}
    </div>
    {#if submenuPages.includes(path[0])}
      <section class="lg:mt-6 xl:mt-24 xl:flex">
        <aside class="xl:w-2/7 mb-8 pr-8">
          <ul class=" sm:flex xl:block text-xl xl:space-y-4 xl:text-right">
            <li>
              <Link
                href="/komentare"
                class="{path[0] === 'komentare'
                  ? activeClass
                  : inactiveClass} inline-block transform xl:-rotate-1 px-4 py-1 text-sm lg:text-xl font-bold no-underline"
                >komentáře v médiích</Link>
            </li>
            <li>
              <Link
                href="/archiv-newsletteru"
                class="{path[0] === 'archiv-newsletteru'
                  ? activeClass
                  : inactiveClass} inline-block transform xl:-rotate-1 px-4 py-1 text-sm lg:text-xl font-bold no-underline"
                >archiv newsletterů</Link>
            </li>
          </ul>
        </aside>
        <div class="xl:w-5/7 xl:pl-8 space-y-8 mt-8 xl:mt-0">
          <slot />
        </div>
      </section>
    {:else}
      <slot />
    {/if}
  </main>
  <hr
    class="mt-24 mb-6 h-1 mx-auto bg-gradient-to-r from-brown-50 to-brown-100 dark:from-gray-800 dark:to-gray-900 border-transparent" />
  <footer
    class="flex flex-col lg:flex-row lg:items-center lg:space-x-8 space-y-6 lg:space-y-0 md:justify-between text-xs text-gray-500">
    <div
      class="flex xs-only:flex-col lg:items-end xs-only:space-y-4 md:space-x-12 justify-between lg:justify-items-auto">
      <div>
        <strong>David Klimeš</strong> © {new Date().getFullYear()}<br />Pište mi na
        <a class="text-blue-400 no-underline" href="mailto:info@davidklimes.cz"
          >info@davidklimes.cz</a>
      </div>
      <div class="flex space-x-4 text-brown-200">
        <a href="https://www.joinclubhouse.com/club/%23ToPodstatn%C3%A9" class="social-link"
          ><img src="icon/clubhouse.svg" alt="Clubhouse icon" /></a>
        <a href="https://twitter.com/david_klimes" class="social-link"
          ><img src="icon/twitter.svg" alt="Twitter icon" /></a>
        <a href="https://www.linkedin.com/in/davidklimes/" class="social-link"
          ><img src="icon/linkedin.svg" alt="LinkedIn icon" /></a>
        <a href="https://www.facebook.com/david.klimes" class="social-link"
          ><img src="icon/facebook.svg" alt="LinkedIn icon" /></a>
      </div>
    </div>

    <div class="text-gray-400">
      Web vyrobil <a class="text-blue-400 visited:text-blue-400 no-underline" href="/"
        >Libor Vaněk</a> <br /> na podporu nezávislé žurnalistiky.
    </div>
  </footer>
</div>

<style>
  .social-link > img {
    transition: 300ms;
  }
  .social-link:hover > img {
    filter: contrast(60%);
    transition: 300ms;
  }
  .moving-box {
    width: 6rem;
    height: 2.4rem;
    left: 0.9rem;
    top: -0.1rem;
  }
  .menu-link {
    @apply text-gray-600 no-underline;
  }
  .showMobileMenu .menu-link-mobile {
    @apply text-white text-3xl no-underline;
  }
  .showMobileMenu .menu-link-mobile.active {
    @apply text-gray-700;
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
    will-change: transform;
    transform: translateZ(0);
  }
  .reveal-text:before {
    background-color: #fff;
    opacity: 1;
    animation-name: uncover;
    animation-duration: 1ms;
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
