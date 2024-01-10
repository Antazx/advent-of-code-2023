import readInput from '../../readInput.ts';
import { Network } from './Network.ts';

async function main() {
  const input = await readInput('day-8/part-2/input.txt');
  const network = new Network(input);
  console.log(`Solution is ${network.getStepsToFinalNodes()}`);
}

main();
