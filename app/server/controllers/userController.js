const UserService = require("../services/userService");

class UserController{
    constructor() {
        this.service = new UserService();
    }

    async getAll(req, res) {
        const userList = await this.service.getAll();

        userList.length == 0 ? res.send(null) : res.send(userList);
    }

    async findUser(req, res, next) {
        const userName = req.params.name;

        const user = await this.service.findUser({ login: userName });

        user ? res.send(user) : next(new Error("Not found"));
    }

    async addUser(req, res, next) {
        if (!req.body) return res.sendStatus(400);

        const { login, password } = req.body;

        const newUser = await this.service.addUser(login, password);

        newUser ? res.send(newUser) : next(newUser);
    }

    async checkUser(req, res, next) {
        if (!req.body) return res.sendStatus(400);

        const { login, password } = req.body;

        const isCompare = await this.service.checkUser(login, password);

        if (!isCompare) {
            next(new Error("No correct login or password"));
        }

        res.send("Success");
    }
}

module.exports = UserController;
