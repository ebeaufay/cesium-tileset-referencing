# cesium-tileset-referencing

[Demo](https://storage.googleapis.com/jdultra.com/cesium/cesium-tileset-referencing/index.html)

An unreferenced OGC 3DTiles tileset is one that is defined in it's own cartesian reference.
It uses box or sphere bounding volumes (not region) and has no transformation baked in.

This demo shows how to reference such a tileset in Cesium.js given a location in lon/lat/height, a scale and rotation.

The [original model](https://skfb.ly/o9YHT) in the demo is converted to 3DTiles via the ULTRAMESH tool. contact: www.jdultra.com
