import readInput from '../../readInput.ts';
import { ElfEngine } from './ElfEngine.ts';

const input = await readInput('day-3/part-1/input.txt');
const elfEngine = new ElfEngine(input);
console.log(`Solution is ${elfEngine.getEnginePartsSum()}`);
