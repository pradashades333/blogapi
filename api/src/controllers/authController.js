const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

module.exports = {
    register: async (req, res, next) => {
        try {
            const {email, password,username } = req.body;
            const hashedPass = await bcrypt.hash(password,10)
            await prisma.user.create({data :{email,username, password:hashedPass}})
            res.json({ message: "User created" })
        } catch (err) {
            next(err)
        }
    }
}