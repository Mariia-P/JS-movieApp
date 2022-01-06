export const render = (component, parentNode) => {
    parentNode.prepend(component.toNode());
};
