import express, { json } from 'express';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import routes from "./routes/index.mjs";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.mjs";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err)
})

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(session({
    secret: "nickelodeon9012739012",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})