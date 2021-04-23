import React from 'react'
import random from 'random'

// function gauss(mean=0, variance=0) {
//   let u = 0, v = 0;
//   while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
//   while(v === 0) v = Math.random();
//   let res = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
//   return ((res*variance)+mean)
// }

function gauss(mean=0,variance=1){
  return ((Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random())*variance)+mean);
}

export default class Dataset extends React.Component {
  // props
  // --------------------------------------
  // cols: [{name: "name_of_col", size:int},...]
  // name: str
  // scatter: [h_center, h_size, v_center, v_size]

  constructor(props) {
    super(props);

    let svgs = this.generate_svg();

    this.state = {
      header: svgs.header,
      blocks: svgs.blocks,
      outlines: svgs.outlines,
      position: this.props.position,
      orientation: this.props.orientation
    }

    console.log('constructor state', svgs);

  }

  generate_svg() {
    let n_cols = this.props.cols.length;

    // --------------------------------------
    // header
    // --------------------------------------
    // compute main rect width
    let header_width = params.block_size*n_cols + params.padding*(n_cols-1);
    // the center of the header is the centerpoint of the svg
    // let center = {x: header_width/2, y: params.header_height/2};
    let header = {
      x: 0,
      y: 0,
      width: header_width,
      height: params.header_height
    }

    // --------------------------------------
    // blocks
    // iterate through cols and make the blocks
    let top = {x: 0, y:params.header_height+params.padding}

    let blocks = {};
    let col_n = 0;
    console.log('col iter', this.props.cols);
    for (let col in this.props.cols){
      col = this.props.cols[col]
      blocks[col.name] = [];
      for (let i = 0; i < col.size; i++){
        blocks[col.name].push({
          x: top.x + col_n*params.block_size + col_n*params.padding,
          y: top.y +     i*params.block_size +     i*params.padding,
          width: params.block_size,
          height: params.block_size
        })
        console.log(blocks);
      }
      col_n += 1;
    }

    // --------------------------------------
    // scatter
    if (this.props.scatter[1] > 0 | this.props.scatter[3]>0){
      let x_generator = random.exponential(this.props.scatter[1]);
      let y_generator = random.exponential(this.props.scatter[3]);
      for (let col in this.props.cols){
        col = this.props.cols[col];
        for (let i = 0; i < col.size; i++) {
          // calculate amount to translate h & v
          let x_trans = x_generator()+this.props.scatter[0];
          let y_trans = y_generator()+this.props.scatter[2];
          // random rotation
          let rotation = Math.random()*360;
          let tfm_str = 'translate('+x_trans+','+y_trans+') rotate('+rotation+','+blocks[col.name][i]['x']+','+blocks[col.name][i]['y']+')'
          blocks[col.name][i]['transform'] = tfm_str
        }
      }

    }

    let outlines = {}
    if (this.props.outlines === true){
      for (let col in this.props.cols){
        col = this.props.cols[col]
        outlines[col.name] = [];
        for (let i = 0; i < col.size; i++){
          outlines[col.name].push({
            x: top.x + col_n*params.block_size + col_n*params.padding,
            y: top.y +     i*params.block_size +     i*params.padding,
            width: params.block_size,
            height: params.block_size
          })
        }
        col_n += 1;
      }
    }

    return({header, blocks, outlines});
  }




  render() {
    // --------------------------------------
    // blocks
    let blocks_svg = [];
    for (let col in this.state.blocks){
      console.log('col', col);
      let i = 0;
      for (let block in this.state.blocks[col]){
        block = this.state.blocks[col][block];
        console.log('block', {...block});
        blocks_svg.push(<rect {...block} className={'dataset-block'} id={'dataset-block-'+this.props.name+'-'+i}></rect>);
        i+=1;
      }
    }

    // --------------------------------------
    // outlines
    let outlines_svg = [];
    if (this.props.outlines === true){
      for (let col in this.state.outlines){
        let i = 0;
        for (let outline in this.state.outlines[col]){
          outline = this.state.outlines[col][outline];
          outlines_svg.push(<rect {...outline} className={'dataset-outline'} id={'dataset-outline-'+this.props.name+'-'+i}></rect>);
          i+=1;
        }
      }
    }


    // --------------------------------------
    // rotation
    let translate_str = 'translate('+this.state.position[0]+','+this.state.position[1]+')';
    let rotate_str = 'rotate('+this.state.orientation+")";
    let transform_str = translate_str + ' ' + rotate_str;


    return(
    <g transform={transform_str}>
      <rect {...this.state.header} className={'dataset-header'} id={'dataset-header-'+this.props.name}></rect>
      {blocks_svg}
      {outlines_svg}
    </g>

    )
  }
}

Dataset.defaultProps = {
  position: [0,0],
  orientation: 0,
  scatter: [0,0,0,0],
  outlines: false
}

const params = {
  block_size: 50,
  header_height: 100,
  padding:10,
}

const styles = {
  block: {
    width: params.block_size,
    height: params.block_size
  },
  header: {
    fill: "blue"
  },
  col_label: {
    textAnchor: 'end'
  }
}
