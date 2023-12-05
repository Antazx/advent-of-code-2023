export type Set = {
  green: number;
  blue: number;
  red: number;
};

type Game = Set[];

export class GameRecord {
  id: number;
  private game: Game;

  constructor(record: string) {
    this.id = this.extractId(record);
    this.game = this.extractGame(record);
  }

  private extractId(record: string) {
    const stringId = record.split('\n').shift()?.replace('Game ', '') ?? '';
    return parseInt(stringId);
  }

  private extractGame(record: string): Game {
    const sets = record.split(': ').pop()?.split('; ') ?? [];
    const game = sets.map((set) => this.extractSet(set));
    return game;
  }

  private extractSet(record: string): Set {
    const columns = record.split(', ');
    const currentSet: Set = {
      green: 0,
      blue: 0,
      red: 0,
    };

    for (const color of columns) {
      const [num, col] = color.split(' ');
      if (col in currentSet) currentSet[col as keyof Set] = parseInt(num) ?? 0;
    }

    return currentSet;
  }

  isGamePossible(maxSet: Set): boolean {
    return this.game.every((set) => set.green <= maxSet.green && set.red <= maxSet.red && set.blue <= maxSet.blue);
  }
}
