export class Component {
  constructor({
    //
    tagName = 'div',
    className,
    attrs,
    html,
    text,
    children,
    id
    //
  }) {
    this._node = document.createElement(tagName);
    this._foundNode = null;

    if (className) this._node.className = className;
    if (html) this._node.innerHTML = html;
    if (text) this._node.textContent = text;
    if (children) this._insert('append', children);
    if (id) this._node.id = id;

    for (const key in attrs) {
      const attrValue = attrs[key];

      if (!attrValue) continue;

      this._node.setAttribute(key, attrValue);
    }
  }

  toHtml() {
    return this._node.outerHTML;
  }

  toNode() {
    return this._node;
  }
  getFoundNode() {
    return this._foundNode;
  }

  findNode(node) {
    if (typeof node === 'string') {
      this._foundNode = this._node.querySelector(node);
    } else {
      this._foundNode = node;
    }

    return this;
  }

  resetNode() {
    this._foundNode = null;

    return this;
  }

  _insert(methodName, components) {
    const children = Array.isArray(components) ? components : [components];

    const nodes = children.map(child => child.toNode());
    (this._foundNode || this._node)[methodName](...nodes);
  }

  html(htmlString) {
    (this._foundNode || this._node).innerHTML = htmlString;
    return this;
  }

  text(textValue) {
    (this._foundNode || this._node).textContent = textValue;
    return this;
  }

  append(components) {
    this._insert('append', components);
    return this;
  }

  prepend(components) {
    this._insert('prepend', components);
    return this;
  }

  before(components) {
    this._insert('before', components);
    return this;
  }

  after(components) {
    this._insert('after', components);
    return this;
  }

  truncate() {
    (this._foundNode || this._node).innerHTML = '';
    return this;
  }
  getText() {
    return (this._foundNode || this._node).textContent;
  }
  getValue() {
    return (this._foundNode || this._node).value;
  }

  remove() {
    (this._foundNode || this._node).remove();
    return this;
  }

  addListeners(listeners) {
    for (const eventType in listeners) {
      const eventHandler = listeners[eventType];

      if (typeof eventHandler !== 'function') continue;
      (this._foundNode || this._node).addEventListener(eventType, eventHandler);
    }
    return this;
  }
  removeListeners(listeners) {
    for (const eventType in listeners) {
      const eventHandler = listeners[eventType];

      if (typeof eventHandler !== 'function') continue;
      this._node.removeEventListener(eventType, eventHandler);
    }
    return this;
  }

  hasClass(className) {
    return (this._foundNode || this._node).classList.contains(className);
  }

  addClass(className) {
    (this._foundNode || this._node).classList.add(className);

    return this;
  }

  removeClass(className) {
    (this._foundNode || this._node).classList.remove(className);

    return this;
  }
}
