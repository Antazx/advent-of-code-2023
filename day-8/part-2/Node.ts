export class Node {
  current: string;
  left: Node | undefined;
  right: Node | undefined;

  constructor(current: string) {
    this.current = current;
  }

  setNodes(left: Node, right: Node) {
    this.left = left;
    this.right = right;
  }

  getChildNode(instruction: 'R' | 'L'): Node {
    if (instruction === 'L' && this.left !== undefined) return this.left;
    if (instruction === 'R' && this.right !== undefined) return this.right;
    throw new Error('Not handled instruction');
  }
}
