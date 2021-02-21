import { writable } from 'svelte/store';

import type { IArticleWithType } from './server/dbApi';

export const isSubscribed = writable(false);
export const showNewsletterIntro = writable(false);
export const email = writable('');
// export const latestArticle = writable<IArticleWithType>(null);
