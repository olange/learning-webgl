"use strict";

import {
  Scene, PerspectiveCamera, WebGLRenderer,
  BoxGeometry, MeshNormalMaterial, Mesh } from "./node_modules/three/build/three.module.js";

const scene = new Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new PerspectiveCamera( 75, aspect, 0.1, 1000);
var renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

const geometry = new BoxGeometry( 1, 1, 1);
const material = new MeshNormalMaterial();
const cube = new Mesh( geometry, material);
scene.add( cube);
camera.position.z = 5;

var lasttime = undefined;
const stepduration = 15; // ms
function update( timestamp) {
  window.requestAnimationFrame( update);
  if( typeof lasttime === "undefined" ||( timestamp - lasttime > stepduration)) {
    lasttime = timestamp; // will be undefined on first call (with timestamp === undefined)
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    renderer.render( scene, camera);
  }
};

update();