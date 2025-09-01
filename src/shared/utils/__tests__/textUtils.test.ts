import { truncateText, removeHtmlTags, capitalizeFirstLetter, formatGenres } from '../textUtils';

describe('textUtils', () => {
  describe('truncateText', () => {
    it('returns original text if length is within limit', () => {
      const text = 'Hello World';
      const result = truncateText(text, 20);
      expect(result).toBe('Hello World');
    });

    it('truncates text and adds ellipsis if length exceeds limit', () => {
      const text = 'This is a very long text that should be truncated';
      const result = truncateText(text, 20);
      expect(result).toBe('This is a very long...');
    });

    it('handles empty string', () => {
      const result = truncateText('', 10);
      expect(result).toBe('');
    });

    it('handles text exactly at the limit', () => {
      const text = 'Exactly ten chars';
      const result = truncateText(text, 10);
      expect(result).toBe('Exactly te...');
    });
  });

  describe('removeHtmlTags', () => {
    it('removes HTML tags from text', () => {
      const htmlText = '<p>Hello <strong>World</strong></p>';
      const result = removeHtmlTags(htmlText);
      expect(result).toBe('Hello World');
    });

    it('handles text without HTML tags', () => {
      const text = 'Plain text without tags';
      const result = removeHtmlTags(text);
      expect(result).toBe('Plain text without tags');
    });

    it('handles empty string', () => {
      const result = removeHtmlTags('');
      expect(result).toBe('');
    });

    it('handles complex HTML', () => {
      const htmlText = '<div><h1>Title</h1><p>Content with <a href="#">link</a></p></div>';
      const result = removeHtmlTags(htmlText);
      expect(result).toBe('TitleContent with link');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('capitalizes first letter of a word', () => {
      const result = capitalizeFirstLetter('hello');
      expect(result).toBe('Hello');
    });

    it('handles already capitalized word', () => {
      const result = capitalizeFirstLetter('Hello');
      expect(result).toBe('Hello');
    });

    it('handles empty string', () => {
      const result = capitalizeFirstLetter('');
      expect(result).toBe('');
    });

    it('handles single character', () => {
      const result = capitalizeFirstLetter('a');
      expect(result).toBe('A');
    });

    it('handles all caps word', () => {
      const result = capitalizeFirstLetter('HELLO');
      expect(result).toBe('Hello');
    });
  });

  describe('formatGenres', () => {
    it('joins genres with bullet separator', () => {
      const genres = ['Drama', 'Thriller', 'Action'];
      const result = formatGenres(genres);
      expect(result).toBe('Drama • Thriller • Action');
    });

    it('handles single genre', () => {
      const genres = ['Drama'];
      const result = formatGenres(genres);
      expect(result).toBe('Drama');
    });

    it('handles empty array', () => {
      const result = formatGenres([]);
      expect(result).toBe('');
    });

    it('handles genres with special characters', () => {
      const genres = ['Sci-Fi', 'Action & Adventure'];
      const result = formatGenres(genres);
      expect(result).toBe('Sci-Fi • Action & Adventure');
    });
  });
});
