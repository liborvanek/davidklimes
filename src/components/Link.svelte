<script>
  // Originally from https://github.com/metonym/svelte-link
  export let href = 'javascript:void(0);';
  export let disabled = false;
  export let outbound: boolean = undefined;
  export let rel: string = undefined;
  export let variant: 'default' | 'heading' | 'headingMild' | 'noStyle' = 'default';

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

  const styles = {
    default:
      'text-blue-600 hover:text-blue-800 visited:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 dark:visited:text-blue-500 transition-colors underline',
    heading:
      'dotted inline-block font-bold text-dark-gray-600 visited:text-dark-gray-600 dark:text-dark-gray-200 dark:visited:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500 underline transition-colors',
    headingMild:
      'dotted inline-block font-bold text-gray-600 visited:text-gray-600 dark:text-gray-300 dark:visited:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500 underline transition-colors',
    noStyle: '',
  };
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
    class={`${styles[variant]} ${$$restProps.class ? $$restProps.class : ''} ${
      outbound ? 'external' : ''
    }`}
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
