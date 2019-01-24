import { LitElement, html } from "@polymer/lit-element";
import * as THREE from "three";

class MyAnimSub extends LitElement {
  render() {
    console.log( "my-anim-sub › render()");
    return html`
      <style>
        span.title {
          background-color: white; color: black; font-size: 75%;
          padding: 0.25em 0.5em; margin-top: 0.5em; text-transform: uppercase; }
      </style>
      <div>
        <span class="title">Subcomponent ${this.name} with a wireframe sphere</span>
        <slot></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      name: { type: String, reflect: true },
      color: { type: Number, reflect: true },
      speed: { type: Number, reflect: true },

      scene: { type: Object, reflect: false },
      camera: { type: Object, reflect: false },
      renderer: { type: Object, reflect: false }
    };
  }

  constructor() {
    console.log( "my-anim-sub › constructor()");
    super();

    this.name = "";
    this.color = 0x6699ff;
    this.speed = 1;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this._parentAnim = null;
    this._lines = null;
    this._boundAnimateFn = this.animate.bind( this);
  }

  firstUpdated() {
    console.log( "my-anim-sub › firstUpdated()");
    this.animate();
  }

  connectedCallback() {
    console.log( "my-anim-sub › connectedCallback()");
    super.connectedCallback();

    // Get reference to parent animation, and its scene, camera and renderer
    this._parentAnim = this.closest( "my-anim");
    if( !( this._parentAnim instanceof HTMLElement)) {
      throw new Error( "<my-anim-sub> element needs a <my-anim> element within its ancestors");
    }
    this.scene = this._parentAnim.scene;
    this.camera = this._parentAnim.camera;
    this.renderer = this._parentAnim.renderer;

    // @see https://threejs.org/docs/#api/en/geometries/SphereBufferGeometry
    const geometry = new THREE.SphereBufferGeometry( 0.25, 0.25, 0.25);
    // @see https://threejs.org/docs/#api/en/geometries/WireframeGeometry
    const wireframe = new THREE.WireframeGeometry( geometry);
    // @see https://threejs.org/docs/#api/en/materials/LineBasicMaterial
    const material = new THREE.LineBasicMaterial(
      { color: this.color, depthTest: false, opacity: 0.8, transparent: true });
    // @see https://threejs.org/docs/#api/en/objects/LineSegments
    this._lines = new THREE.LineSegments( wireframe, material);

    this.scene.add( this._lines);
  }

  disconnectedCallback() {
    console.log( "my-anim-sub › disconnectedCallback()");

    this.scene.remove( this._lines);
    this._lines.material.dispose();
    this._lines.geometry.dispose();
    this._lines = null;

    this._parentAnim = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    super.disconnectedCallback();
  }

  animate( time) {
    this._lines.rotation.x += 0.001 * this.speed;
    this._lines.rotation.y += 0.010 * this.speed;
    this._lines.rotation.z += 0.005 * this.speed;
    window.requestAnimationFrame( this._boundAnimateFn);
  }
}

window.customElements.define( "my-anim-sub", MyAnimSub);

// eof