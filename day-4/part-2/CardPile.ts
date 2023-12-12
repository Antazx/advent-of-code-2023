import { ScratchCard } from './ScratchCard.ts';

export class CardPile {
  private cards: ScratchCard[];
  constructor(input: string) {
    this.cards = input.split('\n').map((inputRow) => new ScratchCard(inputRow));
  }

  processCardPile(): number {
    const cardCount: Record<number, number> = {};

    for (const card of this.cards) {
      this.increaseCardCounter(cardCount, card.id);
      this.countCopyCards(cardCount, card);
    }

    return Object.values(cardCount).reduce((totalCount, cardCount) => totalCount + cardCount, 0);
  }

  private countCopyCards(cardCount: Record<number, number>, card: ScratchCard) {
    const { id, points } = card;
    for (let countIndex = 0; countIndex < cardCount[card.id]; countIndex++) {
      for (let index = id + 1; index < id + 1 + points; index++) {
        this.increaseCardCounter(cardCount, index);
      }
    }
  }

  private increaseCardCounter(cardCount: Record<number, number>, cardId: number) {
    if (cardId in cardCount) {
      cardCount[cardId]++;
    } else {
      cardCount[cardId] = 1;
    }
  }
}
