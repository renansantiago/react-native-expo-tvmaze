export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const removeHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatGenres = (genres: string[]): string => {
  return genres.join(' • ');
};
