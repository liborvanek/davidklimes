<script>
  // Originally from https://github.com/metonym/svelte-link
  export let href = 'javascript:void(0);';
  export let disabled = false;
  export let outbound: boolean = undefined;
  export let rel: string = undefined;

  $: if (typeof window !== 'undefined') {
    const isExternal =
      new URL(href, `${location.protocol}//${location.host}`).host !== location.host;

    if (isExternal && outbound === undefined) {
      outbound = true;
    }
  }

  $: if (outbound) {
    if (rel === undefined) rel = 'noopener noreferrer';
  }
</script>

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
    class={`${$$restProps.class} ${outbound ? 'external' : ''}`}
    {href}
    {rel}
    sapper:prefetch={!outbound ? true : undefined}
    on:click
    on:mouseover
    on:mouseenter
    on:mouseout
    on:focus
    on:blur
    on:keydown>
    <slot />
    {#if outbound}
      <span class="sr-only">- externí odkaz</span>
    {/if}
  </a>
{/if}

<style>
  a.external:after {
    content: url('/icon/external-link.svg');
    @apply relative inline-block -top-1 no-underline;
    speak: none;
  }
</style>
