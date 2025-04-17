import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";

const router = Router();

export const mockUserData = [
    {id: 1, username: "admin", password: "admin"},
    {id: 2, username: "user", password: "user"},
    {id: 3, username: "guest", password: "guest"},
];

router.post("/api/register", async (req, res) => {
    const { body } = req;
    body.password = hashPassword(body.password);

    const newUser = new User(body);

    try {
        const savedUser = await newUser.save();
        return res.status(201).send({status: "User created successfully"});
    } catch (err) {
        console.error(err);
        return res.status(400).send("Bad request");
    }
});

router.post("/api/login", passport.authenticate("local"), (req, res) => {
    if (!req.user) {
        return res.status(401).send("Invalid credentials");
    }
    res.status(200).send({ success: true, user: req.user });
});

router.get("/api/status", (req, res) => {
    if (req.isAuthenticated()) {
        res.send({ isAuthenticated: true, user: req.user });
    } else {
        res.send({ isAuthenticated: false });
    }
});

router.post("/api/logout", (req, res) => {
    console.log("attempting to logout")
    if (!req.isAuthenticated()) {
        return res.status(401).send("Not authenticated");
    }
    req.logout((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.status(201).send({status: "Logged out successfully"});
    });
});

export default router;