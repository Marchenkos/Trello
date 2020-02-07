const regRouter = require("./modules/reg");
const BoardController = require("../server/controllers/boardController");
const cardRouter = require("./modules/card");

class Router {
    constructor(app) {
        this.routre = app;
        this.board = new BoardController();
    }

    connect() {
        this.boardRouter();
        this.regRouter();
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
        this.routre.use("/card", cardRouter);
    }

    regRouter() {
        this.routre.use("/reg", regRouter);
    }
}

module.exports = Router;
