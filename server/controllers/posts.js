import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { balance, city, clientName, haveMortgage, numCreditCards, selectedFile } = req.body;

    const newPostMessage = new PostMessage({ clientName, city, balance, haveMortgage, numCreditCards, selectedFile })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { clientName, city, balance, haveMortgage, numCreditCards, selectedFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { clientName, city, balance, haveMortgage, numCreditCards, selectedFile, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
 
    res.json(updatedPost);
}

export const getcities=async(req, res)=>{
    try {
        const cities= await PostMessage.distinct("city");

        res.status(200).json(cities);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const filter=async(req,res)=>{
    try {

        var q = {}; // declare the query object
  q['$and']=[]; // filter the search by any criteria given by the user
  if((req.body.cities).length > 0){ // if the criteria has a value or values
    q["$and"].push({ city: {$in: req.body.cities}}); // add to the query object
  }
  if(req.body.balance > 0){
    q["$and"].push({ balance: {$lte: req.body.balance}});
  }
  if(req.body.haveMortgage){
    q["$and"].push({ haveMortgage: {$eq: req.body.haveMortgage }});
  }
  if(req.body.cards>0){
    q["$and"].push({ numCreditCards: {$eq: req.body.cards }});
  }


        const posts= await PostMessage.find(q);
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
}


export default router;
