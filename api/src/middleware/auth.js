const jwt = require("jsonwebtoken");



module.exports = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    
    try {
        const verify = jwt.verify(token , process.env.JWT_SECRET)
        req.user = verify;
        next()
    } catch (e) {
        res.status(401).json({ error: "Unauthorized" })
    }
}

