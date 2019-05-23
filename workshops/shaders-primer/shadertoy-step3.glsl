// Title: Standard code template of Shadertoy
// Author: Olivier Lange & Leander Herzog

void mainImage( out vec4 fragColor, in vec2 fragCoord) {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;

    // Position varying pixel color, taken from textures
    vec3 img1 = texture( iChannel0, uv).rgb;
    vec3 img2 = texture( iChannel1, uv).rgb;
    vec3 m = mix( img1, img2, uv.x);

    // Output to screen
    fragColor = vec4( m, 1.0);
}

// How-to run: copy & past into https://www.shadertoy.com/new