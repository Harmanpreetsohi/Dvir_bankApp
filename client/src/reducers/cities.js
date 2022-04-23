import { FETCH_CITIES_ALL } from '../constants/actionTypes';

export default (cities = [], action) => {
  switch (action.type) {
    case FETCH_CITIES_ALL:
      return action.payload;
    default:
      return cities;
  }
};

