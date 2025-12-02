import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import blogServices from "../services/blogServices.js";

export const blogController = Router();

blogController.get('/blog', async (req, res) => {
    const blogs = await blogServices.getAll();

    res.send(JSON.stringify(blogs))
});

blogController.get('/blog/:blogId/details', async (req, res) => {
    const blogId = req.params.blogId;

    try {
        // const blog = await blogServices.getOne(blogId).populate('owner');
        const blog = await blogServices.getOne(blogId);

        res.send(JSON.stringify(blog));

    } catch (err) {
        res.render('404', { error: 'Something went wrong!' })
    }
});

blogController.get('/blog/:blogId/edit', async (req, res) => {
    const blogId = req.params.blogId;

    try {
        const blog = await blogServices.getOne(blogId);

        res.send(JSON.stringify(blog));
    } catch (err) {
        res.render('404', { error: 'Blog not found!' })
    }
});

blogController.post('/blog/:blogId/edit', async (req, res) => {
    const blogId = req.params.blogId;
    const blogData = req.body;

    try {
        const blog = await blogServices.update(blogId, blogData);

        res.send(blog);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).send({
            error: errorMessage,
            blog: blogData,
        });
    }
});

blogController.post('/blog/create', async (req, res) => {
    const blogData = req.body;
    const ownerId = req.user.id; // We get the ID from the middleware "isAuth"

    try {
        const blog = await blogServices.create(blogData, ownerId);

        res.send(JSON.stringify(blog));
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).send({
            error: errorMessage,
            blog: blogData
        });
    }
});

blogController.get('/blog/:blogId/delete', async (req, res) => {
    const blogId = req.params.blogId;

    const blog = await blogServices.getOne(blogId);

    await blogServices.delete(blogId);

    res.send('');
});