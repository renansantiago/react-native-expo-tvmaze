import { renderHook, act } from '@testing-library/react-native';
import { useDebounce } from '../useDebounce';

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe('useDebounce', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    // Change the value
    rerender({ value: 'changed' });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('changed'); // Now should be changed
  });

  it('cancels previous timeout when value changes quickly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    // Change value multiple times quickly
    rerender({ value: 'first' });
    rerender({ value: 'second' });
    rerender({ value: 'third' });

    expect(result.current).toBe('initial'); // Should still be initial

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('third'); // Should be the last value
  });

  it('works with different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'changed' });

    // Should not have changed yet
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial');

    // Should have changed now
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('changed');
  });

  it('handles empty string values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: '' });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('');
  });

  it('handles null values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: null });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(null);
  });
});
