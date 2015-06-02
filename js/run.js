/* exported run */

var prevTime = 0;
function update() {

	// uniformsInput.time.value = clock.getElapsedTime();

	// FBOC.step();
	var currTime = clock.getElapsedTime();
	if ( currTime - prevTime > 0.1 && FBOC.currentStep <= FBOC.totalSortStep ) {
		FBOC.stepPerUpdate( 1 );
		prevTime = currTime;
	}

	// psys.setPositionBuffer( FBOC.getPass( 'positionPass' ).getRenderTarget() );
	// psys.material.uniforms.velocityBuffer.value = FBOC.getPass( 'velocityPass' ).getRenderTarget();
	FBOC.stepPerSecond = FBOC.currentStep / clock.getElapsedTime();
	updateGuiDisplay();

}


// ----  draw loop
function run() {

	requestAnimationFrame( run );
	renderer.clear();

	if ( !sceneSettings.pause ) {
		update();
	}

	renderer.render( scene, camera );

	if ( sceneSettings.showFrameBuffer ) {
		// hud.setInputTexture( FBOC.getPass( 'velocityPass' ).getRenderTarget() );
		hud.setInputTexture( FBOC.getPass( 'sortPass' ).getRenderTarget() );	// need to update!
		hud.render();
	}

	stats.update();

}
