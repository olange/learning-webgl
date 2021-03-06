"use strict";

import {
    WebGLRenderer,
    Scene, PerspectiveCamera, 
    Geometry, BoxGeometry, SphereGeometry,
    Mesh, MeshNormalMaterial, MeshPhongMaterial,
    Line, LineDashedMaterial,
    AmbientLight, TextureLoader,
    Vector3
  } from "./node_modules/three/build/three.module.js";

import OrbitControls from "./node_modules/orbit-controls-es6/src/index.js";

const container = document.getElementById( "canvas");
const clientWidth = container.clientWidth;
const clientHeight = container.clientHeight;

const scene = new Scene();
const aspect = clientWidth / clientHeight;
const camera = new PerspectiveCamera( 75, aspect, 0.1, 1000);
const renderer = new WebGLRenderer( { antialias: true });

const canvas = renderer.domElement;
renderer.setSize( clientWidth, clientHeight);
container.appendChild( canvas);

const light = new AmbientLight( 0xFFFFFF); // soft white light
scene.add( light);

const boxGeometry = new BoxGeometry( 1, 1, 1);
const sphereGeometry = new SphereGeometry( 1, 60, 36);

const loader = new TextureLoader();
const earthTexture = loader.load( "assets/textures/land_ocean_ice_cloud_2048.jpg");
const normalMaterial = new MeshNormalMaterial();
const earthMaterial = new MeshPhongMaterial( {
  color: 0xFFFFFF,
  specular: 0x333333,
  shininess: 15.0,
  map: earthTexture
});

const box1 = new Mesh( boxGeometry, normalMaterial);
const box2 = new Mesh( boxGeometry, normalMaterial);
const box3 = new Mesh( boxGeometry, normalMaterial);
const sphere = new Mesh( sphereGeometry, earthMaterial)
sphere.rotation.x = Math.PI / 2.0;
scene.add( box1);
scene.add( box2);
scene.add( box3);
scene.add( sphere);

const lineMaterial = new LineDashedMaterial({ color: 0x3399CC, dashSize: 0.5, gapSize: 0.25, scale: 2.0 });
const lineGeometry = new Geometry();
lineGeometry.vertices.push( new Vector3( -5,  0,  0));
lineGeometry.vertices.push( new Vector3(  0,  5,  0));
lineGeometry.vertices.push( new Vector3(  5,  0,  0));
lineGeometry.vertices.push( new Vector3(  0, -5,  0));
lineGeometry.vertices.push( new Vector3( -5,  0,  0));
const line = new Line( lineGeometry, lineMaterial);
line.computeLineDistances();
scene.add( line);

camera.position.set( 0, -7, 2);
camera.lookAt( new Vector3( 0, -5, 0));

const controls = new OrbitControls( camera, canvas);
controls.enabled = true;
controls.maxDistance = 1000;
controls.minDistance = 0;
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true;

function update( time) {
  box1.rotation.x = box2.rotation.x = box3.rotation.x += 0.1;
  box1.rotation.y = box2.rotation.y = box3.rotation.y += 0.1;
  sphere.rotation.y += 0.025;
  box1.position.x = 2.5 * Math.cos( time / 1500.0);
  box1.position.y = 2.5 * Math.sin( time / 1500.0);
  box2.position.x = 2.5 * Math.cos( time * 0.66 * Math.PI / 1500.0);
  box2.position.y = 2.5 * Math.sin( time * 0.66 * Math.PI / 1500.0);
  box3.position.x = 2.5 * Math.cos( time * 1.33 * Math.PI / 1500.0);
  box3.position.y = 2.5 * Math.sin( time * 1.33 * Math.PI / 1500.0);
}

let lasttime = undefined;
const stepduration = 1; // ms

function render( time) {
  window.requestAnimationFrame( render);
  if( typeof time !== "undefined") {
    if( typeof lasttime === "undefined" ||( time - lasttime > stepduration)) {
      lasttime = time;
      update( time);
      renderer.render( scene, camera);
    }
  }
};

render();
