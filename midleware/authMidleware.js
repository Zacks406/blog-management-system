const jwt = require('jsonwebtoken');


const protect = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ Message: "Token not found" });
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
            Message: error.Message
        });
    }
};

module.exports = { protect} ;