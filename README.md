# ShallowMemoize
Memoization with ability to set cache size and use shallow comparison.

# Usage
  import memoize from 'shallow-memoize'

  let memoizeOptions = {
    cacheSize: 1, // size of cache, should be greater than 0. Default is Infinity.
    useShallowCompare: true, // whether shallow compare should be used. Default is false.
  };

  let add = memoize(function(a, b) {
    return a.val + b.val;
  }, memoizeOptions);

  add({ val: 5 }, { val: 5 });
  add({ val: 5 }, { val: 5 }); // cache hit

  add({ val: 3 }, { val: 3 });
  add({ val: 3 }, { val: 3 }); // cache hit

  add({ val: 5 }, { val: 5 }); // no cache, because cache size is 1

