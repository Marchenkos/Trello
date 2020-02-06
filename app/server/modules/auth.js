const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const { compareSync } = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Users = require("../../db/models/users");
const config = require("../../db/config");
const tokenService = require("../../client/module/auth");

const router = express.Router();
const jsonParser = bodyParser.json();

async function newTokenPair(userId) {
    const newRefreshToken = uuid();

    await tokenService.add({
        token: newRefreshToken,
        userId
    });

    return {
        token: jwt.sign({id: userId}, config.secret),
        refreshToken: newRefreshToken
    };
}

router.post("/login", jsonParser, async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);

        const { login, password } = req.body;

        const user = await Users.findOne({ login });

        if (user.length < 1 || !compareSync(password, user.password)) {
            res.send("Not correct data");
        }

        res.send(await newTokenPair(user._id));
    }
    catch(err) {
        res.send("Error");
    }
});

router.post("/refresh", jsonParser, async (req, res) => {
    const { refreshToken } = req.body;
    const dbToken = await tokenService.find({ token: refreshToken });

    if (!dbToken) {
        res.send("Token not found");
    }

    await tokenService.remove({ token: refreshToken });

    res.send(await newTokenPair(dbToken.userId));
})

module.exports = router;
