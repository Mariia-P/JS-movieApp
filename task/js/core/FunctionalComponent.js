export function FunctionalComponent(html, className) {
  //
  const tagName = "div";
  this.className = className;
  this.html = html;

  //

  this._node = document.createElement(tagName);
  this._foundNode = null;

  if (className) this._node.className = className;
  if (html) this._node.innerHTML = html;

  this.toHtml = function () {
    return this._node.outerHTML;
  };

  this.toNode = function () {
    return this._node;
  };
  this.getFoundNode = function () {
    return this._foundNode;
  };

  this.findNode = function (node) {
    if (typeof node === "string") {
      this._foundNode = this._node.querySelector(node);
    } else {
      this._foundNode = node;
    }

    return this;
  };

  this.resetNode = function () {
    this._foundNode = null;

    return this;
  };

  this._insert = function (methodName, components) {
    const children = Array.isArray(components) ? components : [components];

    const nodes = children.map((child) => child.toNode());
    (this._foundNode || this._node)[methodName](...nodes);
  };

  this.html = function (htmlString) {
    (this._foundNode || this._node).innerHTML = htmlString;
    return this;
  };

  this.text = function (textValue) {
    (this._foundNode || this._node).textContent = textValue;
    return this;
  };

  this.append = function (components) {
    this._insert("append", components);
    return this;
  };

  this.prepend = function (components) {
    this._insert("prepend", components);
    return this;
  };

  this.before = function (components) {
    this._insert("before", components);
    return this;
  };

  this.after = function (components) {
    this._insert("after", components);
    return this;
  };

  this.truncate = function () {
    (this._foundNode || this._node).innerHTML = "";
    return this;
  };
  this.getText = function () {
    return (this._foundNode || this._node).textContent;
  };
  this.getValue = function () {
    return (this._foundNode || this._node).value;
  };

  this.remove = function () {
    (this._foundNode || this._node).remove();
    return this;
  };

  this.addListeners = function (listeners) {
    for (const eventType in listeners) {
      const eventHandler = listeners[eventType];

      if (typeof eventHandler !== "function") continue;
      (this._foundNode || this._node).addEventListener(eventType, eventHandler);
    }
    return this;
  };
  this.removeListeners = function (listeners) {
    for (const eventType in listeners) {
      const eventHandler = listeners[eventType];

      if (typeof eventHandler !== "function") continue;
      this._node.removeEventListener(eventType, eventHandler);
    }
    return this;
  };

  // hasClass(className) {
  //     return (this._foundNode || this._node).classList.contains(className);

  // }

  this.addClass = function (className) {
    (this._foundNode || this._node).classList.add(className);

    return this;
  };

  this.removeClass = function (className) {
    (this._foundNode || this._node).classList.remove(className);

    return this;
  };
}
