import isDirectEqual from './isDirectEqual';

// [a] fn => [a, index]
let findLast = function(arr, finder) {
  for (let index = arr.length - 1; index >= 0; index--) {
    let item = arr[index];
    if (finder(item) === true) {
      return [item, index];
    }
  }
};

let moveToBottom = function(arr, targetIndex) {
  return arr.slice(0, targetIndex).
    concat(arr.slice(targetIndex + 1)).
    concat([arr[targetIndex]]);
};

let findCache = function(cache, finder, targetKey) {
  let targetCache = findLast(cache, function({ key }) {
    return finder(targetKey, key);
  });

  if (!targetCache) return;

  let [{ val }, index] = targetCache;
  let newCache = moveToBottom(cache, index);
  return [val, newCache];
};

let addCache = function(cache, maxLength, item) {
  let newCache = cache.concat(item);
  if (newCache.length <= maxLength) {
    return newCache;
  }

  return newCache.slice(newCache.length - maxLength);
};

let createCache = function(props = {}) {
  let {
    cacheSize = Infinity,
    cacheFinder = isDirectEqual,
  } = props;

  let cache = [
    // { key, val }
  ];

  let _findCache = function(targetKey) {
    let cacheTarget = findCache(cache, cacheFinder, targetKey);
    if (!cacheTarget) return;
    let [val, newCache] = cacheTarget;
    cache = newCache;
    return val;
  };

  let _addCache = function(item) {
    let newCache = addCache(cache, cacheSize, item);
    cache = newCache;
  };

  return {
    findCache: _findCache,
    addCache: _addCache,
    getCache: () => cache,
  };
};

export default createCache;
