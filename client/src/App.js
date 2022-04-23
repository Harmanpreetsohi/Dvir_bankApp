import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import memories from './images/bank.png';
import Filter from './components/Filters/Filter';


//import Checkbox from '@mui/material/Checkbox';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [val, setVal] = useState([0, 100]);
  const updateRange = (e, data) => {
    console.log(data)
    setVal(data);
  };
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Bank Clients</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={8}>
              <Filter/>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
