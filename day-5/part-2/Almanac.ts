import { AlmanacMap } from './AlmanacMap.ts';

export class Almanac {
  seeds: number[][];
  mappings: AlmanacMap[] = [];

  constructor(input: string) {
    this.seeds = this.extractSeeds(input);
    this.mappings = this.extractMappings(input);
  }

  processMappings(): number {
    /**
     * Hay que encontrar la manera de procesar un rango y no los valores individuales de cada rango porque se va de madre
     * Ideas:
     * - Hacer el mapeo al revés y  buscar la seed
     * - Filtrar los maps por el mínimo valor de destino
     *
     */

    const lastValues = [];
    const lastValuesMapping: Record<number, number> = {};

    for (const [seedStart, _seedRange] of this.seeds) {
      const nextValue = this.calculateLastMapValue(seedStart);
      lastValues.push(nextValue);
      lastValuesMapping[nextValue] = seedStart;
    }

    const minValue = Math.min(...lastValues);

    const seedToProcess = lastValuesMapping[minValue];
    const seed = this.seeds.find(([start, _range]) => start === seedToProcess);
    if (!seed) throw new Error("Can't recover seed from min last value");

    const [seedStart, seedRange] = seed;
    const lastSeedValues = [];

    for (let seedIndex = seedStart; seedIndex < seedStart + seedRange; seedIndex++) {
      const nextValue = this.calculateLastMapValue(seedIndex);
      lastSeedValues.push(nextValue);
    }

    return Math.min(...lastSeedValues);
  }

  private calculateLastMapValue(seedValue: number): number {
    let nextValue;

    for (const map of this.mappings) {
      nextValue = map.getDestinationValue(nextValue ?? seedValue);
    }

    if (!nextValue) throw new Error("Can't process seedValue");

    return nextValue;
  }

  private extractMappings(input: string) {
    const [_firstLine, _secondLine, ...lines] = input.split('\n');

    const inputStrings = [];
    let tmpInput = '';

    for (const line of [...lines, '']) {
      if (line === '') {
        inputStrings.push(tmpInput);
        tmpInput = '';
      } else {
        tmpInput += tmpInput === '' ? line : '\n' + line;
      }
    }

    return inputStrings.map((input) => new AlmanacMap(input));
  }

  private extractSeeds(input: string) {
    const firstLine = input.split('\n').shift();
    if (!firstLine) throw new Error("Can't extract first line from input");

    const seedsStringList = firstLine.match(/\d+/g);
    if (!seedsStringList) throw new Error("Can't extract seeds from input");
    const seedNumberList = seedsStringList.map((seedString) => parseInt(seedString));

    const seedRanges: number[][] = [];

    for (let seedNumberIndex = 0; seedNumberIndex < seedNumberList.length; seedNumberIndex += 2) {
      const seedRange = seedNumberList.slice(seedNumberIndex, seedNumberIndex + 2);
      seedRanges.push(seedRange);
    }

    return seedRanges;
  }
}
