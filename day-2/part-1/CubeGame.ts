import { GameRecord, Set } from './GameRecord.ts';

export class CubeGame {
  private static MAX_SET: Set = {
    red: 12,
    green: 13,
    blue: 14,
  };
  private gameHistory: GameRecord[];

  constructor(plainRecordList: string) {
    this.gameHistory = this.buildGameHistory(plainRecordList);
  }

  private buildGameHistory(plainRecordList: string): GameRecord[] {
    return plainRecordList.split('\n').map((gameRecord) => new GameRecord(gameRecord));
  }

  getSumOfPossibleGames(): number {
    const possibleGames = this.gameHistory.filter((game) => game.isGamePossible(CubeGame.MAX_SET));
    return possibleGames.map((game) => game.id).reduce((acc, current) => acc + current, 0);
  }
}
