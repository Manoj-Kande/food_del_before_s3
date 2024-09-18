import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import validator from "validator";

// login user 
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Does Not Exist" });
        }

        const isMatch = await verifyPassword(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, message: "Logged In Successfully", token: token });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hashing password
        const { hashedPassword, salt } = await hashPassword(password);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword + ':' + salt // Store combined hashedPassword and salt
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token: token });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
};

// Utility functions for PBKDF2
const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve({ hashedPassword: derivedKey.toString('hex'), salt });
        });
    });
};

const verifyPassword = async (password, storedPassword) => {
    const [hashedStoredPassword, salt] = storedPassword.split(':'); // Split storedPassword to extract hashedPassword and salt

    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(hashedStoredPassword === derivedKey.toString('hex'));
        });
    });
};

export { loginUser, registerUser };
