import { leastCommonMultiple } from '../../leastCommonMultiple.ts';
import { Node } from './Node.ts';

export class Network {
  private instructions: ('R' | 'L')[];
  private nodes: Record<string, Node> = {};

  constructor(input: string) {
    this.instructions = this.extractInstructions(input);
    this.nodes = this.extractNodes(input);
  }

  getStepsToFinalNodes(): number {
    const startingNodes = this.getStartingNodes();
    return leastCommonMultiple(startingNodes.map((node) => this.getStepsToFinalNode(node)));
  }

  getStepsToFinalNode(node: Node): number {
    let steps = 0;
    let currentNode = node;

    while (!currentNode.current.endsWith('Z')) {
      const instructionIndex = steps % this.instructions.length;
      const instruction = this.instructions[instructionIndex];
      currentNode = currentNode.getChildNode(instruction);
      steps++;
    }

    return steps;
  }

  private getStartingNodes(): Node[] {
    const startingNodes: Node[] = [];
    for (const key of Object.keys(this.nodes)) {
      if (key.endsWith('A')) startingNodes.push(this.nodes[key]);
    }

    return startingNodes;
  }

  private extractInstructions(input: string): ('R' | 'L')[] {
    const instructions = input.split('\n').shift();
    if (!instructions) throw new Error("Can't extract instructions");
    return instructions as unknown as ('R' | 'L')[];
  }

  private extractNodes(input: string) {
    const [_instructions, _blank, ...nodeDataList] = input.split('\n');
    const nodeStrings = nodeDataList.map((line) => line.match(/[A-Z1-9]{3}/g));

    for (const data of nodeStrings) {
      if (!data) continue;

      const [current, left, right] = data;

      const currentNode = this.getOrCreateNode(current);
      const leftNode = this.getOrCreateNode(left);
      const rightNode = this.getOrCreateNode(right);

      currentNode.setNodes(leftNode, rightNode);
      this.nodes[current] = currentNode;
    }

    return this.nodes;
  }

  private getOrCreateNode(nodeId: string): Node {
    const node = this.searchNode(nodeId) ?? new Node(nodeId);
    this.nodes[nodeId] = node;
    return node;
  }

  private searchNode(nodeId: string): Node | undefined {
    return nodeId in this.nodes ? this.nodes[nodeId] : undefined;
  }
}
