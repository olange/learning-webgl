import { LitElement, html } from "@polymer/lit-element";
import * as THREE from "three";

class MyAnim extends LitElement {
  render() {
    console.log( "render()");
    return html`
      <style>
        :host { display: flex; flex-direction: column; }
        canvas { height: 100%; }
        #title { position: absolute; z-index: 10; top: calc( 50% - 2em); left: 1em; }
      </style>
      <div id="title">
        <slot></slot>
      </div>
      <canvas id="animation"></canvas>
    `;
  }

  static get properties() {
    return {
      interval: { type: Number }
    };
  }

  constructor() {
    console.log( "constructor()");
    super();

    // Element attributes
    this.interval = 10.0; // ms

    // Element private properties
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.mesh = null

    this.canvasElement = null;
    this.lastTime = null;

    this._boundAnimateFn = this.animate.bind( this);
  }

  firstUpdated() {
    console.log( "firstUpdated()");
    this.canvasElement = this.shadowRoot.getElementById( "animation");
    this.init();
    this.animate();
  }

  init() {
    console.log( "init()");
    const displayWidth = this.canvasElement.clientWidth;
    const displayHeight = this.canvasElement.clientHeight;
    const displayRatio = displayWidth / displayHeight;

    this.camera = new THREE.PerspectiveCamera( 70, displayRatio, 0.01, 10);
    this.camera.position.z = 1;

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh( geometry, material);

    this.scene = new THREE.Scene();
    this.scene.add( this.mesh);

    this.renderer = new THREE.WebGLRenderer(
      { antialias: true, canvas: this.canvasElement });
  }

  resize() {
    const displayWidth = this.canvasElement.clientWidth;
    const displayHeight = this.canvasElement.clientHeight;
    const displayRatio = displayWidth / displayHeight;
    console.log( `resize() to ${displayWidth}x${displayHeight} (1:${displayRatio})`);
    this.camera.aspect = displayRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( displayWidth, displayHeight, false);
  }

  needsResize() {
    const displayWidth = this.canvasElement.clientWidth;
    const displayHeight = this.canvasElement.clientHeight;
    const renderSize = this.renderer.getSize();
    return( renderSize.width != displayWidth || renderSize.height != displayHeight);
  }

  updateScene( time) {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.mesh.position.x = 0.5 * Math.cos( time / 1500.0);
    this.mesh.position.y = 0.5 * Math.sin( time / 1500.0);
  }

  animate( time) {
    const firstTime = typeof time === "undefined";
    const currTime = firstTime ? 0.0 : time;

    if( firstTime || this.needsResize.call( this)) {
      this.resize.call( this);
    }

    this.updateScene.call( this, currTime);

    if( firstTime || time - this.lastTime > this.interval) {
      this.renderer.render( this.scene, this.camera);
      this.lastTime = currTime;
    }

    window.requestAnimationFrame( this._boundAnimateFn);
  }
}

window.customElements.define( "my-anim", MyAnim);

// eof