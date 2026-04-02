const prisma = require("../lib/prisma");

module.exports = {
    createComment: async (req, res, next) => {
        try {
            const {content} = req.body
            const {id} = req.user
            const {postId} = req.params
            const commentCreate = await prisma.comment.create({data:{content, authorId:id, postId: parseInt(postId)}})
            res.json(commentCreate)
        } catch(err) {
            next(err)
        }
    },

    updateComment: async (req, res, next) => {
        try{
            const {content} = req.body
            const commentUpdate = await prisma.comment.update({ where: { id: parseInt(req.params.id) }, data: { content } })
            res.json(commentUpdate)
        } catch (err) {
            next(err)
        }
    },

}