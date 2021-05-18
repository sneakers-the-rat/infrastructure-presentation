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
import * as R from 'ramda';

window.d3 = d3;

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
        groupScale,
  width=1920,
        height=1080,
        id, stepIndex
   }){
  const clampX = R.clamp(0, width)
  const clampY = R.clamp(0, height)
  const [nodes, setNodes] = React.useState(startNodes.map(d => Object.create(d)))
  const [links, setLinks] = React.useState(startLinks.map(d => Object.create(d)))
  const [groups, setGroups] = React.useState([])
  const [groupLinks, setGroupLinks] = React.useState([])
  const [drawing, setDrawing] = React.useState(false)
  const [justDragged, setJustDragged] = React.useState(false)

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
  const mousedownNode = React.useRef()
  const mouseupNode = React.useRef()

  const dragLine = React.useRef()
  const simulation = React.useRef()

  React.useEffect(() => {
    setShowGroup(activeStepIndex)
  }, [activeStepIndex])

  React.useEffect(() => {
    if (!isSlideActive && simulation.current !== undefined) {
      // console.log('dismountin');
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
          force("charge", d3.forceManyBody().strength(d=>d.size*-20).distanceMin(d=>d.size*1.1).distanceMax(300))
          .force("x", d3.forceX(d => d.x))
          .force("y", d3.forceY(d => d.y))
          // .force('center', d3.forceCenter(width/2, height/2))
          .force("collisionForce", d3.forceCollide().radius(d=>d.size*1.2))

      simulation.current.on("tick", () => {
        try {
          d3.selectAll(".federation-svg-link").
              data(showLinksTemp.current).
              attr("x1", d => clampX(d.source.x)).
              attr("y1", d => clampY(d.source.y)).
              attr("x2", d => clampX(d.target.x)).
              attr("y2", d => clampY(d.target.y));

          d3.selectAll('.federation-svg-drawnlink')
          .data(groupLinks).
              attr("x1", d => clampX(d.source.x)).
              attr("y1", d => clampY(d.source.y)).
              attr("x2", d => clampX(d.target.x)).
              attr("y2", d => clampY(d.target.y));

          d3.selectAll(".federation-svg-node")
              .data(showNodesTemp.current)
              .attr('transform', d => 'translate('+clampX(d.x)+','+clampY(d.y)+')').
          call(drag(simulation.current)).on('click', function(event, d) {
            delete d.fx;
            delete d.fy;
            d3.select(this).classed('fixed', false)
            simulation.alpha(1).restart();
          });

          d3.selectAll('.federation-svg-group')
          .data(groups)
              .each(function(d, i){
                if (d === undefined){return}
            // bounding points of nodes in group
            let bpoints = showNodesTemp.current
            .filter(n => n.group === d.name)
            .map(n => (
                {
                  x1: n.x-n.size,
                  x2: n.x+n.size,
                  y1: n.y-n.size,
                  y2: n.y+n.size
                }))
            let bbox = {
              left: Math.min(...bpoints.map(p => p.x1)),
              right: Math.max(...bpoints.map(p => p.x2)),
              top: Math.min(...bpoints.map(p => p.y1)),
              bottom: Math.max(...bpoints.map(p => p.y2))
            }

            d3.select(this)
            .attr('transform', 'translate('+
              clampX((bbox.left+bbox.right)/2) + ', ' +
                clampY((bbox.top+bbox.bottom)/2) + ')'
            ).attr('r', Math.max(bbox.right-bbox.left, bbox.bottom-bbox.top)/2*groupScale)

            d3.selectAll('.federation-svg-drawnlink').
                data(groupLinks).
                filter(function(c){return(c.source.group === d.group)}).
                attr('x1', clampX((bbox.left+bbox.right)/2)).
                attr('y1', clampY((bbox.top+bbox.bottom)/2))

            d3.selectAll('.federation-svg-drawnlink').
                data(groupLinks).
                filter(function(c){return(c.target.group === d.group)}).
                attr('x2', clampX((bbox.left+bbox.right)/2)).
                attr('y2', clampY((bbox.top+bbox.bottom)/2))
          })



        } catch (e) {
          console.log(e)
        }
      });

      let selectedNode = null;
      let selectedLink = null;

      let moving = false;

      d3.selectAll('.federation-svg-group')
          .on('mousedown', (d) => {
        // select node
        mousedownNode.current = d;
        selectedNode = (mousedownNode.current === selectedNode) ? null : mousedownNode.current;

        moving = true;
        setDrawing(true);
        // reposition drag line
        d3.select(dragLine.current)
        .classed('hidden', false)
        .attr('x1', mousedownNode.current.layerX)
        .attr('y1', mousedownNode.current.layerY)
        .attr('x2', mousedownNode.current.layerX)
        .attr('y2', mousedownNode.current.layerY)
        // .attr('d', `M${mousedownNode.current.x},${mousedownNode.current.y}L${mousedownNode.current.x},${mousedownNode.current.y}`);

      })
      .on('mouseup', function (d) {
        if (!mousedownNode.current) return;
        // moving = false;

        // check for drag-to-self
        mouseupNode.current = d;
        if (mouseupNode.current === mousedownNode.current) {
          return;
        }

        // get group objects
        let sourceobj = groups.filter((g) => (g.group === d3.select(mousedownNode.current.target).attr('group')))[0];
        let targetobj = groups.filter((g) => (g.group === d3.select(mouseupNode.current.target).attr('group')))[0];

        if (sourceobj.group === targetobj.group){return}
        // add line
        setGroupLinks([
          {
            source: sourceobj,
            target: targetobj
          },
          ...groupLinks,
        ])
        // console.log('grouplink', d, sourceobj, targetobj, groupLinks)

        mousedownNode.current = null;
        mouseupNode.current = null;
        setJustDragged(true)
      })
    }

    // console.log('fedration svg', showNodesTemp, showLinksTemp, links)
  }, [showGroup, nodes, links, groups, groupLinks])

  // TODO: Fix drag to be more like this https://observablehq.com/@d3/sticky-force-layout?collection=@d3/d3-force
  const drag = (simulation) => {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
      d3.select(this).classed('fixed', true);
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      // event.subject.fx = null;
      // event.subject.fy = null;

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

  // TODO: fix mouse move to be more like this https://observablehq.com/@d3/build-your-own-graph?collection=@d3/d3-force
  const mouseMove = (event) => {
    d3.select('#federation-cursor').attr('transform', 'translate('+(event.nativeEvent.layerX)+", "+(event.nativeEvent.layerY)+")")

    if (drawing === true){
      d3.select(dragLine.current)
          .attr('x2', event.nativeEvent.layerX)
          .attr('y2', event.nativeEvent.layerY)
    }
  }

  const mouseUp = (event) => {
    if (drawing === true){
      d3.select(dragLine.current)
      .classed('hidden', true)
      setDrawing(false)
    }
  }

  React.useEffect(() => {

    return(() => ((simulation.current !== undefined) && simulation.current.stop()))
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
    if (justDragged === true){
      setJustDragged(false)
      return
    }

    let point = d3.pointer(event);
    // console.log('addnode', event, point)
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

    // console.log(newNode, links, newLinks)

    // make group if doesnt exist
    if (!groups.map(group => group.name).includes(drawGroupIndex)){
      setGroups([...groups,
        {
          x: event.nativeEvent.layerX,
          y:event.nativeEvent.layerY,
          group: drawGroupIndex,
          'name':drawGroupIndex,
          size: drawSize*groupScale,
          color: drawGroupColor,
          id: 'group-'+drawGroupIndex
        }])
    }


    setNodes([...nodes, newNode])
    setLinks([...links, ...newLinks])

  }

  return(
    <>
      <svg id={"federation-svg"} width={width} height={height} viewBox={[0,0, width, height]} onMouseMove={mouseMove} onClick={addNode} onMouseUp={mouseUp}>
        {placeholder}
        {groupLinks.map((link, i) => (
            <line className={'federation-svg-drawnlink'} key={'drawnlink-'+i} {...link}/>
        ))}
      <g className={"federation-groups"}>
        {groups.map((group, i) => (
            <circle {...group} key={group.id} className={'federation-svg-group'} r={group.size} fill={group.color} />
          ))}
      </g>
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
        <line className={'link dragline hidden'} x1={0} x2={0} y1={0} y2={0} ref={dragLine}/>

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
  startLinks:[],
  groupScale: 1.5
}

const clamp = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
