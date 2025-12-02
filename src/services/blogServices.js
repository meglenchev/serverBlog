import { Blog } from "../models/Blog.js"

export default {
    create(blogData, ownerId) {
        return Blog.create({
            ...blogData,
            owner: ownerId,
        });
    },
    getAll() {
        // let query = Blog.find().select({
        //     title: true,
        //     image: true,
        //     category: true
        // });

        let query = Blog.find();
        return query;
    },
    getLatest() {
        return Blog.find().sort({_id: -1}).limit(3);
    }, 
    getOne(blogId) {
        return Blog.findById(blogId);
    }, 
    update(blogId, blogData) {
        return Blog.findByIdAndUpdate(blogId, blogData, { runValidators: true });
    }, 
    delete(blogId) {
        return Blog.findByIdAndDelete(blogId);
    }
}