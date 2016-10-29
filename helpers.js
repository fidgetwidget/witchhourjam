
var helpers = {}

//Returns true if it is a DOM node
helpers.isNode = function (o) {
  return (
    (typeof Node) === "object" ?  // supports Node
      o instanceof Node : 
      o && (typeof o) === "object" && typeof o.nodeType === "number" && (typeof o.nodeName) === "string"
  );
}

//Returns true if it is a DOM element    
helpers.isElement = function (o) {
  return (
    (typeof HTMLElement) === "object" ? // supports HTMLElement
      o instanceof HTMLElement : //DOM2
      o && (typeof o) === "object" && o !== null && o.nodeType === 1 && (typeof o.nodeName) === "string"
  );
}


module.exports = helpers;
