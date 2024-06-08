const User = require('../models/userModel');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');


//Register Endpoint
router.post("/register", async (req, res) => {
    try {
        //check user existence
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) throw new Error("User with this email already exist");

        //Hash Password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        //create new user
        await User.create(req.body);

        res.status(201).json({ message: "User is registered successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }

});


//Login Endpoint
router.post("/login", async (req, res) => {
    try {
        //check user existence
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error("User with this email does not exist");

        //Check correct Password
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) throw new Error("Password Incorrect");

        //create token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "1d",
        });

        res.status(200).json({
            message: "User is logged in successfully",
            success: true,
            data: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }

});

//Get current user (need authmiddleware logic to access)
router.get("/get-current-user",authMiddleware, async (req, res) => {
try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json({
        message: "User retreive successfully",
        success : true,
        data : user,
    });
} catch (error) {
    res.status(500).json({message: error.message, success: false});
}

});


module.exports = router;