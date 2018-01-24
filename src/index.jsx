import createCache from './cache';
import isDirectEqual from './isDirectEqual';
import isShallowEqual from './isShallowEqual';

let createCacheFinder = function(useShallowCompare) {
  return function(argsA, argsB) {
    if (argsA.length !== argsB.length) {
      return false;
    }

    return argsA.find(function(item, index) {
      return useShallowCompare ?
        !isShallowEqual(item, argsB[index]) :
        !isDirectEqual(item, argsB[index]);
    }) === undefined;
  };
};

let memoize = function(fn, opts = {}) {
  let {
    cacheSize = Infinity,
    useShallowCompare = false
  } = opts;

  let cacheFinder = createCacheFinder(useShallowCompare);

  if (cacheSize <= 0) {
    throw new Error('ShallowMemoize: CacheSize should be greater than 0.');
  }

  let { findCache, addCache } = createCache({
    cacheSize,
    cacheFinder,
  });

  return function(...args) {
    let targetCache = findCache(args);
    if (targetCache) {
      return targetCache;
    }

    let result = fn(...args);
    addCache({ key: args, val: result });
    return result;
  };
};

export default memoize;