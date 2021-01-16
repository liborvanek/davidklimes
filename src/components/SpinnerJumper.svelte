<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);

  export let classes = '';
  export let size = 60;
  export let color = '#fff';
  export let unit = 'px';
  export let duration = '1s';

  let isMounted = false;
  let durationUnit = 's';
  let durationNum = '1';

  onMount(() => {
    isMounted = true;
  });
</script>

<style>
  .wrapper {
    width: var(--width);
    height: var(--size);
  }
  .circle {
    border-radius: 100%;
    animation-fill-mode: both;
    position: absolute;
    opacity: 0;
    width: var(--size);
    height: var(--size);
    background-color: var(--color);
    animation: bounce var(--duration) linear infinite;
  }
  @keyframes bounce {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    5% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
</style>

<div
  class="wrapper inline-block {classes}"
  in:fly={{ y: 50, duration: 150, delay: 100, easing: cubicInOut }}
  out:fly={{ y: 50, duration: 150, easing: cubicInOut }}
  style="--size: {size}{unit}; --color: {color}; --duration: {duration}; --width: {isMounted
    ? size + unit
    : '0px'}">
  {#each range(3, 1) as version}
    <div
      class="circle"
      style="animation-delay: {(durationNum / 3) * (version - 1) + durationUnit};" />
  {/each}
</div>
