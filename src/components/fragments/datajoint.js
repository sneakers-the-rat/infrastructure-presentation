import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  topText: {
    fontFamily:"Source Serif Pro, Helvetica Neue",
    fontSize: "60pt"
  },
  topSubText:{
    fontFamily:"Source Serif Pro, Helvetica Neue",
    fontSize: "30pt"
  },
  topLink: {
    color: "#ff702c"
  },
  table: {
    marginTop: "50px",
    minWidth: 650,
    color: "#cccccc"
  },
  tableCell: {
    color: "#ffffff",
    fontWeight: 200
  },
  headerCell: {
    color: "#ffffff",
    fontSize: "50pt",
    paddingBottom: "30px"
  },
  headerRow: {

  },
  tableRow: {

  },
  descriptionCell: {
    color: "#ffffff",
    fontFamily: "Source Serif Pro, Helvetica Neue, sans-serif",
    fontSize: "30pt",
    textAlign: 'right'
  }
});


function createData(description, centralized, p2p) {
  return {description, centralized, p2p };
}

const rows = [
  createData("Speed", "Slower with more users", "Faster with more users"),
  createData("Capacity", "Less space with more users", "More space with more users"),
  createData("Administration", "Requires dedicated maintainers & administrators", "Everyone controls their own node & data"),
  createData("Availability", "Content guaranteed* to be available", "Content can drop out (but we can use sharding and obligate peers...)"),
  createData("Consistency", "Data format consistency guarantees", "No guarantees of format"),
  createData("Resilience", "Catastrophic losses from failures", "Resilient to single points of failure"),
  createData("Community", "None needed! if you can pay for it, you got it!", "Needs community control & investment")
];

export default function Datajoint(
    {

    }
){
  const classes = useStyles();

  return (
      <>
        <Typography className={classes.topText}>
          This exists too!!! <br/> eg.: <a className={classes.topLink} href={"https://elements.datajoint.io/"}>Datajoint Elements</a>, <a className={classes.topLink} href={'https://bids-apps.neuroimaging.io/'}>BIDS Apps</a>
        </Typography>
        <Typography className={classes.topSubText}>Just need some UX work and integration with a P2P backend...</Typography>
      </>
  );
}
