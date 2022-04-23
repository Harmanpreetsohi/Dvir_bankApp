import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchcities, filter } from '../../actions/posts';
import { OutlinedInput, InputLabel, MenuItem, FormControl,ListItemText, Select, Checkbox, Box, Slider, Button,Typography } from '@material-ui/core';
import './style.css'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


const marks = [
    {
      value: 20000,
      label: '20000',
    },

    {
      value: 40000,
      label: '40000',
    },
  ];
  
export default function Filter() {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const [selectedCities, setselectedCities] = useState([]);
  const [balance, setfilterbalance]= useState(0);
  const [mortgage, setMortgage] = React.useState('');
  const [creditcards, setCreditcards] = React.useState(0);
  const selectChnage = (event) => {
    setMortgage(event.target.value);
  };
  const selectCards = (event) => {
    setCreditcards(event.target.value);
  };

  
  useEffect(() => {
    dispatch(fetchcities());
  }, []);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setselectedCities(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const filterbalance = (event, newValue) => {
    setfilterbalance(newValue)
  };

 const applyfilter=()=>{
   let filterdata={
     cities: selectedCities,
     balance: balance,
     mortgage: mortgage,
     cards: creditcards
   }
console.log(filterdata);
dispatch(filter(filterdata));
 }



  return (
   <div className="filter_wrapper">
        <div className='form_filter'>
       
      <div className="slide_filter">
      <Box sx={{ width: 300 }}>
      <Typography id="input-slider" gutterBottom>
      Balance
      </Typography>
      <Slider
        aria-label="Custom marks"
        min={20000}
        max={40000}
        valueLabelDisplay="auto"
        defaultValue={20000}
        onChange={filterbalance}
        marks={marks}
      />
    </Box>
      </div>
      <div className='form-control'>
      <FormControl>
        <InputLabel id="demo-multiple-checkbox-label">Cities</InputLabel>
        <Select
        className="multi_select"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCities}
          onChange={handleChange}
          input={<OutlinedInput label="Cities" />}
          renderValue={(selected) => selected.join(', ')}
         // MenuProps={MenuProps}
        >
          {cities.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedCities.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        </div>
      <div className='form-control'>
      <Box >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Mortgage</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mortgage}
          label="Have Mortgage"
          onChange={selectChnage}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </div>
      <div className='form-control'>
      <Box >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">No. of Credit Cards</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={creditcards}
          label="Credit Cards"
          onChange={selectCards}
        >
          <MenuItem value={0}>--Select--</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>        
        </Select>
      </FormControl>
    </Box>
      </div>

    </div>
     <div className="submit_button">
     <Button variant="contained" onClick={applyfilter}>Filter</Button>
     </div>
   </div>
  );
}