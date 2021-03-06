// http://arclanguage.org/item?id=14181
// http://arclanguage.org/item?id=18936

import { nil } from "./static";

// Faster than using Math.max
export function max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

export function balanced_node(node, left, right) {
  var l_depth = left.depth;
  var r_depth = right.depth;

  // Left side is deeper
  if (l_depth > r_depth + 1) {
    var lleft  = left.left;
    var lright = left.right;

    // Right side is deeper
    if (lright.depth > lleft.depth) {
      // Left rotate -> Right rotate
      return lright.copy(left.copy(lleft, lright.left),
                         node.copy(lright.right, right));

    // Left side is deeper
    } else {
      // Right rotate
      return left.copy(lleft, node.copy(lright, right));
    }

  // Right side is deeper
  } else if (r_depth > l_depth + 1) {
    var rright = right.right;
    var rleft  = right.left;

    // Left side is deeper
    if (rleft.depth > rright.depth) {
      // Right rotate -> Left rotate
      return rleft.copy(node.copy(left, rleft.left),
                        right.copy(rleft.right, rright));

    // Right side is deeper
    } else {
      // Left rotate
      return right.copy(node.copy(left, rleft), rright);
    }

  // No balancing needed
  } else {
    return node.copy(left, right);
  }
}

export function concat(x, y) {
  if (x === nil) {
    return y;

  } else if (y === nil) {
    return x;

  // TODO what if the depths are the same?
  } else if (x.depth < y.depth) {
    var left = concat(x, y.left);
    return balanced_node(y, left, y.right);

  } else {
    var right = concat(x.right, y);
    return balanced_node(x, x.left, right);
  }
}

export function insert_min(node, new_node) {
  if (node === nil) {
    return new_node;
  } else {
    // TODO do we need to use balanced_node ?
    return balanced_node(node, insert_min(node.left, new_node), node.right);
  }
}

export function insert_max(node, new_node) {
  if (node === nil) {
    return new_node;
  } else {
    // TODO do we need to use balanced_node ?
    return balanced_node(node, node.left, insert_max(node.right, new_node));
  }
}

// http://n00tc0d3r.blogspot.com/2013/08/implement-iterator-for-binarytree-i-in.html
export function iter_tree(node) {
  var parents = [];

  while (node !== nil) {
    parents.push(node);
    node = node.left;
  }

  return {
    next: function () {
      if (parents.length) {
        var parent = parents.pop();

        node = parent.right;

        while (node !== nil) {
          parents.push(node);
          node = node.left;
        }

        return { value: parent };
      } else {
        return { done: true };
      }
    }
  };
}
