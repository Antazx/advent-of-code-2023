import readInput from '../../readInput.ts';
import { CardPile } from './CardPile.ts';

const input = await readInput('day-4/part-2/input.txt');
const cardPile = new CardPile(input);
console.log(`Solution is ${cardPile.processCardPile()}`);
