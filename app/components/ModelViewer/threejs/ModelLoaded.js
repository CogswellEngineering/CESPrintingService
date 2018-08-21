//This will be threejs code for rendering the model uploaded.

var THREE = require('three');
var OBJLoader = require('three-obj-loader');

OBJLoader(THREE);
export default (scene, modelPath) => {

    console.log("model path", modelPath);
    var loader = new THREE.OBJLoader();


    //Okay it works now, only in built product though, which is fine.
    loader.load(modelPath,
    
        function (object) {
            console.log("object loaded",object);
            scene.add(object);
        },
        // called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened', error );

	},
    );

    
   
    function update(time){


    }

    function uploadModel(modelURL){

        
    }

    return {

        update,
    }


}