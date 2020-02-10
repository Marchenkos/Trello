const { hashSync } = require("bcryptjs");

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
}

module.exports = UserService;
