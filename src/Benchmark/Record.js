var immutablejs = require("immutable");
var mori        = require("mori");

import * as benchmark from "./Benchmark";
// TODO
import { Record, Dict, SortedDict, simpleSort } from "../Immutable/Immutable";
import { header } from "./Header";

header();

function copy(input) {
  var output = {};

  for (var s in input) {
    output[s] = input[s];
  }

  return output;
}

function random(input) {
  return input[Math.floor(Math.random() * input.length)];
}

function run(counter) {
  var only_keys = [];
  var keys = [];
  var record_keys = {};
  var mori_keys = [];

  for (var i = 0; i < counter; ++i) {
    only_keys.push("foo" + i);
    record_keys["foo" + i] = i;
    keys.push(["foo" + i, i]);
    mori_keys.push("foo" + i, i);
  }

  var ImmutableJSRecord = immutablejs.Record(record_keys);

  benchmark.group("Record with " + counter + " keys", function () {
    benchmark.group("Creating", function () {
      benchmark.message("JavaScript Object");

      benchmark.time("JavaScript Object Copying", function () {
        copy(record_keys);
      });

      benchmark.time("Immutable-js Map", function () {
        immutablejs.Map(keys);
      });

      benchmark.time("Immutable-js Record", function () {
        new ImmutableJSRecord(record_keys);
      });

      benchmark.time("Mori Hash Map", function () {
        mori.hash_map.apply(null, mori_keys);
      });

      benchmark.time("Mori Sorted Map", function () {
        mori.sorted_map.apply(null, mori_keys);
      });

      benchmark.time("Immutable Dict", function () {
        Dict(keys);
      });

      benchmark.time("Immutable SortedDict", function () {
        SortedDict(simpleSort, keys);
      });

      benchmark.time("Immutable Record", function () {
        Record(keys);
      });
    });


    benchmark.group("get first", function () {
      benchmark.message("JavaScript Object");

      ;(function () {
        var o = record_keys;

        benchmark.time("JavaScript Object Copying", function () {
          o["foo0"];
        });

        benchmark.time("JavaScript Object Copying (prop)", function () {
          o.foo0;
        });
      })();

      ;(function () {
        var o = immutablejs.Map(keys);

        benchmark.time("Immutable-js Map", function () {
          o.get("foo0");
        });
      })();

      ;(function () {
        var o = new ImmutableJSRecord(record_keys);

        benchmark.time("Immutable-js Record", function () {
          o.get("foo0");
        });

        benchmark.time("Immutable-js Record (prop)", function () {
          o.foo0;
        });
      })();

      ;(function () {
        var o = mori.hash_map.apply(null, mori_keys);

        benchmark.time("Mori Hash Map", function () {
          mori.get(o, "foo0");
        });
      })();

      ;(function () {
        var o = mori.sorted_map.apply(null, mori_keys);

        benchmark.time("Mori Sorted Map", function () {
          mori.get(o, "foo0");
        });
      })();

      ;(function () {
        var o = Dict(keys);

        benchmark.time("Immutable Dict", function () {
          o.get("foo0");
        });
      })();

      ;(function () {
        var o = SortedDict(simpleSort, keys);

        benchmark.time("Immutable SortedDict", function () {
          o.get("foo0");
        });
      })();

      ;(function () {
        var o = Record(keys);

        benchmark.time("Immutable Record", function () {
          o.get("foo0");
        });
      })();
    });


    benchmark.group("get random", function () {
      benchmark.message("JavaScript Object");

      ;(function () {
        var o = record_keys;

        benchmark.time("JavaScript Object Copying", function () {
          o[random(only_keys)];
        });
      })();

      ;(function () {
        var o = immutablejs.Map(keys);

        benchmark.time("Immutable-js Map", function () {
          o.get(random(only_keys));
        });
      })();

      ;(function () {
        var o = new ImmutableJSRecord(record_keys);

        benchmark.time("Immutable-js Record", function () {
          o.get(random(only_keys));
        });
      })();

      ;(function () {
        var o = mori.hash_map.apply(null, mori_keys);

        benchmark.time("Mori Hash Map", function () {
          mori.get(o, random(only_keys));
        });
      })();

      ;(function () {
        var o = mori.sorted_map.apply(null, mori_keys);

        benchmark.time("Mori Sorted Map", function () {
          mori.get(o, random(only_keys));
        });
      })();

      ;(function () {
        var o = Dict(keys);

        benchmark.time("Immutable Dict", function () {
          o.get(random(only_keys));
        });
      })();

      ;(function () {
        var o = SortedDict(simpleSort, keys);

        benchmark.time("Immutable SortedDict", function () {
          o.get(random(only_keys));
        });
      })();

      ;(function () {
        var o = Record(keys);

        benchmark.time("Immutable Record", function () {
          o.get(random(only_keys));
        });
      })();
    });


    benchmark.group("set first", function () {
      ;(function () {
        var o = copy(record_keys);

        benchmark.time("JavaScript Object", function () {
          o["foo0"] = -1;
        });

        benchmark.time("JavaScript Object (prop)", function () {
          o.foo0 = -1;
        });
      })();

      ;(function () {
        var o = record_keys;

        benchmark.time("JavaScript Object Copying", function () {
          var x = copy(o);
          x["foo0"] = -1;
        });

        benchmark.time("JavaScript Object Copying (prop)", function () {
          var x = copy(o);
          x.foo0 = -1;
        });
      })();

      ;(function () {
        var o = immutablejs.Map(keys);

        benchmark.time("Immutable-js Map", function () {
          o.set("foo0", -1);
        });
      })();

      ;(function () {
        var o = new ImmutableJSRecord(record_keys);

        benchmark.time("Immutable-js Record", function () {
          o.set("foo0", -1);
        });
      })();

      ;(function () {
        var o = mori.hash_map.apply(null, mori_keys);

        benchmark.time("Mori Hash Map", function () {
          mori.assoc(o, "foo0", -1);
        });
      })();

      ;(function () {
        var o = mori.sorted_map.apply(null, mori_keys);

        benchmark.time("Mori Sorted Map", function () {
          mori.assoc(o, "foo0", -1);
        });
      })();

      ;(function () {
        var o = Dict(keys);

        benchmark.time("Immutable Dict", function () {
          o.set("foo0", -1);
        });
      })();

      ;(function () {
        var o = SortedDict(simpleSort, keys);

        benchmark.time("Immutable SortedDict", function () {
          o.set("foo0", -1);
        });
      })();

      ;(function () {
        var o = Record(keys);

        benchmark.time("Immutable Record", function () {
          o.set("foo0", -1);
        });
      })();
    });


    benchmark.group("set random", function () {
      ;(function () {
        var o = copy(record_keys);

        benchmark.time("JavaScript Object", function () {
          o[random(only_keys)] = -1;
        });
      })();

      ;(function () {
        var o = record_keys;

        benchmark.time("JavaScript Object Copying", function () {
          var x = copy(o);
          x[random(only_keys)] = -1;
        });
      })();

      ;(function () {
        var o = immutablejs.Map(keys);

        benchmark.time("Immutable-js Map", function () {
          o.set(random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = new ImmutableJSRecord(record_keys);

        benchmark.time("Immutable-js Record", function () {
          o.set(random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = mori.hash_map.apply(null, mori_keys);

        benchmark.time("Mori Hash Map", function () {
          mori.assoc(o, random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = mori.sorted_map.apply(null, mori_keys);

        benchmark.time("Mori Sorted Map", function () {
          mori.assoc(o, random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = Dict(keys);

        benchmark.time("Immutable Dict", function () {
          o.set(random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = SortedDict(simpleSort, keys);

        benchmark.time("Immutable SortedDict", function () {
          o.set(random(only_keys), -1);
        });
      })();

      ;(function () {
        var o = Record(keys);

        benchmark.time("Immutable Record", function () {
          o.set(random(only_keys), -1);
        });
      })();
    });
  });
}


run(1);
//run(2);
//run(3);
//run(4);
//run(5);
run(10);
run(100);
run(1000);
run(10000);
//run(100000);
//run(1000000);

benchmark.run();
