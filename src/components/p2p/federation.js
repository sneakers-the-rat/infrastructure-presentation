import React from 'react';
import * as d3 from 'd3'
import {SlideContext, useSteps, FlexBox} from 'spectacle';
import ColorPicker from '../input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Box } from 'spectacle';
import * as colors from '@material-ui/core/colors';
import {distance} from '../utils';

const defaultNodes = [
  {id:1, group:0, size:10},
  {id:2, group:0, size:10},
  {id:3, group:0, size:10},
  {id:4, group:0, size:10},
  {id:5, group:0, size:10},
  {id:6, group:0, size:10},
  {id:7, group:0, size:10},
  {id:8, group:0, size:10},
  {id:9, group:0, size:10},
  {id:10, group:0, size:50},
  {id:11, group:1, size:10},
  {id:12, group:1, size:10},
  {id:13, group:1, size:10},
  {id:14, group:1, size:10},
  {id:15, group:1, size:10},
  {id:16, group:1, size:10},
  {id:17, group:1, size:10},
  {id:18, group:1, size:10},
  {id:19, group:1, size:10},
  {id:20, group:1, size:50}

]

const defaultLinks = [
  {source: 1, target: 10, value:1},
  {source: 2, target: 10, value:1},
  {source: 3, target: 10, value:1},
  {source: 4, target: 10, value:1},
  {source: 5, target: 10, value:1},
  {source: 6, target: 10, value:1},
  {source: 7, target: 10, value:1},
  {source: 8, target: 10, value:1},
  {source: 9, target: 10, value:1},
  {source: 1, target: 2, value:1},
  {source: 1, target: 3, value:1},
  {source: 1, target: 6, value:1},
  {source: 1, target: 7, value:1},
  {source: 1, target: 8, value:1},
  {source: 2, target: 8, value:1},
  {source: 2, target: 3, value:1},
  {source: 2, target: 9, value:1},
  {source: 2, target: 5, value:1},
  {source: 11, target: 20, value:1},
  {source: 12, target: 20, value:1},
  {source: 13, target: 20, value:1},
  {source: 14, target: 20, value:1},
  {source: 15, target: 20, value:1},
  {source: 16, target: 20, value:1},
  {source: 17, target: 20, value:1},
  {source: 18, target: 20, value:1},
  {source: 19, target: 20, value:1},
  {source: 11, target: 12, value:1},
  {source: 11, target: 13, value:1},
  {source: 11, target: 16, value:1},
  {source: 11, target: 17, value:1},
  {source: 11, target: 18, value:1},
  {source: 12, target: 18, value:1},
  {source: 12, target: 13, value:1},
  {source: 12, target: 19, value:1},
  {source: 12, target: 15, value:1},
  {source: 20, target: 10, value:4}
]

