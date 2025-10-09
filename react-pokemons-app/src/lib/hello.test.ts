import { expect, test } from 'vitest';
import { hello } from './hello';

test('hello function', () => {
  expect(hello('World')).toBe('Hello, World!');
});

test('hello function', () => {
  // Arrange / Given
  const name = 'Alice';

  // Act / When
  const result = hello(name);

  // Assert / Then
  expect(result).toBe('Hello, Alice!');
});

test('hello function with empty name', () => {
  expect(() => hello('')).toThrow();
});