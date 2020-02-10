const User = require("../../db/models/users");

class UserRepository {
    async getAll() {
        const userList = await User.find({});

        return userList.length > 0 ? userList : null;
    }

    async findOne(condition) {
        const result = await User.findOne(condition, (err, card) => {
            if (err) {
                return null;
            }

            return card;
        });

        return result;
    }

    async addUser(newUser) {
        try {
            const result = await User.create(newUser)
     
            return result;
        }
        catch(err) {
            return false;
        }
    }
}

module.exports = UserRepository;
