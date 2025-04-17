import passport from "passport";
import { Strategy } from "passport-local";
//import bcrypt from "bcrypt";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await User.findById(id);
        if (!findUser) {
            throw new Error("User not found");
        }
        done(null, findUser);
    } catch(err) {
        done(err, null);
    }
});

export default passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await User.findOne({ username });
            if (!findUser) {
                throw new Error("User not found");
            }
            if (!comparePassword(password, findUser.password)) {
                throw new Error("Incorrect password");
            }
            done(null, findUser);
        } catch(err) {
            done(err, null);
        }
    })
)

