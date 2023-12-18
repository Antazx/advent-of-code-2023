import readInput from '../../readInput.ts';
import { RaceHistory } from './RaceHistory.ts';

const input = await readInput('day-6/part-2/input.txt');

function main() {
  const race = new RaceHistory(input);
  console.log(`Solution is ${race.getWinningRaces()}`);
}

main();
