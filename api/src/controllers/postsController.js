const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    getAllPosts: async(req, res, next) => {
        try {
            const showAll = await prisma.post.findMany({where: {published:true}})
            res.json(showAll);
        } catch (err) {
            next (err)
        }
    },

    getPost: async(req, res, next) => {
        try {
            const showPost = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) } })
            res.json(showPost)
        } catch(err) {
            next(err)
        }

    },

    createPost:async(req, res, next) => {
        try {
            const {title, content} = req.body
            const {id} = req.user
            const postCreate = await prisma.post.create({data:{title, content, authorId:id}})
            res.json(postCreate)
        } catch(err) {
            next(err)
        }
    },

    updatePost:async(req, res, next) => {
        try{
            const {title, content} = req.body
            const {id} = req.user
            const postUpdate = await prisma.post.update({ where: { id: parseInt(req.params.id)},data:{title, content, authorId:id} })
            res.json(postUpdate)
        } catch(err){
            next(err)
        }
    },

    deletePost:async(req, res, next) => {
        try {
            const postDelete = await prisma.post.delete({where: {id: parseInt(req.params.id)}})
            res.json(postDelete)
        }catch (err){
            next(err)
        }
    }
}