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
    }
}