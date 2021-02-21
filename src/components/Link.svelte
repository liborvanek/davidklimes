<script>
  // Originally from https://github.com/metonym/svelte-link
  export let href = 'javascript:void(0);';
  export let disabled = false;
  export let outbound: boolean;
  export let target: string;
  export let rel: string;

  $: if (typeof window !== 'undefined') {
    const isExternal =
      new URL(href, `${location.protocol}//${location.host}`).host !== location.host;

    if (isExternal && outbound === undefined) {
      outbound = true;
    }
  }

  $: if (outbound) {
    target = '_blank';
    if (rel === undefined) rel = 'noopener noreferrer';
  }
</script>

<style>
  a:after {
    content: attr(data-external);
    @apply relative inline-block text-xs font-normal left-1 -top-1 no-underline;
  }
</style>

{#if disabled}
  <span
    {...$$restProps}
    on:click
    on:mouseover
    on:mouseenter
    on:mouseout
    on:focus
    on:blur
    on:keydown>
    <slot />
  </span>
{:else}
  <a
    {...$$restProps}
    {href}
    {target}
    {rel}
    sapper:prefetch={!outbound ? true : undefined}
    on:click
    on:mouseover
    on:mouseenter
    on:mouseout
    on:focus
    on:blur
    on:keydown
    data-external={outbound ? '↗' : ''}>
    <slot />
  </a>
{/if}
