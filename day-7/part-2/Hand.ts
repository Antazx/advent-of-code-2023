type HandType =
  | 'Five of a kind'
  | 'Four of a kind'
  | 'Full house'
  | 'Three of a kind'
  | 'Two pair'
  | 'One pair'
  | 'High card';

export class Hand {
  private static TYPE_RANKING = [
    'Five of a kind',
    'Four of a kind',
    'Full house',
    'Three of a kind',
    'Two pair',
    'One pair',
    'High card',
  ];
  private static CARD_RANKING = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
  private type: HandType;
  cards: string[];

  constructor(input: string) {
    this.cards = input.split('');
    this.type = this.getHandType(this.cards);
  }

  compare(other: Hand): number {
    const otherRanking = other.getTypeRanking();
    const currentRanking = this.getTypeRanking();

    if (otherRanking > currentRanking) return 1;
    if (currentRanking > otherRanking) return -1;

    return this.compareCards(other);
  }

  private compareCards(other: Hand): number {
    for (let cardIndex = 0; cardIndex < this.cards.length; cardIndex++) {
      const currentCard = this.cards[cardIndex];
      const otherCard = other.cards[cardIndex];

      const currentRanking = Hand.getCardRaking(currentCard);
      const otherRanking = Hand.getCardRaking(otherCard);

      if (otherRanking > currentRanking) return 1;
      if (currentRanking > otherRanking) return -1;
    }

    return 0;
  }

  private getHandType(cards: string[]): HandType {
    const cardCounter: Record<string, number> = {};

    for (const card of cards) {
      if (card in cardCounter) {
        cardCounter[card]++;
      } else {
        cardCounter[card] = 1;
      }
    }

    const entries = this.checkForJokers(cardCounter);

    if (entries.length === 1 && entries.every(([_card, count]) => count === 5)) return 'Five of a kind';
    if (entries.length === 2 && entries.some(([_card, count]) => count === 4)) return 'Four of a kind';
    if (
      entries.length === 2 &&
      entries.some(([_card, count]) => count === 3) &&
      entries.some(([_card, count]) => count === 2)
    )
      return 'Full house';

    if (entries.length === 3 && entries.some(([_card, count]) => count === 3)) return 'Three of a kind';
    if (entries.length === 3 && entries.filter(([_card, count]) => count === 2).length === 2) return 'Two pair';
    if (entries.length === 4 && entries.some(([_card, count]) => count === 2)) return 'One pair';

    return 'High card';
  }

  private static getCardRaking(card: string) {
    return Hand.CARD_RANKING.toReversed().indexOf(card);
  }

  private getTypeRanking() {
    return Hand.TYPE_RANKING.toReversed().indexOf(this.type);
  }

  private checkForJokers(cardCounter: Record<string, number>) {
    if (!('J' in cardCounter)) return Object.entries(cardCounter);

    const jokerCount = cardCounter['J'];
    if (jokerCount === 5) return Object.entries(cardCounter);

    delete cardCounter['J'];

    const entries = Object.entries(cardCounter).sort(([_a, countA], [_b, countB]) => countB - countA);
    const maxCard = entries.shift();

    if (!maxCard) throw new Error('Cant get max card');
    entries.push([maxCard[0], maxCard[1] + jokerCount]);

    return entries;
  }
}
