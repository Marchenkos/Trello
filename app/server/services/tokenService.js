const uuid = require("uuid");
const jwt = require('jsonwebtoken');

const { SECRET_KEY } =require("../../config/secretFile.env");
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
            token: jwt.sign({id: user._id}, SECRET_KEY),
            refreshToken: uuid()
        };
    }
}

module.exports = TokenService;
