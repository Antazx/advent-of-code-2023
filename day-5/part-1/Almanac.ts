import { AlmanacMap } from './AlmanacMap.ts';

export class Almanac {
  seeds: number[];
  mappings: AlmanacMap[] = [];

  constructor(input: string) {
    this.seeds = this.extractSeeds(input);
    this.mappings = this.extractMappings(input);
  }

  processMappings(): number {
    const lastValues = this.seeds.map((seed) => this.calculateLastMapValue(seed));
    return Math.min(...lastValues);
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
    return seedsStringList.map((seedString) => parseInt(seedString));
  }
}
