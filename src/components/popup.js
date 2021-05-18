import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import {SlideContext, useSteps} from 'spectacle';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
  },
  title: {
    height:0
  },
  titleText: {
    fontFamily: "Source Serif Pro, Helvetica Neue, sans-serif",
    fontSize: "70pt",
    fontWeight: 200,
    textShadow: "0px 0px 10px #000000",
    transform: 'translateY(-160px)'
  },
  content: {

  },
  body: {

  },
  paper: {
    backgroundColor: "rgba(0,0,0,0.9)",
    border: "3px solid #ff702c",
    borderRadius: "10px",
    color: "#f0f0f0",
    overflow: 'visible',
    // .boxShadow(@green-glow);
    maxWidth: "1400px",
    minWidth: "600px"
  },
  closeButton: {
    position: 'absolute',
  },
}));

export default function Popup(
  {
    title,
    stepIndex,
      showStep,
    children
  }){
  const classes = useStyles()

  const [open, setOpen] = React.useState(false);

  const { activeStepIndex, isSlideActive } = React.useContext(SlideContext);
  const { stepId, isActive, stepNum, placeholder } = useSteps(1, {
    stepIndex,
  });

  if (Object.is(showStep, undefined)){
    showStep = Object.is(stepIndex, undefined) ? stepNum : stepIndex
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    // console.log(activeStepIndex, showStep, stepIndex, stepNum, isActive)

    if (isSlideActive === false){
      setOpen(false);
      return
    }

    if (Object.is(showStep, undefined)){
      if (isActive === true){
        setOpen(true)
      } else {
        setOpen(false)
      }
    } else {
      if (activeStepIndex === showStep){
        setOpen(true)
      } else if (activeStepIndex !== showStep){
        setOpen(false)
      }
    }
  }, [activeStepIndex, isSlideActive])



  return (
      <div className={"popup-root " + classes.root}>
        {placeholder}
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} PaperProps={{className:'popup-paper '+classes.paper}}>
          <MuiDialogTitle disableTypography className={classes.title}>
            <Typography variant="h6" className={classes.titleText}>{title}</Typography>
          </MuiDialogTitle>
          <MuiDialogContent className={classes.content} dividers>
            {typeof children === 'string' ?
                <Typography className={classes.body}>{children}</Typography>
                :
                children
            }
          </MuiDialogContent>
        </Dialog>
      </div>
  )

}

Popup.defaultProps = {
  title: ""
}
