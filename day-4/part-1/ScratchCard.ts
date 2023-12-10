export class ScratchCard {
  private id: number;
  private winningNumbers: number[];
  private playerNumbers: number[];

  points = 0;

  constructor(input: string) {
    this.id = this.extractId(input);
    const [_idString, numberList] = input.split(': ');
    const [winningNumbers, playerNumbers] = numberList.split('| ');
    this.winningNumbers = this.parseNumberList(winningNumbers);
    this.playerNumbers = this.parseNumberList(playerNumbers);
    this.calculatePoints();
  }

  private calculatePoints(): number {
    for (const wNumber of this.winningNumbers) {
      for (const pNumber of this.playerNumbers) {
        if (wNumber === pNumber) this.increasePoints();
      }
    }

    return 0;
  }

  private increasePoints(): void {
    if (this.points === 0) {
      this.points = 1;
    } else {
      this.points = this.points * 2;
    }
  }

  private extractId(input: string) {
    const cardIdString = input.split(':')[0].at(-1);
    if (!cardIdString) throw new Error("Can't extract card id");
    return parseInt(cardIdString);
  }

  private parseNumberList(input: string): number[] {
    return input
      .trim()
      .split(' ')
      .filter((value) => value !== '')
      .map((value) => parseInt(value));
  }
}
