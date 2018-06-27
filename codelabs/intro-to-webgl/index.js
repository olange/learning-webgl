"use strict";

import {
    Scene, PerspectiveCamera, WebGLRenderer,
    BoxGeometry, MeshNormalMaterial, Mesh
  } from "./node_modules/three/build/three.module.js";

import OrbitControls from "./node_modules/orbit-controls-es6/src/index.js";

const container = document.getElementById( "canvas");
const clientWidth = container.clientWidth;
const clientHeight = container.clientHeight;

const scene = new Scene();
const aspect = clientWidth / clientHeight;
const camera = new PerspectiveCamera( 75, aspect, 0.1, 1000);
const renderer = new WebGLRenderer();

const canvas = renderer.domElement;
renderer.setSize( clientWidth, clientHeight);
container.appendChild( canvas);

const geometry = new BoxGeometry( 1, 1, 1);
const material = new MeshNormalMaterial();
const cube1 = new Mesh( geometry, material);
const cube2 = new Mesh( geometry, material);
const cube3 = new Mesh( geometry, material);
scene.add( cube1);
scene.add( cube2);
scene.add( cube3);
camera.position.z = 5;

const controls = new OrbitControls( camera, canvas);
controls.enabled = true;
controls.maxDistance = 1500;
controls.minDistance = 0;
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = false;

function update( time) {
  cube1.rotation.x = cube2.rotation.x = cube3.rotation.x += 0.1;
  cube1.rotation.y = cube2.rotation.y = cube3.rotation.y += 0.1;
  cube1.position.x = 2.5 * Math.cos( time / 1500.0);
  cube1.position.y = 2.5 * Math.sin( time / 1500.0);
  cube2.position.x = 2.5 * Math.cos( time * 0.66 * Math.PI / 1500.0);
  cube2.position.y = 2.5 * Math.sin( time * 0.66 * Math.PI / 1500.0);
  cube3.position.x = 2.5 * Math.cos( time * 1.33 * Math.PI / 1500.0);
  cube3.position.y = 2.5 * Math.sin( time * 1.33 * Math.PI / 1500.0);
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
