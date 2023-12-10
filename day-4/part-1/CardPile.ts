import { ScratchCard } from './ScratchCard.ts';

export class CardPile {
  private cards: ScratchCard[];
  constructor(input: string) {
    this.cards = input.split('\n').map((inputRow) => new ScratchCard(inputRow));
  }

  getPilePoints(): number {
    return this.cards.reduce((acc, curr) => acc + curr.points, 0);
  }
}
