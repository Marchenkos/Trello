const uuid = require("uuid");
const jwt = require('jsonwebtoken');

const serverConfig =require("../../config/serverConfig");
const UserRepository = require("../repositories/userRepository");

class TokenService {
    constructor() {
        this.repository = new UserRepository();
    }

    async createToken(login) {
        const user = await this.repository.findOne(login);

        if(!user) {
            return null;
        }

        return {
            token: jwt.sign({id: user._id}, serverConfig.secretKey),
            refreshToken: uuid()
        };
    }
}

module.exports = TokenService;
