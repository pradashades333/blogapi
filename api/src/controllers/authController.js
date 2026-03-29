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

    login: async (req, res, next) => {
        try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });
        const token = jwt.sign(
            { userId: user.id, isAuthor: user.isAuthor },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({ token });
        } catch (err) {
        next(err);
        }
    },

}