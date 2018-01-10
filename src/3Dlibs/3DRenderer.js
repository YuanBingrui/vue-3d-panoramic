var ThreeRender = {};

ThreeRender._main_ = function(THREE, threeDshowBoxObj) {
	var camera, scene, renderer;
	var geometry, material, mesh;
	var target = new THREE.Vector3();

	var lon = -90, lat = 0,
			phi = 0, theta = 0,
			touchX, touchY, isUserInteracting = false,
			boxWidth, boxHeight;

	init();
	animate();

	function init() {
		boxWidth = threeDshowBoxObj.$el.clientWidth;
		boxHeight = threeDshowBoxObj.$el.clientHeight - 33;

		camera = new THREE.PerspectiveCamera( 260, boxWidth / boxHeight, 1, 1000 );

		scene = new THREE.Scene();

		geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
		geometry.scale( -1, 1, 1 );

		var loader = new THREE.CubeTextureLoader();
		//loader.setPath( '../../static/cube/' );

		var textureCube = loader.load(threeDshowBoxObj.cubeImg);

		material = new THREE.MeshBasicMaterial( { envMap: textureCube } );

		mesh = new THREE.Mesh( geometry, material );

		scene.add( mesh );

		removeAllChild();
		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( boxWidth, boxHeight );
		threeDshowBoxObj.$el.appendChild( renderer.domElement );

		threeDshowBoxObj.$on( 'mousedown', onDocumentMouseDown );
    threeDshowBoxObj.$on( 'wheel', onDocumentMouseWheel );

    threeDshowBoxObj.$on( 'touchstart', onDocumentTouchStart );
    threeDshowBoxObj.$on( 'touchmove', onDocumentTouchMove );
    threeDshowBoxObj.$on( 'handelresize', handleResize );

    window.addEventListener( 'resize', onWindowResize, false );
  }
  function animate() {

    requestAnimationFrame(animate);
    if (isUserInteracting) {
			lon += 0.1;
		}
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    target.y = 500 * Math.cos( phi );
    target.z = 500 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( target );
    renderer.render( scene, camera );

	}

	function onWindowResize() {
    threeDshowBoxObj.$emit('handelresize', threeDshowBoxObj);
	}

	function handleResize(vmthreeD){
		
		camera.aspect = vmthreeD.$el.clientWidth / (vmthreeD.$el.clientHeight - 33);
    camera.updateProjectionMatrix();

    renderer.setSize( vmthreeD.$el.clientWidth, vmthreeD.$el.clientHeight - 33 );

	}

	function onDocumentMouseDown( event ) {

    if(isUserInteracting){
    	isUserInteracting = false;
    }else{
    	isUserInteracting = true;
    }

    threeDshowBoxObj.$on( 'mousemove', onDocumentMouseMove );
    threeDshowBoxObj.$on( 'mouseup', onDocumentMouseUp );

	}

	function onDocumentMouseMove( event ) {

    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    lon -= movementX * 0.1;
    lat += movementY * 0.1;

	}

	function onDocumentMouseUp( event ) {

    threeDshowBoxObj.$off( 'mousemove', onDocumentMouseMove );
    threeDshowBoxObj.$off( 'mouseup', onDocumentMouseUp );

	}

	function onDocumentMouseWheel( event ) {
		if(camera.fov >= 260 && camera.fov <= 350){
			camera.fov += event.deltaY * 0.05;
			if(camera.fov === 255) {
				camera.fov = 260;
			}
			if(camera.fov === 355) {
				camera.fov = 350;
			}
			camera.updateProjectionMatrix();
		}
	}

	function onDocumentTouchStart( event ) {

    var touch = event.touches[ 0 ];

    touchX = touch.screenX;
    touchY = touch.screenY;

	}

	function onDocumentTouchMove( event ) {

    var touch = event.touches[ 0 ];

    lon -= ( touch.screenX - touchX ) * 0.1;
    lat += ( touch.screenY - touchY ) * 0.1;

    touchX = touch.screenX;
    touchY = touch.screenY;

	}

	function removeAllChild() {    
    while(threeDshowBoxObj.$el.hasChildNodes()) {
      threeDshowBoxObj.$el.removeChild(threeDshowBoxObj.$el.firstChild);  
    }  
	} 
}

export default ThreeRender;