const UserController = require("../server/controllers/userController");
const BoardController = require("../server/controllers/boardController");
const CardController = require("../server/controllers/cardController");
const TokenController = require("../server/controllers/tokenController");

class Router {
    constructor(app) {
        this.router = app;
        this.board = new BoardController();
        this.card = new CardController();
        this.user = new UserController();
        this.token = new TokenController();
    }

    connect() {
        this.boardRouter();
        this.userRouter();
        this.cardRouter();
        this.tokenRouter();
    }

    boardRouter() {
        this.router.get("/board", this.board.getAll.bind(this.board));
        this.router.get("/board/:name", this.board.getSpecifyBoard.bind(this.board));
        this.router.post("/board", this.board.addBoard.bind(this.board));
        this.router.delete("/board/remove/:name", this.board.deleteBoardByName.bind(this.board));
        this.router.put("/board/refresh/:name", this.board.updateBoard.bind(this.board));
    }

    cardRouter() {
        this.router.get("/card", this.card.getAll.bind(this.card));
        this.router.get("/card/:name", this.card.getSpecifyCard.bind(this.card));
        this.router.post("/card", this.card.addCard.bind(this.card));
        this.router.delete("/card/remove/:name", this.card.deleteCardByName.bind(this.card));
        this.router.delete("/card/removeAll/:name", this.card.deleteAllCards.bind(this.card));
        this.router.put("/card/refresh/:name", this.card.updateCard.bind(this.card));
    }

    userRouter() {
        this.router.get("/users", this.user.getAll.bind(this.user));
        this.router.get("/user/:name", this.user.findUser.bind(this.user));
        this.router.post("/registration", this.user.addUser.bind(this.user));
        this.router.post("/login", this.user.checkUser.bind(this.user));
    }

    tokenRouter() {
        this.router.get("/getTokens/:name", this.token.ceateToken.bind(this.token));
    }
}

module.exports = Router;
