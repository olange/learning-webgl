# Codelab « First steps with WebGL and Three.js »

A few WebGL and Three.js code experiments, inspired by the « [Intro to WebGL with Three.js](http://davidscottlyons.com/threejs-intro/) » slides of David Scott Lyons.

![Intro to WebGL with Three.js · Screenshot](https://user-images.githubusercontent.com/673088/42326923-c9b5bc30-806a-11e8-9b75-a1825e3cef07.png)

## Experiments

1. [Setting up renderer, camera, scene](http://davidscottlyons.com/threejs-intro/#scene-required) and ambient light
2. [Box and sphere meshes](http://davidscottlyons.com/threejs-intro/#slide-46)
3. [Dashed lines](https://threejs.org/docs/#api/materials/LineDashedMaterial)
4. [Mixing HTML with WebGL canvas: transparent overlay](index.html#L9)
5. [Animating the scene, every 15ms](index.js#L89)
6. [Camera orbit controls](http://davidscottlyons.com/threejs-intro/#slide-38)
7. Correctly setting aspect and canvas dimension with CSS  
   (using `.clientWidth/Height` CSS properties – see [WebGL Anti-patterns #2](https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html))
8. [Texturing the sphere with a color map](http://davidscottlyons.com/threejs-intro/#slide-74) (the earth)
9. Using [PRPL HTTP2 server](https://github.com/Polymer/prpl-server-node) to serve assets (script, libraries and textures)
10. [Importing libraries as ES6 modules](https://threejs.org/docs/#manual/introduction/Import-via-modules)

## Usage

Run the HTTP local server:

```
cd codelabs/intro-to-webgl
npm start
```

and then open your browser at [`localhost:8080`](http://localhost:8080/).

## Setup

Assuming you have Git and Node installed:

### Clone the repository

```
git clone git@github.com:olange/learning-webgl.git
cd learning-webgl
```

### Download the project dependencies

```
cd codelabs/intro-to-webgl
npm install
````
