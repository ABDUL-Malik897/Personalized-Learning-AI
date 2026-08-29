const User = require("../models/User");
const adminAuth = require("../config/firebaseAdmin");

const googleAuth = async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: "Firebase ID token is required",
            });
        }
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const googleUid = decodedToken.uid;
        const email = decodedToken.email;
        const name = decodedToken.name || "User";

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Google account email is required",
            });
        }
        let user = await User.findOne({ googleUid });
        if (!user) {
            user = await User.findOne({ email });
        }
        if (user) {
            if (!user.googleUid) {
                user.googleUid = googleUid;
                await user.save();
            }
            return res.status(200).json({
                success: true,
                isNewUser: !user.onboardingCompleted,
                user,
            });
        }

        user = await User.create({
            googleUid,
            name,
            email,
        });
        return res.status(201).json({
            success: true,
            isNewUser: true,
            user,
        });
    } catch (error) {
        console.error("Google authentication failed:", error);
        return res.status(401).json({
            success: false,
            message: "Google authentication failed",
            error: error.message,
        });
    }
};

module.exports = {
    googleAuth,
};