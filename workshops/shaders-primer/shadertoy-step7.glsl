// Title: Transforming images with sound
// Author: Leander Herzog & Olivier Lange
//
// How-to run: copy & past into https://www.shadertoy.com/new
//
// iChannel0: pick any texture
// iChannel1: pick any texture
// iChannel2: pick a SoundCloud track

void mainImage( out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    vec3 img1 = texture( iChannel0, uv).rgb;
    vec2 e = uv;

    e.x *= img1.r * 0.3;
    float sound = texture( iChannel2, e).r;

    e.y -= sound * 0.4;
    vec3 img2 = texture( iChannel1, e).rgb;

    //vec3 d = vec3( uv.x, uv.y, 0.0);
    fragColor = vec4( img2, 1.0);
}

// Tip: « Shadertoy Custom Textures » Chrome extension allows to drag & drop an image from Finder to the Shadertoy channels
// https://chrome.google.com/webstore/detail/shadertoy-custom-texures/jgeibpcndpjboeebilehgbpkopkgkjda?hl=en