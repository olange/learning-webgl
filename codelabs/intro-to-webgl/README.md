# Codelab « First steps with WebGL and Three.js »

A few WebGL and Three.js code experiments, inspired by the « [Intro to WebGL with Three.js](http://davidscottlyons.com/threejs-intro/) » slides of David Scott Lyons.

![Intro to WebGL with Three.js · Screenshot](https://user-images.githubusercontent.com/673088/42326923-c9b5bc30-806a-11e8-9b75-a1825e3cef07.png)

## Features (very basic!)

* Setting up renderer, scene and camera
* Box and sphere basic meshes
* Animating the scene
* Correctly setting canvas dimension with CSS (using `.clientWidth/Height` CSS properties – see [WebGL Anti-patterns #2](https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html))
* Texturing the sphere with a color map (the earth)

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
