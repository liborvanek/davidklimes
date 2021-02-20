<script>
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  let visible = false;
  export let elementSelector;

  onMount(() => {
    new IntersectionObserver(
      (entries) => (entries[0].intersectionRatio > 0 ? (visible = false) : (visible = true)),
      { threshold: 0 },
    ).observe(document.querySelector(elementSelector));
  });

  function scrollUp() {
    document.body.scrollIntoView({ behavior: 'smooth' });
  }
</script>

{#if visible}
  <button
    transition:fly={{ y: 60 }}
    on:click={scrollUp}
    class="text-white bg-gray-300 hover:bg-orange-800 fixed bottom-0 right-0 mb-6 mr-6 text-2xl w-12 h-12 rounded-full focus:outline-none">
    &uarr;
  </button>
{/if}
