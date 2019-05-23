// Title: Standard code template of Shadertoy
// Author: Olivier Lange & Leander Herzog

void mainImage( out vec4 fragColor, in vec2 fragCoord) {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;

    // Time and position varying pixel color
    float t = iTime * 30.0;
    if( uv.x > 0.5) {
    	t *= -1.0;
    }

    float demo = sin( t + uv.y * 200.0);
    if( uv.x > iMouse.x / 1000.0) {
      demo *= 20.0;
    }

    // Output to screen
    fragColor = vec4( demo);
}

// How-to run: copy & past into https://www.shadertoy.com/new