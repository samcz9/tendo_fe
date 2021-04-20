import React from 'react';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { PinDropSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    text: {
      marginTop: theme.spacing(1),
    },
    bottomText: {
        marginBottom: theme.spacing(1)
    }
  }));

export default function ProviderRating(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(props.rating);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.setRating(event.target.value)
  };

  return (
    <>
        <Typography variant="h5" align="center" className={classes.text}> 
            Hi Gerald,
        </Typography>
        <Typography variant="body1" align="center" className={classes.text}>
            You visited with Dr. Zabriskie today.
        </Typography>
        <Typography variant="body1" align="center" className={classes.bottomText}>
            Would you recommend them to a friend or family member?
        </Typography>
        <FormControl component="fieldset">
        <RadioGroup aria-label="rating" name="rating1" value={value} onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="1 - Would Not Recommend" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
            <FormControlLabel value="5" control={<Radio />} label="5" />
            <FormControlLabel value="6" control={<Radio />} label="6" />
            <FormControlLabel value="7" control={<Radio />} label="7" />
            <FormControlLabel value="8" control={<Radio />} label="8" />
            <FormControlLabel value="9" control={<Radio />} label="9" />
            <FormControlLabel value="10" control={<Radio />} label="10 - Strongly Recommend" />
        </RadioGroup>
        </FormControl>
    </>
  );
}