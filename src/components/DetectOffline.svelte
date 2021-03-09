<script>
  import { fly } from 'svelte/transition';
  import { onDestroy } from 'svelte';

  import { isOnline } from '../stores';

  let showOfflineNotice = false;
  let showOnlineNotice = false;
  let timeoutId: number;

  onDestroy(() => {
    clearTimeout(timeoutId);
  });

  const updateOnlineStatus = (e) => {
    isOnline.update((previousOnlineStatus) => {
      if (!previousOnlineStatus && navigator.onLine) {
        // Change from offline to online
        showOnlineNotice = true;
        showOfflineNotice = false;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          showOnlineNotice = false;
        }, 5000);
      }
      if (previousOnlineStatus && !navigator.onLine) {
        // Change from online to offline
        showOfflineNotice = true;
        showOnlineNotice = false;
        clearTimeout(timeoutId);
        setTimeout(() => {
          showOfflineNotice = false;
        }, 5000);
      }
      return navigator.onLine;
    });
  };
  function closeAlert() {
    showOfflineNotice = false;
    showOnlineNotice = false;
    clearTimeout(timeoutId);
  }
</script>

<svelte:window
  on:online={updateOnlineStatus}
  on:offline={updateOnlineStatus}
  on:load={updateOnlineStatus} />

{#if showOfflineNotice}
  <div
    class="fixed left-4 lg:left-8 bottom-4 lg:bottom-8 mr-4 px-4 py-4 border-2 border-red-300 bg-white rounded-xl shadow-xl z-50"
    role="alert"
    in:fly={{ y: 40 }}
    out:fly={{ y: 40 }}>
    <div class="flex">
      <svg
        class="flex-grow w-4 h-4 lg:w-6 lg:h-6 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="square"
          stroke-width="2"
          d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" /></svg>
      <div class="ml-2 lg:mr-2 flex-1">
        <p class="text-xs lg:text-sm">Vypadá to, že jste offline.</p>
        <p class="text-xs">
          Po webu se můžete normálně pohybovat a dříve navštívené stránky budou fungovat.
        </p>
      </div>
      <button
        class="flex-grow w-6 h-6 bg-gray-100 rounded-full p-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
        on:click={closeAlert}>
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path stroke-linecap="square" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        <span class="sr-only">Zavřít upozornění</span>
      </button>
    </div>
  </div>
{/if}
{#if showOnlineNotice}
  <div
    class="fixed left-4 lg:left-8 bottom-4 lg:bottom-8  mx-auto px-4 py-4 border-2 border-green-400 bg-white rounded-xl shadow-xl z-50"
    role="alert"
    in:fly={{ y: 40 }}
    out:fly={{ y: 40 }}>
    <div class="flex items-center">
      <svg
        class="flex-grow w-4 h-4 lg:w-6 lg:h-6 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="square"
          stroke-width="2"
          d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
      <p class="flex-1 ml-2 text-xs lg:text-sm">Připojení k internetu bylo obnoveno.</p>
      <button
        class="flex-grow w-6 h-6 ml-2 bg-gray-100 rounded-full p-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
        on:click={closeAlert}>
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path stroke-linecap="square" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        <span class="sr-only">Zavřít upozornění</span>
      </button>
    </div>
  </div>
{/if}
