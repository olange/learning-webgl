// Title: Mixing an image with camera
// Author: Olivier Lange
//
// How-to run: copy & past into https://www.shadertoy.com/new
//
// iChannel0: pick any texture
// iChannel1: pick any texture

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;

    float t = iTime;
    float k = floor( fract(t+uv.y*10.0)*2.0);
    vec3 img = texture(iChannel0,uv).rgg;
    vec3 col = vec3(k);

    col -= img;

    float cut = fract(t * 0.5);
    cut = (sin( t) + 1.0) * 0.5;
    if(uv.x > cut) {
        col = img;
    }

    fragColor = vec4(col,1.0);
}

// Tip: « Shadertoy Custom Textures » Chrome extension allows to drag & drop an image from Finder to the Shadertoy channels
// https://chrome.google.com/webstore/detail/shadertoy-custom-texures/jgeibpcndpjboeebilehgbpkopkgkjda?hl=en