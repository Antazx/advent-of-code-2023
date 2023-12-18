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

    return winnings.reduce((acc, curr) => acc * curr.length, 1);
  }

  private calculateWinningInputs(totalTimeMs: number, maxDistanceMm: number): [number, number][] {
    const winningInput: [number, number][] = [];

    for (let currentTimeMs = 0; currentTimeMs < totalTimeMs; currentTimeMs++) {
      const currentDistanceMm = Boat.calculateDistance(totalTimeMs, currentTimeMs);
      if (currentDistanceMm > maxDistanceMm) winningInput.push([currentTimeMs, currentDistanceMm]);
    }

    return winningInput;
  }

  private extractRaces(input: string): [number, number][] {
    const numbersRegexp = /\d+/g;
    const lines = input.split('\n');
    const [timeStrings, distanceStrings] = lines;

    const times = timeStrings.match(numbersRegexp)?.map(Number);
    if (!times) throw new Error("Can't extract times from input");

    const distances = distanceStrings.match(numbersRegexp)?.map(Number);
    if (!distances) throw new Error("Can't extract distances from input");

    if (times.length !== distances.length) throw new Error("Can't match times with distances");

    const races: [number, number][] = times.map((time, index) => [time, distances[index]]);
    return races;
  }
}
