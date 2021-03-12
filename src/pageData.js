export const menu = [
  {
    slug: '/',
    name: 'Úvod',
    scale: '1',
    translate: 0,
  },
  {
    slug: 'komentare',
    name: 'Komentáře',
    scale: '1.7',
    translate: 9.8,
  },
  {
    slug: 'knihy',
    name: 'Knihy',
    scale: '1.05',
    translate: 19.8,
  },
  {
    slug: 'o-mne',
    name: 'O mně',
    scale: '1.1',
    translate: 28.2,
  },
];

export const headings = {
  komentare: 'Komentáře',
  knihy: 'Knihy',
  'o-mne': 'O mně',
  'archiv-newsletteru': 'Archiv newsletterů',
  newsletter: 'Newsletter DK',
};

export const submenuPages = ['komentare', 'archiv-newsletteru', 'newsletter'];

// Paths to cache on install event to be available offline
export const cachablePaths = ['/', '/komentare', '/knihy', '/o-mne', '/archiv-newsletteru'];
