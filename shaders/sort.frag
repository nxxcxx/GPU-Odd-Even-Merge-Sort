
uniform vec2 resolution;
uniform sampler2D mirrorBuffer;
uniform float evenPass;

bool selectTex( vec2 uv, vec2 tx ) {

	bool res = false;
	float e = 1.0 / resolution.x;

	if ( abs( uv.x - tx.x ) < e &&
		  abs( uv.y - tx.y ) < e
	) {
		res = true;
	}

	return res;
}

void main() {

	vec3 test = vec3( 1.0, 0.0, 1.0 );

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	vec2 currTex = uv;
	float currVal = texture2D( mirrorBuffer, currTex ).r;

	vec3 color = vec3( 0.0, 0.0, 0.0 );

	color = vec3( texture2D( mirrorBuffer, uv ).r );


	float evenRow = mod( floor( gl_FragCoord.y ), 2.0 );

	float compare = 0.0;

	if ( evenPass < 0.5 ) {

		if ( evenRow < 0.5 ) {

			vec2 nextTex = ( gl_FragCoord.xy + vec2( 0.0, 1.0 ) ) / resolution.xy;
			float nextVal = texture2D( mirrorBuffer, nextTex ).r;

			if ( currVal > nextVal ) color = vec3( nextVal );

		} else { // if odd row

			vec2 prevTex = ( gl_FragCoord.xy - vec2( 0.0, 1.0 ) ) / resolution.xy;
			float prevVal = texture2D( mirrorBuffer, prevTex ).r;

			if ( currVal < prevVal ) color = vec3( prevVal );

		}

	} else { // if odd pass

		if ( evenRow > 0.5 ) { // if odd row

			vec2 nextTex = vec2( 0.0 );
			nextTex = ( gl_FragCoord.xy + vec2( 0.0, 1.0 ) ) / resolution.xy;
			if ( gl_FragCoord.y + 1.0 > resolution.y ) {
				nextTex = vec2( gl_FragCoord.x + 1.0, 0.5 ) / resolution.xy;
				if ( gl_FragCoord.x + 1.0 > resolution.x ) {
					nextTex = currTex;
				}
			}

			float nextVal = texture2D( mirrorBuffer, nextTex ).r;
			if ( currVal > nextVal ) color = vec3( nextVal );

		} else { // if even row

			vec2 prevTex = vec2( 0.0 );
			prevTex = ( gl_FragCoord.xy - vec2( 0.0, 1.0 ) ) / resolution.xy;
			if ( gl_FragCoord.y - 1.0 < 0.0 ) {
				prevTex = vec2( gl_FragCoord.x - 1.0, resolution.y - 0.5) / resolution.xy;
				if ( gl_FragCoord.x - 1.0 < 0.0 ) {
					prevTex = currTex;
				}
			}

			float prevVal = texture2D( mirrorBuffer, prevTex ).r;
			if ( currVal < prevVal ) color = vec3( prevVal );

		}

	}


	gl_FragColor = vec4( color, 1.0 );

}
