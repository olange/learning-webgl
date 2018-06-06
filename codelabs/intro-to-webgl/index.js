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

function update( time) {
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  cube.position.x = 2.5 * Math.cos( time / 1500.0);
  cube.position.y = 2.5 * Math.sin( time / 1500.0);
}

let lasttime = undefined;
const stepduration = 15; // ms

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