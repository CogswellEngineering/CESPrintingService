//This will be canvas of three js to preview 3D models.
import React, { Component } from 'react';
import threeEntryPoint from './threejs/threeEntryPoint';


export default class ModelViewer extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }
  render () {
      return (
        <div ref={element => this.threeRootElement = element} />
      );
  }
}