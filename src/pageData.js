export const menu = [
  {
    slug: '/',
    activePaths: ['/'],
    name: 'Úvod',
    scale: '1.1',
    translate: 0,
  },
  {
    slug: 'povolebni-program',
    activePaths: ['povolebni-program'],
    name: 'Povolební p.',
    scale: '2.1',
    translate: 9.4,
  },
  {
    slug: 'komentare',
    activePaths: ['komentare', 'archiv-newsletteru'],
    name: 'Komentáře',
    scale: '1.9',
    translate: 21.1,
  },
  {
    slug: 'knihy',
    activePaths: ['knihy'],
    name: 'Knihy',
    scale: '1.05',
    translate: 30.1,
  },
  {
    slug: 'o-mne',
    activePaths: ['o-mne'],
    name: 'O mně',
    scale: '1.2',
    translate: 37.5,
  },
];

export const headings = {
  komentare: 'Komentáře',
  knihy: 'Knihy',
  'o-mne': 'O mně',
  'archiv-newsletteru': 'Archiv newsletterů',
  newsletter: 'Newsletter DK',
};

export const submenuPages = ['komentare', 'archiv-newsletteru', 'newsletter', 'article'];

// Paths to cache on install event to be available offline
export const cachablePaths = ['/', '/komentare', '/knihy', '/o-mne', '/archiv-newsletteru', '/api/articles?page=1', '/api/newsletter-archive', '/api/latest-article', '/povolebni-program'];
