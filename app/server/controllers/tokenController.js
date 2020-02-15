const TokenService = require("../services/tokenService");

class TokenController{
    constructor() {
        this.service = new TokenService();
    }

    async ceateToken(req, res, next) {
        const userName = req.params.name;

        const result = await this.service.createToken({ login: userName });

        if (!result) {
            next(new Error("Not found user!"));
        }

        res.send(result);
    }
}

module.exports = TokenController;
