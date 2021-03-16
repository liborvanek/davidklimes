<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  import SpinnerJumper from './SpinnerJumper.svelte';

  export let isSubmitting = false;
  export let isSuccess = false;
  export const isError = false;
  export let classes = 'false';

  const dispatch = createEventDispatcher();
</script>

<style>
  @keyframes -global-pulse {
    0% {
      scale: 1;
    }
    80% {
      scale: 1.2;
    }
    100% {
      scale: 1;
    }
  }
  .success {
    animation: pulse 300ms forwards ease-in-out;
  }
</style>

<button
  class="button relative inline-flex items-center justify-center py-5 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xl font-bold uppercase focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-md transition-shadow {classes}"
  disabled={isSubmitting}
  on:click={(e) => dispatch('click', { event: e })}
  ><span
    class="flex justify-items-center transition-all {isSubmitting || isSuccess
      ? 'transform -translate-y-10 opacity-0 delay-0'
      : ''}"><slot /></span
  >{#if isSubmitting}<SpinnerJumper classes="absolute" />{:else if isSuccess}<svg
      width="37"
      height="29"
      viewBox="0 0 37 29"
      class="success absolute pulse transition-transform ease-in-out"
      in:fly={{ y: 50, duration: 450, delay: 100, easing: elasticOut }}>
      <path
        fill="none"
        fill-rule="evenodd"
        stroke="#FFF"
        stroke-width="6"
        d="M3 11.91L11.857 24 34 3" />
    </svg>{/if}</button>
