const UserController = require("../server/controllers/userController");
const BoardController = require("../server/controllers/boardController");
const CardController = require("../server/controllers/cardController");

class Router {
    constructor(app) {
        this.routre = app;
        this.board = new BoardController();
        this.card = new CardController();
        this.user = new UserController();
    }

    connect() {
        this.boardRouter();
        this.userRouter();
        this.cardRouter();
    }

    boardRouter() {
        this.routre.get("/board", this.board.getAll.bind(this.board));
        this.routre.get("/board/:name", this.board.getSpecifyBoard.bind(this.board));
        this.routre.post("/board", this.board.addBoard.bind(this.board));
        this.routre.delete("/board/:name", this.board.deleteBoardByName.bind(this.board));

        // this.routre.put("/board/:name", this.board.getAll.bind(this.board));
    }

    cardRouter() {
        this.routre.get("/card", this.card.getAll.bind(this.card));
        this.routre.get("/card/:name", this.card.getSpecifyCard.bind(this.card));
        this.routre.post("/card", this.card.addCard.bind(this.card));
        this.routre.delete("/card/:name", this.card.deleteCardByName.bind(this.card));
        this.routre.delete("/card/removeAll/:name", this.card.deleteAllCards.bind(this.card));
        this.routre.put("/card/:name", this.card.updateCard.bind(this.card));
    }

    userRouter() {
        this.routre.get("/users", this.user.getAll.bind(this.user));
        this.routre.get("/user/name", this.user.findUser.bind(this.user));
        this.routre.post("/reg", this.user.addUser.bind(this.user));
    }
}

module.exports = Router;
