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

        const user = await this.service.findUser({ name: userName });

        user === null ? next(new Error("Not found")) : res.send(user);
    }

    async addUser(req, res, next) {
        if (!req.body) return res.sendStatus(400);

        const { login, password } = req.body;

        const newUser = await this.service.addUser(login, password);

        newUser ? res.send(newUser) : next(new Error("Not add"));
    }
}

module.exports = UserController;
