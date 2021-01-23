<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  export let easing = cubicInOut;
  export let outDuration = 0;
  export let inDuration = 375;
  export let delay = outDuration;
  export let classes: string;

  const transitionIn = () => ({
    duration: inDuration,
    delay,
    easing,
    css: (t: number) => `opacity: ${t}`,
  });

  const transitionOut = () => ({
    duration: outDuration,
    delay: 0,
    easing,
    css: (t: number) => `opacity: ${t}`,
  });
</script>

<div class={classes} in:transitionIn out:transitionOut>
  <slot />
</div>
