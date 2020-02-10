const { hashSync, compareSync } = require("bcryptjs");

const UserRepository = require("../repositories/userRepository");

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async getAll() {
        return await this.repository.getAll();
    }

    async findUser(condition) {
        return await this.repository.findOne(condition);
    }

    async addUser(login, password) {
        const hashPassword = hashSync(password);

        return await this.repository.addUser({ login, password: hashPassword });
    }

    async checkUser(login, password) {
        const user = await this.repository.checkUser(login);

        if(!user) {
            return false;
        }

        const isPasswordMatch = compareSync(password, user.password);

        return isPasswordMatch ? true : false;
    }
}

module.exports = UserService;
