import { Router } from "express";

export const blogController = Router();

blogController.get('/', (req, res) => {
    res.send('It works!');
})

blogController.post('/', (req, res) => {
    
    console.log(req.body);
    
    res.send('It works!');
})