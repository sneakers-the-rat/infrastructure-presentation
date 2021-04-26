import React from 'react';

import Dataset from './dataset';
import {peer_params} from './params';
import {toRadians} from './utils';

export default class Peer extends React.Component {
  constructor(props){
    super(props)

    let originalstate = this.generate();

    this.state = {
      datasets:originalstate.datasets,
      position: this.props.position,
      orientation: this.props.orientation,
      peers: this.props.peers,
      requests: []
    }

  }

  generate(){
    let n_datasets;
    let dataset_names;
    if (Number.isInteger(this.props.datasets.n)){
      n_datasets = this.props.datasets.n;
      dataset_names = [];
      for (let i=0;i<n_datasets;i++){
        dataset_names.push(String.fromCharCode(97+i))
      }
    } else {
      n_datasets = this.props.datasets.names.length;
      dataset_names = this.props.datasets.names;
    }
    let datasets = {};

    for (let i=0; i<n_datasets; i++){
      // space evenly in dataset_angle
      let ds_name = dataset_names[i];
      let position_angle = (this.props.dataset_angle/(n_datasets-1))*i+((180-this.props.dataset_angle)/2);
      // rotate to be at the bottom

      let display_angle = position_angle- 90;
      console.log(position_angle, display_angle);
      let position = [
          peer_params.outer_radius_scale*this.props.upload * Math.cos(toRadians(position_angle)),
          peer_params.outer_radius*this.props.upload * Math.sin(toRadians(position_angle))
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
        scale:peer_params.ds_scale
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
          <circle cx={0} cy={0} r={peer_params.inner_radius_scale*this.props.upload}
                  className={'peer-circle-inner'}/>
          <circle cx={0} cy={0} r={peer_params.outer_radius_scale*this.props.upload}
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
  dataset_angle: 90,
  upload:1,
  download:1,
  peers: {}
}



