import { Hand } from './Hand.ts';

export class CamelCards {
  private hands: [Hand, number][];

  constructor(input: string) {
    this.hands = this.extractHands(input);
  }

  orderCards() {
    const orderedCards = this.hands.sort(([handA, _bidA], [handB, _bidB]) => handB.compare(handA));
    return orderedCards.reduce((acc, [_hand, bid], index) => acc + bid * (index + 1), 0);
  }

  private extractHands(input: string): [Hand, number][] {
    const handsAndBids = input.split('\n');
    return handsAndBids
      .map((stringData) => stringData.split(' '))
      .map(([hand, bid]) => [new Hand(hand), parseInt(bid)]);
  }
}
