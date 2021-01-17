<script>
  import { cubicInOut } from 'svelte/easing';
  export let easing = cubicInOut;
  export let outDuration = 0;
  export let inDuration = 375;
  export let delay = outDuration;
  export let classes;

  const transitionIn = () => ({
    duration: inDuration,
    delay,
    easing,
    css: (t) => `opacity: ${t}`,
  });

  const transitionOut = () => ({
    duration: outDuration,
    delay: 0,
    easing,
    css: (t) => `opacity: ${t}`,
  });
</script>

<div class={classes} in:transitionIn out:transitionOut>
  <slot />
</div>
