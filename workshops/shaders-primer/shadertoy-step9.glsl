// Title: Standard code template of Shadertoy
// Author: Nicola Papale

void mainImage( out vec4 fragColor, in vec2 fragCoord) {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;

    // Position varying pixel color, taken from textures
    vec3 img1 = texture( iChannel0, uv).rgb;
    vec3 img2 = texture( iChannel1, uv).rgb;
    vec3 m = mix( img1, img2, uv.x);

    float t = iTime / 1.0 ;
    if( uv.x > 0.5) { t *= -1.0; }
	float ydemo =sin( t * uv.y * 100.0); 
    float xdemo =  cos( uv.x * 230.0);
    float demo = ydemo * xdemo;
    if( uv.x > iMouse.x / 1000.0) { demo *= 2.0; }

    // Output to screen
    fragColor = vec4( m * demo, 1.0);
}

// How-to run: copy & past into https://www.shadertoy.com/new
