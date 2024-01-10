import { greatestCommonDenominator } from './greatestCommonDivisor.ts';

function leastCommonMultipleForTwo(a = 0, b = 0): number {
  return Math.abs((a * b) / greatestCommonDenominator(a, b));
}

function leastCommonMultiple(a: number | number[], b?: number): number {
  return Array.isArray(a) ? a.reduce((a, n) => leastCommonMultipleForTwo(a, n), 1) : leastCommonMultipleForTwo(a, b);
}

export { leastCommonMultiple };
