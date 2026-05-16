const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const harshpassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: harshpassword,
            email
        });
        await user.save();
        res.status(200).json({
            Message: "User Created successfully",
            user: user
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const getUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ Message: error.message })
    }
};

const loginUser = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ Message: "Use not found" });
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                Message: "Invalid credentials"
            });
        };

        const jwtToken = jwt.sign(
            { id: user._id },
            process.env.JWT_TOKEN,
            { expiresIn: "1d" }
        );

        res.json({
            Message: "Login Successfull",
            jwt: jwtToken,
            user: {
                id: user._id,
                email: user.email,
                password: user.password
            }

        });
    } catch (error) {
        res.status(500).json({ Message: error.message })
    }
};

module.exports = ({
    registerUser,
    loginUser,
    getUsers
})
