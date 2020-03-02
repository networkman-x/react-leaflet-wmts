'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

let _leaflet = _interopRequireDefault(require('leaflet'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// From: https://github.com/mylen/leaflet.TileLayer.WMTS
let _default = _leaflet.default.TileLayer.extend({
  defaultWmtsParams: {
    service: 'WMTS',
    request: 'GetTile',
    version: '1.0.0',
    layers: '',
    styles: '',
    tilematrixSet: '',
    format: 'image/jpeg'
  },
  initialize: function initialize(url, options) {
    // (String, Object)
    this._url = url;
    let wmtsParams = _leaflet.default.extend({}, this.defaultWmtsParams);

    let tileSize = options.tileSize || this.options.tileSize;

    if ( options.detectRetina && _leaflet.default.Browser.retina) { // 问题出现在这段代码
      wmtsParams.width = wmtsParams.height = tileSize * 2;
    } else {
      wmtsParams.width = wmtsParams.height = tileSize;
    }
    for (var i in options) {
      // all keys that are not TileLayer options go to WMTS params
      // eslint-disable-next-line eqeqeq
      if (!this.options.hasOwnProperty(i) && i != 'matrixIds') {
        wmtsParams[i] = options[i];
      }
    }
    let matrixIds = [];
    for (var i = 0; i < 22; ++i) {
      matrixIds[i] = {
        identifier:1 + i,
        topLeftCorner: new L.LatLng(90, -180)
      };
    }
    this.wmtsParams = wmtsParams;
    // this.matrixIds = options.matrixIds || this.getDefaultMatrix();
    this.matrixIds = matrixIds;

    _leaflet.default.setOptions(this, options);
  },
  onAdd: function onAdd(map) {
    this._crs = this.options.crs || map.options.crs;
    _leaflet.default.TileLayer.prototype.onAdd.call(this, map);
  },
  getTileUrl: function getTileUrl(coords) {
    // (Point, Number) -> String
    let tileSize = this.options.tileSize;
    let nwPoint = coords.multiplyBy(tileSize);
    nwPoint.x += 1;
    nwPoint.y -= 1;
    let sePoint = nwPoint.add(new _leaflet.default.Point(tileSize, tileSize));
    let zoom = this._tileZoom;
    let nw = this._crs.project(this._map.unproject(nwPoint, zoom));

    let se = this._crs.project(this._map.unproject(sePoint, zoom));

    let tilewidth = se.x - nw.x; // zoom = this._map.getZoom();
    let ident = this.matrixIds[zoom].identifier;
    let tilematrix = /* this.wmtsParams.tilematrixSet + ':' +*/ ident;
    let X0 = this.matrixIds[zoom].topLeftCorner.lng;
    let Y0 = this.matrixIds[zoom].topLeftCorner.lat;
    let tilecol = Math.floor((nw.x - X0) / tilewidth);
    let tilerow = -Math.floor((nw.y - Y0) / tilewidth);
    let url = _leaflet.default.Util.template(this._url, {
      s: this._getSubdomain(coords)
    });
    return url + _leaflet.default.Util.getParamString(this.wmtsParams, url) + '&tilematrix=' + tilematrix + '&tilerow=' + tilerow + '&tilecol=' + tilecol;
  },
  setParams: function setParams(params, noRedraw) {
    _leaflet.default.extend(this.wmtsParams, params);

    if (!noRedraw) {
      this.redraw();
    }

    return this;
  },
  getDefaultMatrix: function getDefaultMatrix() {
    /**
     * 天地图服务范围
     */
    let matrixIds3857 = new Array(22);

    for (let i = 0; i < 22; i++) {
      matrixIds3857[i] = {
        identifier: '' + i,
        topLeftCorner: new L.LatLng(90, -180)
      };
    }

    return matrixIds3857;
  }
});

exports.default = _default;
