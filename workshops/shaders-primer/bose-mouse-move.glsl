// Title: Vanilla WebGL Shader - Basic mouse move
// Author: Dave de Sandro
// Source: https://codepen.io/desandro/pen/GzvbJN

#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float lessCoord = min( u_resolution.x, u_resolution.y );
vec2 resRatio = u_resolution / vec2( lessCoord );

void main() {
  vec2 grad = abs( ( gl_FragCoord.xy  - u_mouse ) / u_resolution * resRatio );
  // could do something fun with u_time
  // float theta = sin( u_time ) * 0.5 + 0.5;
  float screenX = gl_FragCoord.x / u_resolution.x;
  gl_FragColor = vec4( grad.x, grad.y, screenX, 1.0 );
}

// How-to run: copy & past into http://editor.thebookofshaders.com