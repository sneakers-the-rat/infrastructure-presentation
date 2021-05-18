import React from 'react'
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core';
import { DeckContext } from 'spectacle'
import styled from 'styled-components';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {tryCatch} from 'ramda';
import {spectacle_theme} from '../theme';

export const Circle = styled('div')`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 1px solid ${({ color }) => color};
  background: ${({ color, active }) => (active ? color : 'transparent')};
  margin: ${({ size }) => size / 3}px;
  border-radius: 50%;
  pointer-events: all;
  cursor: pointer;
`;

const Container = styled('div')`
  @media print {
    display: none;
  }
`;

const DotDivider = styled(Divider)`
  margin-top: 1em;
  margin-bottom: 1em;
`


const drawerWidth= 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    pointerEvents: 'all'
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create(['width','height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create(['width','height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: "70px",
    height: "70px"
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listText: {
    fontSize: 22
  },
  data:{
    color: spectacle_theme.colors.data
  },
  tools:{
    color: spectacle_theme.colors.tools
  },
  knowledge:{
    color: spectacle_theme.colors.knowledge
  },
  intro:{
  },
  outro:{
  },
  sectionHead:{

  }

}));

export default function TOC(
    {
      slides,
      drawerWidth,
      ...props
    }
){
  const classes = useStyles();

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { slideCount, skipTo, activeView } = React.useContext(DeckContext);

  let slidect = 0;
  let slideN = 0;
  const counter = () => {slideN+=1; return(slideN)}

  return (
      <Container className="material-toc">
        {open &&
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
        >


                <div className={classes.toolbar}>
                <IconButton onClick={toggleDrawer}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                </div>


          <Divider />
          <List>
          {Array(slideCount).fill(0).map(
              (_,idx) => {
                return(<ListItem button onClick={() => {
                  // console.log('clicked', idx);
                  skipTo({
                    slideIndex: idx,
                    stepIndex: 0
                  })
                }}
               className={classes[slides[idx].group]}
               selected={activeView.slideIndex===idx}
                key={idx}>
                  <ListItemText className={classes.listText} primary={slides[idx].group +' - ' +idx}/>
                </ListItem>)
              }
          )}
          </List>
        </Drawer>}

        {!open &&
        Array(3).fill(0).map(
            (_,idx) => (
                <Circle
                    key={`menu-circle-${idx}`}
                    color={"#000000"}
                    active={true}
                    size={props.size}
                    onClick={toggleDrawer}
                    data-testid="Progress Circle"
                />))
        }
        {!open && <DotDivider style={{marginTop:"1em", marginBottom: "1em"}}/>}

        {Array(slideCount)
        .fill(0)
        .map((_, idx) => (
            <Circle
                key={`progress-circle-${idx}`}
                color={spectacle_theme.colors[slides[idx].group] ? spectacle_theme.colors[slides[idx].group]  : props.color}
                active={activeView.slideIndex === idx}
                size={props.size}
                onClick={() =>
                    skipTo({
                      slideIndex: idx,
                      stepIndex: 0
                    })
                }
                data-testid="Progress Circle"
            />
        ))}
      </Container>
  );
}

TOC.defaultProps = {
  color: '#000',
  size: 10,
}
