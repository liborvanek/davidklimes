<script>
  import { fade } from 'svelte/transition';
  export let classes = '';
</script>

<div
  role="alert"
  class="mb-4 lg:mb-8 lg:w-2/3 p-4 lg:p-8 bg-red-100 text-gray-900 rounded {classes}"
  in:fade>
  <slot>Bohužel došlo k chybě, zkuste to, prosím, znovu.</slot>
</div>