export default function Federation(
    {startNodes,
        startLinks,
  width=1920,
        height=1080,
        id, stepIndex
   }){

  const [nodes, setNodes] = React.useState(startNodes.map(d => Object.create(d)))
  const [links, setLinks] = React.useState(startLinks.map(d => Object.create(d)))


  const numberOfSteps = 2;
  const { activeStepIndex, isSlideActive } = React.useContext(SlideContext);

  const { stepId, isActive, stepNum, placeholder } = useSteps(numberOfSteps, {
    id, stepIndex,
  });

  const [showGroup, setShowGroup] = React.useState(1)
  const [showNodes, setShowNodes] = React.useState([])
  const [showLinks, setShowLinks] = React.useState([])
  const nodesMade = React.useRef(0)

  // node adding state
  const [drawGroupColor, setDrawGroupColor] = React.useState('rgb(244, 67, 54)')
  const [drawGroupIndex, setDrawGroupIndex] = React.useState('red')
  const [drawSize, setDrawSize] = React.useState(10)
  const [connectSize, setConnectSize] = React.useState(50)

  const showLinksTemp = React.useRef([])
  const showNodesTemp = React.useRef([])

  const simulation = React.useRef()

  React.useEffect(() => {
    setShowGroup(activeStepIndex)
  }, [activeStepIndex])

  React.useEffect(() => {
    if (!isSlideActive && simulation.current !== undefined) {
      console.log('dismountin');
      simulation.current.stop()
    }
  },  [isSlideActive])

  React.useEffect(() => {
    showNodesTemp.current = nodes.filter(node => node.group <= showGroup || node.added === true)
    let showNodeIds = showNodesTemp.current.map(node => node.id);
    showLinksTemp.current = links.filter(link => (showNodeIds.includes(link.source.id) || showNodeIds.includes(link.target.id) || showNodeIds.includes(link.source) || showNodeIds.includes(link.target)))
    setShowNodes(showNodesTemp.current)
    setShowLinks(showLinksTemp.current)

    if (showNodesTemp.current.length>0) {
      simulation.current = d3.forceSimulation(showNodesTemp.current).
          force("link", d3.forceLink(showLinksTemp.current).id(d => d.id)).
          force("charge", d3.forceManyBody().strength(d=>d.size*-20).distanceMin(d=>d.size*1.5).distanceMax(300))
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("collisionForce", d3.forceCollide().radius(d=>d.size*1.2))

      simulation.current.on("tick", () => {
        try {
          d3.selectAll(".federation-svg-link").
              data(showLinksTemp.current).
              attr("x1", d => d.source.x).
              attr("y1", d => d.source.y).
              attr("x2", d => d.target.x).
              attr("y2", d => d.target.y);

          d3.selectAll(".federation-svg-node").
              data(showNodesTemp.current)
              .attr('transform', d => 'translate('+d.x+','+d.y+')').
              // attr("cx", d => d.x).
              // attr("cy", d => d.y).
          call(drag(simulation.current));
        } catch {
          console.log('')
        }
      });
    }

    console.log('fedration svg', showNodesTemp, showLinksTemp, links)
  }, [showGroup, nodes, links])

  const drag = (simulation) => {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
  }

  // React.useEffect(() => {
  //   console.log('in render effect', showNodes, showLinks)
  //
  //
  // }, [showNodes, showLinks])

  const mouseMove = (event) => {
    d3.select('#federation-cursor').attr('transform', 'translate('+(event.nativeEvent.layerX)+", "+(event.nativeEvent.layerY)+")")
  }

  React.useEffect(() => {

    return(() => (simulation.current.stop()))
  }, [])


  const handleChangeHue= (hue, color, groupIdx) => {
    setDrawGroupColor(color)
    setDrawGroupIndex(hue)
  };

  const handleChangeNodeSize = (event, newValue) => {
    setDrawSize(newValue)
  }

  const handleChangeConnectSize = (event, newValue) => {
    setConnectSize(newValue)
  }

  const addNode = (event) => {
    let point = d3.pointer(event);
    let newNode = {x: event.nativeEvent.layerX,
      y:event.nativeEvent.layerY,
      group:drawGroupIndex,
      added:true,
      size:drawSize,
      color:drawGroupColor,
      id:drawGroupIndex+'-'+nodesMade.current
    }
    nodesMade.current += 1

    let newLinks = nodes.map(node => {
      if (distance(node, newNode)<connectSize){
        return({source:node, target:newNode})
      }
    }).filter(item => item !== undefined)

    console.log(newNode, links, newLinks)
    setNodes([...nodes, newNode])
    setLinks([...links, ...newLinks])

  }

  return(
    <>
      <svg id={"federation-svg"} width={width} height={height} onMouseMove={mouseMove} onClick={addNode}>
      {placeholder}
      <g className={"federation-links"}>
        {showLinks && showLinks.map((link, i) => (
            <line {...link} key={'link-'+link.source.id+'-'+link.target.id}
                  id={'link-'+link.source.id+'-'+link.target.id}
                  className={"federation-svg-link"}
                  strokeWidth={link.value}
                  source={link.source}
                  target={link.target}
            />
        ))}
      </g>
        <g className={"federation-nodes"}>
          {showNodes && showNodes.map((node, i) => (
              <circle {...node} key={"node-"+node.id} id={node.id} className={"federation-svg-node"} group={node.group} r={node.size} fill={node.color}  />
          ))}
        </g>
        <circle id={'federation-cursor'} r={connectSize}/>

    </svg>
      <Box className={'federation-params'} width={"216px"}>

        <Paper elevation={3}>
          <FlexBox flexDirection={'column'}>
            <ColorPicker liftHue={handleChangeHue}/>
            <Typography id="size-slider" gutterBottom>
              Peer Size
            </Typography>
            <Slider
                defaultValue={10}
                aria-labelledby="size-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                onChange={handleChangeNodeSize}
                min={10}
                max={100}
            />
            <Typography id="size-slider" gutterBottom>
              Connection Size
            </Typography>
            <Slider
                defaultValue={50}
                aria-labelledby="size-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                onChange={handleChangeConnectSize}
                min={10}
                max={500}
            />
          </FlexBox>
        </Paper>
      </Box>
      </>
)
}

Federation.defaultProps={
  startNodes:[],
  startLinks:[]
}
