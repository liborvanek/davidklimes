<script>
  import { fly } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import SpinnerJumper from './SpinnerJumper.svelte';

  export let isSubmitting = false;
  export let isSuccess = false;
  export let isError = false;
</script>

<button
  class="button relative flex items-center ml-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xl font-bold uppercase focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-md transition-shadow"
  disabled={isSubmitting}
  ><span
    class="transition-all {isSubmitting || isSuccess || isError
      ? 'transform -translate-y-10 opacity-0 delay-0'
      : ''}">Přihlásit</span
  >{#if isSubmitting}<SpinnerJumper classes="absolute left-14" />{:else if isSuccess}<svg
      width="37"
      height="29"
      viewBox="0 0 37 29"
      class="absolute left-16"
      in:fly={{ y: 50, duration: 450, delay: 100, easing: elasticOut }}>
      <path
        fill="none"
        fill-rule="evenodd"
        stroke="#FFF"
        stroke-width="6"
        d="M3 11.91L11.857 24 34 3" />
    </svg>{/if}</button>
