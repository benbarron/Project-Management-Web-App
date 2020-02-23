const { Board, Todo, Card } = model;

class BoardController {
  // -------------------------------------------------------------------------------
  async index(req, res) {
    const boards = await Board.find({ owner: req.user.id }).sort({
      sortValue: 1
    });

    return res.json({ boards });
  }

  // -------------------------------------------------------------------------------
  async store(req, res) {
    const { name, sortValue, bg, description, type } = req.body;

    if (!name || !sortValue) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
      var board = new Board();

      board.name = name;
      board.type = type;
      board.sortValue = sortValue;
      board.owner = req.user.id;
      board.members = [req.user.id];
      board.bg = bg;

      if (description) {
        board.description = description;
      }

      board.unix = new Date().getTime();
      board.save();

      return res.json({ board });
    } catch (e) {
      console.log(e);
    }
  }

  // -------------------------------------------------------------------------------
  async update(req, res) {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400);
    }

    try {
      const board = await Board.findOne({ _id: req.params.id });

      board.name = name;

      board.description = description;

      await board.save();

      return res.json({ board });
    } catch (e) {
      return res.status(501).json({ msg: 'Internal server error' });
    }
  }

  // -------------------------------------------------------------------------------
  async updateBackground(req, res) {
    const { bg } = req.body;
    const { id } = req.params;

    if (!bg) {
      return res.status(400);
    }

    try {
      const board = await Board.findOne({ _id: id });

      await board.updateOne({ bg });

      board['bg'] = bg;

      return res.json({ board });
    } catch (e) {
      console.log(e);
      return res.status(501);
    }
  }

  // -------------------------------------------------------------------------------
  async show(req, res) {
    const board = await Board.findOne({ _id: req.params.id });

    for (var i = 0; i < board.access.length; i++) {
      if (req.user._id === board.access[i]) {
        return res.json({ board });
      }
    }

    return res
      .status(401)
      .json({ msg: "You don't have permission to access this board" });
  }

  // -------------------------------------------------------------------------------
  async delete(req, res) {
    const board = await Board.findOne({ _id: req.params.id });
    const cards = await Card.find({ parentBoard: req.params.id });

    if (!board) {
      return res
        .status(400)
        .json({ msg: 'The board you are referencing does not exist' });
    }

    if (board.owner != req.user.id) {
      return res
        .status(401)
        .json({ msg: "You don't have permission to access this board" });
    }

    try {
      if (cards.length > 0) {
        for (var i = 0; i < cards.length; i++) {
          await Todo.deleteMany({ parentCard: cards[i]._id });
        }
        await Card.deleteMany({ parentBoard: req.params.id });
      }

      await Board.deleteOne({ _id: req.params.id });
    } catch (e) {
      console.log(e);
    }

    return res.status(200).json({ msg: 'Board deleted' });
  }

  async clone(req, res) {
    const boardId = req.params.id;

    const board = await Board.findOne({ _id: boardId });

    if (!board) {
      return res.status(400);
    }

    // clone board --------------------------------------
    const newBoard = new Board();

    const boards = await Board.find({ owner: req.user._id });
    var max = 0;

    for (let i = 0; i < boards.length; i++) {
      if (boards[i].sortValue > max) {
        max = boards[i].sortValue;
      }
    }

    newBoard.name = board.name + ' - Copy';
    newBoard.type = board.type;
    newBoard.sortValue = max + 1;
    newBoard.owner = board.owner;
    newBoard.bg = board.bg;
    newBoard.description = board.description;
    newBoard.unix = new Date().getTime();

    await newBoard.save();

    var newCardArr = [];
    var newTodoArr = [];

    const cards = await Card.find({ parentBoard: boardId });

    for (let i = 0; i < cards.length; i++) {
      // clone cards ----------------------------------
      var newCard = new Card();
      newCard.parentBoard = newBoard._id;
      newCard.unix = new Date().getTime();
      newCard.name = cards[i].name;
      newCard.sortValue = cards[i].sortValue;
      newCard.owner = cards[i].owner;
      await newCard.save();
      newCardArr.push(newCard);

      // clone todos ----------------------------------
      var items = await Todo.find({ parentCard: cards[i]._id });

      for (let j = 0; j < items.length; j++) {
        var newTodo = new Todo();

        newTodo.name = items[j].name;
        newTodo.label = items[j].label;
        newTodo.dueDate = items[j].dueDate;
        newTodo.dueDateInstance = items[j].dueDateInstance;

        newTodo.unix = new Date().getTime();
        newTodo.sortValue = items[j].sortValue;
        newTodo.parentCard = newCard._id;
        newTodo.owner = items[j].owner;

        await newTodo.save();
        newTodoArr.push(newTodo);
      }
    }

    return res.json({ board: newBoard, cards: newCardArr, todos: newTodoArr });
  }
}

module.exports = BoardController;
