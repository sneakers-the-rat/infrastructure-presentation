import React from 'react'
import random from 'random'
import anime from 'animejs/lib/anime.es.js'

import Dataset from './dataset'

export default class Peer extends React.Component {
  constructor(props){
    super(props)

    let originalstate = this.generate();

    this.state = {
      datasets:originalstate.datasets,
      position: this.props.position,
      orientation: this.props.orientation
    }

  }

  generate(){
    let n_datasets = this.props.datasets.names.length;
    let datasets = {};

    for (let i=0; i<n_datasets; i++){
      // space evenly in dataset_angle
      let ds_name = this.props.datasets.names[i];
      let position_angle = (this.props.dataset_angle/(n_datasets-1))*i+((180-this.props.dataset_angle)/2);
      // rotate to be at the bottom

      let display_angle = position_angle- 90;
      console.log(position_angle, display_angle);
      let position = [
          params.outer_radius * Math.cos(toRadians(position_angle)),
          params.outer_radius * Math.sin(toRadians(position_angle))
          ]

      // make some fake columns
      let cols = [];
      let n_cols = Math.floor(Math.random()*(this.props.datasets.col_range[1]-this.props.datasets.col_range[0]))+this.props.datasets.col_range[0]
      for (let j=0; j<n_cols; j++){

        cols.push({
          name: j,
          size: Math.floor(Math.random()*(this.props.datasets.size_range[1]-this.props.datasets.size_range[0]))+this.props.datasets.size_range[0]
        })
      }
      datasets[ds_name] = {
        name: ds_name,
        cols: cols,
        position: position,
        orientation: display_angle,
        scale:params.ds_scale
      }



    }
    return({datasets})
  }

  translate_str(x, y, rotation){
    return('translateX(' + x + 'px) translateY(' + y + 'px) rotate(' +
        rotation + 'deg)')
  }

  render(){
    let dataset_svgs = []
    for (let dataset_name in this.state.datasets){
      let dataset = this.state.datasets[dataset_name]
      dataset_svgs.push(<Dataset {...dataset}/>)

    }
    return(
        <g style={{transform: this.translate_str(this.state.position[0], this.state.position[1], this.state.orientation)}}
           id={'peer-'+this.props.name}
           className={'peer'}
        >
          <circle cx={0} cy={0} r={params.inner_radius}
                  className={'peer-circle-inner'}/>
          <circle cx={0} cy={0} r={params.outer_radius}
                  className={'peer-circle-outer'}/>
          {dataset_svgs}
        </g>
    )
  }
}

Peer.defaultProps = {
  name:'',
  datasets:{
    names: ['A', 'B', 'C'],
    col_range: [3,6],
    size_range: [2,6]
  },
  position: [0, 0],
  orientation: 0,
  scale: 1,
  dataset_angle: 90
}

function toRadians(angle){
  return angle * (Math.PI / 180);
}


const params = {
  inner_radius: 100,
  outer_radius: 150,
  padding: 10,
  inner_hover: {
    scale: 1.4,
    duration_enter: 300,
    duration_exit: 500,
    elasticity: 400,
  },
  ds_scale:0.3
}
