import { AlmanacMap } from './AlmanacMap.ts';

export class Almanac {
  private static RANGE_SIZE = 50000;
  private static RANGE_OFFSET = 25000;

  seeds: number[][];
  mappings: AlmanacMap[] = [];

  constructor(input: string) {
    this.seeds = this.extractSeeds(input);
    this.mappings = this.extractMappings(input);
  }

  buildSeedRanges(): number[][] {
    const seedRanges = [];

    for (let seedIndex = 0; seedIndex < this.seeds.length; seedIndex++) {
      const [seedStart, seedRange] = this.seeds[seedIndex];
      seedRanges.push([seedStart, seedStart + seedRange - 1]);
    }

    return seedRanges;
  }

  getMinLocationPairs(): number[][] {
    const seedRanges = this.buildSeedRanges();
    const minLocations = [];
    for (const seed of seedRanges) {
      const [seedStart, seedRange] = seed;
      let minLocation = Infinity;
      let minSeed = seedStart;

      for (let seedIndex = seedStart; seedIndex < seedRange; seedIndex += Almanac.RANGE_SIZE) {
        const location = this.calculateLastMapValue(seedIndex);
        if (location < minLocation) {
          minLocation = location;
          minSeed = seedIndex;
        }
      }

      minLocations.push([minLocation, minSeed, seedStart, seedRange]);
    }

    return minLocations;
  }

  getMinRangeSeed(): number[] {
    const minLocations = this.getMinLocationPairs();

    let minLocation = Infinity;
    let minRange = [0, 0, 0];
    for (const [location, seed, seedStart, seedRange] of minLocations) {
      if (location < minLocation) {
        minLocation = location;
        minRange = [seed, seedStart, seedRange];
      }
    }

    return minRange;
  }

  processMappings(): number {
    const minRangeSeed = this.getMinRangeSeed();

    const minSearch = Math.max(minRangeSeed[0] - Almanac.RANGE_OFFSET, minRangeSeed[1]);
    const maxSearch = Math.min(minRangeSeed[0] + Almanac.RANGE_OFFSET, minRangeSeed[2]);

    let minSeed = minSearch;
    let minLocation = Infinity;

    for (let seedIndex = minSearch; seedIndex <= maxSearch; seedIndex++) {
      const location = this.calculateLastMapValue(seedIndex);
      if (location < minLocation) {
        minLocation = location;
        minSeed = seedIndex;
      }
    }

    return this.calculateLastMapValue(minSeed);
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
