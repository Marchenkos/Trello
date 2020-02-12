const CardRepository = require("../repositories/cardRepository");

class CardService {
    constructor() {
        this.repository = new CardRepository();
    }

    async findAll() {
        return await this.repository.find({});
    }

    async findSpecifyCard(condition) {
        const card = await this.repository.findOne(condition);

        return card;
    }

    async addCard(newCard) {
        return await this.repository.addCard(newCard);
    }

    async deleteCardByName(name) {
        return await this.repository.removeCard(name);
    }

    async deleteAllCards(boardName) {
        return await this.repository.removeAllCards(boardName);
    }

    async updateCard(name, values) {
        return await this.repository.updateCard({ name }, values);
    }
}

module.exports = CardService;
