# react-leaflet-wmts

>此示例是针对react+leaflet如何使用wmts地图服务为主,实例是使用天地图的地图服务器.

>在react-leaflet的官网上本来有react-leaflet使用wmts[实例](https://github.com/alexandre-melard/leaflet.TileLayer.WMTS),在使用过程中,官网wmts第三方插件和天地图兼容上出现了一些问题.所以我就入手研究整理出来了这个实例.

## 使用方法

> 克隆下载完成以后,先安装依赖:
```
npm install 
```

>然后在WMTSEample.js里面state.mapKey上填写从天地图申请的token

```
  constructor(props) {
    super(props);
    this.state = {
      zoom:5,
      center:[43.814859, 87.620846],
      mapKey:''   //填写天地图token
    };
  }
```
> 运行项目测试
```
npm run example
``` 

