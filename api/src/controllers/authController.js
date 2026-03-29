const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res, next) => {
        try {
        const { email, password, username } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { email, username, password: hashedPassword },
        });
        res.json({ message: "User created" });
        } catch (err) {
        next(err);
        }
    },

    
}