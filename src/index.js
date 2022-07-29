
import * as Cesium from 'cesium';
import "cesium/Widgets/widgets.css";
import "../src/css/main.css";
//import "cesium/ThirdParty"

const viewer = init();


/// location ///
const lon = -76.613170;
const lat = 39.274965;
const height = 10.2;
const rotationXYZ = new Cesium.Cartesian3(0.0, 0, Math.PI + 0.05); //Rotation in radians about the XYZ axis applied in the order X,Y,Z
const scale = new Cesium.Cartesian3(1.18, 1.18, 1.18); // XYZ scale

const matrix = computeTransformationMatrix(lon, lat, height, rotationXYZ, scale);



const tileset = new Cesium.Cesium3DTileset({
    url: "https://storage.googleapis.com/ogc-3d-tiles/policeStation/tileset.json", // UltraMesh
    modelMatrix: matrix
});



viewer.scene.primitives.add(tileset);
viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.5, -0.5, 70));

function init() {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    return new Cesium.Viewer('cesiumContainer', {
        terrainProvider: new Cesium.EllipsoidTerrainProvider()
    });
}

function computeTransformationMatrix(lon, lat, height, rotation, scale) {

    const location = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    const translationMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(location);

    const scaleMatrix = Cesium.Matrix4.fromScale(scale)

    const rotationMatrixX = Cesium.Matrix3.fromRotationX(rotation.x);
    const rotationMatrixY = Cesium.Matrix3.fromRotationY(rotation.y);
    const rotationMatrixZ = Cesium.Matrix3.fromRotationZ(rotation.z);

    const rotation3 = new Cesium.Matrix3();
    Cesium.Matrix3.multiply(rotationMatrixZ, rotationMatrixY, rotation3);
    Cesium.Matrix3.multiply(rotationMatrixX, rotation3, rotation3);

    const rotationMatrix = Cesium.Matrix4.fromRotation(rotation3);

    const matrix = new Cesium.Matrix4();
    Cesium.Matrix4.multiply(translationMatrix, scaleMatrix, matrix);
    Cesium.Matrix4.multiply(matrix, rotationMatrix, matrix);

    return matrix;
}

document.getElementById("applyGeoloc").onclick = ()=>{
    const lon = Number(document.getElementById("longitudeInput").value);
    const lat = Number(document.getElementById("latitudeInput").value);
    const height = Number(document.getElementById("heightInput").value);
    const s = Number(document.getElementById("scaleInput").value);
    const scale = new Cesium.Cartesian3(s, s, s);
    const rotationZ = Number(document.getElementById("orientationInput").value);
    const rotationXYZ = new Cesium.Cartesian3(0.0, 0, rotationZ/360*2*Math.PI);

    tileset.modelMatrix = computeTransformationMatrix(lon, lat, height, rotationXYZ, scale);
    
}