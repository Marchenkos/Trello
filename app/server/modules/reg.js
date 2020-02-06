const express = require("express");
const bodyParser = require("body-parser");
const { hashSync } = require("bcryptjs");
const Users = require("../../db/models/users");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);

        const { login, password } = req.body;

        const newUser = new Users({
            login,
            password: hashSync(password)
        });

        await newUser.save();

        res.send("Registration completed successfully");
    }
    catch(err) {
        res.send("Error");
    }
});

module.exports = router;
