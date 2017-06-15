# ShallowMemoize
Shallow compare function arguments for memoization. Useful when dealing with immutable data.

# Example
  let fetchFoo = memoize(function(objA, objB) {
    doHeavyThings();
    return [objA.foo, objB.foo];
  });
  
  let a = { foo: 'a' };
  let b = { foo: 'b' };
  
  fetchFoo(a, b); // first call, no cache.
  fetchFoo(a, b); // second call, cache hit.
  
  fetchFoo({ foo: 'c' }, { foo: 'd' }); // no cache
  fetchFoo({ foo: 'c' }, { foo: 'd' }); // no cache
  
