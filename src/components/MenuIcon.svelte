<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let isOpen = false;
  export let menuId = 'id';
  export let classes = '';
</script>

<button
  type="button"
  class="xl:hidden p-2 {isOpen
    ? 'text-white focus:ring-white'
    : 'text-gray-700 dark:text-blue-200 focus:ring-blue-500'} cursor-pointer focus:outline-none focus:ring-2 {classes}"
  class:isOpen
  on:click={() => dispatch('menuClick')}
  aria-expanded={isOpen}
  aria-controls={menuId}
  id="{menuId}-button">
  <span class="sr-only">{!isOpen ? 'Hlavní menu' : 'Zavřít menu'}</span>
  <svg class="menu-icon" width="32" height="26">
    <line class="top" x1="2" y1="2" x2="30" y2="2" stroke-linecap="round" />
    <line class="middle" x1="2" y1="12" x2="22" y2="12" stroke-linecap="round" />
    <line class="bottom" x1="2" y1="22" x2="30" y2="22" stroke-linecap="round" />
  </svg>
</button>

<style>
  .menu-icon {
    transition: transform 0.2s ease-out;
  }

  .menu-icon line {
    stroke: currentColor;
    stroke-width: 2;
    transition: all 0.2s ease-out;
  }

  .isOpen > .menu-icon > .top {
    transform: translate(6px, 0px) rotate(45deg);
  }

  .isOpen > .menu-icon > .middle {
    transform: scaleX(0);
    opacity: 0;
  }

  .isOpen > .menu-icon > .bottom {
    transform: translate(-12px, 9px) rotate(-45deg);
  }
</style>
