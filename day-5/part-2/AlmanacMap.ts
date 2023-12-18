export class AlmanacMap {
  private name: string;
  private mappings: [number, number, number][];

  constructor(input: string) {
    this.name = this.extractName(input);
    this.mappings = this.extractMappings(input);
  }

  getDestinationValue(sourceValue: number): number {
    const mappign = this.searchMapping(sourceValue);
    if (!mappign) return sourceValue;

    const [destionationRangeStart, sourceRangeStart, _rangeLength] = mappign;

    const sourceCount = sourceValue - sourceRangeStart;
    const destinationValue = destionationRangeStart + sourceCount;

    return destinationValue;
  }

  private searchMapping(sourceValue: number): [number, number, number] | undefined {
    const mapping = this.mappings.find(([_destinationStart, sourceStart, rangeLength]) => {
      const greaterThanStart = sourceValue >= sourceStart;
      const lowerThanEnd = sourceValue < sourceStart + rangeLength;

      return greaterThanStart && lowerThanEnd;
    });

    return mapping;
  }

  private extractMappings(input: string): [number, number, number][] {
    const [_firstLine, ...lines] = input.split('\n');

    const mappings: [number, number, number][] = [];
    for (const line of lines) {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ');
      mappings.push([parseInt(destinationRangeStart), parseInt(sourceRangeStart), parseInt(rangeLength)]);
    }

    return mappings;
  }

  private extractName(input: string): string {
    const firstLine = input.split('\n').shift();
    if (!firstLine) throw new Error("Can't extract map first line");

    const nameMap = input.split(' ').shift();
    if (!nameMap) throw new Error("Can't extract map name");

    return nameMap;
  }
}
