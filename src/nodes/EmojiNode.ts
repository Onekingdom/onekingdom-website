import { TextNode } from "lexical";

export class EmojiNode extends TextNode {
  __className: string;
  static getType() {
    return "emoji";
  }

  static clone(node: EmojiNode) {
    return new EmojiNode(node.__className, node.__text, node.__key);
  }

  constructor(className: string, text: string, key: string) {
    super(text, key);
    this.__className = className;
  }

  createDOM(config: any) {
    const dom = document.createElement("span");
    const inner = super.createDOM(config);
    dom.className = this.__className;
    inner.className = "emoji-inner";
    dom.appendChild(inner);
    return dom;
  }

  updateDOM(prevNode: EmojiNode, dom: HTMLElement, config: any) {
    const inner = dom.firstChild as HTMLElement;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner, config);
    return false;
  }
}

export function $isEmojiNode(node: any) {
  return node instanceof EmojiNode;
}

export function $createEmojiNode(className: string, emojiText: string) {
  return new EmojiNode(className, emojiText, "").setMode("token");
}
