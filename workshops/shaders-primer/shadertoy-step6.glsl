// Title: Mixing images with each other
// Author: Olivier Lange
//
// How-to run: copy & past into https://www.shadertoy.com/new
//
// iChannel0: pick any texture
// iChannel1: pick any texture

void mainImage( out vec4 fragColor, in vec2 fragCoord) {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;

    vec2 e = vec2( uv.x * fract( iTime + uv.x * 7.0) * 0.3, uv.y);

    vec3 img1 = texture( iChannel0, e).rgb;
    vec3 img2 = texture( iChannel1, uv).rgb;

    // Output to screen
    fragColor = vec4( img2*0.5 + img1, 1.0);
}

// Tip: « Shadertoy Custom Textures » Chrome extension allows to drag & drop an image from Finder to the Shadertoy channels
// https://chrome.google.com/webstore/detail/shadertoy-custom-texures/jgeibpcndpjboeebilehgbpkopkgkjda?hl=en