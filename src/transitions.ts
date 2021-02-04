import { quintInOut } from 'svelte/easing';

export const clipRect = (_, params) => ({
  delay: params.delay || 0,
  duration: params.duration || 1000,
  easing: params.easing || quintInOut,
  css: (t, u) => {
    return `opacity: ${params.fade ? t : 1}; clip-path: polygon(0 0, ${t * 100}% 0, ${
      t * 100
    }% 100%, 0% 100%);`;
  },
});
