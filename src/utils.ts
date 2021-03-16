export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
}

// Czech typography – single-letter preposition should be bound to next word
export const bindSingles = (text: string) => text.replace(/ ([szkvaiouSZKVAIOU]) /g, ' $1&nbsp;');
