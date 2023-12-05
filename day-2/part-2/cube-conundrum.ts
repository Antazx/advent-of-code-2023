import readInput from '../../readInput.ts';
import { CubeGame } from './CubeGame.ts';

const input = await readInput('day-2/part-2/input.txt');
const cubeGame = new CubeGame(input);
console.log(`Solution is ${cubeGame.getSumOfPowerGames()}`);
