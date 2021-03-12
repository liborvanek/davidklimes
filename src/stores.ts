import { writable } from 'svelte/store';

export const isSubscribed = writable(false);
export const showNewsletterIntro = writable(false);
export const email = writable('');
export const isOnline = writable(true);
