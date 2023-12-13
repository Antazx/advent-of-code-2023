import readInput from '../../readInput.ts';
import { Almanac } from './Almanac.ts';

const input = await readInput('day-5/part-2/input.txt');
const almanac = new Almanac(input);
console.log(`Solution is ${almanac.processMappings()}`);
