
function Sort( _size ) {

	this.size = _size;

}

Sort.prototype.generateDataTexture = function () {

	var data = new Float32Array( this.size * this.size * 4 );

	for ( var i = 0; i < data.length; i += 4 ) {


		data[ i + 0 ] = Math.random();
		data[ i + 1 ] = Math.random();
		data[ i + 2 ] = Math.random();
		data[ i + 3 ] = 1.0;

	}

	var texture = new THREE.DataTexture( data, this.size, this.size, THREE.RGBAFormat, THREE.FloatType );
	texture.minFilter = THREE.NearestFilter;
	texture.magFilter = THREE.NearestFilter;
	texture.needsUpdate = true;

	return texture;

};
