const { Todo, Card } = model;

class DragAndDropController {
  async moveItem(req, res) {
    const { cardId, itemId, arr } = req.body;

    if (!cardId || !itemId || !arr) {
      return res.status(400);
    }

    var item = await Todo.findOne({ _id: itemId });

    if (item.owner != req.user.id) {
      return res.status(401);
    }

    var todos = [];

    for (var i = 0; i < arr.length; i++) {
      var todo = await Todo.findOne({ _id: arr[i].todoId }).updateOne({
        sortValue: i
      });

      todos.push(todo);
    }

    item.parentCard = cardId;

    await item.save();

    return res.json({ todos });
  }

  //------------------------------------------------------------------------
  async reorderCards(req, res) {
    const { arr } = req.body;

    var cards = [];

    for (var i = 0; i < arr.length; i++) {
      var card = await Card.findOne({ _id: arr[i].cardId }).updateOne({
        sortValue: i
      });
      
      cards.push(card);
    }

    return res.json({ cards });
  }
}

module.exports = DragAndDropController;
