import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from 'spectacle';
import { SlideContext } from "spectacle";
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse'


export default function BasicCard({
    title="",
    subtitle=null,
    body="",
    id='',
    appearStep=0,
    elevation=0,
    serif=true,
    fontWeight=500,
    titleBorder=true
                                  }) {


  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      padding: 20,
      // backdropFilter: "blur(30px)",
      backgroundColor: "rgba(255, 255, 255, 0.6)",

    },
    title: {
      fontFace: serif ? '"EB Garamond" serif' : '"Helvetica Neue" sans-serif',
      fontWeight:fontWeight,
      fontSize:50,
      marginBottom:0,
      borderBottom: titleBorder ? "1px solid #111111" : "none"
    },
    pos: {
      fontSize:40,
      marginTop:-12,
      paddingTop:0,
      marginBottom: 16,
    },
    body: {
      lineHeight:1.2,
      fontWeight:200
    }
  });
  const classes = useStyles();
  const { activeStepIndex, isSlideActive } = React.useContext(SlideContext);

  // console.log('card',id,  activeStepIndex, isSlideActive, appearStep, activeStepIndex === appearStep)
  return (
      <Card id={id} className={classes.root + ' basic-card-root'} elevation={elevation}>
        <CardContent className={'basic-card-content'}>
          {typeof title === 'string' ? <Typography className={classes.title} variant={"h5"} component={"h2"} gutterBottom>
            {title}
          </Typography> : title}
          {typeof subtitle === 'string' ?
          <Typography className={classes.pos} color="textSecondary">
            {subtitle}
          </Typography> : subtitle}
          {appearStep>0 ?
              <Collapse in={activeStepIndex>=appearStep}>
                {typeof body === 'string' ?
                <Typography className={classes.body} variant="body2" component="p">
                  {body}
                </Typography> : body}
              </Collapse> : typeof body === 'string' ?
              <Typography className={classes.body} variant="body2" component="p">
                {body}
              </Typography> : body}
          </CardContent>
      </Card>
  );
}

export function PositionedCard({
     title="",
     subtitle=null,
     body="",
     id='',
    appearStep=0,
     x=0,
    y = 0,
    width=1/3
}){
  return(
      <Box
          left={x+'px'}
          top={y+'px'}
          width={width}
          className={'positioned-card'}>
        <BasicCard
        title={title}
        subtitle={subtitle}
        body={body}
        id={id}
        appearStep={appearStep}/>
      </Box>
  )
}
