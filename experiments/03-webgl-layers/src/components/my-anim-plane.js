import { LitElement, html } from "@polymer/lit-element";
import * as THREE from "three";

class MyAnimPlane extends LitElement {
  render() {
    console.log( "my-anim-plane › render()");
    return html`
      <style>
        span.title {
          background-color: white; color: black; font-size: 75%; opacity: 0.65;
          padding: 0.25em 0.5em; margin-top: 0.5em; text-transform: uppercase; }
      </style>
      <div>
        <span class="title">Subcomponent ${this.name} with a rotating plane geometry</span>
        <slot></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      name:  { type: String, reflect: true },
      color: { type: Number, reflect: true },
      speed: { type: Number, reflect: true },
      size:  { type: Number, reflect: true },
      segments: { type: Number, reflect: true },
      offset: { type: Number, reflect: true },
      rotation: { type: Number, reflect: true },

      scene: { type: Object, reflect: false },
      camera: { type: Object, reflect: false },
      renderer: { type: Object, reflect: false }
    };
  }

  static dropSomeFaces( geometry) {
    const geometryClone = geometry.clone();
    geometryClone.faces = geometryClone.faces.filter( _ => Math.random() > 0.2);
    geometryClone.elementsNeedUpdate = true;
    return geometryClone;
  }

  constructor() {
    console.log( "my-anim-plane › constructor()");
    super();

    this.name = "";
    this.color = 0xffff00;
    this.speed = 1;
    this.size = 1;
    this.segments = 2;
    this.offset = 0;
    this.rotation = 0;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this._parentAnim = null;

    this._group = null;

    this._boundAnimateFn = this.animate.bind( this);
  }

  firstUpdated() {
    console.log( "my-anim-plane › firstUpdated()");

    const geometry = MyAnimPlane.dropSomeFaces(
      new THREE.PlaneGeometry( this.size, this.size, this.segments, this.segments));
    const wireframe = new THREE.WireframeGeometry( geometry);

    const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, depthTest: true, opacity: 0.65, transparent: true });
    const meshMaterial = new THREE.MeshBasicMaterial( { color: this.color, side: THREE.DoubleSide });

    const lineMesh = new THREE.LineSegments( wireframe, lineMaterial);
    const planeMesh = new THREE.Mesh( geometry, meshMaterial);

    this._group = new THREE.Group();
    this._group.add( lineMesh);
    this._group.add( planeMesh);
    this._group.rotation.x = THREE.Math.DEG2RAD * this.rotation;
    this._group.translateZ( this.offset);

    this.scene.add( this._group);

    this.animate();
  }

  connectedCallback() {
    console.log( "my-anim-plane › connectedCallback()");
    super.connectedCallback();

    // Get reference to parent animation, and its scene, camera and renderer
    this._parentAnim = this.closest( "my-anim");
    if( !( this._parentAnim instanceof HTMLElement)) {
      throw new Error( "<my-anim-plane> element needs a <my-anim> element within its ancestors");
    }
    this.scene = this._parentAnim.scene;
    this.camera = this._parentAnim.camera;
    this.renderer = this._parentAnim.renderer;
  }

  disconnectedCallback() {
    console.log( "my-anim-plane › disconnectedCallback()");

    this.scene.remove( this._group);
    for( let mesh of this._group.children) {
      mesh.material.dispose();
      mesh.geometry.dispose();
      this._group.remove( mesh);
    }
    this._group = null;

    this._parentAnim = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    super.disconnectedCallback();
  }

  animate( time) {
    this._group.rotation.z = Math.sin( time * 0.0001) * this.speed;
    window.requestAnimationFrame( this._boundAnimateFn);
  }
}

window.customElements.define( "my-anim-plane", MyAnimPlane);

// eof