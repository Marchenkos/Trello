const User = require("../../db/models/users");

class UserRepository {
    async getAll() {
        const userList = await User.find({});

        return userList.length > 0 ? userList : null;
    }

    async findOne(condition) {
        const result = await User.findOne(condition, (err, user) => {
            if (err) {
                return null;
            }

            return user;
        });

        return result;
    }

    async addUser(newUser) {
        try {
            const isUserExis = await this.findOne({ login: newUser.login });

            if(isUserExis) {
                return new Error("The same user already exists");
            }

            const result = await User.create(newUser)

            return result;
        }
        catch(err) {
            return false;
        }
    }

    async checkUser(login) {
        try {
            return await User.findOne({ login });
        }
        catch(err) {
            return false;
        }
    }
}

module.exports = UserRepository;
