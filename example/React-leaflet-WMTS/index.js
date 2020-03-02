'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

let _reactLeaflet = require('react-leaflet');

let _lodash = require('lodash');


let _wmts = _interopRequireDefault(require('./wmts'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
  }
  return _typeof(obj);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  let target = _objectWithoutPropertiesLoose(source, excluded);
  let key;
  let i;
  if (Object.getOwnPropertySymbols) {
    let sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  let target = {};
  let sourceKeys = Object.keys(source);
  let key;
  let i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    let descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  }
  return self;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      let base = _superPropBase(target, property);
      if (!base) return;
      let desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

let EVENTS_RE = /^on(.+)$/i;

let WMTSTileLayer =
  /* #__PURE__*/
  function(_GridLayer) {
    _inherits(WMTSTileLayer, _GridLayer);

    function WMTSTileLayer() {
      _classCallCheck(this, WMTSTileLayer);

      return _possibleConstructorReturn(this, _getPrototypeOf(WMTSTileLayer).apply(this, arguments));
    }

    _createClass(WMTSTileLayer, [{
      key: 'createLeafletElement',
      value: function createLeafletElement(props) {
        let url = props.url;
        let params = _objectWithoutProperties(props, ['url']);

        return new _wmts.default(url, this.getOptions(params));
      }
    }, {
      key: 'updateLeafletElement',
      value: function updateLeafletElement(fromProps, toProps) {
        _get(_getPrototypeOf(WMTSTileLayer.prototype), 'updateLeafletElement', this).call(this, fromProps, toProps);

        let prevUrl = fromProps.url;
        let _po = fromProps.opacity;
        let _pz = fromProps.zIndex;
        let prevParams = _objectWithoutProperties(fromProps, ['url', 'opacity', 'zIndex']);

        let url = toProps.url;
        let _o = toProps.opacity;
        let _z = toProps.zIndex;
        let params = _objectWithoutProperties(toProps, ['url', 'opacity', 'zIndex']);

        if (url !== prevUrl) {
          this.leafletElement.setUrl(url);
        }

        if (!(0, _lodash.isEqual)(params, prevParams)) {
          this.leafletElement.setParams(params);
        }
      }
    }, {
      key: 'getOptions',
      value: function getOptions(params) {
        return (0, _lodash.reduce)(_get(_getPrototypeOf(WMTSTileLayer.prototype), 'getOptions', this).call(this, params), function(options, value, key) {
          if (!EVENTS_RE.test(key)) {
            options[key] = value;
          }

          return options;
        }, {});
      }
    }]);

    return WMTSTileLayer;
  }(_reactLeaflet.GridLayer);

let _default = (0, _reactLeaflet.withLeaflet)(WMTSTileLayer);
exports.default = _default;
