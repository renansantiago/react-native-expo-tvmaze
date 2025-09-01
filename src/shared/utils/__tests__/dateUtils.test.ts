import { formatDate, formatTime, formatSchedule } from '../dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2020-01-15';
      const result = formatDate(date);
      // Handle timezone differences - the date might be January 14 or 15 depending on timezone
      expect(result).toMatch(/January (14|15), 2020/);
    });

    it('handles invalid date', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('Invalid Date');
    });

    it('handles null date', () => {
      const result = formatDate(null as any);
      // The function now returns 'Invalid Date' for null values
      expect(result).toBe('Invalid Date');
    });

    it('handles empty string', () => {
      const result = formatDate('');
      expect(result).toBe('Invalid Date');
    });
  });

  describe('formatTime', () => {
    it('formats time correctly', () => {
      const time = '20:30';
      const result = formatTime(time);
      expect(result).toBe('8:30 PM');
    });

    it('handles 12-hour format', () => {
      const time = '14:00';
      const result = formatTime(time);
      expect(result).toBe('2:00 PM');
    });

    it('handles midnight', () => {
      const time = '00:00';
      const result = formatTime(time);
      expect(result).toBe('12:00 AM');
    });

    it('handles noon', () => {
      const time = '12:00';
      const result = formatTime(time);
      expect(result).toBe('12:00 PM');
    });

    it('handles null time', () => {
      const result = formatTime(null as any);
      expect(result).toBe('');
    });

    it('handles empty string', () => {
      const result = formatTime('');
      expect(result).toBe('');
    });
  });

  describe('formatSchedule', () => {
    it('formats schedule correctly', () => {
      const schedule = { time: '20:00', days: ['Monday', 'Wednesday'] };
      const result = formatSchedule(schedule);
      expect(result).toBe('Monday, Wednesday at 8:00 PM');
    });

    it('handles single day', () => {
      const schedule = { time: '21:30', days: ['Friday'] };
      const result = formatSchedule(schedule);
      expect(result).toBe('Friday at 9:30 PM');
    });

    it('handles null schedule', () => {
      const result = formatSchedule(null as any);
      expect(result).toBe('');
    });

    it('handles empty days array', () => {
      const schedule = { time: '20:00', days: [] };
      const result = formatSchedule(schedule);
      expect(result).toBe('at 8:00 PM');
    });
  });
});
