import { LitElement, html } from "@polymer/lit-element";
import * as THREE from "three";

class MyAnim extends LitElement {
  render() {
    console.log( "my-anim › render()");
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
      // Observed properties, reflected to attributes
      interval: { type: Number, reflect: true },
      // Observed properties, not reflected to attributes
      scene: { type: Object, reflect: false },
      camera: { type: Object, reflect: false },
      renderer: { type: Object, reflect: false }
    };
  }

  constructor() {
    console.log( "my-anim › constructor()");
    super();

    // Element public properties
    this.interval = 10.0; // ms
    this.camera = null;
    this.scene = null;
    this.renderer = null;

    // Element private properties
    this._canvasElement = null;
    this._lastTime = null;
    this._mesh = null
    this._boundAnimateFn = this.animate.bind( this);
  }

  firstUpdated() {
    console.log( "my-anim › firstUpdated()");
    this._canvasElement = this.shadowRoot.getElementById( "animation");
    this.init();
    this.animate();
  }

  init() {
    console.log( "my-anim › init()");
    const displayWidth = this._canvasElement.clientWidth;
    const displayHeight = this._canvasElement.clientHeight;
    const displayRatio = displayWidth / displayHeight;

    this.camera = new THREE.PerspectiveCamera( 70, displayRatio, 0.01, 10);
    this.camera.position.z = 1;

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();
    this._mesh = new THREE.Mesh( geometry, material);

    this.scene = new THREE.Scene();
    this.scene.add( this._mesh);

    this.renderer = new THREE.WebGLRenderer(
      { antialias: true, canvas: this._canvasElement });
  }

  resize() {
    const displayWidth = this._canvasElement.clientWidth;
    const displayHeight = this._canvasElement.clientHeight;
    const displayRatio = displayWidth / displayHeight;
    console.log( `my-anim › resize() to ${displayWidth}x${displayHeight} (1:${displayRatio})`);
    this.camera.aspect = displayRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( displayWidth, displayHeight, false);
  }

  needsResize() {
    const displayWidth = this._canvasElement.clientWidth;
    const displayHeight = this._canvasElement.clientHeight;
    const renderSize = this.renderer.getSize();
    return( renderSize.width != displayWidth || renderSize.height != displayHeight);
  }

  updateScene( time) {
    this._mesh.rotation.x += 0.01;
    this._mesh.rotation.y += 0.02;
    this._mesh.position.x = 0.5 * Math.cos( time / 1500.0);
    this._mesh.position.y = 0.5 * Math.sin( time / 1500.0);
  }

  animate( time) {
    const firstTime = typeof time === "undefined";
    const currTime = firstTime ? 0.0 : time;

    if( firstTime || this.needsResize.call( this)) {
      this.resize.call( this);
    }

    this.updateScene.call( this, currTime);

    if( firstTime || time - this._lastTime > this.interval) {
      this.renderer.render( this.scene, this.camera);
      this._lastTime = currTime;
    }

    window.requestAnimationFrame( this._boundAnimateFn);
  }
}

window.customElements.define( "my-anim", MyAnim);

// eof