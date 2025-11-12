import { describe, it, expect } from 'vitest';
import { calculateTotalAmount, calculateTotal } from './calculateTotalAmount';

describe('calculateTotalAmount', () => {
  it('should return 0 for an empty string', () => {
    expect(calculateTotalAmount('')).toBe(0);
  });

  it('should return the number itself for a single number string', () => {
    expect(calculateTotalAmount('10')).toBe(10);
  });

  it('should return the sum of numbers separated by commas', () => {
    expect(calculateTotalAmount('10,5,2.5')).toBe(17.5);
  });

  it('should return the sum of numbers separated by newlines', () => {
    expect(calculateTotalAmount('10\n5\n2.5')).toBe(17.5);
  });

  it('should return the sum of numbers separated by a mix of commas and newlines', () => {
    expect(calculateTotalAmount('10,5\n2.5, 7')).toBe(24.5);
  });

  it('should ignore invalid numbers and return the sum of valid ones', () => {
    expect(calculateTotalAmount('10,hello,5,world,2.5')).toBe(17.5);
  });

  it('should ignore leading and trailing whitespace', () => {
    expect(calculateTotalAmount('  10, 5  ,  2.5 ')).toBe(17.5);
  });

  it('should treat multiple separators as one', () => {
    expect(calculateTotalAmount('10,,5\n\n2.5')).toBe(17.5);
  });

  it('should handle floating-point numbers correctly', () => {
    expect(calculateTotalAmount('1.1, 2.2, 3.3')).toBe(6.6);
  });

  it('should return 0 if all values are invalid', () => {
    expect(calculateTotalAmount('hello,world,test')).toBe(0);
  });
});

describe('calculateTotal', () => {
  it('should return 0 for an empty string', () => {
    expect(calculateTotal('')).toBe(0);
  });

  it('should return the number itself for a single number string', () => {
    expect(calculateTotal('10')).toBe(10);
  });

  it('should return the sum of numbers separated by commas', () => {
    expect(calculateTotal('10,5,2.5')).toBe(17.5);
  });

  it('should return the sum of numbers separated by newlines', () => {
    expect(calculateTotal('10\n5\n2.5')).toBe(17.5);
  });

  it('should return the sum of numbers separated by a mix of commas and newlines', () => {
    expect(calculateTotal('10,5\n2.5, 7')).toBe(24.5);
  });

  it('should return 0 if any value is invalid', () => {
    expect(calculateTotal('10,hello,5,world,2.5')).toBe(0);
  });

  it('should ignore leading and trailing whitespace', () => {
    expect(calculateTotal('  10, 5  ,  2.5 ')).toBe(17.5);
  });

  it('should handle floating-point numbers correctly', () => {
    expect(calculateTotal('1.1, 2.2, 3.3')).toBe(6.6);
  });

  it('should return 0 if all values are invalid', () => {
    expect(calculateTotal('hello,world,test')).toBe(0);
  });

  it('should handle empty values between separators', () => {
    expect(calculateTotal('10,,5\n\n2.5')).toBe(17.5);
  });

  it('should handle negative numbers', () => {
    expect(calculateTotal('-10,5,-2.5')).toBe(-7.5);
  });

  it('should handle very large numbers', () => {
    expect(calculateTotal('1000000,2000000,3000000')).toBe(6000000);
  });

  it('should handle decimal numbers with many digits', () => {
    expect(calculateTotal('0.123456789,0.987654321')).toBeCloseTo(1.11111111);
  });
});
