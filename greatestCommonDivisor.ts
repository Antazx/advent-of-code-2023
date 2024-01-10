function greatestCommonDenominatorForTwo(a = 0, b = 0): number {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

function greatestCommonDenominator(a?: number | number[], b?: number): number {
  return Array.isArray(a)
    ? a.reduce((a, n) => greatestCommonDenominatorForTwo(a, n), 1)
    : greatestCommonDenominatorForTwo(a, b);
}

export { greatestCommonDenominator };
