'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _isDirectEqual = require('./isDirectEqual');

var _isDirectEqual2 = _interopRequireDefault(_isDirectEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// [a] fn => [a, index]
var findLast = function findLast(arr, finder) {
  for (var index = arr.length - 1; index >= 0; index--) {
    var item = arr[index];
    if (finder(item) === true) {
      return [item, index];
    }
  }
};

var moveToBottom = function moveToBottom(arr, targetIndex) {
  return arr.slice(0, targetIndex).concat(arr.slice(targetIndex + 1)).concat([arr[targetIndex]]);
};

var findCache = function findCache(cache, finder, targetKey) {
  var targetCache = findLast(cache, function (_ref) {
    var key = _ref.key;

    return finder(targetKey, key);
  });

  if (targetCache === undefined) return;

  var _targetCache = _slicedToArray(targetCache, 2),
      val = _targetCache[0].val,
      index = _targetCache[1];

  var newCache = moveToBottom(cache, index);
  return [val, newCache];
};

var addCache = function addCache(cache, maxLength, item) {
  var newCache = cache.concat(item);
  if (newCache.length <= maxLength) {
    return newCache;
  }

  return newCache.slice(newCache.length - maxLength);
};

var createCache = function createCache() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _props$cacheSize = props.cacheSize,
      cacheSize = _props$cacheSize === undefined ? Infinity : _props$cacheSize,
      _props$cacheFinder = props.cacheFinder,
      cacheFinder = _props$cacheFinder === undefined ? _isDirectEqual2.default : _props$cacheFinder;


  var cache = [
    // { key, val }
  ];

  var _findCache = function _findCache(targetKey) {
    var cacheTarget = findCache(cache, cacheFinder, targetKey);
    if (cacheTarget === undefined) return;

    var _cacheTarget = _slicedToArray(cacheTarget, 2),
        val = _cacheTarget[0],
        newCache = _cacheTarget[1];

    cache = newCache;
    return val;
  };

  var _addCache = function _addCache(item) {
    var newCache = addCache(cache, cacheSize, item);
    cache = newCache;
  };

  return {
    findCache: _findCache,
    addCache: _addCache,
    getCache: function getCache() {
      return cache;
    }
  };
};

exports.default = createCache;