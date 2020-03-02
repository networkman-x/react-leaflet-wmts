/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Map} from 'react-leaflet';
import L from 'leaflet';
import WMTSTileLayer from './React-leaflet-WMTS/index';


export default class WMTSExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zoom:5,
      center:[43.814859, 87.620846],
      mapKey:''
    };
  }


  render() {
    return (
      <Map style={{width: 800, height:400 }} crs={L.CRS.EPSG4326} classname="地图" center={this.state.center} zoom={this.state.zoom}>
        <WMTSTileLayer
          url={"http://t0.tianditu.gov.cn/img_c/wmts?tk="+this.state.mapKey}
          layer="img"
          tilematrixSet="c"
          format="tile"
          tileSize={256}
          transparent={true}
          maxZoom={17} minZoom={3}
        />
      </Map>
    );
  }
}
