'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _isDirectEqual = require('./isDirectEqual');

var _isDirectEqual2 = _interopRequireDefault(_isDirectEqual);

var _isShallowEqual = require('./isShallowEqual');

var _isShallowEqual2 = _interopRequireDefault(_isShallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createCacheFinder = function createCacheFinder(useShallowCompare) {
  return function (argsA, argsB) {
    if (argsA.length !== argsB.length) {
      return false;
    }

    return argsA.find(function (item, index) {
      return useShallowCompare ? !(0, _isShallowEqual2.default)(item, argsB[index]) : !(0, _isDirectEqual2.default)(item, argsB[index]);
    }) === undefined;
  };
};

var memoize = function memoize(fn) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _opts$cacheSize = opts.cacheSize,
      cacheSize = _opts$cacheSize === undefined ? Infinity : _opts$cacheSize,
      _opts$useShallowCompa = opts.useShallowCompare,
      useShallowCompare = _opts$useShallowCompa === undefined ? false : _opts$useShallowCompa;


  var cacheFinder = createCacheFinder(useShallowCompare);

  if (cacheSize <= 0) {
    throw new Error('ShallowMemoize: CacheSize should be greater than 0.');
  }

  var _createCache = (0, _cache2.default)({
    cacheSize: cacheSize,
    cacheFinder: cacheFinder
  }),
      findCache = _createCache.findCache,
      addCache = _createCache.addCache;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var targetCache = findCache(args);
    if (targetCache) {
      return targetCache;
    }

    var result = fn.apply(undefined, args);
    addCache({ key: args, val: result });
    return result;
  };
};

exports.default = memoize;