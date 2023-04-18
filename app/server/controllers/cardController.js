const CardService = require("../services/cardService");

class CardController{
    constructor() {
        this.service = new CardService();
    }

    async getAll(req, res) {
        const cardList = await this.service.findAll();

        cardList.length == 0 ? res.send(null) : res.send(cardList);
    }

    async getSpecifyCard(req, res, next) {
        const cardName = req.params.name;

        const card = await this.service.findSpecifyCard({ name: cardName });

        card === null ? next(new Error("Not found")) : res.send(card);
    }

    async addCard(req, res, next) {
        if (res.statusCode == "422") return next(new Error("No correct data"));

        const {
            name,
            description,
            createAt,
            estimate,
            dueDate,
            labels,
            status
        } = req.body;

        const result = await this.service.addCard({
            name,
            description,
            createAt,
            estimate,
            dueDate,
            labels,
            status
        });

        result ? res.send(result) : next(new Error("Card is not added"));
    }

    async deleteCardByName(req, res, next) {
        if (res.statusCode == "422") return next(new Error("No correct data"));

        const cardName = req.params.name;

        const card = await this.service.deleteCardByName({ name: cardName });
        
        card ? res.send(card) : next(new Error("This card isn't exist"));
    }

    async deleteAllCards(req, res, next) {
        if (res.statusCode == "422") return next(new Error("No correct data"));

        const boardName = req.params.name;

        const count = await this.service.deleteAllCards({ createAt: boardName });
        
        count > 0 ? res.send("Success") : next(new Error("Cards are not removed"));
    }

    async updateCard(req, res, next) {
        if (res.statusCode == "422") return next(new Error("No correct data"));

        const cardName = req.params.name;
        const newValues = req.body;

        const card = await this.service.updateCard(cardName, newValues);
        
        card ? res.send(card) : next(new Error("Card is not updated"));
    }
}

module.exports = CardController;
