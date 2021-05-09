
import * as React from 'react';
import * as colors from '@material-ui/core/colors';
import { rgbToHex, withStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import Slider from '@material-ui/core/Slider';
import { capitalize } from '@material-ui/core/utils';
import { Grid } from 'spectacle'

const defaults = {
  primary: '#2196f3',
  secondary: '#f50057',
};
const hues = Object.keys(colors).slice(1, 17);
const shades = [
  900,
  800,
  700,
  600,
  500,
  400,
  300,
  200,
  100,
  50,
  'A700',
  'A400',
  'A200',
  'A100',
];

const styles = (theme) => ({
  radio: {
    padding: 0,
  },
  radioIcon: {
    width: 48,
    height: 48,
  },
  radioIconSelected: {
    width: 48,
    height: 48,
    border: '1px solid white',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatch: {
    width: 192,
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  slider: {
    width: 'calc(100% - 80px)',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  colorBar: {
    marginTop: theme.spacing(2),
  },
  colorSquare: {
    width: 64,
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
});

const ColorPicker = ({classes, liftHue}) => {
  const intent = 'primary';
  const theme = useTheme();

  const [state, setState] = React.useState({
    primary: defaults.primary,
    secondary: defaults.secondary,
    primaryInput: defaults.primary,
    secondaryInput: defaults.secondary,
    primaryHue: 'blue',
    secondaryHue: 'pink',
    primaryShade: 4,
    secondaryShade: 11,
  });

  const intentInput = state[`${intent}Input`];
  const intentShade = state[`${intent}Shade`];
  const color = state[`${intent}`];

  const handleChangeHue = (name, idx) => (event) => {
    const hue = event.target.value;
    const color = colors[hue][shades[state[`${name}Shade`]]];

    setState({
      ...state,
      [`${name}Hue`]: hue,
      [name]: color,
      [`${name}Input`]: color,
    });
    liftHue(hue,color, idx)
  };


  return (
      <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} className={classes.swatch}>
          {hues.map((hue, idx) => {
            const shade =
                intent === 'primary'
                    ? shades[state.primaryShade]
                    : shades[state.secondaryShade];
            const backgroundColor = colors[hue][shade];

            return (
                <Tooltip placement="right" title={hue} key={hue}>
                  <Radio
                      className={classes.radio}
                      color="default"
                      checked={state[intent] === backgroundColor}
                      onChange={handleChangeHue(intent, idx)}
                      value={hue}
                      name={intent}
                      aria-labelledby={`tooltip-${intent}-${hue}`}
                      icon={
                        <div className={classes.radioIcon} style={{ backgroundColor }} />
                      }
                      checkedIcon={
                        <div
                            className={classes.radioIconSelected}
                            style={{ backgroundColor }}
                        >
                          <CheckIcon style={{ fontSize: 30 }} />
                        </div>
                      }
                  />
                </Tooltip>
            );
          })}
      </Grid>
  );
};

export default withStyles(styles)(ColorPicker);
