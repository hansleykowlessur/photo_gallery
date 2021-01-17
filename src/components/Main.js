import React , {useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createApi } from 'unsplash-js';

const unsplash = new createApi({
  accessKey: "aMzFzF2XlDbOG0MemWppQGBRCyvxnclIttjNrssmA5k"
});

const useStyles = makeStyles((theme) => ({
  root: {
     display: 'flex',
     flexWrap: 'wrap',
     justifyContent: 'space-around',
     overflow: 'hidden',
     backgroundColor: theme.palette.background.paper,
   },
   gridList: {
     width: 500,
     height: 450,
   },
   icon: {
     color: 'rgba(255, 255, 255, 0.54)',
   },
}));


export default function Main() {
  const classes = useStyles();
// query being queried
const [query, setQuery] = useState('');
//Object where the api content is saved
const [finalText, setFinalText] = useState(null);
//Error message being returned to the user
const [errorMessage, setErrorMessage] = useState('');
//Check response status code
const [responseFromAPI, setResponseFromAPI] = useState(true);
const onSubmit = (e) => {

  e.preventDefault();
  const isValid = formValidation();
  // Use to check if response was initially error then was correct
  setResponseFromAPI(true);

  if (isValid){
    const result = fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=5&orientation=landscape&query=${query}&client_id=aMzFzF2XlDbOG0MemWppQGBRCyvxnclIttjNrssmA5k`)
      .then(res => {
        // Check status
        if(res.status === 200){
          return res.json()
        } else if(res.status ===404){
          setErrorMessage('City not found')
          setResponseFromAPI(false)
          setFinalText(null)
        } else {
          setErrorMessage('City not found')
          setResponseFromAPI(false)
          setFinalText(null)
        }
      })
      .then(contents =>  setFinalText(contents))
      .catch(error => console.log(false));
    setErrorMessage('');
  }else {
    setErrorMessage("Don't submit blank field");
    setFinalText(null);
  }

}

const formValidation = () => {
  let isValid = true;
  if(query.length <= 0 ){
    isValid = false;
  }else{
    isValid = true;
  }
  return isValid;
}

  return (
    <div className={classes.root}>

    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>

        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form onSubmit={onSubmit}>
              <Grid container align='center'>
                  <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Search an Image" variant="outlined" onChange= {(e)=>(setQuery(e.target.value))} />

                  </Grid>
                  <Grid item/>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type='submit'>
                    Submit
                    </Button>
                  </Grid>
              </Grid>
            <p> {errorMessage} </p>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {
            responseFromAPI ? (
              <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={4}>
                    <Typography variant="h4"> {finalText ? <img src= {finalText.results[0].urls.small} alt='Icon'/> : null}</Typography>

                    </Grid>
                    <Grid item xs={4}>
                    <Typography variant="h4"> {finalText ? <img src= {finalText.results[1].urls.small} alt='Icon'/> : null}</Typography>

                    </Grid>
                    <Grid item xs={4}>
                    <Typography variant="h4"> {finalText ? <img src= {finalText.results[2].urls.small} alt='Icon'/> : null}</Typography>

                    </Grid>
                    <Grid item xs={6}>
                    <Typography variant="h4"> {finalText ? <img src= {finalText.results[3].urls.small} alt='Icon'/> : null}</Typography>

                    </Grid>
                    <Grid item xs={6}>
                    <Typography variant="h4"> {finalText ? <img src= {finalText.results[4].urls.small} alt='Icon'/> : null}</Typography>

                    </Grid>
                </Grid>
              </Paper>
            ) : null
          }
        </Grid>

      </Grid>
    </Container>
    </div>
  );
}
