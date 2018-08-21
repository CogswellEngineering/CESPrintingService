//This will be canvas of three js to preview 3D models.
import React, { Component } from 'react';
import threeEntryPoint from './threejs/threeEntryPoint';
//Fuck the organization he had.


export default class ModelViewer extends Component {

  componentDidMount() {
    //Could do it like this or directly embed into here, if do like this, then threejs doesn't need to be within react to be used.

    threeEntryPoint(this.threeRootElement, this.props.modelPath);

   
    const screenDimensions = {width:400, height: 600};
   

    //scene.add(object);
    //In terms of making it work with react, json way has been nly way to work, but converter it is a pain.
  //  var modelJSON =  require("./sword-01.json");
  /*  const object = loader.parse(modelJSON,
      (object) => {

        this.scene.add(object);
    console.log("object",object);

        this.renderer.render(this.scene, this.camera);
      });
   */
  
    //Excapt same problem....
  //  const object = loader.parse("./sword-01.obj")
  //  this.scene.add(object);
    //    this.renderer.render(this.scene, this.camera);
    }

  


  render () {
      return (
        <div ref={element => this.threeRootElement = element} />
      );
  }
}