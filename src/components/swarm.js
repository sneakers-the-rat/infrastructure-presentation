import React from 'react';
import Peer from './peer';

import {toRadians, translate_str} from './utils';
import {swarm_params} from './params';

export default class Swarm extends React.Component{
  constructor(props) {
    super(props);

    let originalstate = this.generate();
    this.state = {
      peers: originalstate.peers,
      position: this.props.position,
      orientation: this.props.orientation,
    }

    this.getPeers = this.getPeers.bind(this);
  }

  generate(){
    let n_peers, peer_names;
    if (Number.isInteger(this.props.peers.n)){
      n_peers = this.props.peers.n;
      peer_names = [];
      for (let i=0;i<n_peers;i++){
        peer_names.push(String.fromCharCode(97+i))
      }
    } else {
      n_peers = this.props.peers.names.length;
      peer_names = this.props.peers.names;
    }

    let peers = [];
    let n_range = this.props.peers.datasets.n_range;
    for (let i=0; i<n_peers; i++){
      let peer_name = peer_names[i];
      let position_angle = (360/n_peers)*i;
      let display_angle = position_angle-90;
      let position = [
          this.props.radius*Math.cos(toRadians(position_angle)),
          this.props.radius*Math.sin(toRadians(position_angle))
      ]
      let datasets = {
        n: Math.floor(Math.random()*(n_range[1]-n_range[0])+n_range[0]),
        col_range: this.props.peers.datasets.col_range,
        size_range: this.props.peers.datasets.size_range
      }
      peers.push({
        name:peer_name,
        orientation:display_angle,
        position,
        datasets
      })

    }
    return({peers})

  }

  getPeers(){
    //  give a peer the list of other peers!
    return(JSON.parse(JSON.stringify(this.state.peers)))
  }

  render(){
    let peer_svgs = []
    for (let peer_name in this.state.peers){
      let peer = this.state.peers[peer_name]
      peer_svgs.push(<Peer {...peer} getPeers={this.getPeers}/>);
    }
    return(
        <g style={{transform: translate_str(this.state.position[0], this.state.position[1], this.state.orientation)}}
          id={'swarm-'+this.props.name}
           className={'swarm'}
        >
          {peer_svgs}

        </g>
    )

  }
}

Swarm.defaultProps = {
  name:'',
  radius:1000,
  peers: {
    names: ['jonny', 'rumbly'],
    datasets:{
      n_range: [2,5],
      col_range:[3,6],
      size_range:[2,6]
    }
  },
  position: [0, 0],
  orientation: 0,
  scale: 1,
  center: false
}
