
let isShallowEqual = function(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // f true, [], _ = true
  // f true, [a], [b] = f undefined, [a], [b]
  // f false, _, _ = false
  // f undefined, [a, ...as] [b, ...bs] = f a === b, [as], [bs]
  let compare = function(isEqual, arr1, arr2) {
    if (isEqual === undefined) {
      let [a, ...restArr1] = arr1;
      let [b, ...restArr2] = arr2;
      return compare(a === b, restArr1, restArr2);
    }

    else if (isEqual === false) {
      return false;
    }

    else if (isEqual === true) {
      if (arr1.length === 0) {
        return true;
      }

      else {
        return compare(undefined, arr1, arr2);
      }
    }
  };

  return compare(undefined, arr1, arr2);
};

let findCachedResult = function(cacheStore, args) {
  let target = cacheStore.find(function(item) {
    return isShallowEqual(item.args, args);
  });
  return target === undefined ? undefined : target.result;
};

let memoize = function(fn) {
  let cacheStore = [
    // { args: [], result }
  ];

  return function(...args) {
    let cachedResult = findCachedResult(cacheStore, args);
    if (cachedResult !== undefined) {
      return cachedResult;
    }

    let result = fn(...args);
    cacheStore.push({ args, result });
    return result;
  };
};

export default memoize;
