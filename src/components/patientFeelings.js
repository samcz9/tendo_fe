import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    text: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    bottomText: {
      marginBottom: theme.spacing(1)
    },
    textArea: {
      width: "100%"
    }
  }));

export default function DiagnosisFeedback(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.sentiment);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.setSentiment(event.target.value)
  };

  return (
    <>
        <Typography variant="body1" align="left" className={classes.text}>
            We appreciate your feedback.
        </Typography>
        <Typography className={classes.text}>
          Last Question:
          How do you feel about being diagnosed with <b><i>Diabeetus</i></b>?
        </Typography>
        <FormControl component="fieldset">
            <TextField
                id="filled-textarea"
                label="Your Thoughts"
                value={value}
                onChange={handleChange}
                multiline
                variant="filled"
                rows={5}
                className={classes.textArea}
            />
        </FormControl>
    </>
  );
}