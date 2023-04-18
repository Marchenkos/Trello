const express = require("express");

const UserController = require("./controllers/userController");
const BoardController = require("./controllers/boardController");
const CardController = require("./controllers/cardController");
const TokenController = require("./controllers/tokenController");

class Router {
    constructor(app) {
        this.app = app;
        this.board = new BoardController();
        this.card = new CardController();
        this.user = new UserController();
        this.token = new TokenController();
        this.boardRouter = express.Router();
        this.cardRouter = express.Router();
        this.userRouter = express.Router();
    }

    connect() {
        this.boardRequests();
        this.cardRequests();
        this.userRequests();
        this.app.use("/board", this.boardRouter);
        this.app.use("/card", this.cardRouter);
        this.app.use("/user", this.userRouter);
        this.tokenRequests();
    }

    boardRequests() {
        this.boardRouter.get("/", this.board.getAll.bind(this.board));
        this.boardRouter.get("/:name", this.board.getSpecifyBoard.bind(this.board));
        this.boardRouter.post("/", this.board.addBoard.bind(this.board));
        this.boardRouter.delete("/remove/:name", this.board.deleteBoardByName.bind(this.board));
        this.boardRouter.put("/refresh/:name", this.board.updateBoard.bind(this.board));
    }

    cardRequests() {
        this.cardRouter.get("/", this.card.getAll.bind(this.card));
        this.cardRouter.get("/:name", this.card.getSpecifyCard.bind(this.card));
        this.cardRouter.post("/", this.card.addCard.bind(this.card));
        this.cardRouter.delete("/remove/:name", this.card.deleteCardByName.bind(this.card));
        this.cardRouter.delete("/removeAll/:name", this.card.deleteAllCards.bind(this.card));
        this.cardRouter.put("/refresh/:name", this.card.updateCard.bind(this.card));
    }

    userRequests() {
        this.userRouter.get("/", this.user.getAll.bind(this.user));
        this.userRouter.get("/:name", this.user.findUser.bind(this.user));
        this.userRouter.post("/registration", this.user.addUser.bind(this.user));
        this.userRouter.post("/login", this.user.checkUser.bind(this.user));
    }

    tokenRequests() {
        this.app.get("/getTokens/:name", this.token.ceateToken.bind(this.token));
    }
}

module.exports = Router;
