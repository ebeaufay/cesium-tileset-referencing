# cesium-tileset-referencing

An unreferenced OGC 3DTiles tileset is one that is defined in it's own cartesian reference.
It uses box or sphere bounding volumes (not region) and has no transformation baked in.

This is a very basic example showing how to reference such a tileset in Cesium.js.

Example:
https://storage.googleapis.com/jdultra.com/cesium/tilesetLocation/index.html

The model in this example is defined in meters (more or less) and is centered on 0,0,0.

[The original model](https://skfb.ly/o9YHT) is converted to 3DTiles via private code. contact: emericbeaufays@gmail.com
