import React from 'react';
import { Peer, makePeer } from './peer';

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
      peer_names = false
    } else {
      n_peers = this.props.peers.names.length;
      peer_names = this.props.peers.names;
    }

    let peers = {};
    let n_range = this.props.peers.datasets.n_range;
    for (let i=0; i<n_peers; i++){
      let peer = makePeer(n_range,
          this.props.peers.datasets.col_range,
          this.props.peers.datasets.size_range)
      if (Array.isArray(peer_names) ){
        peer.name = peer_names[i]
      }
      let position_angle = (360/n_peers)*i;
      peer.orientation = position_angle-90;
      peer.position = [
          this.props.radius*Math.cos(toRadians(position_angle)),
          this.props.radius*Math.sin(toRadians(position_angle))
      ]
      peers[peer.name] = peer
      console.log(peer)

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
  radius:500,
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
