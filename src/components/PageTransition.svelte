<script>
  import { cubicInOut } from 'svelte/easing';
  const easing = cubicInOut;
  const outDuration = 0;
  const inDuration = 375;
  const delay = outDuration;

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

<div in:transitionIn out:transitionOut>
  <slot />
</div>
