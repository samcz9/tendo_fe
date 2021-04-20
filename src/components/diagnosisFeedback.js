import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import HideShow from './hideShow'

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
  const [value, setValue] = React.useState(props.understanding);
  const [feedback, setFeedback] = React.useState(props.understandingFeedback)
  const handleChange = (event) => {
    setValue(event.target.value);
    props.setUnderstanding(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
    props.setUnderstandingFeedback(event.target.value);
  }

  return (
    <>
        <Typography variant="body1" align="left">
            You were diagnosed with <b><i>Subglottic Stenosis</i></b>.
        </Typography>
        <Typography>
            Was Dr. Jensen able to explain how to manage this diagnosis?
        </Typography>
        <FormControl component="fieldset">
        <RadioGroup row aria-label="response" name="response1" value={value} onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        </FormControl>
        <HideShow show={value == "no"}>
            <Typography variant="body1" className={classes.text}>
                We are sorry to hear that. What would have helped you to understand?
            </Typography>
            <TextField
                id="filled-textarea"
                label="Feedback"
                onChange={handleFeedbackChange}
                multiline
                value={feedback}
                variant="filled"
                rows={5}
                className={classes.textArea}
            />
        </HideShow>
    </>
  );
}