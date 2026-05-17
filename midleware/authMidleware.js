const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ Message: "Header not found" });
        };

        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(
            token,
            process.env.JWT_TOKEN
        );

        req.user = decode;

        next();


    } catch (error) {
        res.status(500).json({
            Message: error.message
        });
    }
};

module.exports = { protect }