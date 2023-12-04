import readFile from '../../readInput.ts';
import { CalibrationDocument } from './CalibrationDocument.ts';
const input = await readFile('day-1/part-1/input.txt');

const document = new CalibrationDocument(input);
console.log(`Solution is ${document.calculate()}`);
