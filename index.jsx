
let isShallowEqual = function(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let ret = true;
  let i = 0;
  while (i < arr1.length) {
    let arr1Item = arr1[i];
    let arr2Item = arr2[i];
    if (arr1Item !== arr2Item) {
      ret = false;
      break;
    }
    i += 1;
  }

  return ret;
};

let findCachedResult = function(cacheStore, args) {
  let target = cacheStore.find(function(item) {
    return isShallowEqual(item.args, args);
  });

  let ret = target === undefined ?
    undefined :
    target.result;

  return ret;
};

let identity = a => a;

let memoize = function(fn, argumentsResolver = identity) {
  let cacheStore = [
    // { args: [], result }
  ];
  return function(...args) {
    let resolvedArgs = argumentsResolver(args);

    if (!Array.isArray(resolvedArgs)) {
      throw 'shallow-memoize: argumentsResolver should return an array';
    }

    let cachedResult = findCachedResult(cacheStore, resolvedArgs);
    if (cachedResult !== undefined) {
      // console.log('hit cache', args);
      return cachedResult;
    }

    let result = fn(...args);
    cacheStore.push({ args: resolvedArgs, result });
    return result;
  };
};

export default memoize;
