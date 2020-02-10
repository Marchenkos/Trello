const Card = require("../../db/models/card");

class CardRepository {
    async find(condition) {
        const cardList = await Card.find(condition);

        return cardList.length > 0 ? cardList : null;
    }

    async findOne(condition) {
        const result = await Card.findOne(condition, (err, card) => {
            if (err) {
                return null;
            }

            return card;
        });

        return result;
    }

    async addCard(newCard) {
        try {
            const result = await Card.create(newCard)
     
            return result;
        }
        catch(err) {
            return false;
        }
    }

    async removeCard(condition) {
        try {
            return await Card.findOneAndDelete(condition);
        }
        catch(err) {
            return false;
        }
    }

    async removeAllCards(condition) {
        try {
            return await (await Card.deleteMany(condition)).deletedCount
        }
        catch(err) {
            return false;
        }
    }

    async updateCard(name, newParameters) {
        const card = await Card.findOne({ name });

        return await Card.findByIdAndUpdate(card._id, newParameters);
    }
}

module.exports = CardRepository;
