const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const harshpassword = await bcrypt.hash(password, 10)

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

module.exports = ({
    registerUser
})
