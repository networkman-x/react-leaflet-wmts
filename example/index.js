import React from 'react';
import { render } from 'react-dom';
import WMTSExample from "./WMTSExample";

const example = (
  <div>
    <h1>React-Leaflet-wmts example for 天地图</h1>
    <WMTSExample/>
  </div>
);

render(example, document.getElementById('app'));
