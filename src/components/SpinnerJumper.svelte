<script>
  import { fade, fly } from 'svelte/transition';

  const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);

  export let size = 60;
  export let color = '#fff';
  export let unit = 'px';
  export let duration = '1.5s';

  let durationUnit = 's';
  let durationNum = '1';
</script>

<div
  class="wrapper inline-block"
  style="--size: {size}{unit}; --color: {color}; --duration: {duration};"
  in:fly={{ y: 50, duration: 300 }}
  out:fade
>
  {#each range(3, 1) as version}
    <div
      class="circle"
      style="animation-delay: {(durationNum / 3) * (version - 1) + durationUnit};"
    />
  {/each}
</div>

<style>
  .wrapper {
    width: var(--size);
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
