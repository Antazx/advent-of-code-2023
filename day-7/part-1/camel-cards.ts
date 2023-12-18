import readInput from '../../readInput.ts';
import { CamelCards } from './CamelCards.ts';

async function main() {
  const input = await readInput('day-7/part-1/input.txt');
  const camelCards = new CamelCards(input);
  console.log(`Solution is ${camelCards.orderCards()}`);
}

main();
