import { Boat } from './Boat.ts';

export class RaceHistory {
  races: [number, number][];

  constructor(input: string) {
    this.races = this.extractRaces(input);
  }

  getWinningRaces(): number {
    const winnings = this.races.map(([totalTimeMs, maxDistanceMm]) =>
      this.calculateWinningInputs(totalTimeMs, maxDistanceMm)
    );

    return winnings.reduce((acc, curr) => acc * curr, 1);
  }

  private calculateWinningInputs(totalTimeMs: number, maxDistanceMm: number): number {
    let winningCount = 0;

    for (let currentTimeMs = 0; currentTimeMs < totalTimeMs; currentTimeMs++) {
      const currentDistanceMm = Boat.calculateDistance(totalTimeMs, currentTimeMs);
      if (currentDistanceMm > maxDistanceMm) winningCount++;
    }

    return winningCount;
  }

  private extractRaces(input: string): [number, number][] {
    const numbersRegexp = /\d+/g;
    const lines = input.split('\n');
    const [timeStrings, distanceStrings] = lines;

    const time = parseInt(timeStrings.match(numbersRegexp)?.join('') ?? '0');
    if (time === 0) throw new Error("Can't extract times from input");

    const distance = parseInt(distanceStrings.match(numbersRegexp)?.join('') ?? '0');
    if (distance === 0) throw new Error("Can't extract distances from input");

    return [[time, distance]];
  }
}
