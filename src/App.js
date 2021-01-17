import logo from './logo.svg';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './components/Main';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/Assets/background.jpg'})`,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <CssBaseline />
    <Main/>
    </div>
  );
}

export default App;
