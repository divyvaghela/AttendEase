const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success:false,
                message:"No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id)
            .select("-password");

        req.user = user;

        next();

    } catch(error) {

    console.log("JWT ERROR:", error.message);

    res.status(401).json({
        success:false,
        message:"Invalid Token"
    });

}
};

module.exports = protect;