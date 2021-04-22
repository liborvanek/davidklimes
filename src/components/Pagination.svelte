<script>
  import { createEventDispatcher } from 'svelte/internal';
  const dispatch = createEventDispatcher();

  export let currentPage = 1;
  export let itemsCount = 120;
  export let perPage = 12;
  export let small = false;
  export let path = '';

  $: s = small ? 8 : 12;
  $: pagesCount = Math.ceil(itemsCount / perPage);
  let pagesArray = [];
  function buildArr(c, n) {
    if (n <= 7) {
      return [...Array(n)].map((_, i) => i + 1);
    } else {
      if (c < 3 || c > n - 2) {
        return [1, 2, 3, '…', n - 2, n - 1, n];
      } else {
        return [1, '…', c - 1, c, c + 1, '…', n];
      }
    }
  }
  function setPagesArray() {
    pagesArray = buildArr(currentPage, pagesCount);
  }
  $: if (currentPage) {
    setPagesArray();
  }
  $: if (perPage) {
    setPagesArray();
    currentPage = 1;
  }
  $: if (itemsCount) {
    pagesCount = Math.ceil(itemsCount / perPage);
    currentPage = currentPage || 1;
  }
</script>

<nav
  aria-label="Stránkování"
  class="inline-block text-gray-700 dark:text-dark-gray-200 text-{small ? 'base' : 'lg'}">
  <ul class="flex items-center">
    <li>
      <a
        class="h-{s} w-{s} mr-4 flex justify-center items-center rounded-full
          {currentPage >
        1
          ? 'bg-blue-500 dark:bg-blue-700 hover-hover:hover:bg-blue-600 text-white'
          : 'bg-gray-100 dark:bg-dark-gray-800 text-gray-300 dark:text-dark-gray-600'}
          {currentPage ===
        1
          ? 'pointer-events-none'
          : ''}"
        href={currentPage > 1 ? `${path}?page=${currentPage - 1}` : '#'}
        aria-disabled={currentPage === 1}
        on:click={() => dispatch('navigate')}
        sapper:noscroll>
        <svg
          class="w-{s / 2} h-{s / 2}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7" /></svg>
        <span class="sr-only">Na předchozí stránku</span>
      </a>
    </li>
    {#each pagesArray as page}
      <li
        class="bg-gray-100 dark:bg-dark-gray-800 {page === 1
          ? 'rounded-tl-full rounded-bl-full'
          : ''} {page === pagesCount ? 'rounded-tr-full rounded-br-full' : ''}">
        <a
          class="w-{s} h-{s} sm:flex justify-center items-center hidden select-none leading-5 rounded-full transition-colors {page ===
          currentPage
            ? 'bg-gray-200 dark:bg-dark-gray-600 dark:text-dark-gray-100 font-bold'
            : ''} {typeof page === 'string'
            ? 'pointer-events-none'
            : 'hover-hover:hover:bg-blue-600'}
          "
          href={page > 1 ? `${path}?page=${page}` : path}
          aria-current={page === currentPage ? 'page' : 'false'}
          aria-disabled={typeof page === 'string'}
          on:click={() => dispatch('navigate')}
          sapper:noscroll>
          <span class="sr-only">Jít na stránku</span>
          {page}
        </a>
      </li>
    {/each}
    <li>
      <a
        class="w-{s} h-{s} flex sm:hidden justify-center items-center select-none leading-5 rounded-full transition-colors bg-gray-200 dark:bg-dark-gray-600 dark:text-dark-gray-100 font-bold pointer-events-none"
        href={`${path}?page=${currentPage}`}
        aria-current="page"
        on:click={() => dispatch('navigate')}
        sapper:noscroll>
        <span class="sr-only">Jste na stránce</span>
        {currentPage}
      </a>
    </li>
    <!-- <li
      class="w-{s} h-{s} sm:hidden flex justify-center select-none items-center cursor-pointer leading-5 rounded-full bg-gray-600 dark:bg-dark-gray-800 text-white">
      <span class="sr-only">Jste na stránce</span>
      {currentPage}
    </li> -->
    <li>
      <a
        class="h-{s} w-{s} ml-4 flex justify-center items-center rounded-full
          {currentPage <
        pagesCount
          ? 'bg-blue-500 dark:bg-blue-700 hover-hover:hover:bg-blue-600 text-white'
          : 'bg-gray-100 dark:bg-dark-gray-800 text-gray-300 dark:text-dark-gray-600'}
          {currentPage ===
        pagesCount
          ? 'pointer-events-none'
          : ''}"
        href={currentPage < pagesCount ? `${path}?page=${currentPage + 1}` : '#'}
        aria-disabled={currentPage === pagesCount}
        on:click={() => dispatch('navigate')}
        sapper:noscroll>
        <svg
          class="w-{s / 2} h-{s / 2}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7" /></svg>
        <span class="sr-only">Na další stránku</span>
      </a>
    </li>
  </ul>
</nav>
