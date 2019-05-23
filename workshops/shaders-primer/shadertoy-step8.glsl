// Title: A Truchet Tile pattern
// Author: pjkarlik
// Adapted from https://github.com/pjkarlik/TruchetTiles/blob/master/src/shader/truchet/fragmentShader.js

#ifdef GL_ES
  precision mediump float;
#endif

#define PI 3.14159265358979323846264

float nSeed = 0.34999999999999998;
bool lineMode = false;
float tSize = 0.10000000000000001;

vec2 hash2( vec2 p) {
  vec2 o = (p+0.5)/256.0;
  return o;
}

float goldNoise( vec2 coord, float seed){
  float phi = 1.61803398874989484820459 * 00000.1;
  float pi2 = PI * 00000.1;
  float sq2 = 1.41421356237309504880169 * 10000.0;
  float temp = fract(
    sin(
      dot(
        coord*(seed+phi), vec2(phi, pi2)
      )
    ) * sq2
  );
  return temp;
}

vec3 pattern( vec2 uv) {
  vec2 grid = floor(uv);
  vec2 subuv = fract(uv);
  float mult = 0.5;
  float dnoise = goldNoise(grid, nSeed);
  vec2 rand = hash2(grid);
  float shade = 0.;
  float df;
  float check = dnoise;
  if( check <= .25 ) {
    df = subuv.x - subuv.y; // tl
  } else if( check <= .5 ) {
    df = 1. - subuv.y - subuv.x;
  } else if( check <= .75 ) {
    df = subuv.y - subuv.x;
  } else if( check <= 1. ) {
    df = subuv.y - 1. + subuv.x;
  }
  shade = smoothstep(.0, -.02, df);
  if (lineMode)
	shade += smoothstep(.02, .04, df);
  return vec3( shade );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord) {
  float fScale = (tSize == 0.0) ? max( iResolution.x, iResolution.y) : 1.0 / tSize;
  vec2 uv = ( fragCoord.xy - 0.5 * iResolution.xy) / min( iResolution.y, iResolution.x);
  uv *= fScale;
  vec3 colour = pattern( uv);
  fragColor = vec4( colour, colour.r);
}