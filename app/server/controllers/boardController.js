const BoardService = require("../services/boardService");

class BoardController{
    constructor() {
        this.service = new BoardService();
    }

    async getAll(req, res) {
        const allBoards = await this.service.findAll();

        allBoards.length == 0 ? res.send("NULL") : res.send(allBoards);
    }

    async getSpecifyBoard(req, res, next) {
        const boardName = req.params.name;

        const board = await this.service.findSpecifyBoard({ name: boardName });

        board === null ? next(Error("Not found")) : res.send(board);
    }

    async addBoard(req, res, next) {
        try {
            if (!req.body) return res.sendStatus(400);

            const { name, color, description, createAt } = req.body;

            await this.service.addBoard({
                name,
                color,
                description,
                createAt
            });

            res.send("Board is added");
        }
        catch (err) {
            res.send("Board isnt added");
        }
    }

    async deleteBoardByName(req, res, next) {
        const boardName = req.params.name;

        // if (! await isBoardExist({ name: boardName })) {
        //     res.send("This board isn't exist");
        // }
    
        const removeDoard = await this.service.deleteBoardByName({ name: boardName });
        res.send("Board is removed");
    }
}

module.exports = BoardController;
