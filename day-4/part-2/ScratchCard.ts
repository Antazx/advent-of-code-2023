export class ScratchCard {
  id: number;
  points = 0;

  private winningNumbers: number[];
  private playerNumbers: number[];

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
    this.points = this.points + 1;
  }

  private extractId(input: string) {
    const numbers = /\d+/g;
    const cardIdString = input.split(':')[0].match(numbers)?.pop();

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
