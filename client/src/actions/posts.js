import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_CITIES_ALL, FILTER } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchcities = ()=>async(dispatch)=>{
  try {
    const { data }= await api.fetchCities();

    dispatch({ type: FETCH_CITIES_ALL, payload: data  });
  } catch (error) {
    console.log(error.message);
  }
}
export const filter = (filter)=>async(dispatch)=>{
  try {
    const { data }= await api.filter(filter);
console.log(data)
    dispatch({ type: FILTER, payload: data  });
  } catch (error) {
    console.log(error.message);
  }
}
