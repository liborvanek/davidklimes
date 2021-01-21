import { writable } from 'svelte/store';

export const alreadySubscribed = writable(false);
export const showNewsletterIntro = writable(false);
export const email = writable('');
