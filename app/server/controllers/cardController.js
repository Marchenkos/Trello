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
        if (!req.body) return res.sendStatus(400);

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

        result ? res.send(result) : next(new Error("Not add"));
    }

    async deleteCardByName(req, res, next) {
        const cardName = req.params.name;
        //лучше вызывать функци. проверки или ловить ошибку?
        // if (! await isBoardExist({ name: boardName })) {
        //     res.send("This board isn't exist");
        // }
    
        const card = await this.service.deleteCardByName({ name: cardName });
        
        card ? res.send(card) : next(new Error());
    }

    async deleteAllCards(req, res, next) {
        const boardName = req.params.name;

        const card = await this.service.deleteAllCards({ createAt: boardName });
        
        card ? res.send(card) : next(new Error());
    }

    async updateCard(req, res, next) {
        const cardName = req.params.name;
        const newValues = req.body;

        const card = await this.service.updateCard(cardName, newValues);
        
        card ? res.send(card) : next(new Error());
    }
}

module.exports = CardController;