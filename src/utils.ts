// This promise resolves after page is being controlled by service worker
// See https://github.com/w3c/ServiceWorker/issues/799#issuecomment-165499718
export function waitForServiceWorker(): Promise<boolean> {
  return new Promise((resolve) => {
    if (navigator.serviceWorker.controller) return resolve(true);
    navigator.serviceWorker.addEventListener('controllerchange', (e) => resolve(true));
  });
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
}

// Czech typography – single-letter preposition should be bound to next word
export const bindSingles = (text: string) => text.replace(/ ([szkvaiouSZKVAIOU]) /g, ' $1&nbsp;');

export function getArticleDelay(i: number, page: number, articlesPerPage: number) {
  if (i < 4) {
    return i * 100;
  }
  // if (page > 1) {
  //   const y = i % articlesPerPage;
  //   if (y < 4) {
  //     return y * 100;
  //   }
  // }

  return 400;
}
