/**
 * @license
 *
 * (c) 2014, 2015 Oni Labs, http://onilabs.com
 *
 * This file is licensed under the terms of the MIT License:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function() {
    "use strict";
    function $$Array$$copy(array) {
      var len = array.length;
      var out = new Array(len);

      for (var i = 0; i < len; ++i) {
        out[i] = array[i];
      }

      return out;
    }

    function $$Array$$insert(array, index, value) {
      var len = array.length + 1;

      var out = new Array(len);

      var i = 0;
      while (i < index) {
        out[i] = array[i];
        ++i;
      }

      out[i] = value;
      ++i;

      while (i < len) {
        out[i] = array[i - 1];
        ++i;
      }

      return out;
    }

    function $$Array$$modify(array, index, f) {
      var old_value = array[index];
      var new_value = f(old_value);

      if (old_value === new_value) {
        return array;

      } else {
        var new_array = $$Array$$copy(array);
        new_array[index] = new_value;
        return new_array;
      }
    }

    function $$Array$$remove(array, index) {
      var len = array.length - 1;

      var out = new Array(len);

      var i = 0;
      while (i < index) {
        out[i] = array[i];
        ++i;
      }

      while (i < len) {
        out[i] = array[i + 1];
        ++i;
      }

      return out;
    }
    var $$Tag$$tag_uuid = "48de6fff-9d11-472d-a76f-ed77a59a5cbc";
    var $$Tag$$tag_id = 0;

    var $$Tag$$uuid = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
    var $$Tag$$uuid_regexp = new RegExp("^" + $$Tag$$uuid + "$");

    var $$Tag$$is_tag_regexp = new RegExp("^\\(Tag " + $$Tag$$tag_uuid + " [0-9]+\\)$");

    var $$Tag$$is_uuid_tag_regexp = new RegExp("^\\(UUIDTag " + $$Tag$$uuid + "\\)$");

    var $$Tag$$Symbol_iterator = (typeof Symbol !== "undefined" && typeof Symbol.iterator !== "undefined"
                                   ? Symbol.iterator
                                   : null);

    var $$Tag$$Symbol_keyFor = (typeof Symbol !== "undefined" && typeof Symbol.keyFor !== "undefined"
                                 ? Symbol.keyFor
                                 : null);

    function $$Tag$$isUUID(x) {
      return typeof x === "string" && $$Tag$$uuid_regexp.test(x);
    }

    function $$Tag$$isTag(x) {
      return typeof x === "string" &&
             ($$Tag$$is_tag_regexp.test(x) ||
              $$Tag$$is_uuid_tag_regexp.test(x));
    }

    function $$Tag$$isUUIDTag(x) {
      return typeof x === "string" && $$Tag$$is_uuid_tag_regexp.test(x);
    }

    function $$Tag$$Tag() {
      if (arguments.length === 0) {
        return "(Tag " + $$Tag$$tag_uuid + " " + (++$$Tag$$tag_id) + ")";
      } else {
        throw new Error("Expected 0 arguments but got " + arguments.length);
      }
    }

    function $$Tag$$UUIDTag(id) {
      if (arguments.length === 1) {
        if ($$Tag$$isUUID(id)) {
          return "(UUIDTag " + id + ")";
        } else {
          throw new Error("Expected a lower-case UUID, but got: " + id);
        }

      } else {
        throw new Error("Expected 1 argument but got " + arguments.length);
      }
    }
    var $$static$$tag_hash        = $$Tag$$UUIDTag("e1c3818d-4c4f-4703-980a-00969e4ca900");
    var $$static$$tag_iter        = $$Tag$$UUIDTag("6199065c-b518-4cb3-8b41-ab70a9769ec3");
    var $$static$$tag_toJS        = $$Tag$$UUIDTag("1b75a273-16bd-4248-be8a-e4b5e8c4b523");
    var $$static$$tag_toJSON_type = $$Tag$$UUIDTag("89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37");
    var $$static$$tag_toJSON      = $$Tag$$UUIDTag("99e14916-bc99-4c48-81aa-299cf1ad6de3");

    var $$static$$fromJSON_registry = {};

    var $$static$$nil = {};
    $$static$$nil.depth      = 0;
    $$static$$nil.size       = 0;
    function $$equal$$equal(x, y) {
      return x === y || $$hash$$hash(x) === $$hash$$hash(y);
    }

    // TODO move into "./static.js" ?
    var $$iter$$empty = {};

    function $$iter$$iter_array(array) {
      var i = 0;

      return {
        next: function () {
          if (i < array.length) {
            return { value: array[i++] };
          } else {
            return { done: true };
          }
        }
      };
    }

    function $$iter$$isIterable(x) {
      if ($$util$$isObject(x)) {
        return x[$$static$$tag_iter] != null ||
               ($$Tag$$Symbol_iterator !== null && x[$$Tag$$Symbol_iterator] != null) ||
               Array.isArray(x);
      } else {
        return typeof x === "string" && !$$Tag$$isTag(x);
      }
    }

    function $$iter$$toIterator(x) {
      var fn;

      if ((fn = x[$$static$$tag_iter]) != null) {
        return fn.call(x);

      // TODO should ES6 Iterables have precedence over `tag_iter` ?
      } else if ($$Tag$$Symbol_iterator !== null && (fn = x[$$Tag$$Symbol_iterator]) != null) {
        return fn.call(x);

      } else if (Array.isArray(x)) {
        return $$iter$$iter_array(x);

      // TODO this isn't quite correct
      } else if (typeof x === "string" && !$$Tag$$isTag(x)) {
        return $$iter$$iter_array(x);

      } else {
        throw new Error("Cannot iter: " + x);
      }
    }

    function $$iter$$Iterable(f) {
      var o = {};

      function iter() {
        return f();
      }

      o[$$static$$tag_iter] = iter;

      if ($$Tag$$Symbol_iterator !== null) {
        o[$$Tag$$Symbol_iterator] = iter;
      }

      return o;
    }

    function $$iter$$each_iter(iterator, f) {
      for (;;) {
        var info = iterator.next();
        // TODO what if it has a value too?
        if (info.done) {
          break;
        } else {
          f(info.value);
        }
      }
    }

    function $$iter$$map_iter(iterator, f) {
      return {
        next: function () {
          var info = iterator.next();
          // TODO what if it has a value too?
          if (info.done) {
            // TODO just return `info` ?
            return { done: true };
          } else {
            return { value: f(info.value) };
          }
        }
      };
    }

    function $$iter$$concat_iter(x, y) {
      var x_done = false;
      var y_done = false;

      return {
        next: function () {
          for (;;) {
            if (x_done) {
              if (y_done) {
                return { done: true };
              } else {
                var info = y.next();
                if (info.done) {
                  y_done = true;
                } else {
                  return { value: info.value };
                }
              }
            } else {
              var info = x.next();
              if (info.done) {
                x_done = true;
              } else {
                return { value: info.value };
              }
            }
          }
        }
      };
    }

    function $$iter$$any(x, f) {
      var iterator = $$iter$$toIterator(x);

      for (;;) {
        var info = iterator.next();
        if (info.done) {
          return false;
        } else if (f(info.value)) {
          return true;
        }
      }
    }

    function $$iter$$all(x, f) {
      var iterator = $$iter$$toIterator(x);

      for (;;) {
        var info = iterator.next();
        if (info.done) {
          return true;
        } else if (!f(info.value)) {
          return false;
        }
      }
    }

    function $$iter$$find(x, f, def) {
      var iterator = $$iter$$toIterator(x);

      for (;;) {
        var info = iterator.next();
        if (info.done) {
          if (arguments.length === 3) {
            return def;
          } else {
            throw new Error("Did not find anything");
          }

        } else if (f(info.value)) {
          return info.value;
        }
      }
    }

    function $$iter$$partition(x, f) {
      var yes_buffer = [];
      var no_buffer  = [];

      var iterator = $$iter$$empty;
      var done     = false;

      return $$ImmutableTuple$$unsafe_Tuple([
        $$iter$$Iterable(function () {
          if (iterator === $$iter$$empty) {
            iterator = $$iter$$toIterator(x);
          }

          return {
            next: function () {
              for (;;) {
                if (yes_buffer.length) {
                  return yes_buffer.shift();

                } else if (done) {
                  return { done: true };

                } else {
                  var info = iterator.next();
                  if (info.done) {
                    done = true;

                  } else if (f(info.value)) {
                    return { value: info.value };

                  } else {
                    no_buffer.push({ value: info.value });
                  }
                }
              }
            }
          };
        }),

        $$iter$$Iterable(function () {
          if (iterator === $$iter$$empty) {
            iterator = $$iter$$toIterator(x);
          }

          return {
            next: function () {
              for (;;) {
                if (no_buffer.length) {
                  return no_buffer.shift();

                } else if (done) {
                  return { done: true };

                } else {
                  var info = iterator.next();
                  if (info.done) {
                    done = true;

                  } else if (f(info.value)) {
                    yes_buffer.push({ value: info.value });

                  } else {
                    return { value: info.value };
                  }
                }
              }
            }
          };
        })
      ]);
    }

    function $$iter$$zip(x, def) {
      var hasDefault = (arguments.length === 2);

      return $$iter$$Iterable(function () {
        var args = $$iter$$toArray(x).map(function (x) {
          return $$iter$$toIterator(x);
        });

        var isDone = false;

        return {
          next: function () {
            for (;;) {
              if (isDone) {
                return { done: true };

              } else {
                var out  = [];
                var seen = false;

                for (var i = 0, l = args.length; i < l; ++i) {
                  var info = args[i].next();
                  if (info.done) {
                    if (hasDefault) {
                      out.push(def);
                    } else {
                      seen = false;
                      break;
                    }
                  } else {
                    seen = true;
                    out.push(info.value);
                  }
                }

                if (seen) {
                  return { value: $$ImmutableTuple$$unsafe_Tuple(out) };

                } else {
                  isDone = true;
                }
              }
            }
          }
        };
      });
    }

    function $$iter$$reverse_iter(iterator) {
      var stack = [];

      // TODO should it do this here, or inside `next` ?
      $$iter$$each_iter(iterator, function (x) {
        stack.push(x);
      });

      var i = stack.length;

      return {
        next: function () {
          if (i) {
            return { value: stack[--i] };
          } else {
            return { done: true };
          }
        }
      };
    }

    function $$iter$$foldl(x, init, f) {
      $$iter$$each(x, function (x) {
        init = f(init, x);
      });
      return init;
    }

    function $$iter$$foldr(x, init, f) {
      return $$iter$$foldl($$iter$$reverse(x), init, function (x, y) {
        return f(y, x);
      });
    }

    function $$iter$$toArray(x) {
      if (Array.isArray(x)) {
        return x;

      } else {
        var a = [];

        $$iter$$each(x, function (x) {
          a.push(x);
        });

        return a;
      }
    }

    function $$iter$$join(x, separator) {
      if (arguments.length === 1) {
        separator = "";
      }

      if (typeof x === "string" && separator === "") {
        return x;
      } else {
        // TODO this requires O(n) space, perhaps we can use an iterator to make it O(1) space ?
        return $$iter$$toArray(x).join(separator);
      }
    }

    function $$iter$$mapcat_iter(iterator, f) {
      var done = false;
      var sub  = $$iter$$empty;

      return {
        next: function () {
          for (;;) {
            if (done) {
              return { done: true };

            } else if (sub === $$iter$$empty) {
              var info = iterator.next();
              // TODO what if it has a value too?
              if (info.done) {
                done = true;
              } else {
                sub = f(info.value);
              }

            } else {
              var info = sub.next();
              if (info.done) {
                sub = $$iter$$empty;
              } else {
                return { value: info.value };
              }
            }
          }
        }
      };
    }

    function $$iter$$iter_object(x) {
      if ($$util$$isJSLiteral(x)) {
        return $$iter$$map(Object.keys(x), function (key) {
          return [key, x[key]];
        });
      } else {
        return x;
      }
    }


    function $$iter$$each(x, f) {
      $$iter$$each_iter($$iter$$toIterator(x), f);
    }

    function $$iter$$findIndex(x, f, def) {
      var iterator = $$iter$$toIterator(x);

      var index = 0;

      for (;;) {
        var info = iterator.next();
        // TODO what if it has a value too?
        if (info.done) {
          if (arguments.length === 3) {
            return def;
          } else {
            throw new Error("Did not find anything");
          }

        } else if (f(info.value)) {
          return index;

        } else {
          ++index;
        }
      }
    }

    function $$iter$$indexOf(x, value, def) {
      if (arguments.length === 3) {
        return $$iter$$findIndex(x, function (other) {
          // TODO should `value` or `other` come first ?
          return $$equal$$equal(other, value);
        }, def);
      } else {
        return $$iter$$findIndex(x, function (other) {
          // TODO should `value` or `other` come first ?
          return $$equal$$equal(other, value);
        });
      }
    }

    function $$iter$$take(x, count) {
      // TODO isInteger function
      if (Math.round(count) !== count) {
        throw new Error("Count must be an integer");
      }

      if (count < 0) {
        throw new Error("Count cannot be negative");
      }

      return $$iter$$Iterable(function () {
        var iterator = $$iter$$toIterator(x);

        return {
          next: function () {
            for (;;) {
              if (count < 0) {
                throw new Error("Invalid count");

              } else if (count === 0) {
                return { done: true };

              } else {
                var info = iterator.next();
                if (info.done) {
                  count = 0;
                } else {
                  --count;
                  return { value: info.value };
                }
              }
            }
          }
        };
      });
    }

    function $$iter$$range(start, end, step) {
      if (arguments.length < 1) {
        start = 0;
      }
      if (arguments.length < 2) {
        end = Infinity;
      }
      if (arguments.length < 3) {
        step = 1;
      }

      if (step < 0) {
        throw new Error("Step cannot be negative");
      }

      return $$iter$$Iterable(function () {
        if (start < end) {
          var next = function () {
            if (start < end) {
              var current = start;
              start += step;
              return { value: current };

            } else {
              return { done: true };
            }
          };
        } else {
          var next = function () {
            if (start > end) {
              var current = start;
              start -= step;
              return { value: current };

            } else {
              return { done: true };
            }
          };
        }
        return {
          next: next
        };
      });
    }

    function $$iter$$map(x, f) {
      return $$iter$$Iterable(function () {
        return $$iter$$map_iter($$iter$$toIterator(x), f);
      });
    }

    function $$iter$$reverse(x) {
      return $$iter$$Iterable(function () {
        return $$iter$$reverse_iter($$iter$$toIterator(x));
      });
    }

    function $$iter$$keep(x, f) {
      return $$iter$$Iterable(function () {
        var iterator = $$iter$$toIterator(x);
        return {
          next: function () {
            for (;;) {
              var info = iterator.next();
              // TODO what if it has a value too?
              if (info.done) {
                return { done: true };
              } else if (f(info.value)) {
                return { value: info.value };
              }
            }
          }
        };
      });
    }

    var $$hash$$mutable_hash_id = 0;

    var $$hash$$Symbol_id = 0;
    var $$hash$$Symbol_registry = {};

    function $$hash$$hash_string(x) {
      return "\"" + x.replace(/[\\\"\n]/g, function (s) {
        if (s === "\n") {
          return s + " ";
        } else {
          return "\\" + s;
        }
      }) + "\"";
    }

    function $$hash$$hash_symbol(x) {
      var key;
      if ($$Tag$$Symbol_keyFor !== null && (key = $$Tag$$Symbol_keyFor(x)) != null) {
        return "(Symbol.for " + $$hash$$hash(key) + ")";
      } else {
        key = $$hash$$Symbol_registry[x];
        if (key == null) {
          key = $$hash$$Symbol_registry[x] = (++$$hash$$Symbol_id);
        }
        return "(Symbol " + key + ")";
      }
    }

    function $$hash$$hash(x) {
      var type = typeof x;
      // TODO this is probably pretty inefficient
      if (type === "string") {
        if ($$Tag$$isTag(x)) {
          return x;
        } else {
          return $$hash$$hash_string(x);
        }

      } else if (type === "number"    ||
                 type === "boolean"   ||
                 type === "undefined" ||
                 x === null) {
        return "" + x;

      } else if (type === "symbol") {
        return $$hash$$hash_symbol(x);

      } else {
        var hasher = x[$$static$$tag_hash];
        if (hasher != null) {
          return hasher(x);

        } else {
          if (Object.isExtensible(x)) {
            var id = "(Mutable " + (++$$hash$$mutable_hash_id) + ")";

            Object.defineProperty(x, $$static$$tag_hash, {
              configurable: false,
              enumerable: false,
              writable: false,
              value: function () {
                return id;
              }
            });

            return id;

          } else {
            throw new Error("Cannot use a non-extensible object as a key: " + x);
          }
        }
      }
    }

    function $$hash$$hash_dict(x, spaces) {
      var max_key = 0;

      var a = [];

      $$iter$$each(x, function (_array) {
        $$util$$destructure_pair(_array, function (key, value) {
          key   = $$hash$$hash(key);
          value = $$hash$$hash(value);

          key = key.split(/\n/);

          $$iter$$each(key, function (key) {
            max_key = Math.max(max_key, key.length);
          });

          a.push({
            key: key,
            value: value
          });
        });
      });

      var spaces = "  ";

      a = $$iter$$map(a, function (x) {
        var last = x.key.length - 1;
        x.key[last] = $$util$$pad_right(x.key[last], max_key, " ");

        var key = $$iter$$join(x.key, "\n");

        var value = x.value.replace(/\n/g, "\n" + $$util$$repeat(" ", max_key + 3));

        return key + " = " + value;
      });

      return $$hash$$join_lines(a, spaces);
    }

    function $$hash$$hash_array(s) {
      return function (x) {
        if (x.hash === null) {
          var a = $$iter$$map(x, function (x) {
            return $$hash$$hash(x);
          });

          x.hash = "(" + s + $$hash$$join_lines(a, "  ") + ")";
        }

        return x.hash;
      };
    }

    function $$hash$$join_lines(a, spaces) {
      var separator = "\n" + spaces;

      return $$iter$$join($$iter$$map(a, function (x) {
        return separator + x.replace(/\n/g, separator);
      }));
    }
    function $$toJSON$$fromJSON(x) {
      var type = typeof x;

      if ($$Tag$$isTag(x)) {
        if ($$Tag$$isUUIDTag(x)) {
          return x;
        } else {
          throw new Error("Cannot convert Tag from JSON, use UUIDTag instead: " + x);
        }

      } else if (type === "string" || type === "boolean" || x === null || $$util$$isFinite(x)) {
        return x;

      } else if ($$util$$isObject(x)) {
        var type = x[$$static$$tag_toJSON_type];
        if (type != null) {
          var register = $$static$$fromJSON_registry[type];
          if (register != null) {
            return register(x);
          } else {
            throw new Error("Cannot handle type " + type);
          }

        } else if (Array.isArray(x)) {
          return x.map($$toJSON$$fromJSON);

        } else if ($$util$$isJSLiteral(x)) {
          var out = {};
          // TODO is Object.keys correct here ?
          Object.keys(x).forEach(function (key) {
                // TODO unit tests for this
            out[$$toJSON$$fromJSON(key)] = $$toJSON$$fromJSON(x[key]);
          });
          return out;

        } else {
          throw new Error("Cannot convert from JSON: " + x);
        }

      } else {
        throw new Error("Cannot convert from JSON: " + x);
      }
    }

    function $$toJSON$$toJSON(x) {
      var type = typeof x;

      if ($$Tag$$isTag(x)) {
        if ($$Tag$$isUUIDTag(x)) {
          return x;
        } else {
          throw new Error("Cannot convert Tag to JSON, use UUIDTag instead: " + x);
        }

      } else if (type === "string" || type === "boolean" || x === null || $$util$$isFinite(x)) {
        return x;

      } else if ($$util$$isObject(x)) {
        var fn = x[$$static$$tag_toJSON];
        if (fn != null) {
          return fn(x);

        // TODO isFunction ?
        // TODO should this be before or after tag_toJSON ?
        } else if (typeof x.toJSON === "function") {
          return $$toJSON$$toJSON(x.toJSON());

        } else if (Array.isArray(x)) {
          return x.map($$toJSON$$toJSON);

        } else if ($$util$$isJSLiteral(x)) {
          var out = {};
          // TODO is Object.keys correct here ?
          Object.keys(x).forEach(function (key) {
                // TODO unit tests for this
            out[$$toJSON$$toJSON(key)] = $$toJSON$$toJSON(x[key]);
          });
          return out;

        } else {
          throw new Error("Cannot convert to JSON: " + x);
        }

      } else {
        throw new Error("Cannot convert to JSON: " + x);
      }
    }

    function $$toJSON$$toJSON_object(type, x) {
      var o = {};

      o[$$static$$tag_toJSON_type] = type;

      o.keys   = [];
      o.values = [];

      $$iter$$each(x, function (_array) {
        $$util$$destructure_pair(_array, function (key, value) {
          o.keys.push($$toJSON$$toJSON(key));
          o.values.push($$toJSON$$toJSON(value));
        });
      });

      return o;
    }

    function $$toJSON$$toJSON_array(type, x) {
      var o = {};

      o[$$static$$tag_toJSON_type] = type;

      o.values = [];

      $$iter$$each(x, function (value) {
        o.values.push($$toJSON$$toJSON(value));
      });

      return o;
    }

    function $$toJSON$$fromJSON_object(x) {
      var keys   = x.keys;
      var values = x.values;

      var l = keys.length;
      var out = new Array(l);

      for (var i = 0; i < l; ++i) {
        out[i] = [$$toJSON$$fromJSON(keys[i]), $$toJSON$$fromJSON(values[i])];
      }

      return out;
    }

    function $$toJSON$$fromJSON_array(x) {
      var values = x.values;

      var l = values.length;
      var out = new Array(l);

      for (var i = 0; i < l; ++i) {
        out[i] = $$toJSON$$fromJSON(values[i]);
      }

      return out;
    }
    function $$AVL$$max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }

    function $$AVL$$balanced_node(node, left, right) {
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

    function $$AVL$$concat(x, y) {
      if (x === $$static$$nil) {
        return y;

      } else if (y === $$static$$nil) {
        return x;

      // TODO what if the depths are the same?
      } else if (x.depth < y.depth) {
        var left = $$AVL$$concat(x, y.left);
        return $$AVL$$balanced_node(y, left, y.right);

      } else {
        var right = $$AVL$$concat(x.right, y);
        return $$AVL$$balanced_node(x, x.left, right);
      }
    }

    function $$AVL$$insert_min(node, new_node) {
      if (node === $$static$$nil) {
        return new_node;
      } else {
        // TODO do we need to use balanced_node ?
        return $$AVL$$balanced_node(node, $$AVL$$insert_min(node.left, new_node), node.right);
      }
    }

    function $$AVL$$insert_max(node, new_node) {
      if (node === $$static$$nil) {
        return new_node;
      } else {
        // TODO do we need to use balanced_node ?
        return $$AVL$$balanced_node(node, node.left, $$AVL$$insert_max(node.right, new_node));
      }
    }

    function $$AVL$$iter_tree(node) {
      var parents = [];

      while (node !== $$static$$nil) {
        parents.push(node);
        node = node.left;
      }

      return {
        next: function () {
          if (parents.length) {
            var parent = parents.pop();

            node = parent.right;

            while (node !== $$static$$nil) {
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
    var $$Base$$MutableBase   = {};
    var $$Base$$ImmutableBase = {};

    function $$Base$$toString() {
      return $$hash$$hash(this);
    }

    // TODO Infinite cycle detection ?
    function $$Base$$_toJSON() {
      return $$toJSON$$toJSON(this);
    }

    $$Base$$MutableBase.toString = $$Base$$ImmutableBase.toString = $$Base$$toString;
    $$Base$$MutableBase.inspect  = $$Base$$ImmutableBase.inspect  = $$Base$$toString;

    // Mutable things cannot be converted to JSON
    $$Base$$ImmutableBase.toJSON = $$Base$$_toJSON;

    if ($$Tag$$Symbol_iterator !== null) {
      $$Base$$MutableBase[$$Tag$$Symbol_iterator] = $$Base$$ImmutableBase[$$Tag$$Symbol_iterator] = function () {
        return $$iter$$toIterator(this);
      };
    }
    function $$Ordered$$nth_has(index, len) {
      return index >= 0 && index < len;
    }

    function $$Ordered$$ordered_has(index) {
      var len = this.size();

      if (index < 0) {
        index += len;
      }

      return $$Ordered$$nth_has(index, len);
    }
    function $$Cons$$Cons(car, cdr) {
      this.car = car;
      this.cdr = cdr;
    }

    function $$Cons$$iter_cons(x) {
      return {
        next: function () {
          if (x === $$static$$nil) {
            return { done: true };
          } else {
            var value = x.car;
            x = x.cdr;
            return { value: value };
          }
        }
      };
    }

    function $$Cons$$each_cons(x, f) {
      while (x !== $$static$$nil) {
        f(x.car);
        x = x.cdr;
      }
    }
    var $$ImmutableList$$array_limit = 125;

    var $$ImmutableList$$ceiling = Math.ceil;
    var $$ImmutableList$$floor   = Math.floor;


    function $$ImmutableList$$add_slice(slices, slice) {
      if (slices.length) {
        var last = slices[slices.length - 1];
        if (last.length + slice.length <= $$ImmutableList$$array_limit) {
          slices[slices.length - 1] = last.concat(slice);
        } else {
          slices.push(slice);
        }
      } else {
        slices.push(slice);
      }
    }

    function $$ImmutableList$$slices_to_tree1(slices, min, max) {
      if (min < max) {
        var pivot = $$ImmutableList$$floor((min + max) / 2);
        var left  = $$ImmutableList$$slices_to_tree1(slices, min, pivot);
        var right = $$ImmutableList$$slices_to_tree1(slices, pivot + 1, max);
        return new $$ImmutableList$$ArrayNode(left, right, slices[pivot]);
      } else {
        return $$static$$nil;
      }
    }

    function $$ImmutableList$$slices_to_tree(slices) {
      return $$ImmutableList$$slices_to_tree1(slices, 0, slices.length);
    }

    // TODO move this into Array.js ?
    function $$ImmutableList$$array_slice(array, from, to) {
      if (from < 0) {
        from = 0;
      }

      var len = array.length;
      if (to > len) {
        to = len;
      }

      if (from === 0 && to === len) {
        return array;
      } else {
        return array.slice(from, to);
      }
    }


    // Converts a stack (reversed cons) into an array
    function $$ImmutableList$$stack_to_array(a, size) {
      var out = new Array(size);

      while (size--) {
        out[size] = a.car;
        a = a.cdr;
      }

      return out;
    }

    function $$ImmutableList$$stack_nth(a, size, i) {
      while (--size !== i) {
        a = a.cdr;
      }

      return a.car;
    }


    function $$ImmutableList$$ArrayNode(left, right, array) {
      this.left  = left;
      this.right = right;
      this.array = array;
      this.size  = left.size + right.size + array.length;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$ImmutableList$$ArrayNode.prototype.copy = function (left, right) {
      return new $$ImmutableList$$ArrayNode(left, right, this.array);
    };


    function $$ImmutableList$$nth_get(node, index) {
      for (;;) {
        var left    = node.left;
        var l_index = left.size;

        if (index < l_index) {
          node = left;

        } else {
          index -= l_index;

          var array = node.array;
          var len   = array.length;
          if (index < len) {
            return array[index];

          } else {
            index -= len;
            node  = node.right;
          }
        }
      }
    }

    function $$ImmutableList$$nth_insert(node, index, value) {
      // TODO is this necessary ?
      if (node === $$static$$nil) {
        return new $$ImmutableList$$ArrayNode($$static$$nil, $$static$$nil, [value]);

      } else {
        var left    = node.left;
        var right   = node.right;
        var l_index = left.size;

        if (index < l_index) {
          var child = $$ImmutableList$$nth_insert(left, index, value);
          return $$AVL$$balanced_node(node, child, right);

        } else {
          index -= l_index;

          var array = node.array;
          var len   = array.length;
          // TODO test this
          if (index <= len) {
            array = $$Array$$insert(array, index, value);

            // TODO this fails when array_limit is 1
            if (len === $$ImmutableList$$array_limit) {
              var pivot  = $$ImmutableList$$ceiling(array.length / 2);
              var aleft  = array.slice(0, pivot);
              var aright = array.slice(pivot);

              if (left.depth < right.depth) {
                // TODO unit test for this
                // TODO insert_array_max ?
                return new $$ImmutableList$$ArrayNode($$AVL$$insert_max(left, new $$ImmutableList$$ArrayNode($$static$$nil, $$static$$nil, aleft)), right, aright);
              } else {
                // TODO unit test for this
                // TODO insert_array_min ?
                return new $$ImmutableList$$ArrayNode(left, $$AVL$$insert_min(right, new $$ImmutableList$$ArrayNode($$static$$nil, $$static$$nil, aright)), aleft);
              }

            } else {
              return new $$ImmutableList$$ArrayNode(left, right, array);
            }

          } else {
            var child = $$ImmutableList$$nth_insert(right, index - len, value);
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$ImmutableList$$nth_modify(node, index, f) {
      var left    = node.left;
      var right   = node.right;
      var l_index = left.size;

      if (index < l_index) {
        var child = $$ImmutableList$$nth_modify(left, index, f);
        if (child === left) {
          return node;
        } else {
          return node.copy(child, right); // TODO test this
        }

      } else {
        index -= l_index;

        var array = node.array;
        var len   = array.length;
        // TODO test this
        if (index < len) {
          var new_array = $$Array$$modify(array, index, f);
          if (new_array === array) {
            return node;
          } else {
            return new $$ImmutableList$$ArrayNode(left, right, new_array);
          }

        } else {
          var child = $$ImmutableList$$nth_modify(right, index - len, f);
          if (child === right) {
            return node;
          } else {
            return node.copy(left, child); // TODO test this
          }
        }
      }
    }

    function $$ImmutableList$$nth_remove(node, index) {
      var left    = node.left;
      var right   = node.right;
      var l_index = left.size;

      if (index < l_index) {
        var child = $$ImmutableList$$nth_remove(left, index);
        return $$AVL$$balanced_node(node, child, right);

      } else {
        index -= l_index;

        var array = node.array;
        var len   = array.length;
        // TODO test this
        if (index < len) {
          // TODO use `array.length === 1` so we can skip the call to `array_remove`
          array = $$Array$$remove(array, index);

          if (array.length === 0) {
            return $$AVL$$concat(left, right);
          } else {
            return new $$ImmutableList$$ArrayNode(left, right, array);
          }

        } else {
          var child = $$ImmutableList$$nth_remove(right, index - len);
          return $$AVL$$balanced_node(node, left, child);
        }
      }
    }

    function $$ImmutableList$$nth_slice(slices, node, from, to) {
      if (node !== $$static$$nil) {
        var left = node.left;
        var size = left.size;

        if (from < size) {
          $$ImmutableList$$nth_slice(slices, left, from, to);
        }

        var array = node.array;
        var len   = array.length;

        from -= size;
        to   -= size;

        if (from < len && to > 0) {
          $$ImmutableList$$add_slice(slices, $$ImmutableList$$array_slice(array, from, to));
        }

        if (to > len) {
          $$ImmutableList$$nth_slice(slices, node.right, from - len, to - len);
        }
      }
    }

    function $$ImmutableList$$insert_array_max(node, new_array) {
      if (node === $$static$$nil) {
        return new $$ImmutableList$$ArrayNode($$static$$nil, $$static$$nil, new_array);
      } else {
        var left  = node.left;
        var right = node.right;
        var array = node.array;
        if (right === $$static$$nil && array.length + new_array.length <= $$ImmutableList$$array_limit) {
          return new $$ImmutableList$$ArrayNode(left, right, array.concat(new_array));
        } else {
          // TODO do we need to use balanced_node ?
          return $$AVL$$balanced_node(node, left, $$ImmutableList$$insert_array_max(right, new_array));
        }
      }
    }


    function $$ImmutableList$$ImmutableList(root, tail, tail_size) {
      this.root = root;
      this.tail = tail;
      this.tail_size = tail_size;
      this.hash = null;
    }

    $$ImmutableList$$ImmutableList.prototype = Object.create($$Base$$ImmutableBase);

    $$ImmutableList$$ImmutableList.prototype[$$static$$tag_hash] = $$hash$$hash_array("List");
    $$ImmutableList$$ImmutableList.prototype[$$static$$tag_toJS] = $$toJS$$toJS_array;
    $$ImmutableList$$ImmutableList.prototype.has = $$Ordered$$ordered_has;

    $$static$$fromJSON_registry["List"] = function (x) {
      return $$ImmutableList$$List($$toJSON$$fromJSON_array(x));
    };

    $$ImmutableList$$ImmutableList.prototype[$$static$$tag_toJSON] = function (x) {
      return $$toJSON$$toJSON_array("List", x);
    };

    $$ImmutableList$$ImmutableList.prototype[$$static$$tag_iter] = function () {
      var tree = $$iter$$mapcat_iter($$AVL$$iter_tree(this.root), function (node) {
        return $$iter$$toIterator(node.array);
      });
      return $$iter$$concat_iter(tree, $$iter$$reverse_iter($$Cons$$iter_cons(this.tail)));
    };

    $$ImmutableList$$ImmutableList.prototype.isEmpty = function () {
      return this.root === $$static$$nil && this.tail === $$static$$nil;
    };

    $$ImmutableList$$ImmutableList.prototype.removeAll = function () {
      return new $$ImmutableList$$ImmutableList($$static$$nil, $$static$$nil, 0);
    };

    $$ImmutableList$$ImmutableList.prototype.size = function () {
      return this.root.size + this.tail_size;
    };

    $$ImmutableList$$ImmutableList.prototype.get = function (index, def) {
      var len = this.size();

      if (index < 0) {
        index += len;
      }

      if ($$Ordered$$nth_has(index, len)) {
        var root = this.root;
        var size = root.size;
        if (index < size) {
          return $$ImmutableList$$nth_get(root, index);
        } else {
          return $$ImmutableList$$stack_nth(this.tail, this.tail_size, index - size);
        }

      } else if (arguments.length === 2) {
        return def;

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    $$ImmutableList$$ImmutableList.prototype.insert = function (index, value) {
      if (arguments.length !== 2) {
        throw new Error("Expected 2 arguments but got " + arguments.length);
      }

      var len = this.size();

      if (index < 0) {
        index += (len + 1);
      }

      if (index === len) {
        return this.push(value);

      } else {
        var root      = this.root;
        var tail      = this.tail;
        var tail_size = this.tail_size;

        if ($$Ordered$$nth_has(index, len)) {
          var size = root.size;
          if (index <= size) {
            return new $$ImmutableList$$ImmutableList($$ImmutableList$$nth_insert(root, index, value), tail, tail_size);

          } else {
            var array = $$Array$$insert($$ImmutableList$$stack_to_array(tail, tail_size), index - size, value);
            return new $$ImmutableList$$ImmutableList($$ImmutableList$$insert_array_max(root, array), $$static$$nil, 0);
          }

        } else {
          throw new Error("Index " + index + " is not valid");
        }
      }
    };

    $$ImmutableList$$ImmutableList.prototype.push = function (value) {
      var root      = this.root;
      var tail      = this.tail;
      var tail_size = this.tail_size;

      if (tail_size === $$ImmutableList$$array_limit) {
        var node = $$ImmutableList$$insert_array_max(root, $$ImmutableList$$stack_to_array(tail, tail_size));
        return new $$ImmutableList$$ImmutableList(node, new $$Cons$$Cons(value, $$static$$nil), 1);
      } else {
        return new $$ImmutableList$$ImmutableList(root, new $$Cons$$Cons(value, tail), tail_size + 1);
      }
    };

    $$ImmutableList$$ImmutableList.prototype.remove = function (index) {
      if (arguments.length !== 1) {
        throw new Error("Expected 1 argument but got " + arguments.length);
      }

      var len = this.size();

      if (index < 0) {
        index += len;
      }

      var root      = this.root;
      var tail      = this.tail;
      var tail_size = this.tail_size;

      if (tail !== $$static$$nil && index === len - 1) {
        return new $$ImmutableList$$ImmutableList(root, tail.cdr, tail_size - 1);

      } else if ($$Ordered$$nth_has(index, len)) {
        var size = root.size;
        if (index < size) {
          return new $$ImmutableList$$ImmutableList($$ImmutableList$$nth_remove(root, index), tail, tail_size);

        } else {
          var array = $$Array$$remove($$ImmutableList$$stack_to_array(tail, tail_size), index - size);
          return new $$ImmutableList$$ImmutableList($$ImmutableList$$insert_array_max(root, array), $$static$$nil, 0);
        }

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    $$ImmutableList$$ImmutableList.prototype.modify = function (index, f) {
      var len = this.size();

      if (index < 0) {
        index += len;
      }

      if ($$Ordered$$nth_has(index, len)) {
        var root = this.root;
        var tail = this.tail;
        var tail_size = this.tail_size;
        var size = root.size;

        if (tail !== $$static$$nil && index === len - 1) {
          var value = f(tail.car);
          if (value === tail.car) {
            return this;
          } else {
            return new $$ImmutableList$$ImmutableList(root, new $$Cons$$Cons(value, tail.cdr), tail_size);
          }

        } else if (index < size) {
          var node = $$ImmutableList$$nth_modify(root, index, f);
          if (node === root) {
            return this;
          } else {
            return new $$ImmutableList$$ImmutableList(node, tail, tail_size);
          }

        } else {
          var stack = $$ImmutableList$$stack_to_array(tail, tail_size);
          var array = $$Array$$modify(stack, index - size, f);
          if (array === stack) {
            return this;
          } else {
            return new $$ImmutableList$$ImmutableList($$ImmutableList$$insert_array_max(root, array), $$static$$nil, 0);
          }
        }

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    // TODO a bit of code duplication
    $$ImmutableList$$ImmutableList.prototype.set = function (index, value) {
      return this.modify(index, function () {
        return value;
      });
    };

    $$ImmutableList$$ImmutableList.prototype.slice = function (from, to) {
      var len = this.size();

      if (arguments.length < 1) {
        from = 0;
      }
      if (arguments.length < 2) {
        to = len;
      }

      if (typeof from !== "number") {
        throw new Error("Expected a number but got " + from);
      }
      if (typeof to !== "number") {
        throw new Error("Expected a number but got " + to);
      }

      if (from < 0) {
        from += len;
      }
      if (to < 0) {
        to += len;
      }

      if (from === 0 && to === len) {
        return this;

      } else if (from > to) {
        throw new Error("Index " + from + " is greater than index " + to);

      } else if ($$Ordered$$nth_has(from, len)) {
        if (from === to) {
          return new $$ImmutableList$$ImmutableList($$static$$nil, $$static$$nil, 0);

        // TODO code duplication with nth_has ?
        } else if (to > 0 && to <= len) {
          var root = this.root;
          var size = root.size;

          var slices = [];

          if (from <= size) {
            $$ImmutableList$$nth_slice(slices, root, from, to);
          }

          if (to > size) {
            var stack = $$ImmutableList$$stack_to_array(this.tail, this.tail_size);
            $$ImmutableList$$add_slice(slices, $$ImmutableList$$array_slice(stack, from - size, to - size));
          }

          return new $$ImmutableList$$ImmutableList($$ImmutableList$$slices_to_tree(slices), $$static$$nil, 0);

        } else {
          throw new Error("Index " + to + " is not valid");
        }

      } else {
        throw new Error("Index " + from + " is not valid");
      }
    };

    $$ImmutableList$$ImmutableList.prototype.concat = function (right) {
      if (right instanceof $$ImmutableList$$ImmutableList) {
        var lroot = this.root;
        var ltail = this.tail;

        var rroot = right.root;
        var rtail = right.tail;

        if (rroot === $$static$$nil && rtail === $$static$$nil) {
          return this;

        } else if (lroot === $$static$$nil && ltail === $$static$$nil) {
          return right;

        } else {
          if (ltail !== $$static$$nil) {
            lroot = $$ImmutableList$$insert_array_max(lroot, $$ImmutableList$$stack_to_array(ltail, this.tail_size));
          }

          var node = $$AVL$$concat(lroot, rroot);
          return new $$ImmutableList$$ImmutableList(node, rtail, right.tail_size);
        }

      } else {
        return $$iter$$foldl(right, this, function (self, x) {
          return self.push(x);
        });
      }
    };


    function $$ImmutableList$$isList(x) {
      return x instanceof $$ImmutableList$$ImmutableList;
    }

    function $$ImmutableList$$List(array) {
      if (array != null) {
        if (array instanceof $$ImmutableList$$ImmutableList) {
          return array;
        } else {
          return new $$ImmutableList$$ImmutableList($$static$$nil, $$static$$nil, 0).concat(array);
        }
      } else {
        return new $$ImmutableList$$ImmutableList($$static$$nil, $$static$$nil, 0);
      }
    }
    function $$Sorted$$simpleSort(x, y) {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return -1;
      } else {
        return 1;
      }
    }

    function $$Sorted$$key_get(node, sort, hash) {
      while (node !== $$static$$nil) {
        var order = sort(hash, node.hash);
        if (order === 0) {
          break;

        } else if (order < 0) {
          node = node.left;

        } else {
          node = node.right;
        }
      }

      return node;
    }

    function $$Sorted$$key_set(node, sort, hash, new_node) {
      if (node === $$static$$nil) {
        return new_node;

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(hash, node.hash);
        if (order === 0) {
          return node.modify(new_node);

        } else if (order < 0) {
          var child = $$Sorted$$key_set(left, sort, hash, new_node);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Sorted$$key_set(right, sort, hash, new_node);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Sorted$$key_modify(node, sort, hash, key, f) {
      if (node === $$static$$nil) {
        throw new Error("Key " + key + " not found");

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(hash, node.hash);
        if (order === 0) {
          // TODO what if `f` suspends?
          return node.modify({ key: key, hash: hash, value: f(node.value) });

        } else if (order < 0) {
          var child = $$Sorted$$key_modify(left, sort, hash, key, f);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Sorted$$key_modify(right, sort, hash, key, f);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Sorted$$key_remove(node, sort, hash) {
      if (node === $$static$$nil) {
        return node;

      } else {
        var left  = node.left;
        var right = node.right;

        var order = sort(hash, node.hash);
        if (order === 0) {
          return $$AVL$$concat(left, right);

        } else if (order < 0) {
          var child = $$Sorted$$key_remove(left, sort, hash);
          if (child === left) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, child, right);
          }

        } else {
          var child = $$Sorted$$key_remove(right, sort, hash);
          if (child === right) {
            return node;
          } else {
            return $$AVL$$balanced_node(node, left, child);
          }
        }
      }
    }

    function $$Sorted$$sorted_isEmpty() {
      return this.root === $$static$$nil;
    }

    function $$Sorted$$sorted_has(key) {
      return $$Sorted$$key_get(this.root, this.sort, this.hash_fn(key)) !== $$static$$nil;
    }

    function $$Sorted$$sorted_remove(f) {
      return function (key) {
        var root = this.root;
        var sort = this.sort;
        var hash_fn = this.hash_fn;
        var node = $$Sorted$$key_remove(root, sort, hash_fn(key));
        if (node === root) {
          return this;
        } else {
          // TODO is this slower than using the constructor directly ?
          return new f(node, sort, hash_fn);
        }
      };
    }

    function $$Sorted$$sorted_merge(other) {
      return $$iter$$foldl($$iter$$iter_object(other), this, function (self, _array) {
        return $$util$$destructure_pair(_array, function (key, value) {
          return self.set(key, value);
        });
      });
    }

    function $$Sorted$$stack_size() {
      return this.len;
    }

    function $$Sorted$$stack_concat(right) {
      return $$iter$$foldl(right, this, function (self, x) {
        return self.push(x);
      });
    }


    function $$ImmutableDict$$KeyNode(left, right, hash, key, value) {
      this.left  = left;
      this.right = right;
      this.hash  = hash;
      this.key   = key;
      this.value = value;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$ImmutableDict$$KeyNode.prototype.copy = function (left, right) {
      return new $$ImmutableDict$$KeyNode(left, right, this.hash, this.key, this.value);
    };

    $$ImmutableDict$$KeyNode.prototype.modify = function (info) {
      var hash  = info.hash;
      var key   = info.key;
      var value = info.value;
      // We don't use equal, for increased speed
      if (this.hash === hash && this.key === key && this.value === value) {
        return this;
      } else {
        return new $$ImmutableDict$$KeyNode(this.left, this.right, hash, key, value);
      }
    };


    function $$ImmutableDict$$ImmutableDict(root, sort, hash_fn) {
      this.root = root;
      this.sort = sort;
      this.hash_fn = hash_fn;
      this.hash = null;
    }

    $$ImmutableDict$$ImmutableDict.prototype = Object.create($$Base$$ImmutableBase);

    $$ImmutableDict$$ImmutableDict.prototype[$$static$$tag_toJS] = $$toJS$$toJS_object;
    $$ImmutableDict$$ImmutableDict.prototype.isEmpty = $$Sorted$$sorted_isEmpty;
    $$ImmutableDict$$ImmutableDict.prototype.has = $$Sorted$$sorted_has;
    $$ImmutableDict$$ImmutableDict.prototype.remove = $$Sorted$$sorted_remove($$ImmutableDict$$ImmutableDict);
    $$ImmutableDict$$ImmutableDict.prototype.merge = $$Sorted$$sorted_merge;

    $$ImmutableDict$$ImmutableDict.prototype[$$static$$tag_iter] = function () {
      return $$iter$$map_iter($$AVL$$iter_tree(this.root), function (node) {
        return $$ImmutableTuple$$unsafe_Tuple([node.key, node.value]);
      });
    };

    $$ImmutableDict$$ImmutableDict.prototype[$$static$$tag_hash] = function (x) {
      if (x.hash === null) {
        // We don't use equal, for increased speed
        if ($$ImmutableDict$$isDict(x) && !$$ImmutableDict$$isSortedDict(x)) {
          x.hash = "(Dict" + $$hash$$hash_dict(x, "  ") + ")";
        } else {
          x.hash = "(SortedDict " + $$hash$$hash(x.sort) + $$hash$$hash_dict(x, "  ") + ")";
        }
      }

      return x.hash;
    };

    $$static$$fromJSON_registry["Dict"] = function (x) {
      return $$ImmutableDict$$Dict($$toJSON$$fromJSON_object(x));
    };

    $$ImmutableDict$$ImmutableDict.prototype[$$static$$tag_toJSON] = function (x) {
      if ($$ImmutableDict$$isDict(x) && !$$ImmutableDict$$isSortedDict(x)) {
        return $$toJSON$$toJSON_object("Dict", x);
      } else {
        throw new Error("Cannot convert SortedDict to JSON");
      }
    };

    $$ImmutableDict$$ImmutableDict.prototype.removeAll = function () {
      return new $$ImmutableDict$$ImmutableDict($$static$$nil, this.sort, this.hash_fn);
    };

    $$ImmutableDict$$ImmutableDict.prototype.get = function (key, def) {
      var node = $$Sorted$$key_get(this.root, this.sort, this.hash_fn(key));
      if (node === $$static$$nil) {
        if (arguments.length === 2) {
          return def;
        } else {
          throw new Error("Key " + key + " not found");
        }
      } else {
        return node.value;
      }
    };

    // TODO code duplication
    // TODO what if `sort` suspends ?
    $$ImmutableDict$$ImmutableDict.prototype.set = function (key, value) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var hash = hash_fn(key);
      var node = $$Sorted$$key_set(root, sort, hash, new $$ImmutableDict$$KeyNode($$static$$nil, $$static$$nil, hash, key, value));
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableDict$$ImmutableDict(node, sort, hash_fn);
      }
    };

    $$ImmutableDict$$ImmutableDict.prototype.modify = function (key, f) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var node = $$Sorted$$key_modify(root, sort, hash_fn(key), key, f);
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableDict$$ImmutableDict(node, sort, hash_fn);
      }
    };


    function $$ImmutableDict$$isDict(x) {
      return x instanceof $$ImmutableDict$$ImmutableDict;
    }

    function $$ImmutableDict$$isSortedDict(x) {
      return $$ImmutableDict$$isDict(x) && x.hash_fn === $$util$$identity;
    }

    function $$ImmutableDict$$SortedDict(sort, obj) {
      if (obj != null) {
        // We don't use equal, for increased speed
        if ($$ImmutableDict$$isSortedDict(obj) && obj.sort === sort) {
          return obj;
        } else {
          return new $$ImmutableDict$$ImmutableDict($$static$$nil, sort, $$util$$identity).merge(obj);
        }
      } else {
        return new $$ImmutableDict$$ImmutableDict($$static$$nil, sort, $$util$$identity);
      }
    }

    function $$ImmutableDict$$Dict(obj) {
      if (obj != null) {
        if ($$ImmutableDict$$isDict(obj) && !$$ImmutableDict$$isSortedDict(obj)) {
          return obj;
        } else {
          return new $$ImmutableDict$$ImmutableDict($$static$$nil, $$Sorted$$simpleSort, $$hash$$hash).merge(obj);
        }
      } else {
        return new $$ImmutableDict$$ImmutableDict($$static$$nil, $$Sorted$$simpleSort, $$hash$$hash);
      }
    }
    function $$toJS$$fromJS(x) {
      if (Array.isArray(x)) {
        var out = $$ImmutableList$$List();

        for (var i = 0, l = x.length; i < l; ++i) {
          out = out.push($$toJS$$fromJS(x[i]));
        }

        return out;

      } else if ($$util$$isJSLiteral(x)) {
        var out = $$ImmutableDict$$Dict();

        // TODO is using Object.keys correct ?
        Object.keys(x).forEach(function (key) {
                        // TODO unit test for this
          out = out.set($$toJS$$fromJS(key), $$toJS$$fromJS(x[key]));
        });

        return out;

      } else {
        return x;
      }
    }

    function $$toJS$$toJS(x) {
      if ($$util$$isObject(x)) {
        var fn = x[$$static$$tag_toJS];
        if (fn != null) {
          return fn(x);

        } else if (Array.isArray(x)) {
          return x.map($$toJS$$toJS);

        } else if ($$util$$isJSLiteral(x)) {
          var out = {};

          // TODO is using Object.keys correct ?
          Object.keys(x).forEach(function (key) {
                // TODO unit test for this
            out[$$toJS$$toJS(key)] = $$toJS$$toJS(x[key]);
          });

          return out;

        } else {
          return x;
        }
      } else {
        return x;
      }
    }

    function $$toJS$$toJS_object(x) {
      var o = {};

      $$iter$$each(x, function (_array) {
        $$util$$destructure_pair(_array, function (key, value) {
          // Tags are currently implemented as strings
          // TODO use isString test ?
          if (typeof key !== "string") {
            throw new Error("Cannot convert to JavaScript: expected key to be string or Tag but got " + key);
          }

          o[key] = $$toJS$$toJS(value);
        });
      });

      return o;
    }

    function $$toJS$$toJS_array(x) {
      var a = [];

      $$iter$$each(x, function (value) {
        a.push($$toJS$$toJS(value));
      });

      return a;
    }
    function $$ImmutableTuple$$ImmutableTuple(values) {
      this.values = values;
      this.hash   = null;
    }

    $$ImmutableTuple$$ImmutableTuple.prototype = Object.create($$Base$$ImmutableBase);

    $$ImmutableTuple$$ImmutableTuple.prototype[$$static$$tag_hash] = $$hash$$hash_array("Tuple");
    $$ImmutableTuple$$ImmutableTuple.prototype[$$static$$tag_toJS] = $$toJS$$toJS_array;

    $$static$$fromJSON_registry["Tuple"] = function (x) {
      return $$ImmutableTuple$$Tuple($$toJSON$$fromJSON_array(x));
    };

    $$ImmutableTuple$$ImmutableTuple.prototype[$$static$$tag_toJSON] = function (x) {
      return $$toJSON$$toJSON_array("Tuple", x);
    };

    $$ImmutableTuple$$ImmutableTuple.prototype[$$static$$tag_iter] = function () {
      return $$iter$$toIterator(this.values);
    };

    $$ImmutableTuple$$ImmutableTuple.prototype.size = function () {
      return this.values.length;
    };

    $$ImmutableTuple$$ImmutableTuple.prototype.get = function (index) {
      var len = this.size();

      if ($$Ordered$$nth_has(index, len)) {
        return this.values[index];
      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    $$ImmutableTuple$$ImmutableTuple.prototype.modify = function (index, f) {
      var len = this.size();

      if ($$Ordered$$nth_has(index, len)) {
        var values = this.values;
        var array  = $$Array$$modify(values, index, f);
        if (array === values) {
          return this;
        } else {
          return new $$ImmutableTuple$$ImmutableTuple(array);
        }

      } else {
        throw new Error("Index " + index + " is not valid");
      }
    };

    // TODO a bit of code duplication
    $$ImmutableTuple$$ImmutableTuple.prototype.set = function (index, value) {
      return this.modify(index, function () {
        return value;
      });
    };

    function $$ImmutableTuple$$isTuple(x) {
      return x instanceof $$ImmutableTuple$$ImmutableTuple;
    }

    function $$ImmutableTuple$$unsafe_Tuple(array) {
      return new $$ImmutableTuple$$ImmutableTuple(array);
    }

    function $$ImmutableTuple$$Tuple(array) {
      if (array != null) {
        if ($$ImmutableTuple$$isTuple(array)) {
          return array;

        } else {
          var values = [];

          // We can't use toArray, because `array` might be mutated
          $$iter$$each(array, function (x) {
            values.push(x);
          });

          return new $$ImmutableTuple$$ImmutableTuple(values);
        }
      } else {
        return new $$ImmutableTuple$$ImmutableTuple([]);
      }
    }
    function $$util$$isNaN(x) {
      return x !== x;
    }

    function $$util$$isFinite(x) {
      return typeof x === "number" &&
             x !== Infinity &&
             x !== -Infinity &&
             !$$util$$isNaN(x);
    }

    function $$util$$isObject(x) {
      return Object(x) === x;
    }

    function $$util$$isJSLiteral(x) {
      // TODO this won't work cross-realm
      return $$util$$isObject(x) && Object.getPrototypeOf(x) === Object.prototype;
    }

    function $$util$$repeat(s, i) {
      return new Array(i + 1).join(s);
    }

    function $$util$$pad_right(input, i, s) {
      var right = Math.max(0, i - input.length);
      return input + $$util$$repeat(s, right);
    }

    function $$util$$identity(x) {
      return x;
    }

    function $$util$$plural(i, s) {
      if (i === 1) {
        return s;
      } else {
        return s + "s";
      }
    }

    function $$util$$destructure_pair(x, f) {
      if (Array.isArray(x)) {
        if (x.length === 2) {
          return f(x[0], x[1]);
        } else {
          throw new Error("Expected array with 2 elements but got " + x.length + " " + $$util$$plural(x.length, "element"));
        }

      } else if ($$ImmutableTuple$$isTuple(x)) {
        if (x.size() === 2) {
          return f(x.get(0), x.get(1));
        } else {
          // TODO code duplication
          throw new Error("Expected Tuple with 2 elements but got " + x.size() + " " + $$util$$plural(x.size(), "element"));
        }

      } else {
        throw new Error("Expected array or Tuple but got: " + x);
      }
    }


    function $$ImmutableSet$$SetNode(left, right, hash, key) {
      this.left  = left;
      this.right = right;
      this.hash  = hash;
      this.key   = key;
      this.depth = $$AVL$$max(left.depth, right.depth) + 1;
    }

    $$ImmutableSet$$SetNode.prototype.copy = function (left, right) {
      return new $$ImmutableSet$$SetNode(left, right, this.hash, this.key);
    };

    $$ImmutableSet$$SetNode.prototype.modify = function (info) {
      var hash = info.hash;
      var key  = info.key;
      // We don't use equal, for increased speed
      if (this.hash === hash && this.key === key) {
        return this;
      } else {
        return new $$ImmutableSet$$SetNode(this.left, this.right, hash, key);
      }
    };


    function $$ImmutableSet$$ImmutableSet(root, sort, hash_fn) {
      this.root = root;
      this.sort = sort;
      this.hash_fn = hash_fn;
      this.hash = null;
    }

    $$ImmutableSet$$ImmutableSet.prototype = Object.create($$Base$$ImmutableBase);

    $$ImmutableSet$$ImmutableSet.prototype[$$static$$tag_toJS] = $$toJS$$toJS_array;
    $$ImmutableSet$$ImmutableSet.prototype.isEmpty = $$Sorted$$sorted_isEmpty;
    $$ImmutableSet$$ImmutableSet.prototype.has = $$Sorted$$sorted_has;
    $$ImmutableSet$$ImmutableSet.prototype.remove = $$Sorted$$sorted_remove($$ImmutableSet$$ImmutableSet);

    $$static$$fromJSON_registry["Set"] = function (x) {
      return $$ImmutableSet$$Set($$toJSON$$fromJSON_array(x));
    };

    $$ImmutableSet$$ImmutableSet.prototype[$$static$$tag_iter] = function () {
      return $$iter$$map_iter($$AVL$$iter_tree(this.root), function (node) {
        return node.key;
      });
    };

    $$ImmutableSet$$ImmutableSet.prototype[$$static$$tag_toJSON] = function (x) {
      if ($$ImmutableSet$$isSet(x) && !$$ImmutableSet$$isSortedSet(x)) {
        return $$toJSON$$toJSON_array("Set", x);
      } else {
        throw new Error("Cannot convert SortedSet to JSON");
      }
    };

    $$ImmutableSet$$ImmutableSet.prototype[$$static$$tag_hash] = function (x) {
      if (x.hash === null) {
        var a = $$iter$$map(x, function (value) {
          return $$hash$$hash(value);
        });

        var spaces = "  ";

        if ($$ImmutableSet$$isSet(x) && !$$ImmutableSet$$isSortedSet(x)) {
          x.hash = "(Set" + $$hash$$join_lines(a, spaces) + ")";
        } else {
          x.hash = "(SortedSet " + $$hash$$hash(x.sort) + $$hash$$join_lines(a, spaces) + ")";
        }
      }

      return x.hash;
    };

    $$ImmutableSet$$ImmutableSet.prototype.removeAll = function () {
      return new $$ImmutableSet$$ImmutableSet($$static$$nil, this.sort, this.hash_fn);
    };

    $$ImmutableSet$$ImmutableSet.prototype.add = function (key) {
      var root = this.root;
      var sort = this.sort;
      var hash_fn = this.hash_fn;
      var hash = hash_fn(key);
      var node = $$Sorted$$key_set(root, sort, hash, new $$ImmutableSet$$SetNode($$static$$nil, $$static$$nil, hash, key));
      if (node === root) {
        return this;
      } else {
        return new $$ImmutableSet$$ImmutableSet(node, sort, hash_fn);
      }
    };

    $$ImmutableSet$$ImmutableSet.prototype.union = function (other) {
      return $$iter$$foldl(other, this, function (self, value) {
        return self.add(value);
      });
    };

    $$ImmutableSet$$ImmutableSet.prototype.intersect = function (other) {
      var self = this;

      if (self.isEmpty()) {
        return self;

      } else {
        var out = self.removeAll();

        return $$iter$$foldl(other, out, function (out, value) {
          if (self.has(value)) {
            return out.add(value);
          } else {
            return out;
          }
        });
      }
    };

    $$ImmutableSet$$ImmutableSet.prototype.disjoint = function (other) {
      var self = this;

      return $$iter$$foldl(other, self, function (out, value) {
        if (self.has(value)) {
          return out.remove(value);
        } else {
          return out.add(value);
        }
      });
    };

    $$ImmutableSet$$ImmutableSet.prototype.subtract = function (other) {
      if (this.isEmpty()) {
        return this;

      } else {
        return $$iter$$foldl(other, this, function (self, value) {
          return self.remove(value);
        });
      }
    };


    function $$ImmutableSet$$isSet(x) {
      return x instanceof $$ImmutableSet$$ImmutableSet;
    }

    function $$ImmutableSet$$isSortedSet(x) {
      return $$ImmutableSet$$isSet(x) && x.hash_fn === $$util$$identity;
    }

    function $$ImmutableSet$$SortedSet(sort, array) {
      if (array != null) {
        // We don't use equal, for increased speed
        if ($$ImmutableSet$$isSortedSet(array) && array.sort === sort) {
          return array;
        } else {
          return new $$ImmutableSet$$ImmutableSet($$static$$nil, sort, $$util$$identity).union(array);
        }
      } else {
        return new $$ImmutableSet$$ImmutableSet($$static$$nil, sort, $$util$$identity);
      }
    }

    function $$ImmutableSet$$Set(array) {
      if (array != null) {
        if ($$ImmutableSet$$isSet(array) && !$$ImmutableSet$$isSortedSet(array)) {
          return array;
        } else {
          return new $$ImmutableSet$$ImmutableSet($$static$$nil, $$Sorted$$simpleSort, $$hash$$hash).union(array);
        }
      } else {
        return new $$ImmutableSet$$ImmutableSet($$static$$nil, $$Sorted$$simpleSort, $$hash$$hash);
      }
    }
    function $$ImmutableQueue$$ImmutableQueue(left, right, len) {
      this.left  = left;
      this.right = right;
      this.len   = len;
      this.hash  = null;
    }

    $$ImmutableQueue$$ImmutableQueue.prototype = Object.create($$Base$$ImmutableBase);

    $$ImmutableQueue$$ImmutableQueue.prototype[$$static$$tag_toJS] = $$toJS$$toJS_array;
    $$ImmutableQueue$$ImmutableQueue.prototype[$$static$$tag_hash] = $$hash$$hash_array("Queue");
    $$ImmutableQueue$$ImmutableQueue.prototype.size = $$Sorted$$stack_size;
    $$ImmutableQueue$$ImmutableQueue.prototype.concat = $$Sorted$$stack_concat;

    $$static$$fromJSON_registry["Queue"] = function (x) {
      return $$ImmutableQueue$$Queue($$toJSON$$fromJSON_array(x));
    };

    $$ImmutableQueue$$ImmutableQueue.prototype[$$static$$tag_toJSON] = function (x) {
      return $$toJSON$$toJSON_array("Queue", x);
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.isEmpty = function () {
      return this.left === $$static$$nil && this.right === $$static$$nil;
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.removeAll = function () {
      return new $$ImmutableQueue$$ImmutableQueue($$static$$nil, $$static$$nil, 0);
    };

    $$ImmutableQueue$$ImmutableQueue.prototype[$$static$$tag_iter] = function () {
      return $$iter$$concat_iter($$Cons$$iter_cons(this.left), $$iter$$reverse_iter($$Cons$$iter_cons(this.right)));
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.peek = function (def) {
      if (this.isEmpty()) {
        if (arguments.length === 1) {
          return def;
        } else {
          throw new Error("Cannot peek from an empty queue");
        }
      } else {
        return this.left.car;
      }
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.push = function (value) {
      if (this.isEmpty()) {
        return new $$ImmutableQueue$$ImmutableQueue(new $$Cons$$Cons(value, this.left), this.right, this.len + 1);
      } else {
        return new $$ImmutableQueue$$ImmutableQueue(this.left, new $$Cons$$Cons(value, this.right), this.len + 1);
      }
    };

    $$ImmutableQueue$$ImmutableQueue.prototype.pop = function () {
      if (this.isEmpty()) {
        throw new Error("Cannot pop from an empty queue");
      } else {
        var left = this.left.cdr;
        if (left === $$static$$nil) {
          var right = $$static$$nil;

          // TODO a little gross
          // TODO replace with foldl ?
          $$Cons$$each_cons(this.right, function (x) {
            right = new $$Cons$$Cons(x, right);
          });

          return new $$ImmutableQueue$$ImmutableQueue(right, $$static$$nil, this.len - 1);
        } else {
          return new $$ImmutableQueue$$ImmutableQueue(left, this.right, this.len - 1);
        }
      }
    };


    function $$ImmutableQueue$$isQueue(x) {
      return x instanceof $$ImmutableQueue$$ImmutableQueue;
    }

    function $$ImmutableQueue$$Queue(x) {
      if (x != null) {
        if (x instanceof $$ImmutableQueue$$ImmutableQueue) {
          return x;
        } else {
          return new $$ImmutableQueue$$ImmutableQueue($$static$$nil, $$static$$nil, 0).concat(x);
        }
      } else {
        return new $$ImmutableQueue$$ImmutableQueue($$static$$nil, $$static$$nil, 0);
      }
    }
    function $$ImmutableStack$$ImmutableStack(root, len) {
      this.root = root;
      this.len  = len;
      this.hash = null;
    }

    $$ImmutableStack$$ImmutableStack.prototype = Object.create($$Base$$ImmutableBase);

    $$ImmutableStack$$ImmutableStack.prototype[$$static$$tag_toJS] = $$toJS$$toJS_array;
    $$ImmutableStack$$ImmutableStack.prototype[$$static$$tag_hash] = $$hash$$hash_array("Stack");
    $$ImmutableStack$$ImmutableStack.prototype.isEmpty = $$Sorted$$sorted_isEmpty;
    $$ImmutableStack$$ImmutableStack.prototype.size = $$Sorted$$stack_size;
    $$ImmutableStack$$ImmutableStack.prototype.concat = $$Sorted$$stack_concat;

    $$static$$fromJSON_registry["Stack"] = function (x) {
      return $$ImmutableStack$$Stack($$toJSON$$fromJSON_array(x));
    };

    $$ImmutableStack$$ImmutableStack.prototype[$$static$$tag_iter] = function () {
      return $$iter$$reverse_iter($$Cons$$iter_cons(this.root));
    };

    $$ImmutableStack$$ImmutableStack.prototype[$$static$$tag_toJSON] = function (x) {
      return $$toJSON$$toJSON_array("Stack", x);
    };

    $$ImmutableStack$$ImmutableStack.prototype.removeAll = function () {
      return new $$ImmutableStack$$ImmutableStack($$static$$nil, 0);
    };

    $$ImmutableStack$$ImmutableStack.prototype.peek = function (def) {
      if (this.isEmpty()) {
        if (arguments.length === 1) {
          return def;
        } else {
          throw new Error("Cannot peek from an empty stack");
        }
      } else {
        return this.root.car;
      }
    };

    $$ImmutableStack$$ImmutableStack.prototype.push = function (value) {
      return new $$ImmutableStack$$ImmutableStack(new $$Cons$$Cons(value, this.root), this.len + 1);
    };

    $$ImmutableStack$$ImmutableStack.prototype.pop = function () {
      if (this.isEmpty()) {
        throw new Error("Cannot pop from an empty stack");
      } else {
        return new $$ImmutableStack$$ImmutableStack(this.root.cdr, this.len - 1);
      }
    };


    function $$ImmutableStack$$isStack(x) {
      return x instanceof $$ImmutableStack$$ImmutableStack;
    }

    function $$ImmutableStack$$Stack(x) {
      if (x != null) {
        if (x instanceof $$ImmutableStack$$ImmutableStack) {
          return x;
        } else {
          return new $$ImmutableStack$$ImmutableStack($$static$$nil, 0).concat(x);
        }
      } else {
        return new $$ImmutableStack$$ImmutableStack($$static$$nil, 0);
      }
    }

    function $$ImmutableRecord$$checkKey(key) {
      // Tags are currently implemented as strings
      if (typeof key !== "string") {
        throw new Error("Expected key to be a string or Tag but got " + key);
      }
    }

    function $$ImmutableRecord$$ImmutableRecord(keys, values) {
      this.keys   = keys;
      this.values = values;
      this.hash   = null;
    }

    $$ImmutableRecord$$ImmutableRecord.prototype = Object.create($$Base$$ImmutableBase);

    $$ImmutableRecord$$ImmutableRecord.prototype.update = $$Sorted$$sorted_merge;
    $$ImmutableRecord$$ImmutableRecord.prototype[$$static$$tag_toJS] = $$toJS$$toJS_object;

    $$static$$fromJSON_registry["Record"] = function (x) {
      return $$ImmutableRecord$$Record($$toJSON$$fromJSON_object(x));
    };

    $$ImmutableRecord$$ImmutableRecord.prototype[$$static$$tag_toJSON] = function (x) {
      return $$toJSON$$toJSON_object("Record", x);
    };

    $$ImmutableRecord$$ImmutableRecord.prototype[$$static$$tag_hash] = function (x) {
      if (x.hash === null) {
        x.hash = "(Record" + $$hash$$hash_dict(x, "  ") + ")";
      }

      return x.hash;
    };

    $$ImmutableRecord$$ImmutableRecord.prototype[$$static$$tag_iter] = function () {
      var keys   = this.keys;
      var values = this.values;

      // TODO a little gross
      return $$iter$$toIterator($$iter$$map($$iter$$iter_object(keys), function (_array) {
        // TODO should this use destructure_pair ?
        return $$util$$destructure_pair(_array, function (s, index) {
          return $$ImmutableTuple$$unsafe_Tuple([s, values[index]]);
        });
      }));
    };

    $$ImmutableRecord$$ImmutableRecord.prototype.get = function (key) {
      $$ImmutableRecord$$checkKey(key);

      var index = this.keys[key];
      if (index == null) {
        throw new Error("Key " + key + " not found");

      } else {
        return this.values[index];
      }
    };

    $$ImmutableRecord$$ImmutableRecord.prototype.set = function (key, value) {
      return this.modify(key, function () {
        return value;
      });
    };

    $$ImmutableRecord$$ImmutableRecord.prototype.modify = function (key, f) {
      $$ImmutableRecord$$checkKey(key);

      var keys  = this.keys;
      var index = keys[key];
      if (index == null) {
        throw new Error("Key " + key + " not found");

      } else {
        var values = this.values;
        var array  = $$Array$$modify(values, index, f);
        if (array === values) {
          return this;
        } else {
          return new $$ImmutableRecord$$ImmutableRecord(keys, array);
        }
      }
    };


    function $$ImmutableRecord$$isRecord(x) {
      return x instanceof $$ImmutableRecord$$ImmutableRecord;
    }

    function $$ImmutableRecord$$Record(obj) {
      var keys   = {};
      var values = [];

      if (obj != null) {
        if ($$ImmutableRecord$$isRecord(obj)) {
          return obj;

        } else {
          var mapped = $$iter$$map($$iter$$iter_object(obj), function (_array) {
            return $$util$$destructure_pair(_array, function (key, value) {
              $$ImmutableRecord$$checkKey(key);
              return [key, value];
            });
          });

          // TODO "sort" function in "iter.js" ?
          // TODO can this be made any faster/more efficient ?
          var sorted = $$iter$$toArray(mapped).sort(function (x, y) {
            return $$Sorted$$simpleSort(x[0], y[0]);
          });

          $$iter$$each(sorted, function (_array) {
            var key   = _array[0];
            var value = _array[1];

            var index = keys[key];
            if (index == null) {
              keys[key] = values.push(value) - 1;
            } else {
              values[index] = value;
            }
          });
        }
      }

      return new $$ImmutableRecord$$ImmutableRecord(keys, values);
    }

    var $$MutableRef$$ref_id = 0;

    function $$MutableRef$$MutableRef(value, onchange) {
      this._id = ++$$MutableRef$$ref_id;
      this._value = value;
      this._onchange = onchange;
    }

    $$MutableRef$$MutableRef.prototype = Object.create($$Base$$MutableBase);

    $$MutableRef$$MutableRef.prototype[$$static$$tag_hash] = function (x) {
      return "(Ref " + $$hash$$hash(x._id) + ")";
    };

    $$MutableRef$$MutableRef.prototype.get = function () {
      return this._value;
    };

    $$MutableRef$$MutableRef.prototype.set = function (value) {
      var old = this._value;
      if (value !== old) {
        this._value = value;
        if (this._onchange != null) {
          this._onchange(old, value);
        }
      }
    };

    $$MutableRef$$MutableRef.prototype.modify = function (f) {
      this.set(f(this.get()));
    };


    function $$MutableRef$$deref(x) {
      if ($$MutableRef$$isRef(x)) {
        return x.get();
      } else {
        return x;
      }
    }

    function $$MutableRef$$isRef(x) {
      return x instanceof $$MutableRef$$MutableRef;
    }

    function $$MutableRef$$Ref(value, onchange) {
      if (arguments.length < 1 || arguments.length > 2) {
        throw new Error("Expected 1 to 2 arguments but got " + arguments.length);
      }

      return new $$MutableRef$$MutableRef(value, onchange);
    }
    function src$Immutable$Immutable$$isImmutable(x) {
      if ($$util$$isObject(x)) {
        return Object.isFrozen(x) ||
               $$ImmutableDict$$isDict(x)  ||
               $$ImmutableSet$$isSet(x)   ||
               $$ImmutableList$$isList(x)  ||
               $$ImmutableTuple$$isTuple(x) ||
               $$ImmutableQueue$$isQueue(x) ||
               $$ImmutableStack$$isStack(x) ||
               $$ImmutableRecord$$isRecord(x);
      // TODO just return true? are there any mutable value types?
      } else {
        var type = typeof x;
        // Tags are currently implemented with strings
        return type === "string"  ||
               type === "number"  ||
               type === "boolean" ||
               type === "symbol"  ||
               x == null;
      }
    }


    (function (root, fn) {
      if (typeof define === 'function' && define.amd) {
        define(["exports"], fn);
      } else if (typeof exports === 'object') {
        fn(exports);
      } else {
        root.Immutable = {};
        fn(root.Immutable);
      }
    })(this, function (exports) {
      exports.equal = $$equal$$equal;
      exports.fromJS = $$toJS$$fromJS;
      exports.toJS = $$toJS$$toJS;
      exports.isDict = $$ImmutableDict$$isDict;
      exports.isSet = $$ImmutableSet$$isSet;
      exports.isSortedDict = $$ImmutableDict$$isSortedDict;
      exports.isSortedSet = $$ImmutableSet$$isSortedSet;
      exports.isList = $$ImmutableList$$isList;
      exports.isQueue = $$ImmutableQueue$$isQueue;
      exports.isTuple = $$ImmutableTuple$$isTuple;
      exports.isStack = $$ImmutableStack$$isStack;
      exports.isImmutable = src$Immutable$Immutable$$isImmutable;
      exports.SortedDict = $$ImmutableDict$$SortedDict;
      exports.SortedSet = $$ImmutableSet$$SortedSet;
      exports.isIterable = $$iter$$isIterable;
      exports.Dict = $$ImmutableDict$$Dict;
      exports.Set = $$ImmutableSet$$Set;
      exports.List = $$ImmutableList$$List;
      exports.Tuple = $$ImmutableTuple$$Tuple;
      exports.Queue = $$ImmutableQueue$$Queue;
      exports.Stack = $$ImmutableStack$$Stack;
      exports.simpleSort = $$Sorted$$simpleSort;
      exports.isRecord = $$ImmutableRecord$$isRecord;
      exports.Record = $$ImmutableRecord$$Record;
      exports.toJSON = $$toJSON$$toJSON;
      exports.fromJSON = $$toJSON$$fromJSON;
      exports.deref = $$MutableRef$$deref;
      exports.Ref = $$MutableRef$$Ref;
      exports.isRef = $$MutableRef$$isRef;
      exports.isTag = $$Tag$$isTag;
      exports.isUUIDTag = $$Tag$$isUUIDTag;
      exports.Tag = $$Tag$$Tag;
      exports.UUIDTag = $$Tag$$UUIDTag;
      exports.each = $$iter$$each;
      exports.map = $$iter$$map;
      exports.keep = $$iter$$keep;
      exports.findIndex = $$iter$$findIndex;
      exports.reverse = $$iter$$reverse;
      exports.foldl = $$iter$$foldl;
      exports.foldr = $$iter$$foldr;
      exports.join = $$iter$$join;
      exports.zip = $$iter$$zip;
      exports.toArray = $$iter$$toArray;
      exports.any = $$iter$$any;
      exports.all = $$iter$$all;
      exports.find = $$iter$$find;
      exports.partition = $$iter$$partition;
      exports.range = $$iter$$range;
      exports.take = $$iter$$take;
      exports.indexOf = $$iter$$indexOf;
      exports.toIterator = $$iter$$toIterator;
      exports.Iterable = $$iter$$Iterable;
    });
}).call(this);

//# sourceMappingURL=Immutable.js.map